"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaUsers } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { unica } from "@/font/getFont";

const NavLink = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-amber-500 font-bold flex gap-2 items-center text-lg pl-10 py-4 hover:bg-amber-200 transition-all"
          : "flex gap-2 items-center text-lg pl-10 py-4 hover:bg-amber-200 transition-all text-gray-500"
      }
    >
      <Icon className="text-2xl" />
      {label}
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
      <div className="w-1/6 bg-white border-r h-screen flex flex-col">
        <Link
          href="/"
          className="flex items-center gap-2 text-dark-gray justify-center my-4"
        >
          <IoBookOutline className="mt-1 text-4xl" />
          <h1 className={`${unica.className} text-2xl`}>BookStore</h1>
        </Link>
        <ul className="flex flex-col">
          <NavLink
            href="/dashboard"
            icon={FaHouse}
            label="Dashboard"
            isActive={isActive("/dashboard")}
          />
          <NavLink
            href="/dashboard/libros"
            icon={FaBook}
            label="Libros"
            isActive={isActive("/dashboard/libros")}
          />
          <NavLink
            href="/dashboard/usuarios"
            icon={FaUsers}
            label="Usuarios"
            isActive={isActive("/dashboard/usuarios")}
          />
          <NavLink
            href="/dashboard/prestamos"
            icon={FiBookOpen}
            label="Prestamos"
            isActive={isActive("/dashboard/prestamos")}
          />
        </ul>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-blue z-10">
        <ul className="flex justify-around">
          <Link href={"/dashboard"} className="p-4 text-xl ">
            <FaHouse />
          </Link>
          <Link href={"/dashboard/libros"} className="p-4 text-xl ">
            <FaBook />
          </Link>
          <Link href={"/dashboard/usuarios"} className="p-4 text-xl ">
            <FaUsers />
          </Link>
          <Link href={"/dashboard/prestamos"} className="p-4 text-xl ">
            <FiBookOpen />
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
