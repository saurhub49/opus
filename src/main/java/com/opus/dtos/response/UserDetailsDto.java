package com.opus.dtos.response;

import com.opus.entities.User;

import java.util.Date;

public record UserDetailsDto(Long id,
                             String email,
                             String firstName,
                             String middleName,
                             String lastName,
                             String phoneNumber,
                             String address,
                             Date dateOfBirth,
                             String gender,
                             String nationality,
                             String maritalStatus) {

    public static UserDetailsDto fromEntity(User user) {
        return new UserDetailsDto(user.getId(),
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
