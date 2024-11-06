import { syne } from "@/font/getFont";
import Link from "next/link";
import { PiBinoculars } from "react-icons/pi";

const Landing = () => {
  return (
    <div className="flex items-center justify-center gap-40">
      <div className="w-1/2 flex flex-col gap-5">
        <h2
          className={`${syne.className} text-6xl text-dark-gray font-semibold`}
        >
          Qué libro estás buscando?
        </h2>
        <h3 className={`${syne.className} text-xl text-light-gray`}>
          Explorá nuestro catálogo y encontrá tu próxima lecutra.
        </h3>
        <div className="flex items-center gap-5">
          <Link
            href="/catalogo"
            className="w-fit flex items-center gap-2 py-2 px-4 bg-yellow border-2 border-black rounded-lg hover:scale-110 transition-all"
          >
            Explorar
            <PiBinoculars className="text-2xl" />
          </Link>
          <div className="border-dashed border-t-2 w-full"></div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="pt-6 pl-6">
          <div className="h-96 shadow-2 rounded-bl-2xl rounded-tr-2xl border-2 border-dark-gray "></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
