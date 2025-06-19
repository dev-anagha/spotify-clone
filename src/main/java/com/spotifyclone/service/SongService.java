package com.spotifyclone.service;

import com.spotifyclone.model.Song;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface SongService {
    Song createSong(Song song, MultipartFile audioFile, MultipartFile coverImage);
    Song findById(Long id);
    List<Song> findAll();
    List<Song> findByArtist(String artist);
    List<Song> findByGenre(String genre);
    List<Song> findByAlbum(String album);
    List<Song> searchSongs(String query);
    Song updateSong(Long id, Song songDetails);
    void deleteSong(Long id);
    void likeSong(Long userId, Long songId);
    void unlikeSong(Long userId, Long songId);
    List<Song> getLikedSongs(Long userId);
} 