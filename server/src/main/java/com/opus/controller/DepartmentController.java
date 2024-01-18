package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.request.DepartmentRequestDTO;
import com.opus.dto.response.DepartmentDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.DepartmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
@Tag(name = "Departments", description = "Endpoint for departments api")
public class DepartmentController extends BaseController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @CheckAuthorization(entity = Entity.DEPARTMENT, permission = Permission.READ)
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        Long userId = getUserId();

        List<DepartmentDTO> Departments = departmentService.getALlDepartments(userId);
        return new ResponseEntity<>(Departments, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.DEPARTMENT, permission = Permission.READ, belongsToClient = true)
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentById(@PathVariable Long id) {
        DepartmentDTO Department = departmentService.getDepartment(id);
        if (Department != null) {
            return new ResponseEntity<>(Department, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.DEPARTMENT, permission = Permission.CREATE)
    @PostMapping
    public ResponseEntity<DepartmentDTO> createDepartment(@RequestBody DepartmentRequestDTO departmentDto) {
        Long userId = getUserId();
        DepartmentDTO createdDepartment = departmentService.createDepartment(userId, departmentDto);
        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }

    @CheckAuthorization(entity = Entity.DEPARTMENT, permission = Permission.READ, belongsToClient = true)
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> updateDepartment(@PathVariable Long id, @RequestBody DepartmentRequestDTO departmentDto) {
        DepartmentDTO updatedDepartment = departmentService.updateDepartment(id, departmentDto);
        if (updatedDepartment != null) {
            return new ResponseEntity<>(updatedDepartment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.DEPARTMENT, permission = Permission.READ, belongsToClient = true)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
