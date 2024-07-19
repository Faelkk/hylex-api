import { CustomError } from "../../../shared/helpers/customError";

interface getOneProductDto {
  id: string;
}

export function getOneProductDto({ id }: getOneProductDto) {
  if (!id) {
    throw new CustomError("id is required", 400);
  }

  const newId = Number(id);

  return { id: newId };
}
