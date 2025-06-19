package com.spotifyclone.service;

import com.spotifyclone.model.User;
import java.util.List;

public interface UserService {
    User registerUser(User user);
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(Long id);
    List<User> findAll();
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    void followUser(Long followerId, Long followingId);
    void unfollowUser(Long followerId, Long followingId);
    List<User> getFollowers(Long userId);
    List<User> getFollowing(Long userId);
} 