import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import NavBar from "@/components/NavBar";
import Slider from "@/components/Slider";
import { syne, unica } from "@/font/getFont";
import { BsStars } from "react-icons/bs";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col my-10 gap-y-20 mx-40">
        <Landing />
        <div className="flex flex-col gap-5">
          <h2 className={`${unica.className} text-center text-3xl`}>
            Libros en Tendencia
          </h2>
          <h3
            className={`${syne.className} flex justify-center items-center gap-2 text-light-gray`}
          >
            <BsStars />
            Arrastra para explorar
          </h3>
          <div className="border border-dashed border-dark-gray rounded-xl px-20">
            <Slider />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
