const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  cart: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'YourItemModel', // Reference to the model of the items in the cart
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ]
}, {
  timestamps: true
});

const User = mongoose.model('cakes-shop-user', usersSchema, 'User');
module.exports = User;
