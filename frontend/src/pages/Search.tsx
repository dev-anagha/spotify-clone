import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    TextField,
    Typography,
    Grid,
    InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Song, Playlist } from '../types';
import api from '../services/api';
import SongList from '../components/SongList';
import PlaylistCard from '../components/PlaylistCard';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const search = async () => {
            if (searchQuery.trim().length < 2) {
                setSongs([]);
                setPlaylists([]);
                return;
            }

            setLoading(true);
            try {
                const [songsResponse, playlistsResponse] = await Promise.all([
                    api.searchSongs(searchQuery),
                    api.searchPlaylists(searchQuery)
                ]);
                setSongs(songsResponse);
                setPlaylists(playlistsResponse);
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(search, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for songs, artists, or playlists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {loading ? (
                <Typography>Searching...</Typography>
            ) : (
                <>
                    {songs.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Songs
                            </Typography>
                            <SongList songs={songs} />
                        </Box>
                    )}

                    {playlists.length > 0 && (
                        <Box>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Playlists
                            </Typography>
                            <Grid container spacing={3}>
                                {playlists.map((playlist) => (
                                    <Grid item xs={12} sm={6} md={4} key={playlist.id}>
                                        <PlaylistCard playlist={playlist} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {!loading && searchQuery.trim().length >= 2 && songs.length === 0 && playlists.length === 0 && (
                        <Typography>No results found</Typography>
                    )}
                </>
            )}
        </Container>
    );
};

export default Search; 