package com.opus.dto.response;

import com.opus.entity.RoleType;

public record RoleTypeDTO(Long id,
                          String name,
                          String description) {

    public static RoleTypeDTO toDto(RoleType roleType) {
        return new RoleTypeDTO(roleType.getId(), roleType.getName().toString(), roleType.getDescription());
    }
}