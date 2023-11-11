package com.opus.dto.request;

import com.opus.enums.RoleTypeName;

public record RoleTypeRequestDTO(RoleTypeName name,
                                 String description) {
}
