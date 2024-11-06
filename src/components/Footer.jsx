import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-40 backdrop-blur-lg px-6 fixed bottom-0 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-2">&copy;</span>
          <p className="text-sm">2024 Santiago Teran. Hecho con ⚡</p>
        </div>
        <ul className="flex gap-4">
          <li>
            <a href="https://github.com/Santi-Teran" target="_BLANK">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/santi-teran/" target="_BLANK">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/santii.teran/" target="_BLANK">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
