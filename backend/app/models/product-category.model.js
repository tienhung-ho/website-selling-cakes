const mongoose = require('mongoose')


const Schema = mongoose.Schema

const flavorProductSchema = new Schema({
  product_id: String,
  flavor_id: String,

}, {
  timestamps: true
})

const flavorProduct = mongoose.model('products-flavor', flavorProductSchema);
module.exports = flavorProduct
