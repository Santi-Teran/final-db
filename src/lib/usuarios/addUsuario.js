import bcrypt from "bcryptjs";
import { createConnection } from "../db";

export const addUsuario = async (userData) => {
  const db = await createConnection();
  const { nombre, apellido, email, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "CALL registrarUsuario(?, ?, ?, ?)";
  const [result] = await db.query(sql, [
    nombre,
    apellido,
    email,
    hashedPassword,
  ]);
  return result.insertId;
};
