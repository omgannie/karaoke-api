const spotify = require('./spotify');
const db = require('../db');

const getAllSongs = (req, res) => {
    let results = [];
    const query = "select name, title, artist from users inner join songs on" +
        " users.id =" +
        " songs.requested_user_id " +
        " order by" +
        " added_at";
    return new Promise((resolve, reject) => {
        db.each(query, (err, row) => {
            if (err) {
                reject(err);
            } else {
                results.push(row);
            }
        }, (err, n) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.json(results));
            }
        });
    });
}

const addNewSong = (req, res) => {
    let results = [];
    const title = req.query.title;
    const artist = req.query.artist;
    const userId = req.query.userId;
    const spotifyId = spotify.searchForTrack(title, artist);
    const audio = spotify.getTrackAudio(spotifyId);
    const query = "INSERT INTO songs(title, artist, requested_user_id) values($1, $2," +
        " $3)";
    const params = [title, artist, userId];
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.redirect('/songs'));
            }
        });
    });
};

const getSongById = (req, res) => {
    let results = [];
    const query = "SELECT * FROM songs WHERE id = " + req.params.songId;
    return new Promise((resolve, reject) => {
        db.each(query, (err, row) => {
            if (err) {
                reject(err);
            } else {
                results.push(row);
            }
        }, (err, n) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.json(results));
            }
        });
    });
};

module.exports = {
    getAllSongs,
    addNewSong,
    getSongById
};
