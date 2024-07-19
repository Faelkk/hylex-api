import categoryRepository from "../../shared/database/repositories/categoryRepository";
import productRepository from "../../shared/database/repositories/productRepository";
import { CustomError } from "../../shared/helpers/customError";
import { CreateProduct, UpdateProduct } from "../../shared/types/product";

export const productService = {
  async listProducts() {
    const product = await productRepository.getAllProducts();

    if (!product) {
      throw new CustomError("Erro ao listar produtos", 500);
    }

    return product;
  },

  async getProductById({ id }: { id: number }) {
    const product = await productRepository.getProductById({ id });

    if (!product) {
      throw new CustomError("Produto não encontrado para esse id", 404);
    }

    return product;
  },

  async getProductByCategory({ id }: { id: number }) {
    const product = await productRepository.getProductByCategory({ id });

    if (!product) {
      throw new CustomError("Produto não encontrado para esse id", 404);
    }

    return product;
  },
  async findProductByName({ name }: { name: string }) {
    const product = await productRepository.findProductByName({ name });

    if (!product) {
      throw new CustomError("Produto não encontrado para esse nome", 404);
    }

    return product;
  },

  async create({
    categoryId,
    content,
    description,
    images,
    imagesByColor,
    name,
    price,
    ratingQuantity,
    ratingRate,
    specifications,
    technicalDetails,
    warranty,
    weight,
    categoryFiltersOption,
  }: CreateProduct) {
    const categoryExists = await categoryRepository.getCategoryById({
      id: categoryId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma categoria encontrada para esse id", 409);
    }

    const product = await productRepository.createProduct({
      categoryId,
      content,
      description,
      images,
      imagesByColor,
      name,
      price,
      ratingQuantity,
      ratingRate,
      specifications,
      technicalDetails,
      warranty,
      weight,
      categoryFiltersOption,
    });

    if (!product) {
      throw new CustomError("Erro ao criar produto", 500);
    }

    return product;
  },
  async update({
    id,
    categoryId,
    content,
    description,
    images,
    imagesByColor,
    name,
    price,
    ratingQuantity,
    ratingRate,
    specifications,
    technicalDetails,
    warranty,
    weight,
    categoryFiltersOption,
  }: UpdateProduct) {
    const productExists = await productRepository.getProductById({
      id,
    });

    if (!productExists) {
      throw new CustomError("Nenhum produto encontrado para esse id", 409);
    }

    const categoryExists = await categoryRepository.getCategoryById({
      id: categoryId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma categoria encontrada para esse id", 409);
    }

    const product = await productRepository.updateProduct({
      id,
      categoryId,
      content,
      description,
      images,
      imagesByColor,
      name,
      price,
      ratingQuantity,
      ratingRate,
      specifications,
      technicalDetails,
      warranty,
      weight,
      categoryFiltersOption,
    });

    if (!product) {
      throw new CustomError("Erro ao criar produto", 500);
    }

    return product;
  },
  async deleteProductById({ id }: { id: number }) {
    const productExists = await productRepository.getProductById({ id });

    if (!productExists) {
      throw new CustomError("Produto não encontrado para esse id", 404);
    }

    const product = await productRepository.deleteProduct({ id });

    if (!product) {
      throw new CustomError("Erro ao deletar produto", 500);
    }

    return product;
  },
};
