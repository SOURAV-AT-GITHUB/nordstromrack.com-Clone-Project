const mongoose = require("mongoose");
const cartProductsSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  isSpecialOffer: { type: Boolean, required: true },
  color: { type: String, required: true },
  size: { type: String },
});
const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subtotal: { type: mongoose.Schema.Types.Mixed, required: true },
  estimatedTax: { type: mongoose.Schema.Types.Mixed, required: true },
  savings: { type: Number, required: true },
  items: [cartProductsSchema],
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
