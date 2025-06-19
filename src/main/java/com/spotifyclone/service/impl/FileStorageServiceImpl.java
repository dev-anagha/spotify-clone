package com.spotifyclone.service.impl;

import com.spotifyclone.exception.ResourceNotFoundException;
import com.spotifyclone.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String storeFile(MultipartFile file, String directory) throws IOException {
        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir, directory).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        // Generate unique filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + fileExtension;

        // Copy file to target location
        Path targetLocation = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return directory + "/" + filename;
    }

    @Override
    public void deleteFile(String filePath) throws IOException {
        Path fileLocation = Paths.get(uploadDir, filePath).toAbsolutePath().normalize();
        if (!Files.exists(fileLocation)) {
            throw new ResourceNotFoundException("File not found: " + filePath);
        }
        Files.delete(fileLocation);
    }

    @Override
    public byte[] loadFile(String filePath) throws IOException {
        Path fileLocation = Paths.get(uploadDir, filePath).toAbsolutePath().normalize();
        if (!Files.exists(fileLocation)) {
            throw new ResourceNotFoundException("File not found: " + filePath);
        }
        return Files.readAllBytes(fileLocation);
    }
} 