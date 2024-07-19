import { CustomError } from "../../../shared/helpers/customError";
import { CreateCategory, CategoryFilter } from "../../../shared/types/category";

interface createCategoryDto {
  data: CreateCategory;
}

export function createCategoryDto({ data }: createCategoryDto) {
  const { filters, name } = data;

  if (!name) {
    throw new CustomError("Name é obrigatório", 400);
  }

  if (filters && !Array.isArray(filters)) {
    throw new CustomError("Filters deve ser um array", 400);
  }

  if (filters) {
    filters.forEach((filter: CategoryFilter, index: number) => {
      if (!filter.key || !filter.value) {
        throw new CustomError(`Invalido filtro no index ${index}`, 400);
      }
    });
  }

  return { name, filters };
}
