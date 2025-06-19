import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer: React.FC = () => (
  <Box sx={{ bgcolor: '#111', color: '#b3b3b3', pt: 5, pb: 2, px: 3, mt: 8 }}>
    <Box sx={{ borderBottom: '1px solid #222', pb: 4, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Grid container spacing={4} alignItems="flex-start" sx={{ flex: 1, minWidth: 0 }}>
          <Grid item xs={12} sm={6} md={2.5} lg={2}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Company
            </Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>About</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Jobs</Link>
              <Link href="#" underline="none" color="inherit" display="block">For the Record</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Communities
            </Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>For Artists</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Developers</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Advertising</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Investors</Link>
              <Link href="#" underline="none" color="inherit" display="block">Vendors</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Useful links
            </Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Support</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Free Mobile App</Link>
              <Link href="#" underline="none" color="inherit" display="block">Popular by Country</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Spotify Plans
            </Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Premium Individual</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Premium Duo</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Premium Family</Link>
              <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 0.5 }}>Premium Student</Link>
              <Link href="#" underline="none" color="inherit" display="block">Spotify Free</Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, ml: { xs: 0, md: 4 }, mt: { xs: 3, md: 0 } }}>
          <IconButton sx={{ bgcolor: '#222', color: '#fff', mr: 1, transition: 'all 0.2s', '&:hover': { bgcolor: '#1DB954', transform: 'scale(1.15)' } }}><InstagramIcon /></IconButton>
          <IconButton sx={{ bgcolor: '#222', color: '#fff', mr: 1, transition: 'all 0.2s', '&:hover': { bgcolor: '#1DB954', transform: 'scale(1.15)' } }}><TwitterIcon /></IconButton>
          <IconButton sx={{ bgcolor: '#222', color: '#fff', transition: 'all 0.2s', '&:hover': { bgcolor: '#1DB954', transform: 'scale(1.15)' } }}><FacebookIcon /></IconButton>
        </Box>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
      <Typography variant="caption" sx={{ color: '#b3b3b3' }}>
        © 2025 Spotify AB
      </Typography>
    </Box>
  </Box>
);

export default Footer; 