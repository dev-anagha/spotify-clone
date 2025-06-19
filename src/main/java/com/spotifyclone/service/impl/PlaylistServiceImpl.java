package com.spotifyclone.service.impl;

import com.spotifyclone.model.Playlist;
import com.spotifyclone.model.Song;
import com.spotifyclone.model.User;
import com.spotifyclone.repository.PlaylistRepository;
import com.spotifyclone.service.PlaylistService;
import com.spotifyclone.service.SongService;
import com.spotifyclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlaylistServiceImpl implements PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @Override
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public Playlist findById(Long id) {
        return playlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Playlist not found with id: " + id));
    }

    @Override
    public List<Playlist> findByUser(Long userId) {
        User user = userService.findById(userId);
        return playlistRepository.findByUser(user);
    }

    @Override
    public List<Playlist> findPublicPlaylists() {
        return playlistRepository.findByIsPublicTrue();
    }

    @Override
    public Playlist updatePlaylist(Long id, Playlist playlistDetails) {
        Playlist playlist = findById(id);
        
        playlist.setName(playlistDetails.getName());
        playlist.setDescription(playlistDetails.getDescription());
        playlist.setPublic(playlistDetails.isPublic());
        
        return playlistRepository.save(playlist);
    }

    @Override
    public void deletePlaylist(Long id) {
        Playlist playlist = findById(id);
        playlistRepository.delete(playlist);
    }

    @Override
    public void addSongToPlaylist(Long playlistId, Long songId) {
        Playlist playlist = findById(playlistId);
        Song song = songService.findById(songId);
        
        if (playlist.getSongs().contains(song)) {
            throw new RuntimeException("Song already in playlist");
        }
        
        playlist.getSongs().add(song);
        playlistRepository.save(playlist);
    }

    @Override
    public void removeSongFromPlaylist(Long playlistId, Long songId) {
        Playlist playlist = findById(playlistId);
        Song song = songService.findById(songId);
        
        playlist.getSongs().remove(song);
        playlistRepository.save(playlist);
    }

    @Override
    public List<Playlist> searchPlaylists(String query) {
        // This is a simple implementation. You might want to add more sophisticated search logic
        return playlistRepository.findByIsPublicTrue().stream()
                .filter(playlist -> 
                    playlist.getName().toLowerCase().contains(query.toLowerCase()) ||
                    (playlist.getDescription() != null && 
                     playlist.getDescription().toLowerCase().contains(query.toLowerCase())))
                .toList();
    }
} 