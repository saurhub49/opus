package com.opus.dto.request;

import com.opus.enums.Entity;
import com.opus.enums.Permission;
import jakarta.validation.constraints.NotNull;

public record RoleTypeAuthorizationConfigurationDTO(@NotNull Long roleTypeId,
                                                    @NotNull Entity entity,
                                                    @NotNull Permission permission,
                                                    @NotNull Boolean value) {
}
