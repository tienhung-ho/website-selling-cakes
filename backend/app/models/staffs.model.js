const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const accountSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    slug: {
      type: String,
      slug: "fullName",
      unique: true,
    },
    phone: String,
    avatar: String,
    status: {
      type: String,
      default: 'active'
    },
    role_id: String,
    
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Account = mongoose.model('staffs', accountSchema)

module.exports = Account
