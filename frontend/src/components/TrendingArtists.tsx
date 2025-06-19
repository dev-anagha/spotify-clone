import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Container,
  IconButton
} from '@mui/material';
import { trendingArtists } from '../data/trendingArtists';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TrendingArtists: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Trending Songs
      </Typography>
      <Grid container spacing={3}>
        {trendingArtists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
            <Card 
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  cursor: 'pointer'
                },
                '&:hover .play-btn': {
                  transform: 'translate(50%, 50%) scale(1)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={artist.imageUrl}
                  alt={artist.name}
                  sx={{ objectFit: 'cover' }}
                />
                <IconButton
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
                    '&:hover': {
                      bgcolor: '#1ed760',
                      boxShadow: 6,
                      transform: 'translate(0%, 50%) scale(1.1)'
                    }
                  }}
                  className="play-btn"
                >
                  <PlayArrowIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3">
                  {artist.name}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Top Song: {artist.topSong}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {artist.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {artist.genre}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingArtists; 