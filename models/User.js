const { Schema, model } = require('mongoose');

// create schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required",
        trim: true
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    //thoughts: [
    //Array of _id values referencing the Thought model
    //],
    //friends: [
    //Array of _id values referencing the User model (self-reference)
    //]

});

//Schema Settings
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// create the model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;