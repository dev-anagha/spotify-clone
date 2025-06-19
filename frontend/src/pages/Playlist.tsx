import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    IconButton,
    Divider
} from '@mui/material';
import {
    PlayArrow as PlayIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Playlist, Song } from '../types';
import api from '../services/api';
import SongList from '../components/SongList';
import { setCurrentSong, setIsPlaying } from '../store/slices/playerSlice';

const PlaylistPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await api.getPlaylist(Number(id));
                setPlaylist(response);
                setSongs(response.songs);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        if (id) {
            fetchPlaylist();
        }
    }, [id]);

    const handlePlayAll = () => {
        if (songs.length > 0) {
            dispatch(setCurrentSong(songs[0]));
            dispatch(setIsPlaying(true));
        }
    };

    if (!playlist) {
        return (
            <Container>
                <Typography variant="h5">Loading playlist...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <img
                        src={playlist.coverImage}
                        alt={playlist.name}
                        style={{ width: 200, height: 200, marginRight: 24 }}
                    />
                    <Box>
                        <Typography variant="h4">{playlist.name}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {playlist.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<PlayIcon />}
                                onClick={handlePlayAll}
                            >
                                Play All
                            </Button>
                            <IconButton
                                color="primary"
                                onClick={() => {/* TODO: Implement edit playlist */}}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => {/* TODO: Implement delete playlist */}}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Songs
                </Typography>
                <SongList songs={songs} />
            </Box>
        </Container>
    );
};

export default PlaylistPage; 