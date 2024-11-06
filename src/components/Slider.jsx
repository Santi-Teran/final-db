"use client";
import { useEffect, useState } from "react";
import LibroCard from "./LibroCard";

const Slider = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/libros");
        const response = await data.json();
        setLibros(response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-4 py-10 overflow-auto">
        {libros.map((libro) => (
          <LibroCard key={libro.id_libro} libro={libro} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
