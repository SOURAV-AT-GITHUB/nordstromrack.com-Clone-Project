const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  images: {
    type: Map,
    of: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isMultipleImages: {
    type: Boolean,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  OfferPrice: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  originalPrice: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  dealType: {
    type: String,
    default: null,
  },
  isSpecialOffer: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    default: null,
  },
  isFlatDiscount: {
    type: Boolean,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  ratingsCount: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [mongoose.Schema.Types.Mixed],
    default: null,
  },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
