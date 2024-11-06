import { createConnection } from "../db";

export const getLibros = async () => {
  const db = await createConnection();
  const sql = "SELECT COUNT(*) AS total_libros FROM libros";
  const [result] = await db.query(sql);
  return result[0];
};

export const getPrestamosDisponibles = async () => {
  const db = await createConnection();
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM prestamos WHERE estado = 'en_prestamo') AS total_en_prestamo, 
      (SELECT SUM(stock) FROM libros) AS total_disponibles
  `;
  const [result] = await db.query(sql);
  return result[0];
};

export const getUsuarios = async () => {
  const db = await createConnection();
  const sql = "SELECT COUNT(*) AS total_usuarios FROM usuarios";
  const [result] = await db.query(sql);
  return result[0];
};

export const getPrestamosActivos = async () => {
  const db = await createConnection();
  const sql =
    "SELECT COUNT(*) AS prestamos_activos FROM prestamos WHERE estado = 'en_prestamo'";
  const [result] = await db.query(sql);
  return result[0];
};

export const getFavoritos = async () => {
  const db = await createConnection();
  const sql = "SELECT COUNT(*) AS total_favoritos FROM libros_favoritos";
  const [result] = await db.query(sql);
  return result[0];
};

export const getUltimosPrestamos = async () => {
  const db = await createConnection();
  const sql = `
    SELECT p.id_prestamo, p.fecha_alquiler, l.titulo, u.id_usuario, u.nombre, u.apellido
    FROM prestamos AS p
    JOIN libros AS l ON p.id_libro = l.id_libro
    JOIN usuarios AS u ON p.id_usuario = u.id_usuario
    ORDER BY p.fecha_alquiler DESC
    LIMIT 5;
  `;
  const [result] = await db.query(sql);
  return result;
};

export const getNuevosUsuarios = async () => {
  const db = await createConnection();
  const sql =
    "SELECT nombre, fecha_registro FROM usuarios ORDER BY fecha_registro DESC LIMIT 5";
  const [result] = await db.query(sql);
  return result;
};

export const getMasAlquilados = async () => {
  const db = await createConnection();
  const sql = `
    SELECT l.titulo, COUNT(p.id_prestamo) AS cantidad 
    FROM prestamos AS p 
    JOIN libros AS l ON p.id_libro = l.id_libro 
    GROUP BY l.id_libro 
    ORDER BY cantidad DESC 
    LIMIT 5;
  `;
  const [result] = await db.query(sql);
  return result;
};

export const getDistribucionCategorias = async () => {
  const db = await createConnection();
  const sql = `
    SELECT genero, COUNT(*) AS total 
    FROM libros 
    GROUP BY genero;
  `;
  const [result] = await db.query(sql);
  return result;
};

export const getPrestamosPorMes = async () => {
  const db = await createConnection();
  const sql = `
    SELECT MONTH(fecha_alquiler) AS mes, COUNT(*) AS cantidad 
    FROM prestamos 
    GROUP BY MONTH(fecha_alquiler);
  `;
  const [result] = await db.query(sql);
  return result;
};

export const getBajoStock = async () => {
  const db = await createConnection();
  const sql = "SELECT titulo, stock FROM libros WHERE stock < 5";
  const [result] = await db.query(sql);
  return result;
};
