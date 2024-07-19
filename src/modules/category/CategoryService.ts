import { CustomError } from "../../shared/helpers/customError";
import { CreateCategory, UpdateCategory } from "../../shared/types/category";
import categoryRepository from "../../shared/database/repositories/categoryRepository";

export const categoryService = {
  async listCategories() {
    const category = await categoryRepository.getAllCategories();

    if (!category) {
      throw new CustomError("Erro ao listar categorias", 500);
    }

    return category;
  },

  async getCategorById({ id }: { id: number }) {
    const category = await categoryRepository.getCategoryById({ id });

    if (!category) {
      throw new CustomError("Categoria não encontrada para esse id", 404);
    }

    return category;
  },

  async create({ filters, name }: CreateCategory) {
    const categoryExists = await categoryRepository.findCategoryByName({
      name,
    });

    if (categoryExists) {
      throw new CustomError(
        "Ja existe uma categoria cadastrada com esse nome",
        409
      );
    }

    const category = await categoryRepository.createCategory({ name, filters });

    if (!category) {
      throw new CustomError("Erro ao criar categoria", 500);
    }

    return category;
  },
  async update({ filters, name, id }: UpdateCategory) {
    const categoryExists = await categoryRepository.getCategoryById({
      id,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma categoria encontrada para esse id", 409);
    }

    const category = await categoryRepository.updateCategory({
      name,
      filters,
      id,
    });

    if (!category) {
      throw new CustomError("Erro ao criar categoria", 500);
    }

    return category;
  },
  async deleteCategoryById({ id }: { id: number }) {
    const categoryExists = await categoryRepository.getCategoryById({ id });

    if (!categoryExists) {
      throw new CustomError("Categoria não encontrada para esse id", 404);
    }

    const category = await categoryRepository.deleteCategory({ id });

    if (!category) {
      throw new CustomError("Erro ao deletar categoria", 500);
    }

    return category;
  },
};
