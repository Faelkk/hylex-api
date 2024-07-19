import { CustomError } from "../../../shared/helpers/customError";

interface getOneProductDto {
  name: string;
}

export function getOneProductByNameDto({ name }: getOneProductDto) {
  if (!name) {
    throw new CustomError("name is required", 400);
  }

  return { name };
}
