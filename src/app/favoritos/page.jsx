"use client";
import Footer from "@/components/Footer";
import LibroCard from "@/components/LibroCard";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Favoritos = () => {
  const [libros, setLibros] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUsuario(storedUser);
    const fetchData = async () => {
      try {
        const token = localStorage?.getItem("token");
        if (!token) return;
        const data = await fetch("/api/favoritos", {
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
    if (storedUser) fetchData();
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
      <div className="flex flex-col my-10 gap-y-20 mx-40">
        <div className="flex gap-4 py-10">
          {libros.length > 0 ? (
            libros.map((libro) => (
              <LibroCard key={libro.id_libro} libro={libro} />
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

export default Favoritos;
