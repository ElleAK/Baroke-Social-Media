const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
 } = require('../../controllers/thought-controller');

// api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// api/thoughts/<thoughtsId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// api/thoughs.reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;