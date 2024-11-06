"use client";
import Sidebar from "@/components/dashboard/SideBar";
import TopBar from "@/components/dashboard/TopBar";
import { Input } from "@/components/Input";
import { unica } from "@/font/getFont";
import { useState } from "react";

const Libros = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    año_publicacion: "",
    genero: "",
    precio: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/libros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Libro agregado correctamente");
        setFormData({
          titulo: "",
          autor: "",
          editorial: "",
          año_publicacion: "",
          genero: "",
          precio: "",
          stock: "",
        });
      } else {
        alert("Error al agregar el libro");
      }
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Hubo un error en el servidor");
    }
  };
  return (
    <div className={`flex text-dark-blue`}>
      <Sidebar />
      <div className="bg-grayy md:w-5/6 w-full">
        <TopBar />
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 m-8 p-8 rounded-lg shadow-2xl w-full max-w-md bg-cyan-300"
          >
            <h1
              className={`${unica.className} text-3xl md:text-4xl font-black`}
            >
              Agregar Libro
            </h1>
            <Input
              label="Titulo"
              type="text"
              name="titulo"
              placeholder=""
              icon=""
              value={formData.titulo}
              onChange={handleChange}
            />
            <Input
              label="Autor"
              type="text"
              name="autor"
              placeholder=""
              icon=""
              value={formData.autor}
              onChange={handleChange}
            />
            <Input
              label="Editorial"
              type="text"
              name="editorial"
              placeholder=""
              icon=""
              value={formData.editorial}
              onChange={handleChange}
            />
            <Input
              label="Año de Publicación"
              type="number"
              name="año_publicacion"
              placeholder=""
              icon=""
              value={formData.año_publicacion}
              onChange={handleChange}
            />
            <Input
              label="Género"
              type="text"
              name="genero"
              placeholder=""
              icon=""
              value={formData.genero}
              onChange={handleChange}
            />
            <Input
              label="Precio"
              type="number"
              name="precio"
              placeholder=""
              icon=""
              value={formData.precio}
              onChange={handleChange}
            />
            <Input
              label="Cantidad en Stock"
              type="number"
              name="stock"
              placeholder=""
              icon=""
              value={formData.stock}
              onChange={handleChange}
            />
            <button type="submit" className="bg-orange py-2 rounded-md">
              Agregar Libro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Libros;
