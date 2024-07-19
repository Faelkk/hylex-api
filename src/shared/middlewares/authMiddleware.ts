import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

const publicRoutes = ["/signin", "/signup"];

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (publicRoutes.includes(req.url)) {
    return next();
  }

  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  jwt.verify(token, config.jwtSecret!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token verification failed" });
    }

    (req as any).userId = (decoded as { userId: string }).userId;
    next();
  });
}

function getTokenFromRequest(req: Request) {
  const authHeader = req.headers.authorization;
  return authHeader ? authHeader.split(" ")[1] : null;
}
