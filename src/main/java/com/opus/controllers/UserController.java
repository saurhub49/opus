package com.opus.controllers;

import com.opus.dtos.response.UserDetailsDto;
import com.opus.dtos.response.UserDto;
import com.opus.services.UserService;
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

    @GetMapping("/all")
    public ResponseEntity<List<UserDetailsDto>> getAllUsers() {
        Long userId = getUserId();
        List<UserDetailsDto> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsDto> getUser(@PathVariable Long userId) {
        UserDetailsDto response = userService.getUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        Long response = userService.deleteUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
