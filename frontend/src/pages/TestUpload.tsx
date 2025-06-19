import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUpload from '../components/FileUpload';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(24, 24, 24, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(24, 24, 24, 0.9)'
  }
}));

const TestUpload: React.FC = () => {
  const [audioPath, setAudioPath] = useState<string>('');
  const [coverPath, setCoverPath] = useState<string>('');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          color: 'white',
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        File Upload Test
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Audio Upload
            </Typography>
            <FileUpload
              directory="audio"
              accept="audio/*"
              onUpload={setAudioPath}
            />
            {audioPath && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Uploaded Audio Path: {audioPath}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <audio 
                    controls 
                    src={`/api/files/download/${audioPath}`} 
                    style={{ width: '100%' }} 
                  />
                </Box>
              </Box>
            )}
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Cover Image Upload
            </Typography>
            <FileUpload
              directory="covers"
              accept="image/*"
              onUpload={setCoverPath}
            />
            {coverPath && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Uploaded Cover Path: {coverPath}
                </Typography>
                <Box
                  component="img"
                  src={`/api/files/download/${coverPath}`}
                  alt="Cover preview"
                  sx={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                />
              </Box>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestUpload; 