package com.spotifyclone.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String storeFile(MultipartFile file, String directory) throws IOException;
    void deleteFile(String filePath) throws IOException;
    byte[] loadFile(String filePath) throws IOException;
} 