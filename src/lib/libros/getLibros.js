import { createConnection } from "../db";

export const getLibros = async () => {
  const db = await createConnection();
  const sql = "CALL getAllLibros()";
  const [libros] = await db.query(sql);
  return libros;
};

export const getLibro = async (id_libro) => {
  const db = await createConnection();
  const sql = "CALL getBookById(?)";
  const [libro] = await db.query(sql, [id_libro]);
  return libro;
};

export const getLibrosPorCategoria = async (categoria) => {
  const db = await createConnection();
  const sql = "CALL getLibrosPorCategoria(?)";
  const libros = await db.query(sql, [categoria]);
  return libros[0];
};

export const getLibrosPorNombreAutor = async (searchTerm) => {
  const db = await createConnection();
  const sql = "CALL getLibrosPorNombreAutor(?)";
  const libros = await db.query(sql, [searchTerm]);
  return libros[0];
};

export const getLibrosOrdenados = async (criterio, orden) => {
  const db = await createConnection();
  const sql = "CALL getLibrosOrdenados(?, ?)";
  const [libros] = await db.query(sql, [criterio, orden]);
  return libros;
};
