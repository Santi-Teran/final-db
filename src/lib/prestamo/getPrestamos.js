import { createConnection } from "../db";
import { verifyToken } from "../verifyToken";

export const getPrestamos = async (req) => {
  const decoded = verifyToken(req);
  const db = await createConnection();
  const sql = "CALL getPrestamos(?)";
  const [prestamos] = await db.query(sql, [decoded.id]);
  return prestamos[0];
};
