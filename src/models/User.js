const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;


const UserSchema = new Schema({
    email: {type: String, required: true, trim: true, unique: true, validate: [ validator.isEmail, 'Invalid email' ]},
    password: {type: String, required: true, trim: true, minlength:3}
})

module.exports = mongoose.model('User', UserSchema);