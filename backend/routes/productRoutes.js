import express from "express";
import {
  createProductControllerNew,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productPhotoController,
  searchProductController,
} from "../controllers/productController.js";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/ztlab111/Downloads/Click-N-Buy/frontend/public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/create-product',upload.single('photo'), requireLogin,
isAdmin, createProductControllerNew);


router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.get("/product-count", productCountController);

router.get("/search/:keyword", searchProductController);


export default router;