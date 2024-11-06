import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const useCheckAuthentication = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [id_usuario, setIdUsuario] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      setIsAuthenticated(false);
      setIsLoading(false); // Finaliza la carga si no hay token o usuario
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setIsLoading(false); // Finaliza la carga si el token expiró
        return;
      }

      // Si el token es válido
      setIsAuthenticated(true);
      setIdUsuario(user.id_usuario);
      setUserRole(user.rol);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setIsLoading(false); // Finaliza la carga si hay un error
    }
  }, [router]);

  return { isAuthenticated, id_usuario, userRole, isLoading };
};

export default useCheckAuthentication;
