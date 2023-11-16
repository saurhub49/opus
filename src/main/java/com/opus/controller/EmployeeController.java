package com.opus.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
@Tag(name = "Employee", description = "Endpoint for employees api")
public class EmployeeController {
}
