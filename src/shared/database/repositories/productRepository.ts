import prisma from "../../config/db";
import { CreateProduct, UpdateProduct } from "../../types/product";

const productRepository = {
  async createProduct({
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
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        ratingRate,
        ratingQuantity,
        description,
        content,
        warranty,
        weight,
        category: { connect: { id: categoryId } },
        imagesByColor: {
          create: imagesByColor.map((image) => ({
            color: image.color,
            url: image.url,
          })),
        },
        images: {
          create: images.map((image) => ({
            color: image.color,
            urls: image.urls,
          })),
        },
        technicalDetails: {
          create: technicalDetails.map((detail) => ({
            key: detail.key,
            value: detail.value,
          })),
        },
        specifications: {
          create: specifications.map((spec) => ({
            key: spec.key,
            value: spec.value,
          })),
        },
        categoryFiltersOption: {
          create: categoryFiltersOption.map((filter) => ({
            key: filter.key,
            value: filter.value,
          })),
        },
      },
    });
    return newProduct;
  },

  async getProductById({ id }: { id: number }) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        imagesByColor: true,
        images: true,
        technicalDetails: true,
        specifications: true,
        category: true,
        categoryFiltersOption: true,
      },
    });
    return product;
  },

  async getProductByCategory({ id }: { id: number }) {
    const product = await prisma.product.findMany({
      where: { categoryId: id },
      include: {
        imagesByColor: true,
        images: true,
        technicalDetails: true,
        specifications: true,
        category: true,
        categoryFiltersOption: true,
      },
    });

    return product;
  },

  async findProductByName({ name }: { name: string }) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        imagesByColor: true,
        images: true,
        technicalDetails: true,
        specifications: true,
        category: true,
        categoryFiltersOption: true,
      },
    });

    return products;
  },

  async getAllProducts() {
    const products = await prisma.product.findMany({
      include: {
        imagesByColor: true,
        images: true,
        technicalDetails: true,
        specifications: true,
        category: true,
        categoryFiltersOption: true,
      },
    });
    return products;
  },

  async updateProduct({
    id,
    name,
    price,
    ratingRate,
    ratingQuantity,
    description,
    content,
    warranty,
    weight,
    categoryId,
    imagesByColor,
    images,
    technicalDetails,
    specifications,
    categoryFiltersOption,
  }: UpdateProduct) {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        ratingRate,
        ratingQuantity,
        description,
        content,
        warranty,
        weight,
        category: { connect: { id: categoryId } },
        imagesByColor: {
          deleteMany: {},
          create: imagesByColor.map((image) => ({
            color: image.color,
            url: image.url,
          })),
        },
        images: {
          deleteMany: {},
          create: images.map((image) => ({
            color: image.color,
            urls: image.urls,
          })),
        },
        technicalDetails: {
          deleteMany: {},
          create: technicalDetails.map((detail) => ({
            key: detail.key,
            value: detail.value,
          })),
        },
        specifications: {
          deleteMany: {},
          create: specifications.map((spec) => ({
            key: spec.key,
            value: spec.value,
          })),
        },
        categoryFiltersOption: {
          deleteMany: {},
          create: categoryFiltersOption.map((filter) => ({
            key: filter.key,
            value: filter.value,
          })),
        },
      },
    });
    return updatedProduct;
  },

  async deleteProduct({ id }: { id: number }) {
    await prisma.productImageByColor.deleteMany({
      where: { productId: id },
    });

    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return deletedProduct;
  },
};

export default productRepository;
