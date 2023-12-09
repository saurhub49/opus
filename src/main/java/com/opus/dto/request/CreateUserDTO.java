package com.opus.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateUserDTO(@NotNull String firstName,
                            @NotNull String lastName,
                            @NotNull String email,
                            @NotNull String gender,
                            @NotNull Long roleId,
                            @NotNull Long departmentId) {
}
