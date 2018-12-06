const api = require('./index');
let user, song, artist;

const app = () => {
    // user = prompt("Enter your name, future star!",
    //     "karaoke user");
    // song = prompt("What's the song you'd like to sing?", "Halo");
    // artist = prompt("Who is it by?", "Beyoncé");
};

const start = () => {
    if (document.readyState === 'complete') {
        return app();
    } else {
        alert('error loading app');
    }
};

start();