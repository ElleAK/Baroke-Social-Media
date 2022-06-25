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
    //Array of _id values referencing the Thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thought'
    }],
   //Array of _id values referencing the User model (self-reference)
    friends: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    }, 
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// create the model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;