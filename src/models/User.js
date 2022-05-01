const validator = require('validator');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true, trim: true, unique: true, validate: [ validator.isEmail, 'Invalid email' ]},
    password: {type: String, required: true, trim: true, minlength:3}
})

userSchema.set('toJSON',{
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})

const User = model('User', userSchema);

module.exports = User;