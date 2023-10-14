package com.opus.services;

import com.opus.dtos.response.UserDetailsDto;
import com.opus.dtos.response.UserDto;
import com.opus.entities.User;
import com.opus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDetailsDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(UserDetailsDto::fromEntity).collect(Collectors.toList());
    }

    public UserDetailsDto getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        return user.map(UserDetailsDto::fromEntity).orElse(null);
    }

    public UserDetailsDto createUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.email());
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setFirstName(userDto.firstName());
        user.setMiddleName(userDto.middleName());
        user.setLastName(userDto.lastName());

        user = userRepository.save(user);
        return UserDetailsDto.fromEntity(user);
    }

    public Long deleteUser(Long userId) {
        userRepository.deleteById(userId);

        return userId;
    }
}
