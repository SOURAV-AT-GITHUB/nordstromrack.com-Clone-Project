const CartModel = require("../models/cart.model");
const verifyCart = async (req, res, next) => {
  try {
    const existingCart = await CartModel.findOne({
      email: req.user.email,
    });
    if (!existingCart) {
      const newCart = new CartModel({
        email: req.user.email,
        subtotal:0.00,
        estimatedTax:0.00,
        items: [],
      });
      await newCart.save();
      // req.cart = newCart
      next();
      return
    }
//     req.cart = existingCart
    next();
  } catch (error) {
      res.status(500).json({message:"Error while finding cart"})
  }
};

module.exports = verifyCart