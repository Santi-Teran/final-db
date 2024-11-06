"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCheckAuthentication from "@/lib/auth";

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, userRole, isLoading } = useCheckAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userRole !== "administrador")) {
      router.push("/login");
    }
  }, [isAuthenticated, userRole, isLoading, router]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!isAuthenticated || userRole !== "administrador") {
    return <p>Redirigiendo...</p>;
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
