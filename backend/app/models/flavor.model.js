const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const Schema = mongoose.Schema

const flavorSchema = new Schema({
  flavor: String,
  quantity: Number,
  thumbnail: String,
  slug: {
    type: String,
    slug: "flavor",
    unique: true,
  },

}, {
  timestamps: true
})

const Flavor = mongoose.model('cakes-shop-flavor', flavorSchema, 'Flavor');
module.exports = Flavor
