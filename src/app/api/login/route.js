import { authenticateUser } from "@/lib/usuarios/login";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { token, usuario } = await authenticateUser(email, password);
    return NextResponse.json({ token, usuario });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
