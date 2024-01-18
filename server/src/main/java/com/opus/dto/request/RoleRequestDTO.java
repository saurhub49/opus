package com.opus.dto.request;

public record RoleRequestDTO(String roleName,
                             String roleDescription,
                             Long roleTypeId) {
}
