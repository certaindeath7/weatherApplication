const mongoose = require('mongoose')

//create a schema to tell db what kind of data we're gonna store
const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email:String
})

mongoose.model("users", UserSchema)