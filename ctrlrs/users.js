const db = require('../db');

const getAllUsers = (req, res) => {
    const query = "SELECT * FROM users";
    let results = [];
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

const createNewUser = (req, res) => {
    const query = "INSERT INTO users(name) values($1)";
    const params = [req.query.name];
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('user created');
                resolve(res.redirect('/users'));
            }
        });
    });
}

const getUserById = (req, res) => {
    const query = `SELECT * FROM users WHERE id = ${req.params.userId}`;
    return new Promise((resolve, reject) => {
       db.get(query, params = [], (err, data) => {
           if (err || data === undefined) {
               reject(err);
           } else {
               resolve(res.json(data));
           }
       });
    });
}

const getUsersSongs = (req, res) => {
    const { userId } = req.params;
    const query = `SELECT name, title, artist FROM songs
    INNER JOIN users
    ON users.id = songs.requested_user_id
    WHERE users.id = ${userId}`;
    return new Promise((resolve, reject) => {
       db.each(query, params = [], (err, data) => {
           if (err) {
               reject(err);
           } else {
               resolve(res.json({ user: data.name, songs_list: [data] }));
           }
       });
    });
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    getUsersSongs
}
