
module.exports = (mongoose) => {

    const { Schema } = mongoose

    return mongoose.model('Things', new Schema({
        name: { type: String, required: true }
    }))
}
