import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("no token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { name, userId } = payload;
    req.user = { name, userId };
    console.log("user created", req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized");
  }
};
