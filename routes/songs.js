const router = require('express').Router();
const ctrlr = require('../ctrlrs/songs');

router
    .get('/', ctrlr.getAllSongs)
    .post('/', ctrlr.addNewSong)
    .get('/:songId', ctrlr.getSongById);

module.exports = router;