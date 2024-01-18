package com.opus.dto.response;

import com.opus.entity.Role;

public record RoleDTO(Long id,
                      String roleName,
                      String roleDescription,
                      Long roleTypeId,
                      String roleTypeName) {

    public static RoleDTO fromEntity(Role role) {
        return new RoleDTO(role.getId(), role.getRoleName(), role.getRoleDescription(), role.getRoleType().getId(), role.getRoleType().getName().toString());
    }
}
