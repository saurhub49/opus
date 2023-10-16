package com.opus.services;

import com.opus.converters.UserDtoConverter;
import com.opus.dtos.response.UserDetailsDto;
import com.opus.dtos.response.UserDto;
import com.opus.dtos.response.UserUpdateDto;
import com.opus.entities.User;
import com.opus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private UserDtoConverter userDtoConverter;

    private static final Integer PAGE_SIZE = 10;

    public Page<UserDetailsDto> getAllUsers(Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE);
        Page<User> users = userRepository.findAll(pageable);

        return users.map(user -> userDtoConverter.converToUserDetailsDtoFromEntity(user));
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
        user.setDateOfBirth(userDto.dateOfBirth());
        user.setGender(userDto.gender());

        user = userRepository.save(user);
        return UserDetailsDto.fromEntity(user);
    }

    public UserDetailsDto updateUser(Long userId, UserUpdateDto userDto) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        User userToBeUpdated = user.get();

        userToBeUpdated.setEmail(userDto.getEmail());
        userToBeUpdated.setFirstName(userDto.getFirstName());
        userToBeUpdated.setMiddleName(userDto.getMiddleName());
        userToBeUpdated.setLastName(userDto.getLastName());
        userToBeUpdated.setPhoneNumber(userDto.getPhoneNumber());
        userToBeUpdated.setAddress(userDto.getAddress());
        userToBeUpdated.setDateOfBirth(userDto.getDateOfBirth());
        userToBeUpdated.setGender(userDto.getGender());
        userToBeUpdated.setNationality(userDto.getNationality());
        userToBeUpdated.setMaritalStatus(userDto.getMaritalStatus());

        User updatedUser = userRepository.save(userToBeUpdated);

        return UserDetailsDto.fromEntity(updatedUser);
    }

    public Long deleteUser(Long userId) {
        userRepository.deleteById(userId);

        return userId;
    }
}
