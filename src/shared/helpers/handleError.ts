import { Response } from "express";

interface CustomError extends Error {
  status?: number;
}

export function handleError(error: unknown, res: Response) {
  if (error instanceof Error) {
    const customError = error as CustomError;
    const statusCode = customError.status || 500;
    return res.status(statusCode).send({ error: customError.message });
  } else {
    return res.status(500).send({ error: "An unknown error occurred." });
  }
}
