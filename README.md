# karaoke-api
node/express karaoke-based api mashup of spotify, genius, googlecloud's speech to text

## run
- `npm i`
- `npm run seed`
- `npm start`
- make requests to `localhost:3002`

## endpoints (as of 12/7/2018)
- GET /users
- POST /users?name={name}
- GET /users/{userId}
- POST /songs?title={title}&artist={artist}&userId={userId}
- GET /songs
- GET /songs/{songId}
- GET /users/{userId}/songs
- GET /lyrics/{songId}

## tasks left
1) Fix Node wrapped Spotify package:
	- Requesting necessary tokens does not work
	- Save a song's spotify_id to its matched song in our database
	- Save spotify's song track url to matched song
2) Write tests (and make them pass, obviously)
3) Fix GoogleCloud Speech to Text (Started with a GoogleCloud tutorial)
	- Implement browser mic access to stream live audio input
4) Lyrics marquee/highlighting logic and song streamage
5) Basic views (would probably implement w/ React/Redux since it is the freshest on my mind)
6) Refactor, refactor, refactor
7) Sing!
