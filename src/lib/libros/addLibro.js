import { createConnection } from "../db";

export const addLibro = async (libroData) => {
  const db = await createConnection();
  const { titulo, autor, editorial, año_publicacion, genero, precio, stock } =
    libroData;
  const query = "CALL agregarLibro(?, ?, ?, ?, ?, ?, ?)";
  const [result] = await db.query(query, [
    titulo,
    autor,
    editorial,
    año_publicacion,
    genero,
    precio,
    stock,
  ]);

  return result.insertId;
};
