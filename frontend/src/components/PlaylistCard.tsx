import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import { PlayArrow, Edit, Delete } from '@mui/icons-material';
import { Playlist } from '../types';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setIsPlaying } from '../store/slices/playerSlice';

interface PlaylistCardProps {
    playlist: Playlist;
    onEdit?: (playlist: Playlist) => void;
    onDelete?: (playlistId: number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
    playlist,
    onEdit,
    onDelete
}) => {
    const dispatch = useDispatch();

    const handlePlay = () => {
        if (playlist.songs.length > 0) {
            dispatch(setCurrentSong(playlist.songs[0]));
            dispatch(setIsPlaying(true));
        }
    };

    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={playlist.coverImage || '/default-playlist.jpg'}
                alt={playlist.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {playlist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {playlist.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {playlist.songs.length} songs
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <IconButton onClick={handlePlay}>
                        <PlayArrow />
                    </IconButton>
                    {onEdit && (
                        <IconButton onClick={() => onEdit(playlist)}>
                            <Edit />
                        </IconButton>
                    )}
                    {onDelete && (
                        <IconButton onClick={() => onDelete(playlist.id)}>
                            <Delete />
                        </IconButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PlaylistCard; 