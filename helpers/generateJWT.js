import jwt from "jsonwebtoken";

// Token de 30 días para el rememberMe activado
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Token de 1 día para el rememberMe desacitvado
export const generateJWTShort = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export default generateJWT;
