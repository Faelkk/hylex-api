import { Request } from "express";
import { CustomError } from "./customError";
import userRepository from "../database/repositories/userRepository";

interface CustomRequest extends Request {
  userId?: string;
}

export async function activeUserId(req: CustomRequest) {
  const userId = req.userId;

  if (!userId) {
    throw new CustomError("Acesso não autorizado", 403);
  }

  const userExists = userRepository.getUserInfo({ userId });

  if (!userExists) {
    throw new CustomError("Usario não encontrado", 404);
  }

  return { userId };
}
