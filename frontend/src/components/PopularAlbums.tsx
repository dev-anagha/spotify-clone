import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { popularAlbums, Album } from '../data/popularAlbums';

const PopularAlbums: React.FC = () => (
  <Box sx={{ mt: 6 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
      Popular Albums
    </Typography>
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 3, 
        overflowX: 'auto', 
        pb: 1,
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#181818',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#535353',
          borderRadius: '4px',
          '&:hover': {
            background: '#b3b3b3',
          },
        },
        scrollbarWidth: 'thin',
        scrollbarColor: '#535353 #181818',
      }}
    >
      {popularAlbums.map((album: Album) => (
        <Card
          key={album.id}
          sx={{
            minWidth: 220,
            maxWidth: 220,
            background: '#181818',
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
            position: 'relative',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.04)' },
            mr: 2,
            '&:hover .play-btn': {
              transform: 'translate(50%, 50%) scale(1)',
              opacity: 1
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={album.imageUrl}
              alt={album.title}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 2
              }}
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
            >
              <PlayArrowIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>
          <CardContent>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
              {album.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
              {album.artist}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default PopularAlbums; 