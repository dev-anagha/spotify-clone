import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, InputBase, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: '#000', 
        boxShadow: 'none', 
        px: 2,
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        {/* Left: Logo & Home */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/images/spotify-logo.png" alt="Spotify" style={{ width: 36, height: 36, borderRadius: '50%' }} />
          <IconButton
            sx={{ color: '#fff', bgcolor: '#181818', mr: 1 }}
            onClick={() => navigate('/')}
          >
            <HomeIcon />
          </IconButton>
        </Box>

        {/* Center: Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 600, mx: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#181818',
              borderRadius: 999,
              px: 2,
              py: 0.5,
              flex: 1,
              transition: 'transform 0.2s, background 0.2s',
              '&:hover': {
                transform: 'scale(1.03)',
                bgcolor: '#232323',
              },
            }}
          >
            <SearchIcon sx={{ color: '#b3b3b3', mr: 1 }} />
            <InputBase
              placeholder="What do you want to play?"
              sx={{
                color: '#fff',
                flex: 1,
                fontSize: 16,
                '& input': { padding: 0 },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#333' }} />
            <IconButton sx={{ color: '#b3b3b3' }}>
              <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#333"/></svg>
            </IconButton>
          </Box>
        </Box>

        {/* Right: Links & Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {['Premium', 'Support', 'Download'].map((text) => (
            <Typography
              key={text}
              sx={{
                color: '#b3b3b3',
                fontWeight: 700,
                mx: 1,
                cursor: 'pointer',
                transition: 'color 0.2s, transform 0.2s',
                '&:hover': {
                  color: '#fff',
                  transform: 'scale(1.08)',
                },
              }}
            >
              {text}
            </Typography>
          ))}
          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#333' }} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              color: '#b3b3b3',
              transition: 'color 0.2s, transform 0.2s',
              '&:hover': {
                color: '#fff',
                transform: 'scale(1.08)',
              },
            }}
          >
            <DownloadIcon fontSize="small" />
            <Typography sx={{ fontWeight: 500 }}>Install App</Typography>
          </Box>
          <Typography
            sx={{
              color: '#b3b3b3',
              fontWeight: 700,
              mx: 1,
              cursor: 'pointer',
              transition: 'color 0.2s, transform 0.2s',
              '&:hover': {
                color: '#fff',
                transform: 'scale(1.08)',
              },
            }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#000',
              borderRadius: 999,
              fontWeight: 700,
              px: 3,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 