import { CustomError } from "../../../shared/helpers/customError";

interface deleteategoryDto {
  id: string;
}

export function deleteCategoryDto({ id }: deleteategoryDto) {
  if (!id) {
    throw new CustomError("categoryId is required", 400);
  }
  const newId = Number(id);

  return { newId };
}
