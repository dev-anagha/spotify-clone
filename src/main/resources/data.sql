-- Insert sample users
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@spotifyclone.com', '$2a$10$rDkPvvAFV6GgJjXpX5YwUO9Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'ADMIN'),
('user1', 'user1@example.com', '$2a$10$rDkPvvAFV6GgJjXpX5YwUO9Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'USER'),
('user2', 'user2@example.com', '$2a$10$rDkPvvAFV6GgJjXpX5YwUO9Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'USER');

-- Insert sample songs
INSERT INTO songs (title, artist, album, release_year, duration, cover_image, audio_url, genre) VALUES
('Shape of You', 'Ed Sheeran', '÷ (Divide)', 2017, 235, '/covers/shape-of-you.jpg', '/songs/shape-of-you.mp3', 'Pop'),
('Blinding Lights', 'The Weeknd', 'After Hours', 2020, 200, '/covers/blinding-lights.jpg', '/songs/blinding-lights.mp3', 'Pop'),
('Dance Monkey', 'Tones and I', 'The Kids Are Coming', 2019, 210, '/covers/dance-monkey.jpg', '/songs/dance-monkey.mp3', 'Pop'),
('Someone You Loved', 'Lewis Capaldi', 'Divinely Uninspired to a Hellish Extent', 2019, 182, '/covers/someone-you-loved.jpg', '/songs/someone-you-loved.mp3', 'Pop'),
('Bad Guy', 'Billie Eilish', 'When We All Fall Asleep, Where Do We Go?', 2019, 194, '/covers/bad-guy.jpg', '/songs/bad-guy.mp3', 'Pop');

-- Insert sample playlists
INSERT INTO playlists (name, description, cover_image, user_id, is_public) VALUES
('Top Hits 2023', 'The best songs of 2023', '/covers/top-hits-2023.jpg', 1, true),
('Chill Vibes', 'Relaxing music for your day', '/covers/chill-vibes.jpg', 2, true),
('Workout Mix', 'High energy songs for your workout', '/covers/workout-mix.jpg', 2, false);

-- Insert playlist songs
INSERT INTO playlist_songs (playlist_id, song_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5),
(3, 1), (3, 3), (3, 5);

-- Insert user likes
INSERT INTO user_likes (user_id, song_id) VALUES
(2, 1), (2, 3),
(3, 2), (3, 4); 