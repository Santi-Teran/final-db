import { createConnection } from "../db";

export const getCategorias = async () => {
  const db = await createConnection();
  const sql = "CALL getCategorias()";
  const [categorias] = await db.query(sql);
  return categorias;
};
