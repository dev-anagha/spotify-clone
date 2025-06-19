import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import { PlayArrow, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Song } from '../types';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setIsPlaying } from '../store/slices/playerSlice';
import api from '../services/api';

interface SongListProps {
    songs: Song[];
    userId?: number;
    onLikeToggle?: (songId: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, userId, onLikeToggle }) => {
    const dispatch = useDispatch();

    const handlePlay = (song: Song) => {
        dispatch(setCurrentSong(song));
        dispatch(setIsPlaying(true));
    };

    const handleLikeToggle = async (songId: number) => {
        await api.toggleLike(songId);
        if (onLikeToggle) onLikeToggle(songId);
    };

    return (
        <List>
            {songs.map((song) => (
                <ListItem key={song.id} secondaryAction={
                    <>
                        <IconButton onClick={() => handleLikeToggle(song.id)}>
                            {song.likedByUser ? (
                                <Favorite color="error" />
                            ) : (
                                <FavoriteBorder />
                            )}
                        </IconButton>
                        <IconButton onClick={() => handlePlay(song)}>
                            <PlayArrow />
                        </IconButton>
                    </>
                }>
                    <ListItemAvatar>
                        <Avatar
                            alt={song.title}
                            src={song.coverImage}
                            variant="rounded"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={song.title}
                        secondary={`${song.artist} • ${song.album} • ${song.releaseYear}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default SongList; 