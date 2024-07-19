import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

export const userRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Acesso proibido" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
