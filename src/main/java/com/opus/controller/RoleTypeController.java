package com.opus.controller;

import com.opus.dto.request.RoleTypeRequestDTO;
import com.opus.dto.response.RoleTypeDTO;
import com.opus.service.RoleTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roletypes")
public class RoleTypeController {
    private final RoleTypeService roleTypeService;

    @Autowired
    public RoleTypeController(RoleTypeService roleTypeService) {
        this.roleTypeService = roleTypeService;
    }

    @PostMapping
    public ResponseEntity<RoleTypeDTO> createRoleType(@RequestBody RoleTypeRequestDTO RoleTypeDto) {
        RoleTypeDTO createdRoleType = roleTypeService.createRoleType(RoleTypeDto);
        return new ResponseEntity<>(createdRoleType, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleTypeDTO> getRoleTypeById(@PathVariable Long id) {
        RoleTypeDTO roleType = roleTypeService.getRoleTypeById(id);
        return ResponseEntity.ok(roleType);
    }

    @GetMapping
    public ResponseEntity<List<RoleTypeDTO>> getAllRoleTypes() {
        List<RoleTypeDTO> roleTypes = roleTypeService.getAllRoleTypes();
        return ResponseEntity.ok(roleTypes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleTypeDTO> updateRoleType(@PathVariable Long id, @RequestBody RoleTypeRequestDTO RoleTypeDto) {
        RoleTypeDTO updatedRoleType = roleTypeService.updateRoleType(id, RoleTypeDto);
        return ResponseEntity.ok(updatedRoleType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoleType(@PathVariable Long id) {
        roleTypeService.deleteRoleType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

