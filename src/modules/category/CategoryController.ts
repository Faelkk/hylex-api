import { handleError } from "../../shared/helpers/handleError";
import { Request, Response } from "express";
import { createCategoryDto } from "./dto/createCategoryDto";
import { CreateCategory, UpdateCategory } from "../../shared/types/category";
import { categoryService } from "./CategoryService";
import { updateCategoryDto } from "./dto/updateCategoryDto";
import { getOneCategoryDto } from "./dto/getOneCategoryDto";
import { deleteCategoryDto } from "./dto/deleteCategoryDto";

export const categoryController = {
  async listCategories(req: Request, res: Response) {
    try {
      const category = await categoryService.listCategories();

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const categoryDto = getOneCategoryDto({ id });
    try {
      const { newId } = categoryDto;
      const category = await categoryService.getCategorById({ id: newId });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },

  async createCategory(req: Request, res: Response) {
    const data = req.body as CreateCategory;

    const categoryDto = createCategoryDto({ data });

    try {
      const { name, filters } = categoryDto;

      const category = await categoryService.create({ name, filters });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async updateCategory(req: Request, res: Response) {
    const data = req.body as UpdateCategory;
    const { id } = req.params as { id: string };
    const newData = { ...data, id };
    const categoryDto = updateCategoryDto({ data: newData });

    try {
      const { name, filters, id } = categoryDto;

      const category = await categoryService.update({
        name,
        filters,
        id,
      });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async deleteCategoryById(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const categoryDto = deleteCategoryDto({ id });
    try {
      const { newId } = categoryDto;
      const category = await categoryService.deleteCategoryById({ id: newId });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
