import { getCategorias } from "@/lib/libros/getCategorias";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categorias = await getCategorias();
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
