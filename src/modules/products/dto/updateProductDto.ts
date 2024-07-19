import { CustomError } from "../../../shared/helpers/customError";
import { Specification, UpdateProduct } from "../../../shared/types/product";

interface OmitIdFromUpdateProduct extends Omit<UpdateProduct, "id"> {
  id: string;
}

interface updateOneProductDto {
  data: OmitIdFromUpdateProduct;
}

export function updateProductDto({ data }: updateOneProductDto) {
  const {
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
  } = data;

  if (
    !id ||
    !categoryId ||
    !description ||
    !images ||
    !imagesByColor ||
    !name ||
    !price ||
    !ratingQuantity ||
    !ratingRate ||
    !warranty ||
    !weight
  ) {
    throw new CustomError("All fields are required", 400);
  }

  if (content.length === 0) {
    throw new CustomError("Content is required", 400);
  }

  if (images.length === 0) {
    throw new CustomError("Images are required", 400);
  }

  if (imagesByColor.length === 0) {
    throw new CustomError("Images by color are required", 400);
  }

  images.forEach((image, index) => {
    if (!image.color || !image.urls || image.urls.length === 0) {
      throw new CustomError(`Invalid image data at index ${index}`, 400);
    }
  });

  imagesByColor.forEach((image, index) => {
    if (!image.color || !image.url) {
      throw new CustomError(
        `Invalid image by color data at index ${index}`,
        400
      );
    }
  });

  if (specifications) {
    specifications.forEach((filter: Specification, index: number) => {
      if (!filter.key || !filter.value) {
        throw new CustomError(`Invalid specification at index ${index}`, 400);
      }
    });
  }

  if (technicalDetails) {
    technicalDetails.forEach((detail, index) => {
      if (!detail.key || !detail.value) {
        throw new CustomError(
          `Invalid technical detail at index ${index}`,
          400
        );
      }
    });
  }

  if (categoryFiltersOption) {
    categoryFiltersOption.forEach((filter: Specification, index: number) => {
      if (!filter.key || !filter.value) {
        throw new CustomError(
          `Invalid category filter option at index ${index}`,
          400
        );
      }
    });
  }

  const newId = Number(id);

  return {
    id: newId,
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
  };
}
