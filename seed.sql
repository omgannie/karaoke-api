DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS songs;

CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name STRING NOT NULL
);

CREATE TABLE IF NOT EXISTS songs(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title STRING NOT NULL,
  artist STRING NOT NULL,
  href STRING NULL,
  spotify_id STRING NULL,
  genius_song_id STRING NULL,
  lyrics STRING NULL,
  requested_user_id INT REFERENCES users(id) NOT NULL,
  added_at DATETIME
);

INSERT INTO users(name)
VALUES
('annie'),
('daniel'),
('nika');

INSERT INTO songs(title, artist, requested_user_id)
VALUES
('despacito', 'justin bieber', 2),
('boy problems', 'carly rae jepsen', 1),
('purple rain', 'prince', 2),
('hungry like the wolf', 'duran duran', 3),
('thriller', 'michael jackson', 3);