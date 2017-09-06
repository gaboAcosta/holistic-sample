
const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = mongoose.model('Things', new Schema({
    name: { type: String, required: true }
}))
