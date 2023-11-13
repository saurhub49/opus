package com.opus.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.opus.entity.User;

import java.util.Date;

public record UserDetailsDTO(Long id,
                             String email,
                             String firstName,
                             String middleName,
                             String lastName,
                             String phoneNumber,
                             String address,
                             @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
                             Date dateOfBirth,
                             String gender,
                             String nationality,
                             String maritalStatus) {

    public static UserDetailsDTO fromEntity(User user) {
        return new UserDetailsDTO(user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getNationality(),
                user.getMaritalStatus());
    }

}
