"use client";
import { syne, unica } from "@/font/getFont";
import useCheckAuthentication from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PiShoppingCartSimple } from "react-icons/pi";

const LibroDetailCard = ({ libro }) => {
  const router = useRouter();
  const { isAuthenticated, id_usuario } = useCheckAuthentication();
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [duracion, setDuracion] = useState(7);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleAlquilar = async () => {
    if (!isAuthenticated) {
      localStorage.setItem("prevPage", window.location.pathname);
      router.push("/login");
      return;
    }
    setShowModal(true);
  };

  const confirmarAlquiler = async (id_libro) => {
    try {
      const res = await fetch("/api/prestamo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_libro, id_usuario, duracionDias: duracion }),
      });
      const data = await res.json();
      res.ok ? alert(data.message) : alert(data.error);
      setShowModal(false);
    } catch (error) {
      alert("Hubo un problema al intentar alquilar el libro.");
    }
  };

  return (
    <div className="flex justify-center gap-20">
      <div className="h-80 w-60 bg-slate-200 shadow-md rounded-lg justify-center items-center flex"></div>
      <div className={`${syne.className} flex flex-col gap-4 w-1/2`}>
        <h1 className={`${unica.className} text-4xl`}>{libro.titulo}</h1>
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3">
          Autor: {libro.autor}
        </p>
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3">
          Editorial: {libro.editorial}
        </p>
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3">
          Género: {libro.genero}
        </p>
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3">
          Año de publicación: {libro.año_publicacion}
        </p>
        <div className="flex justify-between my-5">
          <p className="text-orange text-3xl">${libro.precio}</p>
          <div className="flex items-center gap-2">
            <div className="text-xs border border-dark-gray rounded-full p-1 cursor-not-allowed">
              <FaMinus />
            </div>
            <div className="border border-dark-gray rounded-lg py-1 px-4">
              01
            </div>
            <div className="text-xs border border-dark-gray rounded-full p-1 cursor-not-allowed">
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <button className="bg-yellow w-1/2 flex justify-center items-center py-1 rounded-full border-2 border-dark-gray hover:scale-105 transition-all cursor-not-allowed">
            <PiShoppingCartSimple />
          </button>
          <button
            onClick={handleAlquilar}
            className="bg-orange w-1/2 flex justify-center items-center py-1 rounded-full border-2 border-dark-gray hover:scale-105 transition-all"
          >
            Alquilar
          </button>
        </div>
        {showModal && (
          <div className="flex flex-col gap-2 my-5">
            <h2 className="text-lg font-semibold">
              Selecciona la duración del alquiler
            </h2>
            <select
              value={duracion}
              onChange={(e) => setDuracion(parseInt(e.target.value))}
              className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3 mb-2"
            >
              <option value={7}>1 semana</option>
              <option value={14}>2 semanas</option>
              <option value={30}>1 mes</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => confirmarAlquiler(libro.id_libro)}
                className="bg-blue text-white border-2 border-dark-gray px-4 py-2 rounded-full"
              >
                Confirmar Alquiler
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white border-2 border-dark-gray px-4 py-2 rounded-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibroDetailCard;
