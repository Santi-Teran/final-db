"use client";
import SideBar from "@/components/dashboard/SideBar";
import TopBar from "@/components/dashboard/TopBar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [metricas, setMetricas] = useState(null);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const data = await fetch("/api/dashboard");
        if (data.ok) {
          const response = await data.json();
          setMetricas(response);
        }
      } catch (error) {
        console.error("Error fetching metricas:", error);
      }
    };

    fetchMetricas();
  }, []);

  if (!metricas) return <div>Cargando métricas...</div>;
  console.log(metricas);

  return (
    <div className="flex text-dark-blue min-h-screen">
      <SideBar />
      <div className="bg-grayy md:w-5/6 w-full">
        <TopBar />
        <div className="flex flex-col p-4 gap-4 bg-slate-50 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold">Resumen del Negocio</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total de Libros */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Total de Libros</h2>
              <p>{metricas.totalLibros.total_libros}</p>
            </div>

            {/* Total de Usuarios */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Total de Usuarios</h2>
              <p>{metricas.totalUsuarios.total_usuarios}</p>
            </div>

            {/* Total de Préstamos Activos */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Préstamos Activos</h2>
              <p>{metricas.prestamosActivos.prestamos_activos}</p>
            </div>
          </div>

          {/* Libros Más Alquilados */}
          <div>
            <h2 className="text-lg font-semibold">Libros Más Alquilados</h2>
            <ul>
              {metricas.masAlquilados.map((libro) => (
                <li key={libro.titulo}>
                  {libro.titulo} - {libro.cantidad} veces
                </li>
              ))}
            </ul>
          </div>

          {/* Últimos Préstamos */}
          <div>
            <h2 className="text-lg font-semibold">Últimos Préstamos</h2>
            <ul>
              {metricas.ultimosPrestamos.map((prestamo) => (
                <li key={prestamo.id_prestamo}>
                  {prestamo.titulo} - Alquilado por {prestamo.nombre}{" "}
                  {prestamo.apellido} el{" "}
                  {new Date(prestamo.fecha_alquiler).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Nuevos Usuarios */}
          <div>
            <h2 className="text-lg font-semibold">Nuevos Usuarios</h2>
            <ul>
              {metricas.nuevosUsuarios.map((usuario, index) => (
                <li key={index}>
                  {usuario.nombre} - Registrado el{" "}
                  {new Date(usuario.fecha_registro).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Libros en Bajo Stock */}
          <div>
            <h2 className="text-lg font-semibold">Libros en Bajo Stock</h2>
            <ul>
              {metricas.bajoStock.map((libro) => (
                <li key={libro.titulo}>
                  {libro.titulo} - Stock: {libro.stock}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
