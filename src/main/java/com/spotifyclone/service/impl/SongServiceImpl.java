package com.spotifyclone.service.impl;

import com.spotifyclone.model.Song;
import com.spotifyclone.model.User;
import com.spotifyclone.repository.SongRepository;
import com.spotifyclone.service.SongService;
import com.spotifyclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class SongServiceImpl implements SongService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private UserService userService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public Song createSong(Song song, MultipartFile audioFile, MultipartFile coverImage) {
        try {
            // Create upload directories if they don't exist
            Path audioDir = Paths.get(uploadDir + "/audio");
            Path imageDir = Paths.get(uploadDir + "/images");
            Files.createDirectories(audioDir);
            Files.createDirectories(imageDir);

            // Generate unique filenames
            String audioFileName = UUID.randomUUID().toString() + "_" + audioFile.getOriginalFilename();
            String imageFileName = coverImage != null ? 
                UUID.randomUUID().toString() + "_" + coverImage.getOriginalFilename() : null;

            // Save audio file
            Path audioFilePath = audioDir.resolve(audioFileName);
            Files.copy(audioFile.getInputStream(), audioFilePath);

            // Save cover image if provided
            if (coverImage != null) {
                Path imageFilePath = imageDir.resolve(imageFileName);
                Files.copy(coverImage.getInputStream(), imageFilePath);
                song.setCoverImagePath("/uploads/images/" + imageFileName);
            }

            song.setFilePath("/uploads/audio/" + audioFileName);
            return songRepository.save(song);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    @Override
    public Song findById(Long id) {
        return songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
    }

    @Override
    public List<Song> findAll() {
        return songRepository.findAll();
    }

    @Override
    public List<Song> findByArtist(String artist) {
        return songRepository.findByArtistContainingIgnoreCase(artist);
    }

    @Override
    public List<Song> findByGenre(String genre) {
        return songRepository.findByGenreContainingIgnoreCase(genre);
    }

    @Override
    public List<Song> findByAlbum(String album) {
        return songRepository.findByAlbumContainingIgnoreCase(album);
    }

    @Override
    public List<Song> searchSongs(String query) {
        return songRepository.searchSongs(query);
    }

    @Override
    public Song updateSong(Long id, Song songDetails) {
        Song song = findById(id);
        
        song.setTitle(songDetails.getTitle());
        song.setArtist(songDetails.getArtist());
        song.setAlbum(songDetails.getAlbum());
        song.setGenre(songDetails.getGenre());
        song.setReleaseYear(songDetails.getReleaseYear());
        
        return songRepository.save(song);
    }

    @Override
    public void deleteSong(Long id) {
        Song song = findById(id);
        
        try {
            // Delete audio file
            Path audioPath = Paths.get(uploadDir + song.getFilePath());
            Files.deleteIfExists(audioPath);

            // Delete cover image if exists
            if (song.getCoverImagePath() != null) {
                Path imagePath = Paths.get(uploadDir + song.getCoverImagePath());
                Files.deleteIfExists(imagePath);
            }

            songRepository.delete(song);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete files", e);
        }
    }

    @Override
    public void likeSong(Long userId, Long songId) {
        User user = userService.findById(userId);
        Song song = findById(songId);
        
        if (user.getLikedSongs().contains(song)) {
            throw new RuntimeException("Song already liked");
        }
        
        user.getLikedSongs().add(song);
        userService.updateUser(userId, user);
    }

    @Override
    public void unlikeSong(Long userId, Long songId) {
        User user = userService.findById(userId);
        Song song = findById(songId);
        
        user.getLikedSongs().remove(song);
        userService.updateUser(userId, user);
    }

    @Override
    public List<Song> getLikedSongs(Long userId) {
        User user = userService.findById(userId);
        return user.getLikedSongs().stream().toList();
    }
} 