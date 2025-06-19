import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1DB954', // Spotify green
            light: '#1ED760',
            dark: '#1AA34A'
        },
        secondary: {
            main: '#1ED760', // Spotify light green
            light: '#1FDF64',
            dark: '#1AA34A'
        },
        background: {
            default: '#121212',
            paper: '#181818'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3'
        }
    },
    typography: {
        fontFamily: '"Circular", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(180deg, #1DB954 0%, #121212 100%)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: 'rgba(24, 24, 24, 0.8)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                        backgroundColor: 'rgba(24, 24, 24, 0.9)'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(24, 24, 24, 0.8)',
                    backdropFilter: 'blur(10px)'
                }
            }
        }
    }
});

export default theme; 