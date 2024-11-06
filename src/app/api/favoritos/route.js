import { NextResponse } from "next/server";
import { getFavoritos } from "@/lib/favoritos/getFavoritos";
import { addFavorito } from "@/lib/favoritos/addFavorito";

export async function GET(req) {
  try {
    const favoritos = await getFavoritos(req);
    return NextResponse.json(favoritos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const newFavorito = await addFavorito(req);
    return NextResponse.json(
      { id: newFavorito, message: "Libro agregado a favoritos" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el POST:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
