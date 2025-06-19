import React from 'react';
import Navbar from './Navbar';
import Player from './Player';
import { Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    background: '#121212',
    minWidth: 0,
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ position: 'relative', flex: 1 }}>
                <CssBaseline />
                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </Box>
            <Player />
        </Box>
    );
};

export default Layout; 