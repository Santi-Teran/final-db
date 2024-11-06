import { createConnection } from "../db";

export const postPrestamo = async (id_usuario, id_libro, duracionDias) => {
  const db = await createConnection();
  const sql = "CALL AlquilarLibro(?, ?, ?)";
  const [result] = await db.query(sql, [id_usuario, id_libro, duracionDias]);
  const message = result[0][0].mensaje;
  return { result, message };
};
