import { createConnection } from "../db";

export const getUsuarios = async () => {
  const db = await createConnection();
  const sql = "CALL getUsuarios()";
  const [usuarios] = await db.query(sql);
  return usuarios;
};
