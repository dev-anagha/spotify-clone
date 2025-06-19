package com.spotifyclone.controller;

import com.spotifyclone.model.Playlist;
import com.spotifyclone.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<?> createPlaylist(@RequestBody Playlist playlist) {
        Playlist createdPlaylist = playlistService.createPlaylist(playlist);
        return ResponseEntity.ok(createdPlaylist);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlaylist(@PathVariable Long id) {
        Playlist playlist = playlistService.findById(id);
        return ResponseEntity.ok(playlist);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPlaylists(@PathVariable Long userId) {
        List<Playlist> playlists = playlistService.findByUser(userId);
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicPlaylists() {
        List<Playlist> playlists = playlistService.findPublicPlaylists();
        return ResponseEntity.ok(playlists);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlaylist(@PathVariable Long id, @RequestBody Playlist playlistDetails) {
        Playlist updatedPlaylist = playlistService.updatePlaylist(id, playlistDetails);
        return ResponseEntity.ok(updatedPlaylist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlaylist(@PathVariable Long id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<?> addSongToPlaylist(
            @PathVariable Long playlistId,
            @PathVariable Long songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<?> removeSongFromPlaylist(
            @PathVariable Long playlistId,
            @PathVariable Long songId) {
        playlistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPlaylists(@RequestParam String query) {
        List<Playlist> playlists = playlistService.searchPlaylists(query);
        return ResponseEntity.ok(playlists);
    }
} 