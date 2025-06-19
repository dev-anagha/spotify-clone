package com.spotifyclone.controller;

import com.spotifyclone.model.Song;
import com.spotifyclone.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSong(
            @RequestPart("song") Song song,
            @RequestPart("audioFile") MultipartFile audioFile,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage) {
        Song createdSong = songService.createSong(song, audioFile, coverImage);
        return ResponseEntity.ok(createdSong);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSong(@PathVariable Long id) {
        Song song = songService.findById(id);
        return ResponseEntity.ok(song);
    }

    @GetMapping
    public ResponseEntity<?> getAllSongs() {
        List<Song> songs = songService.findAll();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/artist/{artist}")
    public ResponseEntity<?> getSongsByArtist(@PathVariable String artist) {
        List<Song> songs = songService.findByArtist(artist);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<?> getSongsByGenre(@PathVariable String genre) {
        List<Song> songs = songService.findByGenre(genre);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/album/{album}")
    public ResponseEntity<?> getSongsByAlbum(@PathVariable String album) {
        List<Song> songs = songService.findByAlbum(album);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchSongs(@RequestParam String query) {
        List<Song> songs = songService.searchSongs(query);
        return ResponseEntity.ok(songs);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateSong(@PathVariable Long id, @RequestBody Song songDetails) {
        Song updatedSong = songService.updateSong(id, songDetails);
        return ResponseEntity.ok(updatedSong);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{songId}/like")
    public ResponseEntity<?> likeSong(@PathVariable Long songId, @RequestParam Long userId) {
        songService.likeSong(userId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{songId}/like")
    public ResponseEntity<?> unlikeSong(@PathVariable Long songId, @RequestParam Long userId) {
        songService.unlikeSong(userId, songId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/liked")
    public ResponseEntity<?> getLikedSongs(@RequestParam Long userId) {
        List<Song> likedSongs = songService.getLikedSongs(userId);
        return ResponseEntity.ok(likedSongs);
    }
} 