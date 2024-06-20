package com.chamuditha.tournament.comp;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CompRequest(
    Integer id,

    @NotNull(message="200")
    @NotEmpty(message = "200")
    String name,

    @NotNull(message="201")
    @NotEmpty(message = "201")
    String host,

    @NotNull(message="204")
    @NotEmpty(message = "204")
    LocalDateTime startDate,

    @NotNull(message="205")
    @NotEmpty(message = "205")
    LocalDateTime endDate

) {
}
