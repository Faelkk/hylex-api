import multer from "multer";
import path from "node:path";

import { Router } from "express";
import { userController } from "../modules/user/UserController";
import { categoryController } from "../modules/category/CategoryController";
import { userRoleMiddleware } from "../shared/middlewares/roleMiddleware";
import { productsController } from "../modules/products/ProductController";
import { authMiddleware } from "../shared/middlewares/authMiddleware";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}--${file.originalname}`);
    },
  }),
});

export const router = Router();

router.get("/me", authMiddleware, userController.getInfo);

router.post("/signin", userController.signin);

router.post("/signup", userController.create);

router.get("/categories", categoryController.listCategories);

router.post(
  "/categories",
  authMiddleware,
  userRoleMiddleware,
  categoryController.createCategory
);

router.patch(
  "/categories/:id",
  authMiddleware,
  userRoleMiddleware,
  categoryController.updateCategory
);

router.delete(
  "/categories/:id",
  authMiddleware,
  userRoleMiddleware,
  categoryController.deleteCategoryById
);

router.get("/products", productsController.listProducts);

router.get("/products/:id", productsController.getProductById);

router.get("/products/categories/:id", productsController.getProductByCategory);

router.get("/products/productName/:name", productsController.getProductByName);

const uploadFields = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "imagesByColor", maxCount: 10 },
]);

router.post(
  "/products",
  authMiddleware,
  userRoleMiddleware,
  uploadFields,
  productsController.createProduct
);
router.patch(
  "/products/:id",
  authMiddleware,
  userRoleMiddleware,
  uploadFields,
  productsController.updateProduct
);

router.delete(
  "/products/:id",
  authMiddleware,
  userRoleMiddleware,
  productsController.deleteProductById
);
