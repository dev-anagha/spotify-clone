import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    queue: Song[];
    repeat: 'off' | 'all' | 'one';
    shuffle: boolean;
}

const initialState: PlayerState = {
    currentSong: null,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    queue: [],
    repeat: 'off',
    shuffle: false
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
            state.currentTime = 0;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setQueue: (state, action: PayloadAction<Song[]>) => {
            state.queue = action.payload;
        },
        addToQueue: (state, action: PayloadAction<Song>) => {
            state.queue.push(action.payload);
        },
        removeFromQueue: (state, action: PayloadAction<number>) => {
            state.queue = state.queue.filter((_, index) => index !== action.payload);
        },
        clearQueue: (state) => {
            state.queue = [];
        },
        setRepeat: (state, action: PayloadAction<'off' | 'all' | 'one'>) => {
            state.repeat = action.payload;
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
        }
    }
});

export const {
    setCurrentSong,
    setIsPlaying,
    setVolume,
    setCurrentTime,
    setDuration,
    setQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    setRepeat,
    toggleShuffle
} = playerSlice.actions;

export const nextSong = () => (dispatch, getState) => {
    const { queue, currentSong } = getState().player;
    const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
        dispatch(setCurrentSong(queue[currentIndex + 1]));
        dispatch(setIsPlaying(true));
    }
};

export default playerSlice.reducer;