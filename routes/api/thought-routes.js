const router = require('express').Router();

const { addThought } = require('../../controllers/thought-controller');

// api/thoughts/<thoughtsId>
router.route('/:thoughtId').post(addThought);



module.exports = router;