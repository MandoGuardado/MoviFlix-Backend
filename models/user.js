const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    firebaseId:String,
    favorites: Array,
})


module.exports = mongoose.model("User", userSchema)