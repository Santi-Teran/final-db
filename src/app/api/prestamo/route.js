import { NextResponse } from "next/server";
import { postPrestamo } from "@/lib/prestamo/postPrestamo";
import { getPrestamos } from "@/lib/prestamo/getPrestamos";

export async function GET(req) {
  try {
    const prestamos = await getPrestamos(req);
    return NextResponse.json(prestamos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const { id_usuario, id_libro, duracionDias } = await req.json();
    const { result, message } = await postPrestamo(
      id_usuario,
      id_libro,
      duracionDias
    );
    return NextResponse.json({ result, message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
