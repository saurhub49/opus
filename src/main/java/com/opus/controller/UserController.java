package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.request.ConfirmUserDTO;
import com.opus.dto.request.CreateUserDTO;
import com.opus.dto.response.ProfileDetailsDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.exceptions.OpusApplicationException;
import com.opus.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "Endpoint for users api")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> registerUser(CreateUserDTO createUserDTO) throws MessagingException {
        Long currentUserId = getUserId();
        userService.registerUser(currentUserId, createUserDTO);
        return ResponseEntity.ok("Success");
    }

    @CheckAuthorization(entity = Entity.USER, permission = Permission.READ)
    @GetMapping("/profile")
    public ResponseEntity<ProfileDetailsDTO> getUserProfile() {
        Long userId = getUserId();
        ProfileDetailsDTO response = userService.getUserProfile(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
