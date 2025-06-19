export interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    fullName: string;
    role: 'USER' | 'ADMIN';
}

export interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    releaseYear: number;
    duration: number;
    coverImage: string;
    audioUrl: string;
    genre: string;
    likedByUser?: boolean;
}

export interface Playlist {
    id: number;
    name: string;
    description: string;
    coverImage: string;
    songs: Song[];
    userId: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    queue: Song[];
    currentTime: number;
    duration: number;
}

export interface Artist {
    id: number;
    name: string;
    imageUrl: string;
    topSong: string;
    duration: string;
    genre: string;
} 