import { createConnection } from "../db";
import { verifyToken } from "../verifyToken";

export const getFavoritos = async (req) => {
  const decoded = verifyToken(req);
  const db = await createConnection();
  const sql = "CALL getFavoritos(?)";
  const [favoritos] = await db.query(sql, [decoded.id]);
  return favoritos[0];
};
