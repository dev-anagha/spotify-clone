import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Paper,
    Box,
    IconButton,
    Typography,
    Slider,
    Tooltip
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    VolumeUp,
    QueueMusic
} from '@mui/icons-material';
import { RootState } from '../store';
import { setIsPlaying, setVolume } from '../store/slices/playerSlice';
import { formatTime } from '../utils/time';

const MiniPlayer: React.FC = () => {
    const { currentSong, isPlaying, volume, currentTime, duration } = useSelector(
        (state: RootState) => state.player
    );
    const dispatch = useDispatch();

    if (!currentSong) return null;

    const handlePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying));
    };

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        dispatch(setVolume(newValue as number));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                zIndex: 1000,
                bgcolor: 'background.paper'
            }}
        >
            <img
                src={currentSong.coverImage}
                alt={currentSong.title}
                style={{ width: 40, height: 40, borderRadius: 4 }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" noWrap>
                    {currentSong.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {currentSong.artist}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Previous">
                    <IconButton size="small">
                        <SkipPrevious />
                    </IconButton>
                </Tooltip>

                <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
                    <IconButton onClick={handlePlayPause} size="small">
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Next">
                    <IconButton size="small">
                        <SkipNext />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ width: 100, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VolumeUp fontSize="small" />
                <Slider
                    size="small"
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </Box>

            <Box sx={{ width: 100, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
            </Box>

            <Tooltip title="Queue">
                <IconButton size="small">
                    <QueueMusic />
                </IconButton>
            </Tooltip>
        </Paper>
    );
};

export default MiniPlayer; 