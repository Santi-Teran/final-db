import { getLibro } from "@/lib/libros/getLibros";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params; // Obtenemos el id del libro desde los parámetros de la URL

  try {
    const [libro] = await getLibro(id); // Obtenemos el libro por ID
    return NextResponse.json(libro[0]); // Devolvemos solo el primer resultado
  } catch (error) {
    console.error("Error al obtener libro por ID:", error);
    return new Response(JSON.stringify({ error: "Error obteniendo libro" }), {
      status: 500,
    });
  }
}
