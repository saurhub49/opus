package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.response.EmployeeDetailsDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.EmployeeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employees")
@Tag(name = "Employee", description = "Endpoint for employees api")
public class EmployeeController extends BaseController {

    @Autowired
    private EmployeeService employeeService;


    @CheckAuthorization(entity = Entity.EMPLOYMENT_DETAILS, permission = Permission.READ)
    @GetMapping
    public ResponseEntity<List<EmployeeDetailsDTO>> getEmployees() {
        Long userId = getUserId();
        return new ResponseEntity<>(employeeService.getEmployees(userId), HttpStatus.OK);
    }
}
