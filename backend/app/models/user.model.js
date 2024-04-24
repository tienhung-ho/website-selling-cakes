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
}, {
  timestamps: true
});

const User = mongoose.model('cakes-shop-user', usersSchema, 'User');

module.exports = User;
