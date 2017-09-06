
module.exports = (mongoose) => {
    const { Schema } = mongoose

    return mongoose.model('Users', new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }))
}
