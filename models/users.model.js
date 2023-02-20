const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String
})
const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}

    // "name": "Swarup",
    // "email": "swarup@gmail.com",
    // "gender": "male",
    // "password": "swarup",
    // "age": 21,
    // "city": "Kolhapur"