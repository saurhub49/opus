package com.opus.service;

import com.opus.dto.request.UserRequestInfo;
import com.opus.entity.Client;
import com.opus.entity.User;
import com.opus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommonUtilsService {

    private final UserRepository userRepository;

    @Autowired
    public CommonUtilsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getUserFromRequestContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<User> user = userRepository.findByEmail(email);

        return user.orElse(null);
    }

    public Long getUserIdFromAuthentication() {
        User user = getUserFromRequestContext();
        if (user == null) {
            return null;
        }

        return user.getId();
    }

}
