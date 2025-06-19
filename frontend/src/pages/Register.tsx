import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import api from '../services/api';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.register(formData.username, formData.email, formData.password);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderRadius: 999,
                        fontWeight: 700,
                        mb: 2,
                        color: '#fff',
                        borderColor: '#444',
                        background: 'transparent',
                        textTransform: 'none',
                        '&:hover': {
                            background: '#222',
                            borderColor: '#fff',
                        },
                    }}
                >
                    Sign up with Google
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderRadius: 999,
                        fontWeight: 700,
                        mb: 2,
                        color: '#fff',
                        borderColor: '#444',
                        background: 'transparent',
                        textTransform: 'none',
                        '&:hover': {
                            background: '#222',
                            borderColor: '#fff',
                        },
                    }}
                >
                    Sign up with Facebook
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderRadius: 999,
                        fontWeight: 700,
                        color: '#fff',
                        borderColor: '#444',
                        background: 'transparent',
                        textTransform: 'none',
                        '&:hover': {
                            background: '#222',
                            borderColor: '#fff',
                        },
                    }}
                >
                    Sign up with Apple
                </Button>
            </Box>
        </Box>
    );
};

export default Register; 