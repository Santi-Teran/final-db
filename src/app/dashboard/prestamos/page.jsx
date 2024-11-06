"use client";
import Sidebar from "@/components/dashboard/SideBar";
import TopBar from "@/components/dashboard/TopBar";

const Prestamos = () => {
  return (
    <div className={`flex text-dark-blue`}>
      <Sidebar />
      <div className="bg-grayy md:w-5/6 w-full">
        <TopBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Resumen del Negocio</h1>
        </div>
      </div>
    </div>
  );
};

export default Prestamos;
