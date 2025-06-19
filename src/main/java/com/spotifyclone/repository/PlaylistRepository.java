package com.spotifyclone.repository;

import com.spotifyclone.model.Playlist;
import com.spotifyclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUser(User user);
    List<Playlist> findByIsPublicTrue();
    List<Playlist> findByUserAndIsPublicTrue(User user);
} 