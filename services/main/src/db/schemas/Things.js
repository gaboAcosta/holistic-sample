
module.exports = (mongoose) => {

    const modelName = 'Things'
    const { Schema } = mongoose

    return {
        name: modelName,
        model: mongoose.model(modelName, new Schema({
            name: { type: String, required: true }
        }))
    };
}
