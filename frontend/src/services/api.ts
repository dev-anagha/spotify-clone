import axios, { AxiosInstance } from 'axios';
import { User, Song, Playlist } from '../types';

// Extend AxiosInstance to include our custom methods
interface CustomAxiosInstance extends AxiosInstance {
    getPlaylists: () => Promise<Playlist[]>;
    getSongs: () => Promise<Song[]>;
    getPlaylist: (id: number) => Promise<Playlist>;
    getUserPlaylists: () => Promise<Playlist[]>;
    register: (username: string, email: string, password: string) => Promise<User>;
    login: (username: string, password: string) => Promise<User>;
    searchSongs: (query: string) => Promise<Song[]>;
    searchPlaylists: (query: string) => Promise<Playlist[]>;
    uploadFile: (file: File, directory: string) => Promise<string>;
}

const API_URL = 'http://localhost:8080/api';

const api: CustomAxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}) as CustomAxiosInstance;

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth endpoints
api.login = async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

api.register = async (username: string, email: string, password: string): Promise<User> => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
};

// Song endpoints
api.searchSongs = async (query: string): Promise<Song[]> => {
    const response = await api.get(`/songs/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

export const getSongs = async (): Promise<Song[]> => {
    const response = await api.get('/songs');
    return response.data;
};

export const getSong = async (id: number): Promise<Song> => {
    const response = await api.get(`/songs/${id}`);
    return response.data;
};

export const toggleLike = async (songId: number): Promise<void> => {
    await api.post(`/songs/${songId}/like`);
};

// Playlist endpoints
api.getPlaylists = () => api.get<Playlist[]>('/playlists').then(res => res.data);
api.getPlaylist = (id: number) => api.get<Playlist>(`/playlists/${id}`).then(res => res.data);
api.getUserPlaylists = () => api.get<Playlist[]>('/playlists/user').then(res => res.data);

export const getPlaylists = async (): Promise<Playlist[]> => {
    const response = await api.get('/playlists');
    return response.data;
};

export const createPlaylist = async (name: string, description: string): Promise<Playlist> => {
    const response = await api.post('/playlists', { name, description });
    return response.data;
};

export const updatePlaylist = async (id: number, name: string, description: string): Promise<Playlist> => {
    const response = await api.put(`/playlists/${id}`, { name, description });
    return response.data;
};

export const deletePlaylist = async (id: number): Promise<void> => {
    await api.delete(`/playlists/${id}`);
};

export const addSongToPlaylist = async (playlistId: number, songId: number): Promise<void> => {
    await api.post(`/playlists/${playlistId}/songs/${songId}`);
};

export const removeSongFromPlaylist = async (playlistId: number, songId: number): Promise<void> => {
    await api.delete(`/playlists/${playlistId}/songs/${songId}`);
};

api.searchPlaylists = async (query: string): Promise<Playlist[]> => {
    const response = await api.get(`/playlists/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

api.uploadFile = async (file: File, directory: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', directory);
    const response = await api.post('/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.filePath;
};

export default api; 