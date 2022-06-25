const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        //unique: true,
        required: true,
        //trimmed: true
    },
    email: {
        type: String,
        required: true,
        //unique: true,
        //Must match a valid email address (look into Mongoose's matching validation)
    },
    username: {
        type: String,
        required: true
    },
    thoughts: {
    //Array of _id values referencing the Thought model
    },
    friends: {
    //Array of _id values referencing the User model (self-reference)
    }

});

//Schema Settings
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// create the model using the UserSchema
const User = model('User', UserSchema);

module.exports = Thoughts;