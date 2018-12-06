const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db.js');
const routes = require('./routes');

const port = 3002;

const app = express();
app.listen(port, () => {
    console.log(`Server listening on port ${port}.....`);
});

app.use(cookieParser());
routes(app);

process.on('SIGINT', () => {
    db.close((err) => err ? console.log(err) : 'database connection closed');
    app.close();
});