"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { syne, unica } from "@/font/getFont";
import { MdMail, MdLock } from "react-icons/md";
import Link from "next/link";
import { Input } from "@/components/Input";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));

        const userRole = data.usuario.rol;
        const prevPage = localStorage.getItem("prevPage") || "/";

        if (userRole === "administrador") {
          router.push("/dashboard");
        } else {
          router.push(prevPage);
          localStorage.removeItem("prevPage");
        }
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
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
          Iniciar Sesión
        </h1>
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
          {"Iniciar Sesión"}
        </button>
        <p className={`${syne.className} text-center py-4`}>
          No tenes una cuenta?{" "}
          <Link href="/register" className="font-bold underline">
            Registrate!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
