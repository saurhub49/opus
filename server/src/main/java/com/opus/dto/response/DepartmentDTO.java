package com.opus.dto.response;

import com.opus.entity.Department;

public record DepartmentDTO(Long id,
                            String name,
                            String description) {

    public static DepartmentDTO fromEntity(Department department) {
        return new DepartmentDTO(department.getId(), department.getName(), department.getDescription());
    }
}
