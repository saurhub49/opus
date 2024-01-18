package com.opus.service;

import com.opus.dto.request.RoleRequestDTO;
import com.opus.dto.response.RoleDTO;
import com.opus.entity.Role;
import com.opus.entity.RoleType;
import com.opus.entity.User;
import com.opus.repository.RoleRepository;
import com.opus.repository.RoleTypeRepository;
import com.opus.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleTypeRepository roleTypeRepository;
    private final UserRepository userRepository;

    public RoleService(RoleRepository roleRepository, RoleTypeRepository roleTypeRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.roleTypeRepository = roleTypeRepository;
        this.userRepository = userRepository;
    }

    public List<RoleDTO> getAllRoles(Long userId) {
        return roleRepository.findAll(userRepository.findClientIdByUserId(userId)).stream().map(RoleDTO::fromEntity).collect(Collectors.toList());
    }

    public RoleDTO getRole(Long id) {
        Role role = getRoleEntity(id);

        return RoleDTO.fromEntity(role);
    }

    public RoleDTO createRole(Long userId, RoleRequestDTO roleRequestDTO) {
        Role role = new Role();

        role.setRoleName(roleRequestDTO.roleName());
        role.setRoleDescription(roleRequestDTO.roleDescription());
        role.setCreatedAt(new Date());
        role.setRoleType(getRoleTypeById(roleRequestDTO.roleTypeId()));
        role.setCreatedBy(userId);
        role.setClient(userRepository.findClientByUserId(userId));

        role = roleRepository.save(role);

        return RoleDTO.fromEntity(role);
    }

    public RoleDTO updateRole(Long roleId, RoleRequestDTO roleRequestDTO) {
        Role role = getRoleEntity(roleId);

        role.setRoleName(roleRequestDTO.roleName());
        role.setRoleDescription(roleRequestDTO.roleDescription());
        role.setRoleType(getRoleTypeById(roleRequestDTO.roleTypeId()));

        role = roleRepository.save(role);

        return RoleDTO.fromEntity(role);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    private Role getRoleEntity(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + id));
    }

    private RoleType getRoleTypeById(Long roleTypeId) {
        return roleTypeRepository.findById(roleTypeId).orElseThrow(() -> new EntityNotFoundException("RoleType not found with id: " + roleTypeId));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
    }
}
