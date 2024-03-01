const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const roleSchema = new Schema({
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Role = mongoose.model('role', roleSchema)

module.exports = Role
