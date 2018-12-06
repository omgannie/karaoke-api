const Database = require('sqlite3').verbose().Database;
const db = new Database('karaoke.db', (err) => {
    if (err) {
        console.log('There was an error:.......\n' + err);
    }
    console.log('db connection success');
});

module.exports = db;