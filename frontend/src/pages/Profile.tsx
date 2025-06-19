import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Box,
    Typography,
    Grid,
    Avatar,
    Button,
    Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RootState } from '../store';
import { Playlist } from '../types';
import api from '../services/api';
import PlaylistCard from '../components/PlaylistCard';

const Profile: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await api.getUserPlaylists();
                setPlaylists(response);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        if (user) {
            fetchPlaylists();
        }
    }, [user]);

    if (!user) {
        return (
            <Container>
                <Typography variant="h5">Please log in to view your profile</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item>
                        <Avatar
                            src={user.avatar || "/default-avatar.png"}
                            alt={user.username}
                            sx={{ width: 120, height: 120 }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">{user.username}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">Your Playlists</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {/* TODO: Implement create playlist */}}
                    >
                        Create Playlist
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {playlists.map((playlist) => (
                        <Grid item xs={12} sm={6} md={4} key={playlist.id}>
                            <PlaylistCard
                                playlist={playlist}
                                onEdit={() => {/* TODO: Implement edit playlist */}}
                                onDelete={() => {/* TODO: Implement delete playlist */}}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Profile; 