"use client";
import Footer from "@/components/Footer";
import LibroCard from "@/components/LibroCard";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import Select from "@/components/Select";
import { syne, unica } from "@/font/getFont";
import { useEffect, useState } from "react";

const Catalogo = () => {
  const [libros, setLibros] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [orden, setOrden] = useState("");
  const [categoriaOptions, setCategoriaOptions] = useState([
    { value: "", label: "Categorias" },
  ]);

  const fetchLibros = async () => {
    const query = new URLSearchParams();
    if (categoria) query.append("categoria", categoria);
    if (searchTerm) query.append("search", searchTerm);
    if (orden) {
      const [criterio, order] = orden.split("_");
      query.append("criterio", criterio);
      query.append("orden", order.toUpperCase());
    }
    const data = await fetch(`/api/libros?${query.toString()}`);
    const response = await data.json();
    setLibros(response[0]);
  };

  const fetchCategorias = async () => {
    try {
      const data = await fetch("/api/categorias");
      const response = await data.json();
      const categoriasUnicas = [
        ...new Set(response[0].map((cat) => cat.genero)),
      ];
      const categoriasMapeadas = categoriasUnicas.map((genero) => ({
        value: genero,
        label: genero,
      }));
      setCategoriaOptions([
        { value: "", label: "Categorias" },
        ...categoriasMapeadas,
      ]);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, [categoria, searchTerm, orden]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const ordenacionOptions = [
    { value: "", label: "Filtrar por" },
    { value: "precio_asc", label: "Ordenar por precio ascendente" },
    { value: "precio_desc", label: "Ordenar por precio descendente" },
    { value: "nombre_asc", label: "Ordenar por nombre (A-Z)" },
    { value: "nombre_desc", label: "Ordenar por nombre (Z-A)" },
  ];

  return (
    <>
      <NavBar />
      <div className={`${syne.className} flex flex-col gap-10 mx-20`}>
        <div className="flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex justify-between">
          <p className={`${unica.className}`}>
            Resultados &quot;<span className="text-blue">{searchTerm}</span>
            &quot;
          </p>
          <div className="flex gap-5">
            <Select
              options={categoriaOptions}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />

            <Select
              options={ordenacionOptions}
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 mx-auto gap-10 p-10">
          {libros.map((libro) => (
            <LibroCard key={libro.id_libro} libro={libro} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalogo;
