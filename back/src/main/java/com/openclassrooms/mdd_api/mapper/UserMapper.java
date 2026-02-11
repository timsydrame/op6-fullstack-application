package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.UserDto;
import com.openclassrooms.mdd_api.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    User toEntity(UserDto userDto);
}