import { addLibro } from "@/lib/libros/addLibro";
import {
  getLibros,
  getLibrosPorCategoria,
  getLibrosPorNombreAutor,
  getLibrosOrdenados,
} from "@/lib/libros/getLibros";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria");
  const search = searchParams.get("search");
  const criterio = searchParams.get("criterio");
  const orden = searchParams.get("orden");

  try {
    let libros;

    if (categoria) {
      libros = await getLibrosPorCategoria(categoria);
    } else if (search) {
      libros = await getLibrosPorNombreAutor(search);
    } else if (criterio && orden) {
      libros = await getLibrosOrdenados(criterio, orden);
    } else {
      libros = await getLibros();
    }

    return NextResponse.json(libros);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const libroData = await req.json();
    const newLibroId = await addLibro(libroData);
    return NextResponse.json({ id: newLibroId }, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error agregando libro" }), {
      status: 500,
    });
  }
}
