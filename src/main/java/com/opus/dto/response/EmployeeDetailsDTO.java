package com.opus.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.opus.entity.User;

import java.util.Date;

public record EmployeeDetailsDTO(Long id,
                                 String employeeId,
                                 String firstName,
                                 String lastName,
                                 String workEmail,
                                 String roleName,
                                 String departmentName,
                                 @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
                                 Date hireDate,
                                 String reportingManager) {

    public static EmployeeDetailsDTO fromEntity(User user) {
        String reportingManager = user.getEmploymentDetail().getReportingManager() != null ? (user.getEmploymentDetail().getReportingManager().getFirstName() + " " + user.getEmploymentDetail().getReportingManager().getLastName()) : "";

        return new EmployeeDetailsDTO(
                user.getId(),
                user.getEmploymentDetail().getEmployeeId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmploymentDetail().getWorkEmail(),
                user.getEmploymentDetail().getRole().getRoleName(),
                user.getEmploymentDetail().getDepartment().getName(),
                user.getEmploymentDetail().getHireDate(),
                reportingManager);
    }
}
