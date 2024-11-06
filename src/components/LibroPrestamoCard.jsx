import Link from "next/link";

const LibroPrestamoCard = ({ libro }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 border border-dashed border-dark-gray p-4 rounded-xl shadow-3">
      <Link
        href={`/detalle/${libro.id_libro}`}
        className="h-60 w-40 bg-slate-200 shadow-md rounded-lg justify-center items-center flex hover:scale-105 transition-all"
      >
        {libro.titulo}
      </Link>
      <div className="flex flex-col gap-2">
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3 text-sm">
          <strong>Fecha de Alquiler: </strong>
          {new Date(libro.fecha_alquiler).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="border border-dashed border-dark-gray py-2 px-4 rounded-xl shadow-3 text-sm">
          <strong>Fecha de Devolucion: </strong>
          {new Date(libro.fecha_devolucion).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default LibroPrestamoCard;
