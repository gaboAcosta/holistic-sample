

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const encrypt = (password) => {

    return bcrypt.hashSync(password, 10)

}

module.exports = mongoose.model('Users', new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        allowNull: false,
        set (password) {
            if(password){
                return encrypt(password)
            }
        }
    }
}))
