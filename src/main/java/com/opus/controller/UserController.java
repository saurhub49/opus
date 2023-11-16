package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.response.ProfileDetailsDTO;
import com.opus.dto.response.UserDetailsDTO;
import com.opus.dto.request.UserUpdateDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @CheckAuthorization(entity = Entity.USER, permission = Permission.READ)
    @GetMapping
    public ResponseEntity<List<UserDetailsDTO>> getAllUsers() {
        List<UserDetailsDTO> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.USER, permission = Permission.READ, belongsToClient = true)
    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable Long userId) {
        UserDetailsDTO response = userService.getUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.USER, permission = Permission.UPDATE, belongsToClient = true)
    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> updateUser(@PathVariable Long userId, @RequestBody UserUpdateDTO userUpdateDto) {
        UserDetailsDTO response = userService.updateUser(userId, userUpdateDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.USER, permission = Permission.DELETE, belongsToClient = true)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        Long response = userService.deleteUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.USER, permission = Permission.READ)
    @GetMapping("/profile")
    public ResponseEntity<ProfileDetailsDTO> getUserProfile() {
        Long userId = getUserId();

        ProfileDetailsDTO response = userService.getUserProfile(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
