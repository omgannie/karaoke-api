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
    const { title, artist, userId } = req.query.title;
    const spotifyId = spotify.searchForTrack(title, artist);
    const audio = spotify.getTrackAudio(spotifyId);
    const query = "INSERT INTO songs(title, artist, spotify_id, href," +
        " requested_user_id)" +
        " values($1, $2, $3, $4, $5)";
    console.log({ spotifyId, audio });
    const params = [title, artist, spotifyId, audio, userId];
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
    const query = `SELECT * FROM songs WHERE id = ${req.params.songId}`;
    return new Promise((resolve, reject) => {
        db.get(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.json(data));
            }
        });
    });
};

module.exports = {
    getAllSongs,
    addNewSong,
    getSongById
};
