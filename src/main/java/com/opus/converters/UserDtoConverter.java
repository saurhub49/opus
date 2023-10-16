package com.opus.converters;

import com.opus.dtos.response.UserDetailsDto;
import com.opus.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter {

    public UserDetailsDto converToUserDetailsDtoFromEntity(User user) {
        return new UserDetailsDto(user.getId(), user.getEmail(),
                user.getFirstName(), user.getMiddleName(), user.getLastName(),
                user.getPhoneNumber(), user.getAddress(), user.getDateOfBirth(),
                user.getPhoneNumber(), user.getNationality(), user.getMaritalStatus());
    }
}
