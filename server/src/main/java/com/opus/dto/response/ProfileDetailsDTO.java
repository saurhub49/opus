package com.opus.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.opus.entity.User;

import java.util.Date;

public record ProfileDetailsDTO(Long id,
                                String email,
                                String firstName,
                                String middleName,
                                String lastName,
                                String phoneNumber,
                                String address,
                                @JsonFormat(pattern = "yyyy-MM-dd'T'")
                                Date dateOfBirth,
                                String gender,
                                String nationality,
                                String maritalStatus,
                                String profilePicUrl,
                                Long clientId,
                                String ClientName,
                                Long departmentId,
                                String departmentName,
                                String roleTypeName) {

    public static ProfileDetailsDTO fromEntity(User user) {
        return new ProfileDetailsDTO(user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getNationality(),
                user.getMaritalStatus(),
                user.getProfilePicUrl(),
                user.getEmploymentDetail().getClient().getId(),
                user.getEmploymentDetail().getClient().getName(),
                user.getEmploymentDetail().getDepartment().getId(),
                user.getEmploymentDetail().getDepartment().getName(),
                user.getEmploymentDetail().getRole().getRoleType().getName());
    }
}
