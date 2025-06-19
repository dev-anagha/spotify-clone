import React from 'react';
import { Grid, Card, CardMedia, Typography, Container, IconButton, Box } from '@mui/material';
import { popularArtists } from '../data/popularArtists';
import { PlayArrow } from '@mui/icons-material';
// import { Artist } from '../types'; // Not needed, as popularArtists does not match Artist type

interface PopularArtistsProps {
  onPlay: (artist: any) => void;
}

const PopularArtists: React.FC<PopularArtistsProps> = ({ onPlay }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* No heading here */}
      <Grid container spacing={3}>
        {popularArtists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#181818',
                borderRadius: 3,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: '0 4px 16px 0 rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                  border: '2px solid #1DB954',
                },
                p: 2,
                position: 'relative',
                overflow: 'visible',
              }}
              onClick={() => onPlay(artist)}
            >
              <Box sx={{ position: 'relative', width: '100%' }}>
                <CardMedia
                  component="img"
                  image={artist.imageUrl}
                  alt={artist.name}
                  sx={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#fff',
                  textAlign: 'center',
                  textTransform: 'lowercase',
                  fontWeight: 500,
                  letterSpacing: 1
                }}
              >
                {artist.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularArtists;