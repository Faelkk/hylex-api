import { CustomError } from "../../../shared/helpers/customError";

interface getOneCategoryDto {
  id: string;
}

export function getOneCategoryDto({ id }: getOneCategoryDto) {
  if (!id) {
    throw new CustomError("categoryId is required", 400);
  }
  const newId = Number(id);

  return { newId };
}
