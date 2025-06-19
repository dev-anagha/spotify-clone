import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';

const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
            <IconButton onClick={handleToggle} color="inherit">
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle; 