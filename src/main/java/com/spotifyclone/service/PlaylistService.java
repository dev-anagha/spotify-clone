package com.spotifyclone.service;

import com.spotifyclone.model.Playlist;
import java.util.List;

public interface PlaylistService {
    Playlist createPlaylist(Playlist playlist);
    Playlist findById(Long id);
    List<Playlist> findByUser(Long userId);
    List<Playlist> findPublicPlaylists();
    Playlist updatePlaylist(Long id, Playlist playlistDetails);
    void deletePlaylist(Long id);
    void addSongToPlaylist(Long playlistId, Long songId);
    void removeSongFromPlaylist(Long playlistId, Long songId);
    List<Playlist> searchPlaylists(String query);
} 