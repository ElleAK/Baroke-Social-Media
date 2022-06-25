const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
    //Array of nested documents created with the reactionSchema
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ]
    },
    {
    toJSON: {
    virtuals: true,
    getters: true
    },
    id: false
    }
);

//Schema Settings
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

// create the model using the ThoughtsSchema, schema must be initialized first
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;