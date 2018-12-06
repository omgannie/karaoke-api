const db = require('../db');

const getAllUsers = (req, res) => {
    const query = "SELECT * FROM users";
    db.run(query, (resp) => {
        res.json({ all_users: resp });
    });
}

const createNewUser = (req, res) => {
    const query = "INSERT INTO users(name) values($1)";
    const params = [req.query.name];
    db.run(query, params, (resp) => res.json({ new_user: resp }));
}

const getUserById = (req, res) => {
    const query = "SELECT * FROM users WHERE id = " + req.params.userId;
    db.run(query, (resp) => res.json({ queried_user: resp }));
}

const getUsersSongs = (req, res) => {
    const { userId } = req.params;
    const query = `SELECT name, title, artist FROM songs
    INNER JOIN users_songs
    ON users_songs.song_id = songs.id
    INNER JOIN users
    ON users.id = users_songs.user_id
    WHERE users.id = ${userId}`;
    db.run(query, (resp) => res.json({ user: userId, songs_list: resp }));
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    getUsersSongs
}
