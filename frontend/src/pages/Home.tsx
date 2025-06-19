import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Card, CardMedia, CardContent, IconButton, Modal, Button as MuiButton } from '@mui/material';
import api from '../services/api';
import { Song, Playlist } from '../types';
import SongList from '../components/SongList';
import PlaylistCard from '../components/PlaylistCard';
import PopularArtists from '../components/PopularArtists';
import PopularAlbums from '../components/PopularAlbums';
import PopularSingles from '../components/PopularSingles';
import YourLibrary from '../components/YourLibrary';
import { trendingArtists } from '../data/trendingArtists';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
    const [recentSongs, setRecentSongs] = useState<Song[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playlists, songs] = await Promise.all([
                    api.getPlaylists(),
                    api.getSongs()
                ]);
                setFeaturedPlaylists(playlists.slice(0, 6));
                setRecentSongs(songs.slice(0, 10));
            } catch (error) {
                console.error('Error fetching home data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
            <YourLibrary />
            <Box sx={{
                flex: 1,
                minWidth: 0,
                bgcolor: '#181818',
                borderRadius: 3,
                p: 4,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.5)',
                overflow: 'hidden',
            }}>
                {/* Trending Artists Section */}
                <Box sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                            Trending Artists
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {trendingArtists.map((artist) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
                                <Card sx={{ bgcolor: '#232323', borderRadius: 2, boxShadow: 'none', color: '#fff', height: '100%', position: 'relative', overflow: 'visible' }}>
                                    <Box sx={{ position: 'relative', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={artist.imageUrl}
                                            alt={artist.name}
                                            sx={{ objectFit: 'cover', borderRadius: 2 }}
                                        />
                                        <IconButton
                                            className="play-btn"
                                            sx={{
                                                position: 'absolute',
                                                right: 16,
                                                left: 'auto',
                                                bottom: 0,
                                                transform: 'translateY(50%) scale(0.8)',
                                                bgcolor: '#1DB954',
                                                color: '#fff',
                                                width: 48,
                                                height: 48,
                                                boxShadow: 3,
                                                zIndex: 2,
                                                border: '3px solid #181818',
                                                opacity: 0,
                                                transition: 'opacity 0.2s, transform 0.2s',
                                                '&:hover': {
                                                    bgcolor: '#1ed760',
                                                    boxShadow: 6,
                                                    transform: 'translateY(50%) scale(1)',
                                                },
                                                '.MuiCard-root:hover &': {
                                                    opacity: 1,
                                                    transform: 'translateY(50%) scale(1)',
                                                },
                                            }}
                                            onClick={() => {
                                                setSelectedArtist(artist);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <PlayArrow sx={{ fontSize: 28 }} />
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                            {artist.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                            Top Song: {artist.topSong}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                            Genre: {artist.genre}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Modal for artist play button */}
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 0,
                        minWidth: 600,
                        maxWidth: '90vw',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        overflow: 'hidden',
                    }}>
                        {selectedArtist && (
                            <>
                                <Box sx={{ bgcolor: 'transparent', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        src={selectedArtist.imageUrl}
                                        alt={selectedArtist.name}
                                        style={{ width: 240, height: 240, borderRadius: 16, objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: 'transparent', p: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                        Start listening with a<br />free Spotify account
                                    </Typography>
                                    <MuiButton
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#1DB954',
                                            color: '#fff',
                                            borderRadius: 999,
                                            fontWeight: 700,
                                            px: 5,
                                            py: 1.5,
                                            fontSize: 20,
                                            mb: 2,
                                            textTransform: 'none',
                                            '&:hover': { bgcolor: '#1ed760' },
                                        }}
                                        onClick={() => {
                                            setModalOpen(false);
                                            navigate('/signup');
                                        }}
                                    >
                                        Sign up free
                                    </MuiButton>
                                    <MuiButton
                                        variant="outlined"
                                        sx={{
                                            color: '#fff',
                                            borderColor: '#fff',
                                            borderRadius: 999,
                                            fontWeight: 700,
                                            px: 5,
                                            py: 1.5,
                                            fontSize: 20,
                                            mb: 2,
                                            textTransform: 'none',
                                            '&:hover': { borderColor: '#1DB954', color: '#1DB954' },
                                        }}
                                    >
                                        Download app
                                    </MuiButton>
                                    <Typography sx={{ color: '#b3b3b3', mt: 2, fontSize: 16 }}>
                                        Already have an account?{' '}
                                        <span
                                            style={{ color: '#fff', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => {
                                                setModalOpen(false);
                                                navigate('/login');
                                            }}
                                        >
                                            Log in
                                        </span>
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                </Modal>

                {/* Popular Artists, Albums, Singles, Playlists, Recently Played */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                        Popular Artists
                    </Typography>
                </Box>
                <PopularArtists onPlay={(artist) => {
                    setSelectedArtist(artist);
                    setModalOpen(true);
                }} />
                <PopularAlbums />
                <PopularSingles />
                <Footer />
            </Box>
        </Box>
    );
};

export default Home; 