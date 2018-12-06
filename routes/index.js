const users = require('./users');
const songs = require('./songs');
const lyrics = require('./lyrics');

module.exports = (app) => {
    app.get('/', (req, res) => res.send("<h1>try hitting an endpoint ;)</h1>")),
    app.use('/users', users),
    app.use('/songs', songs),
    app.use('/lyrics', lyrics)
};
