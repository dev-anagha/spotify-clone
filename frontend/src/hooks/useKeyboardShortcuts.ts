import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    setIsPlaying,
    setVolume,
    setCurrentSong,
    toggleShuffle,
    setRepeat
} from '../store/slices/playerSlice';

export const useKeyboardShortcuts = () => {
    const dispatch = useDispatch();
    const { currentSong, isPlaying, volume, queue } = useSelector(
        (state: RootState) => state.player
    );

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            switch (event.key.toLowerCase()) {
                case ' ': // Space
                    event.preventDefault();
                    dispatch(setIsPlaying(!isPlaying));
                    break;

                case 'arrowright': // Right arrow
                    if (event.ctrlKey) {
                        event.preventDefault();
                        // TODO: Implement next song
                    }
                    break;

                case 'arrowleft': // Left arrow
                    if (event.ctrlKey) {
                        event.preventDefault();
                        // TODO: Implement previous song
                    }
                    break;

                case 'arrowup': // Up arrow
                    if (event.ctrlKey) {
                        event.preventDefault();
                        dispatch(setVolume(Math.min(1, volume + 0.1)));
                    }
                    break;

                case 'arrowdown': // Down arrow
                    if (event.ctrlKey) {
                        event.preventDefault();
                        dispatch(setVolume(Math.max(0, volume - 0.1)));
                    }
                    break;

                case 'm': // M key
                    if (event.ctrlKey) {
                        event.preventDefault();
                        dispatch(setVolume(volume === 0 ? 1 : 0));
                    }
                    break;

                case 'r': // R key
                    if (event.ctrlKey) {
                        event.preventDefault();
                        dispatch(setRepeat('all'));
                    }
                    break;

                case 's': // S key
                    if (event.ctrlKey) {
                        event.preventDefault();
                        dispatch(toggleShuffle());
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [dispatch, isPlaying, volume, currentSong, queue]);
}; 