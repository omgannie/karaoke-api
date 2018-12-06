const SpotifyWebApi = require('spotify-web-api-node');

const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const getCredentialsThenMakeRequest = (callback) => {
    spotify
        .clientCredentialsGrant()
        .then((data) => {
            console.log('Retrieved access token', data.body['access_token']);
            spotify.setAccessToken(data.body['access_token']);
            spotify.setRefreshToken(data.body['refresh_token']);
            return callback;
        })
        .catch((err) => {
            console.log('Uh oh, somehing went wrong', err);
            console.log('Trying again..');
            spotify.resetRefreshToken();
            return callback;
        });
};

const searchForTrack = (trackTitle, byArtist) => {
    return spotify.searchTracks(`track:${trackTitle} artist:${byArtist}`)
        .then((data) => {
            return data.body;
        }, (err) => {
            return err;
        });
};

const getTrackAudio = (spotify_id) => {
    return spotify.getAudioFeaturesForTrack(spotify_id)
        .then((data) => {
            return data.body;
        },
        (err) => {
            return err;
        });
};

module.exports = {
    searchForTrack: (title, artist) => {
        return getCredentialsThenMakeRequest(searchForTrack(title, artist))
    },
    getTrackAudio: (spotify_id) => {
        return getCredentialsThenMakeRequest(getTrackAudio(spotify_id))
    }
}