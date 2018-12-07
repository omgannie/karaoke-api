const router = require('express').Router();
const ctrlr = require('../ctrlrs/lyrics');

router
    .get('/:songId', ctrlr.getLyricsBySongId);

module.exports = router;