const express = require("express");
const cartRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyCart = require("../middlewares/verifyCart");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
cartRouter.post("/add", verifyToken, verifyCart, async (req, res) => {
  const { product_id, quantity, price, color, size } = req.body;

  if (!product_id || !price || !color) {
    res.status(400).json({ message: "Invalid request body" });
  } else {
    try {
      const isProductExist = await ProductModel.findById(product_id);

      if (!isProductExist) {
        res.status(404).json({ message: "Product not found" });
      } else {
        try {
          const existingCart = await CartModel.findOne({
            email: req.user.email,
          });
          const existingProductIndex = existingCart.items.findIndex(
            (item) =>
              item.product_id === product_id &&
              item.color === color &&
              item.size === size
          );
          if (existingProductIndex >= 0) {
            existingCart.items[existingProductIndex].quantity += quantity || 1;
          } else {
            existingCart.items.push({
              product_id,
              title: isProductExist.title,
              brand: isProductExist.brand,
              image: isProductExist.images.get(color)[1],
              quantity: quantity || 1,
              price,
              originalPrice:isProductExist.originalPrice,
              isSpecialOffer:isProductExist.isSpecialOffer,
              color,
              size,
            });
          }
          let total = 0;
          let originalTotal = 0
          existingCart.items.forEach(
            (item) =>{
               total += item.price * item.quantity
              originalTotal += item.originalPrice * item.quantity
              }
          );
          existingCart.subtotal = Number(total.toFixed(2));
          existingCart.estimatedTax = Number((total * 0.1035).toFixed(2));
          existingCart.savings = (originalTotal - total).toFixed(2)
          await existingCart.save();
          return res.json({
            message: "Product added to cart",
            cart: existingCart,
          });
        } catch (error) {
          res.status(500).json({
            message:
              "Internal server error while adding item to cart, please try again.",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "Internal server error while finding the product, please try again.",
      });
    }
  }
});
cartRouter.get("/", verifyToken, verifyCart, async (req, res) => {
  try {
    const existingCart = await CartModel.findOne({ email: req.user.email });
    res.json({ message: "Request resolved", data: existingCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
});
cartRouter.delete("/:id", verifyToken, verifyCart, async (req, res) => {
  const { id } = req.params;
  try {
    const existingCart = await CartModel.findOne({ email: req.user.email });
    if (existingCart.items.length < 1) {
      res.json({ message: "Cart is empty", data: existingCart });
    } else {
      const filteredItems = existingCart.items.filter((item) => item.id !== id);
      existingCart.items = filteredItems;
      let total = 0;
      let originalTotal = 0
      existingCart.items.forEach(
        (item) =>{
           total += item.price * item.quantity
          originalTotal += item.originalPrice * item.quantity
          }
      );
      existingCart.subtotal = Number(total.toFixed(2));
      existingCart.estimatedTax = Number((total * 0.1035).toFixed(2));
      existingCart.savings = (originalTotal - total).toFixed(2)

      await existingCart.save();
      res.json({ message: "Item removed from cart", data: existingCart });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while removing item." });
  }
});
cartRouter.patch("/:id", verifyToken, verifyCart, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: "Invalid request body." });
  }
  try {
    const existingCart = await CartModel.findOne({ email: req.user.email });
    const updatedItems = existingCart.items.map((item) =>
      item.id === id ? { ...item, quantity } : { ...item }
    );
    existingCart.items = updatedItems;
    let total = 0;
    let originalTotal = 0
    existingCart.items.forEach(
      (item) =>{
         total += item.price * item.quantity
        originalTotal += item.originalPrice * item.quantity
        }
    );
    existingCart.subtotal = Number(total.toFixed(2));
    existingCart.estimatedTax = Number((total * 0.1035).toFixed(2));
    existingCart.savings = (originalTotal - total).toFixed(2)
    await existingCart.save();
    res.json({ message: "Cart updated.", data: existingCart });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server error while updating cart, please try again.",
      });
  }
});
module.exports = cartRouter;
