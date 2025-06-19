package com.spotifyclone.service.impl;

import com.spotifyclone.model.User;
import com.spotifyclone.repository.UserRepository;
import com.spotifyclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        User user = findById(id);
        
        user.setFullName(userDetails.getFullName());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    @Override
    public void followUser(Long followerId, Long followingId) {
        User follower = findById(followerId);
        User following = findById(followingId);
        
        if (follower.getFollowing().contains(following)) {
            throw new RuntimeException("Already following this user");
        }
        
        follower.getFollowing().add(following);
        following.getFollowers().add(follower);
        
        userRepository.save(follower);
        userRepository.save(following);
    }

    @Override
    public void unfollowUser(Long followerId, Long followingId) {
        User follower = findById(followerId);
        User following = findById(followingId);
        
        follower.getFollowing().remove(following);
        following.getFollowers().remove(follower);
        
        userRepository.save(follower);
        userRepository.save(following);
    }

    @Override
    public List<User> getFollowers(Long userId) {
        User user = findById(userId);
        return user.getFollowers().stream().toList();
    }

    @Override
    public List<User> getFollowing(Long userId) {
        User user = findById(userId);
        return user.getFollowing().stream().toList();
    }
} 