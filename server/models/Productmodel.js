const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["fish", "poultry"],
      required: true,
    },
    offer: {
      type: String,
      enum: ["10%", "25%", "30%"],
      required: true,
    },
    subcategory: { type: String, required: true },
    stock: { type: Number, required: true },
    isDisabled: { type: Boolean, default: false },
    tasteProfile: {
      tenderness: { type: Boolean, default: false },
      sweetness: { type: Boolean, default: false },
      saltiness: { type: Boolean, default: false },
      fishiness: { type: Boolean, default: false },
      texture: { type: Boolean, default: false },
      oiliness: { type: Boolean, default: false },
      acidity: { type: Boolean, default: false },
      metallic: { type: Boolean, default: false },
      mineral: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
