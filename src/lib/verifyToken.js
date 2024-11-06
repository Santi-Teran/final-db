import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mi-secreto-super-seguro";

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token no encontrado, el usuario no está autenticado");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token no proporcionado");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};
