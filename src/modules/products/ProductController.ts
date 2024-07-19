import { Request, Response } from "express";
import { productService } from "./ProductService";
import { handleError } from "../../shared/helpers/handleError";
import { CreateProduct, UpdateProduct } from "../../shared/types/product";
import { getOneProductDto } from "./dto/getOneProductDto";
import { createProductDto } from "./dto/createProductDto";
import { updateProductDto } from "./dto/updateProductDto";
import { deleteProductDto } from "./dto/deleteProductDto";
import { getOneProductByNameDto } from "./dto/getOneProductByNameDto";

export const productsController = {
  async listProducts(req: Request, res: Response) {
    try {
      const product = await productService.listProducts();

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async getProductById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const getProductByIdDto = getOneProductDto({ id });
    try {
      const { id } = getProductByIdDto;
      const product = await productService.getProductById({ id });

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },

  async getProductByCategory(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const getProductByIdDto = getOneProductDto({ id });
    try {
      const { id } = getProductByIdDto;
      const product = await productService.getProductByCategory({ id });

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },

  async getProductByName(req: Request, res: Response) {
    const { name } = req.params as { name: string };
    const getProductByName = getOneProductByNameDto({ name });
    try {
      const { name } = getProductByName;
      const product = await productService.findProductByName({ name });

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },

  async createProduct(req: Request, res: Response) {
    const data = req.body as CreateProduct;
    const productCreateDto = createProductDto({ data });

    try {
      const {
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
      } = productCreateDto;
      const product = await productService.create({
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

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = req.body as UpdateProduct;
    const newData = { ...data, id };
    const productUpdate = updateProductDto({ data: newData });

    try {
      const {
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
        id,
        categoryFiltersOption,
      } = productUpdate;
      const product = await productService.update({
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

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async deleteProductById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const deleteProductByIdDto = deleteProductDto({ id });
    try {
      const { id } = deleteProductByIdDto;
      const product = await productService.deleteProductById({ id });

      return res.status(200).send(product);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
