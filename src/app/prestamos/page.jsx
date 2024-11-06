"use client";
import Footer from "@/components/Footer";
import LibroPrestamoCard from "@/components/LibroPrestamoCard";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Prestamos = () => {
  const [libros, setLibros] = useState([]);
  const usuario = JSON.parse(localStorage?.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage?.getItem("token");
        const data = await fetch("/api/prestamo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await data.json();
        setLibros(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!usuario)
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center">
          <p className="text-4xl font-bold my-20 text-dark-gray">
            Tienes que{" "}
            <Link
              href="/login"
              className="underline hover:text-black transition-colors"
            >
              iniciar sesion
            </Link>{" "}
            para usar esta funcionalidad!
          </p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <NavBar />
      <div className="flex flex-col my-8 gap-8 mx-20">
        <h2>Hola {usuario.nombre}! Estos es tu historial de libros</h2>
        <div className="grid grid-cols-3 mx-auto gap-8">
          {libros.length > 0 ? (
            libros.map((libro) => (
              <LibroPrestamoCard key={libro.id_libro} libro={libro} />
            ))
          ) : (
            <div>0</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prestamos;
