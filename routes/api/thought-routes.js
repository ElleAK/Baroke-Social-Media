const router = require('express').Router();

const { addThought } = require('../../conrtollers/thought-controller');

// api/thoughts/<thoughtsId>
router.route('/:thoughtId').post(addThought);



module.exports = router;