import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';
import {
    Box,
    IconButton,
    Slider,
    Typography,
    Paper
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    VolumeUp
} from '@mui/icons-material';
import { RootState } from '../store';
import {
    setIsPlaying,
    setCurrentSong,
    setCurrentTime,
    setDuration
} from '../store/slices/playerSlice';
import { Song } from '../types';

const Player: React.FC = () => {
    const dispatch = useDispatch();
    const { currentSong, isPlaying, volume, currentTime, duration } = useSelector(
        (state: RootState) => state.player
    );
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        if (currentSong) {
            if (soundRef.current) {
                soundRef.current.unload();
            }

            soundRef.current = new Howl({
                src: [currentSong.audioUrl],
                volume: volume,
                onplay: () => dispatch(setIsPlaying(true)),
                onpause: () => dispatch(setIsPlaying(false)),
                onstop: () => dispatch(setIsPlaying(false)),
                onload: () => {
                    dispatch(setDuration(soundRef.current?.duration() || 0));
                }
            });

            if (isPlaying) {
                soundRef.current.play();
            }
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
        };
    }, [currentSong, dispatch]);

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume);
        }
    }, [volume]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (soundRef.current && isPlaying) {
                dispatch(setCurrentTime(soundRef.current.seek() as number));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, dispatch]);

    const handlePlayPause = () => {
        if (soundRef.current) {
            if (isPlaying) {
                soundRef.current.pause();
            } else {
                soundRef.current.play();
            }
        }
    };

    const handleSeek = (_: Event, value: number | number[]) => {
        if (soundRef.current && typeof value === 'number') {
            soundRef.current.seek(value);
            dispatch(setCurrentTime(value));
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (!currentSong) {
        return null;
    }

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 2,
                backgroundColor: 'background.paper'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 60, height: 60 }}>
                    <img
                        src={currentSong.coverImage}
                        alt={currentSong.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{currentSong.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {currentSong.artist}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={() => {}}>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton onClick={handlePlayPause}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={() => {}}>
                        <SkipNext />
                    </IconButton>
                </Box>

                <Box sx={{ width: 200, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VolumeUp />
                    <Slider
                        size="small"
                        value={volume}
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={(_, value) => {}}
                    />
                </Box>

                <Box sx={{ width: 200 }}>
                    <Slider
                        value={currentTime}
                        max={duration}
                        onChange={handleSeek}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption">
                            {formatTime(currentTime)}
                        </Typography>
                        <Typography variant="caption">
                            {formatTime(duration)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default Player; 