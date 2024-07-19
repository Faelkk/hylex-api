import { CustomError } from "../../../shared/helpers/customError";

interface deleteProductDto {
  id: string;
}

export function deleteProductDto({ id }: deleteProductDto) {
  if (!id) {
    throw new CustomError("id is required", 400);
  }

  const newId = Number(id);

  return { id: newId };
}
