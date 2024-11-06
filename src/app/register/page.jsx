"use client";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { syne, unica } from "@/font/getFont";
import Link from "next/link";
import { useState } from "react";
import { MdLock, MdMail } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Usuario agregado correctamente");
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          password: "",
        });
        router.push("login");
      } else {
        alert("Error al agregar el usuario");
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("Hubo un error en el servidor");
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-20 p-8 rounded-lg shadow-2xl w-full max-w-md bg-blue"
      >
        <h1 className={`${unica.className} text-3xl md:text-4xl font-black`}>
          Registrarse
        </h1>
        <Input
          placeholder="Nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          placeholder="Apellido"
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<MdMail />}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={<MdLock />}
        />
        <button
          type="submit"
          className={`${unica.className} text-lg bg-white hover:scale-105 transition-all py-2 rounded-lg`}
        >
          {"Registrarse"}
        </button>
        <p className={`${syne.className} text-center py-4`}>
          Ya tenes una cuenta?{" "}
          <Link href="/login" className="font-bold underline">
            Inicia Sesion!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
