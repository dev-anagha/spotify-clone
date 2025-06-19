package com.spotifyclone.repository;

import com.spotifyclone.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByArtistContainingIgnoreCase(String artist);
    List<Song> findByGenreContainingIgnoreCase(String genre);
    List<Song> findByAlbumContainingIgnoreCase(String album);
    
    @Query("SELECT s FROM Song s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(s.artist) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(s.album) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Song> searchSongs(String query);
} 