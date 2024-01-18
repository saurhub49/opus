package com.opus.service;

import com.opus.constants.OpusConstants;
import com.opus.entity.RoleType;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.repository.DepartmentRepository;
import com.opus.repository.RoleBasedAuthorizationConfigurationRepository;
import com.opus.repository.RoleRepository;
import com.opus.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private final RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;

    public AuthorizationService(RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository, UserRepository userRepository, RoleRepository roleRepository, DepartmentRepository departmentRepository) {
        this.authorizationConfigurationRepository = authorizationConfigurationRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
    }

    public Boolean checkPermission(Long userId, Entity entity, Permission permission) {
        RoleType roleType = getRoleTypeByUserId(userId);
        return authorizationConfigurationRepository.existsByRoleTypeEntityAndPermission(roleType, entity, permission);
    }

    public Boolean belongsToClient(Long userId, Long entityId, Entity entity) {
        if (getRoleTypeByUserId(userId).getName().equals(OpusConstants.SUPER_ADMIN)) {
            return true;
        }

        Long clientId = userRepository.findClientIdByUserId(userId);
        switch (entity) {
            case ROLE -> {
                return isRoleBelongsToClient(entityId, clientId);
            }
            case DEPARTMENT -> {
                return isDepartmentBelongsToClient(entityId, clientId);
            }
            case USER -> {
                return isUserBelongsToClient(entityId, clientId);
            }
            case CLIENT, ROLE_TYPE -> {
                return getRoleTypeByUserId(userId).getName().equals(OpusConstants.SUPER_ADMIN);
            }
            default -> {
                return false;
            }
        }
    }

    private RoleType getRoleTypeByUserId(Long userId) {
        return userRepository.findRoleTypeByUserId(userId);
    }

    private Boolean isRoleBelongsToClient(Long roleId, Long clientId) {
        return roleRepository.existsByIdAndClientId(roleId, clientId);
    }

    private Boolean isDepartmentBelongsToClient(Long departmentId, Long clientId) {
        return departmentRepository.existsByIdAndClientId(departmentId, clientId);
    }

    private Boolean isUserBelongsToClient(Long userId, Long clientId) {
        return userRepository.existsByIdAndClientId(userId, clientId);
    }
}
