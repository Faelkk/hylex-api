import prisma from "../../config/db";
import { CreateCategory, UpdateCategory } from "../../types/category";

const categoryRepository = {
  async createCategory({ name, filters }: CreateCategory) {
    const newCategory = await prisma.category.create({
      data: {
        name,
        filters: {
          createMany: {
            data: filters.map((filter) => ({
              key: filter.key,
              value: filter.value,
            })),
          },
        },
      },
    });
    return newCategory;
  },

  async getCategoryById({ id }: { id: number }) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        filters: true,
      },
    });
    return category;
  },

  async findCategoryByName({ name }: { name: string }) {
    const category = await prisma.category.findFirst({
      where: { name },
    });
    return category;
  },

  async getAllCategories() {
    const categories = await prisma.category.findMany({
      include: {
        filters: true,
      },
    });
    return categories;
  },

  async updateCategory({ id, filters, name }: UpdateCategory) {
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        name,
        filters: {
          createMany: {
            data: filters.map((filter) => ({
              key: filter.key,
              value: filter.value,
            })),
          },
        },
      },
    });
    return updatedCategory;
  },

  async deleteCategory({ id }: { id: number }) {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return deletedCategory;
  },
};

export default categoryRepository;
