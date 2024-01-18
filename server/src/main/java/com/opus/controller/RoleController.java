package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.request.RoleRequestDTO;
import com.opus.dto.response.RoleDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@Tag(name = "Role", description = "Endpoint for roles api")
public class RoleController extends BaseController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @CheckAuthorization(entity = Entity.ROLE, permission = Permission.READ)
    @GetMapping
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        Long userId = getUserId();
        List<RoleDTO> roles = roleService.getAllRoles(userId);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.ROLE, permission = Permission.READ, belongsToClient = true)
    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRole(@PathVariable Long id) {
        RoleDTO role = roleService.getRole(id);
        if (role != null) {
            return new ResponseEntity<>(role, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.ROLE, permission = Permission.CREATE)
    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@RequestBody RoleRequestDTO roleRequestDTO) {
        Long userId = getUserId();
        RoleDTO createdRole = roleService.createRole(userId, roleRequestDTO);
        return new ResponseEntity<>(createdRole, HttpStatus.CREATED);
    }

    @CheckAuthorization(entity = Entity.ROLE, permission = Permission.UPDATE, belongsToClient = true)
    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO> updateRole(@PathVariable Long id, @RequestBody RoleRequestDTO roleRequestDTO) {
        RoleDTO updatedRole = roleService.updateRole(id, roleRequestDTO);
        if (updatedRole != null) {
            return new ResponseEntity<>(updatedRole, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.ROLE, permission = Permission.DELETE, belongsToClient = true)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
