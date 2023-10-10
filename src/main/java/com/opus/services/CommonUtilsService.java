package com.opus.services;

import com.opus.entities.User;
import com.opus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommonUtilsService {

    @Autowired
    private UserRepository userRepository;

    public Long getUserIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<User> user = userRepository.findByEmail(email);

        return user.map(User::getId).orElse(null);

    }
}
