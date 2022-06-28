const { Thought, User } = require('../models')

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //get one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .sort( {_id: -1} )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
//add thought to user
    addThought({body}, res) { 
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $addToSet: { thoughts: ThoughData._id } },
                { new: true }
            )
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json ({message: 'This user does not exist!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    //update thought by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId }, 
            { $set: body }, 
            { new: true }
        )
            .then(updateThought => {
                if (!updateThought) {
                    return res.status(404).json({message: 'The thought with this id cannot be found!'});
                }
                return res.json({message: "Success"});
            })
            .catch(err => res.json(err));
    },
//delete thought
    removeThought({params, body}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'The thought with this id is not found!'});
                }
                res.json(deletedThought)
            })
            .catch((err) => res.json(err));
            //     return User.findOneAndUpdate(
            //         {_id: params.username}, 
            //         {$pull: {thoughts: params.thoughtId}}, 
            //         {new: true}
            //         );
            // })
            // .then((dbUserData) => {
            //     if (!dbUserData) {
            //         res.status(404).json({message: 'The thought with this id cannot be found!'});
            //         return;
            //     }
            //     res.json(dbUserData);
            // })
            //.catch(err => res.json(err));
    },
 //create reactions
 addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No reaction with this ID!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.json(err))
  },
// Delete a reaction
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true },
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err))
  },

}

module.exports = thoughtController;