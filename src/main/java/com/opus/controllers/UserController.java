package com.opus.controllers;

import com.opus.dtos.response.UserDetailsDto;
import com.opus.dtos.response.UserDto;
import com.opus.dtos.response.UserUpdateDto;
import com.opus.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<UserDetailsDto>> getAllUsers(@RequestParam(name = "page", defaultValue = "0") Integer page) {
        Long userId = getUserId();
        Page<UserDetailsDto> response = userService.getAllUsers(page);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsDto> getUser(@PathVariable Long userId) {
        UserDetailsDto response = userService.getUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailsDto> updateUser(@PathVariable Long userId, @RequestBody UserUpdateDto userUpdateDto) {
        UserDetailsDto response = userService.updateUser(userId, userUpdateDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        Long response = userService.deleteUser(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
