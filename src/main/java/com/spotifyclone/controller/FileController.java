package com.spotifyclone.controller;

import com.spotifyclone.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload/{directory}")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String directory) throws IOException {
        String filePath = fileStorageService.storeFile(file, directory);
        return ResponseEntity.ok(filePath);
    }

    @GetMapping("/download/{directory}/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String directory,
            @PathVariable String filename) throws IOException {
        String filePath = directory + "/" + filename;
        byte[] fileContent = fileStorageService.loadFile(filePath);
        ByteArrayResource resource = new ByteArrayResource(fileContent);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(resource);
    }

    @DeleteMapping("/{directory}/{filename:.+}")
    public ResponseEntity<Void> deleteFile(
            @PathVariable String directory,
            @PathVariable String filename) throws IOException {
        String filePath = directory + "/" + filename;
        fileStorageService.deleteFile(filePath);
        return ResponseEntity.ok().build();
    }
} 