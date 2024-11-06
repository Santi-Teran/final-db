import {
  getLibros,
  getUsuarios,
  getFavoritos,
  getPrestamosActivos,
  getPrestamosDisponibles,
  getUltimosPrestamos,
  getNuevosUsuarios,
  getMasAlquilados,
  getDistribucionCategorias,
  getPrestamosPorMes,
  getBajoStock,
} from "@/lib/dashboard/getMetricas";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      totalLibros,
      totalUsuarios,
      totalFavoritos,
      prestamosActivos,
      prestamosDisponibles,
      ultimosPrestamos,
      nuevosUsuarios,
      masAlquilados,
      distribucionCategorias,
      prestamosPorMes,
      bajoStock,
    ] = await Promise.all([
      getLibros(),
      getUsuarios(),
      getFavoritos(),
      getPrestamosActivos(),
      getPrestamosDisponibles(),
      getUltimosPrestamos(),
      getNuevosUsuarios(),
      getMasAlquilados(),
      getDistribucionCategorias(),
      getPrestamosPorMes(),
      getBajoStock(),
    ]);

    return NextResponse.json({
      totalLibros,
      totalUsuarios,
      totalFavoritos,
      prestamosActivos,
      prestamosDisponibles,
      ultimosPrestamos,
      nuevosUsuarios,
      masAlquilados,
      distribucionCategorias,
      prestamosPorMes,
      bajoStock,
    });
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
