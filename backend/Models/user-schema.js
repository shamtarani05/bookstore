const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
    fullName : String,
    email : String ,
    password : String,
})

const User =  mongoose.model('users', userSchema);

module.exports = User