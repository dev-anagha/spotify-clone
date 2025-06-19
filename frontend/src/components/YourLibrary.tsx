import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Divider, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const YourLibrary: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget.parentElement);
  };
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        bgcolor: '#181818',
        borderRadius: 3,
        p: 3,
        width: 340,
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 68, // 64px navbar + 4px gap
        maxHeight: 'calc(100vh - 68px)', // Adjusted for new top value
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
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
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
            Your Library
          </Typography>
          <AddIcon sx={{ color: '#fff', cursor: 'pointer' }} />
        </Box>

        {/* Create Playlist Card */}
        <Box sx={{ bgcolor: '#232323', borderRadius: 2, p: 2, mb: 2 }}>
          <Typography sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
            Create your first playlist
          </Typography>
          <Typography sx={{ color: '#b3b3b3', mb: 2, fontSize: 14 }}>
            It's easy, we'll help you
          </Typography>
          <Button
            ref={buttonRef}
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#000',
              borderRadius: 999,
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              transition: 'transform 0.2s, background 0.2s',
              '&:hover': { bgcolor: '#f5f5f5', transform: 'scale(1.05)' },
            }}
            fullWidth
            onClick={handleOpen}
          >
            Create playlist
          </Button>
        </Box>

        {/* Popup Popover */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: {
              bgcolor: '#53b8ff',
              borderRadius: 3,
              p: 0,
              minWidth: 270,
              maxWidth: 320,
              boxShadow: 8,
              position: 'relative',
              overflow: 'visible',
              ml: 2,
            }
          }}
        >
          {/* Arrow */}
          <Box
            sx={{
              position: 'absolute',
              left: -12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '12px solid #53b8ff',
              zIndex: 1,
            }}
          />
          <Box sx={{ p: 2, pb: 1.5, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: '#000', fontSize: 18, mb: 0.5 }}>
              Create a playlist
            </Typography>
            <Typography sx={{ color: '#000', fontSize: 15, mb: 2 }}>
              Log in to create and share playlists.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mt: 1 }}>
              <Button
                onClick={handleClose}
                sx={{
                  color: '#222',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 999,
                  px: 0,
                  minWidth: 0,
                  fontSize: 15,
                  transition: 'transform 0.2s, background 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.08)',
                    transform: 'scale(1.08)'
                  }
                }}
              >
                Not now
              </Button>
              <Button
                variant="contained"
                onClick={() => { window.location.href = '/login'; }}
                sx={{
                  bgcolor: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 2.5,
                  minWidth: 0,
                  fontSize: 15,
                  boxShadow: 'none',
                  textTransform: 'none',
                  transition: 'transform 0.2s, background 0.2s',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'scale(1.08)'
                  }
                }}
              >
                Log in
              </Button>
            </Box>
          </Box>
        </Popover>

        {/* Podcasts Card */}
        <Box sx={{ bgcolor: '#232323', borderRadius: 2, p: 2 }}>
          <Typography sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
            Let's find some podcasts to follow
          </Typography>
          <Typography sx={{ color: '#b3b3b3', mb: 2, fontSize: 14 }}>
            We'll keep you updated on new episodes
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#000',
              borderRadius: 999,
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              transition: 'transform 0.2s, background 0.2s',
              '&:hover': { bgcolor: '#f5f5f5', transform: 'scale(1.05)' },
            }}
            fullWidth
            onClick={() => navigate('/podcasts')}
          >
            Browse podcasts
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, mb: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>Legal</Typography>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>Safety & Privacy Center</Typography>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>Privacy Policy</Typography>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>Cookies</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>About Ads</Typography>
          <Typography variant="caption" sx={{ color: '#b3b3b3', cursor: 'pointer' }}>Accessibility</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, cursor: 'pointer', mb: 2, display: 'block' }}>
          Cookies
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 999,
            color: '#fff',
            borderColor: '#fff',
            textTransform: 'none',
            fontWeight: 700,
            mt: 1,
            width: 140,
            justifyContent: 'flex-start',
            pl: 1.5,
            fontSize: 16,
            background: 'rgba(255,255,255,0.04)',
            '&:hover': { background: 'rgba(255,255,255,0.08)', borderColor: '#fff' },
          }}
          startIcon={<span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>🌐</span>}
        >
          English
        </Button>
      </Box>
    </Box>
  );
};

export default YourLibrary; 