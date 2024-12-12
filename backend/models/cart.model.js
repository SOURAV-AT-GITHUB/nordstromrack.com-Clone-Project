const mongoose = require("mongoose");
const cartProductsSchema = new mongoose.Schema({
      product_id:{ type: String, required: true },
      quantity:{ type: Number, required: true },
      price: { type: Number, required: true },
      color:{ type: String, required: true },
      size:{ type: String}
})
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  data: [cartProductsSchema],
});

const CartModel = mongoose.Model('cart',cartSchema)
module.exports = CartModel