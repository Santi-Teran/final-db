import { NextResponse } from "next/server";
import { deleteFavorito } from "@/lib/favoritos/deleteFavorito";

export async function DELETE(req, { params }) {
  try {
    const result = await deleteFavorito(req, { params });

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Libro no encontrado en favoritos" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Libro eliminado de favoritos" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el DELETE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
