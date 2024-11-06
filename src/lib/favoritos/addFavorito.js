import { createConnection } from "../db";
import { verifyToken } from "../verifyToken";

export const addFavorito = async (req) => {
  const { id_libro } = await req.json();
  const decoded = verifyToken(req);
  if (!decoded.id) {
    throw new Error("Usuario no autenticado");
  }
  const db = await createConnection();
  const sql = "CALL addFavorito(?, ?)";
  const [result] = await db.query(sql, [decoded.id, id_libro]);
  return result.insertId;
};
