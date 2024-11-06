import { createConnection } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mi-secreto-super-seguro";

export const authenticateUser = async (email, password) => {
  const db = await createConnection();
  const sql = "CALL getUsuarioByEmail(?)";
  const [usuarios] = await db.query(sql, [email]);

  if (usuarios.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const usuario = usuarios[0][0];

  if (!usuario.password) {
    throw new Error("La contraseña no está definida en el usuario");
  }

  const isMatch = await bcrypt.compare(password, usuario.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Genera el token JWT
  const token = jwt.sign(
    { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { token, usuario };
};
