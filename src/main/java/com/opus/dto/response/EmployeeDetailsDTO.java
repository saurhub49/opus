package com.opus.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.opus.entity.User;

import java.util.Date;

public record EmployeeDetailsDTO(String employeeId,
                                 String firstName,
                                 String lastName,
                                 String workEmail,
                                 String roleName,
                                 String departmentName,
                                 @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
                                 Date hireDate,
                                 String reportingManager) {

    public EmployeeDetailsDTO fromEntity(User user) {
        return new EmployeeDetailsDTO(user.getEmploymentDetail().getEmployeeId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmploymentDetail().getWorkEmail(),
                user.getEmploymentDetail().getRole().getRoleName(),
                user.getEmploymentDetail().getDepartment().getName(),
                user.getEmploymentDetail().getHireDate(),
                user.getEmploymentDetail().getReportingManager().getFirstName() + " " + user.getEmploymentDetail().getReportingManager().getLastName());
    }
}
