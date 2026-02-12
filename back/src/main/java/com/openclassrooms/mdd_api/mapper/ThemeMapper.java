package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.ThemeDto;
import com.openclassrooms.mdd_api.model.Theme;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ThemeMapper {
    ThemeDto toDto(Theme theme);
    Theme toEntity(ThemeDto themeDto);
    List<ThemeDto> toDtoList(List<Theme> themes);
}