const express = require("express");
const productsRouter = express.Router();
const ProductModel = require("../models/product.model");

productsRouter.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.json({ message: "Request resolved", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
  }
});
productsRouter.get("/:id/:color", async (req, res) => {
  const { id,color } = req.params;
  try {
    const data = await ProductModel.findOne({_id:id});
    if (data) return res.json({ message: "Request resolved", data:{image:data.images[color][1],title:data.title} });
    else return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
  }
});

module.exports = productsRouter;
