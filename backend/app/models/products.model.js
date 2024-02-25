const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
console.log(slug);
mongoose.plugin(slug)

const Schema = mongoose.Schema

const productsSchema = new Schema({

  name: String,
  description: String,
  ingredients: Array,
  price: Number,
  productionDate: Date,
  expiryDate: Date,
  quantity: Number,
  views: Number,
  position: Number,
  discountPercentage: Number,
  available: {
    type: Boolean,
    default: true
  },
  thumbnail: String,
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  liked: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
  ,
  deletedBy: {
    account_id: String,
    deletedAt: {
      type: Date,
    }
  },
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ],

}, {
  timestamps: true
})

const Products = mongoose.model('productsSchema', productsSchema, 'Cakes');
module.exports = Products
