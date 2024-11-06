import { NextResponse } from "next/server";
import { addUsuario } from "@/lib/usuarios/addUsuario";
import { getUsuarios } from "@/lib/usuarios/getUsuarios";

export async function GET() {
  try {
    const usuarios = await getUsuarios();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userData = await req.json();
    const newUserId = await addUsuario(userData);
    return NextResponse.json({ id: newUserId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
