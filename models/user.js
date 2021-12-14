const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    favorites: Array,
})


module.exports = mongoose.model("User", userSchema)