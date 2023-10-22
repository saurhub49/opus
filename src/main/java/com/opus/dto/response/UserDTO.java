package com.opus.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.opus.entity.User;

import java.util.Date;

public record UserDTO(Long id,
                      String email,
                      String password,
                      String firstName,
                      String middleName,
                      String lastName,
                      @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
                      Date dateOfBirth,
                      String gender) {

    public static UserDTO fromEntity(User user) {
        return new UserDTO(user.getId(), user.getEmail(), user.getPassword(), user.getFirstName(), user.getMiddleName(), user.getLastName(), user.getDateOfBirth(), user.getGender());
    }
}
