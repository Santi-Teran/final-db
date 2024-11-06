import { createConnection } from "../db";
import { verifyToken } from "../verifyToken";

export const deleteFavorito = async (req, { params }) => {
  const id_libro = params.id;
  const decoded = verifyToken(req);
  if (!decoded.id) {
    throw new Error("Usuario no autenticado");
  }
  const db = await createConnection();
  const sql = "CALL deleteFavorito(?, ?)";
  const [result] = await db.query(sql, [decoded.id, id_libro]);
  return result;
};
