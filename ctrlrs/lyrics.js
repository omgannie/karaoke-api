const fetch = require('fetch').fetchUrl;
const lyricsApi = require('genius-api');
const parse = require('node-html-parser').parse;
const genius = new lyricsApi(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
const db = require('../db');

/* helpers */
const getSongFromTable = (songId) => {
    const query = "SELECT * FROM songs WHERE id = " + songId;
    return new Promise((reject, resolve) => {
        db.get(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const searchGenius = (songTitle) => {
    return new Promise((reject, resolve) => {
        genius
            .search(songTitle)
            .then((response) => {
                resolve(response.hits[0].result);
            });
    });
};

const getSongFromGenius = (geniusSongId) => {
    return new Promise((reject, resolve) => {
        genius
            .song(geniusSongId)
            .then((response) => {
                resolve(response.song);
            });
    });
};

const scrapeForLyricsEl = (url) => {
    return new Promise((reject, resolve) => {
        fetch(url, (err, meta, body) => {
            if (err) {
                reject(err);
            } else {
                const scrapedObj = parse(body.toString()).querySelector('.lyrics');
                resolve(scrapedObj);
            }
        });
    });
};

// const getBestMatch = (responseHitsObject, songData) => {
//     console.log(responseHitsObject[0].result);
//     return responseHitsObject.find(({ result, type }) => (
//         type === 'song'
//             && result.lyrics_state === 'complete'
//             && result.primary_artist.is_verified
//             && result.full_title.includes(songData.artist)
//     ));
// }

// const updateSongData = (songId, data) => {
//     const query = 'insert into songs (genius_song_id, lyrics) values ($1, $2) where id' +
//         ' = ' + songId;
//     const params = [data.id, ];
//     return new Promise((reject, resolve) => {
//         db.run(query, params, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

const getLyricsBySongId = async (req, res) => {
    const requestedSong = await getSongFromTable(req.params.songId).catch(r => r);
    const match = await searchGenius(requestedSong.title).catch(r => r);
    const songResult = await getSongFromGenius(match.id).catch(r => r);
    const lyricsElement = await scrapeForLyricsEl(songResult.url).catch(r => r);
    res.json(lyricsElement);
};

module.exports = {
    getLyricsBySongId
}
