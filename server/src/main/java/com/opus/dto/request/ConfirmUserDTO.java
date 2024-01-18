package com.opus.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ConfirmUserDTO(@NotNull UUID token,
                             @NotNull String password,
                             @NotNull String confirmPassword) {
}
