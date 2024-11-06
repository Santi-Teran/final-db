"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LibroDetailCard from "@/components/LibroDetailCard";
import Slider from "@/components/Slider";
import { unica } from "@/font/getFont";
import { PiPath } from "react-icons/pi";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const LibroDetail = () => {
  const [libro, setLibro] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await fetch(`/api/libros/${id}`);
          const response = await data.json();
          setLibro(response);
        } catch (error) {
          console.error("Error al obtener detalles del libro:", error);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!libro.id_libro) return <div>Cargando...</div>;

  return (
    <>
      <NavBar />
      <div className="flex flex-col my-10 gap-y-20">
        <div className="w-1/2 mx-auto">
          <LibroDetailCard libro={libro} />
        </div>
        <div className="mx-40">
          <h2 className={`${unica.className} text-2xl flex items-center gap-2`}>
            <PiPath />
            Ver Mas
          </h2>
          <Slider />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibroDetail;
