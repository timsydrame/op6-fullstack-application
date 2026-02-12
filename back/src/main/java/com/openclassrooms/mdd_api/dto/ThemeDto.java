package com.openclassrooms.mdd_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeDto {
    private Long id;
    private String name;
    private String description;
    private Boolean isSubscribed; // Pour savoir si l'user est abonné
}