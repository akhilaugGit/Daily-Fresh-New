const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    products: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Possible values: "Pending", "Completed", "Cancelled"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
