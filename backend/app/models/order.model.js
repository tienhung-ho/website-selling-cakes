const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user_id: String,
  cart_id: String,
  userInfo: {
    fullName: String,
    address: {
      city: String,
      district: String,
      ward: String,
      street: String
    },
    phone: String
  },
  products: [
    {
      product_id: String,
      slug: String,
      quantity: Number,
      price: Number,
      discountPercentage: Number
    }
  ],
  status: {
    type: String,
    default: 'active' // pending, completed, unactive, cancel
  },
  totalPrice: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  description: String,
  position: Number,

},
{ timestamps: true })

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
