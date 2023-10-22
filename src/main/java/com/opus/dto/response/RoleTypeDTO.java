package com.opus.dto.response;

import com.opus.entity.RoleType;

public record RoleTypeDTO(Long id,
                          String name,
                          String description) {

    public static RoleTypeDTO toDto(RoleType roleType) {
        return new RoleTypeDTO(roleType.getId(), roleType.getName(), roleType.getDescription());
    }

    public static RoleType toEntity(RoleTypeDTO dto) {
        return new RoleType(dto.id(), dto.name(), dto.description());
    }
}