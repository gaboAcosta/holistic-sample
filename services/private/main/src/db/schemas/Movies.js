
const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = mongoose.model('Movies', new Schema({
    name: { type: String, required: true },
    score: { type: Number},
}))
