const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        // must be between 1 and 280 char
    },
    createdAt: {
        type: Date,
        default: Date.now
        //date format in utils
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
    //Array of nested documents created with the reactionSchema
    }

});

//Schema Settings
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

// create the model using the CommentSchema, schema must be initialized first
// const Thoughts = model('Thoughts', ThoughtsSchema);



module.exports = Thoughts;