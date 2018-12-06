const router = require('express').Router();
const path = require('path');
const ctrlr = require('../ctrlrs/users');
// ## /users
// 	- GET /users - all users
// 	- POST /users - create new user
// 	- GET /users/:user_id - user
// 	- GET /users/:user_id/songs - users requested songs
// 	- POST /users/:user_id/songs/:song_id - add song to users queue

router
    .get('/', ctrlr.getAllUsers);

router
    .post('/', ctrlr.createNewUser);

router
    .get('/:userId', ctrlr.getUserById);

router
    .get('/:userId/songs', ctrlr.getUsersSongs);

module.exports = router;
