package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
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

    @CheckAuthorization(permission = Permission.READ, entity = Entity.USER)
    @GetMapping
    public ResponseEntity<List<UserDetailsDTO>> getAllUsers() {
        Long userId = getUserId();
        List<UserDetailsDTO> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable Long userId) {
        UserDetailsDTO response = userService.getUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> updateUser(@PathVariable Long userId, @RequestBody UserUpdateDTO userUpdateDto) {
        UserDetailsDTO response = userService.updateUser(userId, userUpdateDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        Long response = userService.deleteUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
