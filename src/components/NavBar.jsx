"use client";
import { useState } from "react";
import { unica } from "@/font/getFont";
import { IoBookOutline } from "react-icons/io5";
import {
  PiBookmarkSimple,
  PiBookOpenText,
  PiShoppingCartSimple,
} from "react-icons/pi";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    router.push("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };
  return (
    <nav className="flex justify-between px-20 py-5">
      <Link href="/" className="flex items-center gap-2 text-dark-gray">
        <IoBookOutline className="mt-1 text-4xl" />
        <h1 className={`${unica.className} text-2xl`}>BookStore</h1>
      </Link>
      <div className="flex items-center gap-4 text-2xl">
        <Link href="/prestamos">
          <PiBookOpenText />
        </Link>
        <Link href="/favoritos">
          <PiBookmarkSimple />
        </Link>
        <Link href="/carrito" className="cursor-not-allowed">
          <PiShoppingCartSimple />
        </Link>
        <IoIosLogOut className="cursor-pointer" onClick={handleLogoutClick} />
        {/* <ThemeToggle /> */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">
                ¿Estás seguro de que deseas cerrar sesión?
              </h2>
              <div className="flex justify-end text-base gap-4">
                <button
                  onClick={confirmLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sí, cerrar sesión
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
