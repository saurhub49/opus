package com.opus.dtos.response;

import com.opus.entities.User;

public record UserDto(Long id, String email, String password, String firstName, String middleName, String lastName) {

    public static UserDto fromEntity(User user) {
        return new UserDto(user.getId(), user.getEmail(), user.getPassword(), user.getFirstName(), user.getMiddleName(), user.getLastName());
    }
}
