package com.opus.controllers;

import com.opus.dtos.response.UserDto;
import com.opus.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        Long userId = getUserId();
        List<UserDto> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
