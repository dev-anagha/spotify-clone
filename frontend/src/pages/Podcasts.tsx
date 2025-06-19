import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Grid, IconButton } from '@mui/material';
import YourLibrary from '../components/YourLibrary';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const podcasts = [
  {
    id: 1,
    title: 'Building Wealth with Madhu Kela: Value...',
    image: '/images/podcasts/podcast1.jpg',
    date: 'Jun 14',
    duration: '92 min',
  },
  {
    id: 2,
    title: 'OTT Pe Mujhe Nahi Aana! : Aamir Khan',
    image: '/images/podcasts/podcast2.jpg',
    date: 'Jun 12',
    duration: '17 min',
  },
  {
    id: 3,
    title: 'EK USKA KHAYAL',
    image: '/images/podcasts/podcast3.jpg',
    date: 'Jun 13',
    duration: '22 min',
  },
  {
    id: 4,
    title: 'Ep.230 - Growth over Grudges !! 🔥🔥',
    image: '/images/podcasts/podcast4.jpg',
    date: 'Jun 15',
    duration: '19 min',
  },
];

const Podcasts: React.FC = () => {
  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
      {/* Left: Your Library */}
      <YourLibrary />
      {/* Right: Main Content */}
      <Box sx={{ flex: 1, minWidth: 0, bgcolor: 'transparent', borderRadius: 3, p: 0, boxShadow: 'none', overflow: 'hidden' }}>
        {/* Gradient Header */}
        <Box sx={{
          width: '100%',
          minHeight: 220,
          bgcolor: 'linear-gradient(180deg, #1db954 0%, #121212 100%)',
          background: 'linear-gradient(180deg, #1db954 0%, #121212 100%)',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: 'flex',
          alignItems: 'flex-end',
          px: 5,
          pb: 4,
        }}>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, fontSize: 64, lineHeight: 1 }}>
            Podcasts
          </Typography>
        </Box>
        {/* Best Episodes Section */}
        <Box sx={{ px: 5, pt: 4, pb: 2, bgcolor: '#181818', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
            Best episodes of the week
          </Typography>
          <Grid container spacing={3}>
            {podcasts.map((podcast) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={podcast.id}>
                <Card
                  sx={{
                    bgcolor: '#232323',
                    borderRadius: 2,
                    boxShadow: 'none',
                    color: '#fff',
                    height: '100%',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.04)' },
                    '&:hover .play-btn': {
                      transform: 'translate(0%, 50%) scale(1)',
                      opacity: 1
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={podcast.image}
                      alt={podcast.title}
                      sx={{ objectFit: 'cover', borderRadius: 2, width: '100%' }}
                    />
                    <IconButton
                      className="play-btn"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 24,
                        transform: 'translate(0%, 50%) scale(0)',
                        bgcolor: '#1DB954',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        boxShadow: 3,
                        transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                        zIndex: 2,
                        border: '3px solid #181818',
                        opacity: 0,
                        '&:hover': {
                          bgcolor: '#1ed760',
                          boxShadow: 6,
                          transform: 'translate(0%, 50%) scale(1.1)'
                        }
                      }}
                      size="medium"
                      aria-label={`Play ${podcast.title}`}
                    >
                      <PlayArrowIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 1 }} noWrap>
                      {podcast.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                      {podcast.date} • {podcast.duration}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Podcasts; 