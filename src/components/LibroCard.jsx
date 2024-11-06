"use client";
import { syne } from "@/font/getFont";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimple,
  PiTrash,
} from "react-icons/pi";
import useCheckAuthentication from "@/lib/auth";

const LibroCard = ({ libro }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated, id_usuario } = useCheckAuthentication();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchFavoritos = async () => {
    try {
      const res = await fetch(`/api/favoritos?id_usuario=${id_usuario}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const favoritos = await res.json();
        const libroEnFavoritos = favoritos.some(
          (favorito) => favorito.id_libro === libro.id_libro
        );
        setIsFavorite(libroEnFavoritos);
      } else {
        console.error("Error obteniendo favoritos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && id_usuario && token) {
      fetchFavoritos();
    }
  }, [isAuthenticated, id_usuario, token]);

  const handleAddToFavorites = async (id_libro) => {
    if (!isAuthenticated) {
      localStorage.setItem("prevPage", window.location.pathname);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_libro, id_usuario }),
      });

      if (res.ok) {
        alert("Libro agregado a favoritos");
        setIsFavorite(true);
      } else {
        console.error("Error agregando libro a favoritos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromFavorites = async (id_libro) => {
    try {
      const res = await fetch(`/api/favoritos/${id_libro}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Libro eliminado de favoritos");
        setIsFavorite(false);
        window.location.reload();
      } else {
        console.error("Error al eliminar libro de favoritos");
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  return (
    <div className={`${syne.className} flex flex-col gap-4 relative`}>
      <Link
        href={`/detalle/${libro.id_libro}`}
        className="h-60 w-40 bg-slate-200 shadow-md rounded-lg justify-center items-center flex hover:scale-105 transition-all"
      >
        {isFavorite && (
          <div className="absolute -top-1 right-0 text-4xl text-orange">
            <PiBookmarkSimpleFill />
          </div>
        )}
        {libro.titulo}
      </Link>
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="w-3/4 flex justify-center items-center border border-dark-gray rounded-xl py-1 px-3">
          ${libro.precio}
        </div>
        {!isFavorite ? (
          <button
            onClick={() => handleAddToFavorites(libro.id_libro)}
            className="w-1/4 flex items-center justify-center border border-dark-gray rounded-xl py-1 px-3 text-2xl hover:bg-orange transition-all"
          >
            <PiBookmarkSimple />
          </button>
        ) : (
          <button
            onClick={() => handleRemoveFromFavorites(libro.id_libro)}
            className="w-1/4 flex items-center justify-center border border-dark-gray rounded-xl py-1 px-3 text-2xl hover:border-red-600 hover:text-red-600 transition-all"
          >
            <PiTrash />
          </button>
        )}
      </div>
      <Link
        href={`/detalle/${libro.id_libro}`}
        className="bg-orange py-1 text-center rounded-full border border-dark-gray hover:scale-105 transition-all"
      >
        Alquilar
      </Link>
    </div>
  );
};

export default LibroCard;
