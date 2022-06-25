const { Thought, User } = require('../models')

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //get one thought by id
    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.id
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thought found with id.'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

//add thought to user
addThought({params, body}, res) { 
    console.log(body);
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { comments: _id } },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json ({message: 'This user does not exist!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
//update thought by id
updateThought({
    params,
    body
}, res) {
    Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $set: body
        }, {
            runValidators: true,
            new: true
        })
        .then(updateThought => {
            if (!updateThought) {
                return res.status(404).json({
                    message: 'No thought with this id!'
                });
            }
            return res.json({
                message: "Success"
            });
        })
        .catch(err => res.json(err));
},

//delete thought
removeThought({
    params
}, res) {
    Thought.findOneAndDelete({
            _id: params.thoughtId
        })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({
                    message: 'No thought with this id!'
                });
            }
            return User.findOneAndUpdate({
                thoughts: params.thoughtId
            }, {
                $pull: {
                    thoughts: params.thoughtId
                }
            }, {
                new: true
            });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No thought found with this id!'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

};

module.exports = thoughtController;