import { CustomError } from "../../../shared/helpers/customError";
import { UpdateCategory, CategoryFilter } from "../../../shared/types/category";

interface OmitIdFromUpdateCategory extends Omit<UpdateCategory, "id"> {
  id: string;
}

interface updateCategoryDto {
  data: OmitIdFromUpdateCategory;
}

export function updateCategoryDto({ data }: updateCategoryDto) {
  const { filters, name, id } = data;

  if (!name || !id) {
    throw new CustomError("Todos os campos são obrigatórios", 400);
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

  const newId = Number(id);

  return { filters, name, id: newId };
}
