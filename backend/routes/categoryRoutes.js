import express from "express";
import { isAdmin, requireLogin } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireLogin,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireLogin,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", categoryControlller);

router.get("/single-category/:id", singleCategoryController);

router.delete(
  "/delete-category/:id",
  requireLogin,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;