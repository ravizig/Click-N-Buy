import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import multer from 'multer';

dotenv.config();


export const createProductControllerNew = async (req, res) => {
  try {

    const { name, description, price, quantity, category } = req.body;


    const upload = multer().single('photo')

      upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log("Multer Error while uploading " + error);

        } else if (error) {
          // An unknown error occurred when uploading.
          console.log("Error In uploading" + error);
        }
        
        // Everything went fine.
        console.log(req.file.filename);
      })
      const photo = req.file.filename

    console.log(photo);

    if (!name) {
      return res.status(500).send({ error: "Name is Required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is Required" });
    }
    if (!price) {
      return res.status(500).send({ error: "Price is Required" });
    }
    if (!category) {
      return res.status(500).send({ error: "Category is Required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "Quantity is Required" });
    }
    if (!photo) {
      return res.status(400).json({ error: "Photo file is required" });
    }

    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      category: slugify(category),
      photo
    });

    await product.save();


    console.log("Photo is " + JSON.stringify(photo));

    res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating product", error });
  }
};


export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "ALlProducts ",
      products: products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");

    console.log(product);
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {

  try {
    const product = await productModel.findById(req.params.pid).select("photo")

    if (product.photo.photo) {
      res.status(200).send(product.photo.photo)
    }
    // if (product.photo.data) {
    //   res.set("Content-type", product.photo.contentType);
    //   return res.status(200).send(product.photo.data);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })

    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//token
// export const braintreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //payment
// export const brainTreePaymentController = async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = 0;
//     cart.map((i) => {
//       total += i.price;
//     });
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const order = new orderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };