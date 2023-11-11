package com.opus.dto.response;

import com.opus.entity.User;
import com.opus.enums.RoleTypeName;

public record ProfileDetailsDTO(Long id,
                                String email,
                                String firstName,
                                String middleName,
                                String lastName,
                                Long clientId,
                                String ClientName,
                                Long departmentId,
                                String departmentName,
                                RoleTypeName roleTypeName) {

    public static ProfileDetailsDTO fromEntity(User user) {
        return new ProfileDetailsDTO(user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName(),
                user.getEmploymentDetail().getClient().getId(),
                user.getEmploymentDetail().getClient().getName(),
                user.getEmploymentDetail().getDepartment().getId(),
                user.getEmploymentDetail().getDepartment().getName(),
                user.getEmploymentDetail().getRole().getRoleType().getName());
    }
}
