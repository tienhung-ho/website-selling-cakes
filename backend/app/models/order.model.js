const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  // user_id: String
  cart_id: String,
  userInfo: {
    fullName: String,
    address: {
      city: String,
      district: String,
      street: String,
    },
    phone: String
  },
  products: [
    {
      product_id: String,
      quantity: Number,
      price: Number,
      discountPercentage: Number
    }
  ],
  status: {
    type: String,
    default: 'active' // pending, completed, unactive, cancel
  },
  deleted: {
    type: Boolean,
    default: false
  },

},
{ timestamps: true })

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
