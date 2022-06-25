const router = require('express').Router();

const { 
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    removeThought
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


module.exports = router;