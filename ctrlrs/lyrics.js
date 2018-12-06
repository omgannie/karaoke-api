const passport = require('passport-oauth2');
const lyricsApi = require('genius-api');
const genius = new lyricsApi(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
const db = require('../db');

// const lyricsAuth = passport.use(new OAuth2Strategy({
//         authorizationURL: 'https://www.example.com/oauth2/authorize',
//         tokenURL: 'https://api.genius.com/oauth/authorize',
//         clientID: process.env.GENIUS_CLIENT_ACCESS_TOKEN,
//         clientSecret: EXAMPLE_CLIENT_SECRET,
//         callbackURL: '/'
//     },
//     (accessToken, refreshToken, profile, callback) => {
//         User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//             return callback(err, user);
//         });
//     }
// ));

const getLyricsForSongById = async (req, res) => {
    const { songId } = req.params;
    const query = "SELECT name FROM songs WHERE id = " + songId;
    await db.run(query)
        .then((data) => {
            res.json({ song: data });
        })
        .catch(err => res.send(err));

    genius.search(songName).then((response) => {

    });
}

module.exports = {
    getLyricsForSongById
}
