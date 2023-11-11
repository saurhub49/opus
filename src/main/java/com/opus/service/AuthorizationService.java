package com.opus.service;

import com.opus.entity.RoleType;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.enums.RoleTypeName;
import com.opus.repository.RoleBasedAuthorizationConfigurationRepository;
import com.opus.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private final RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository;
    private final UserRepository userRepository;

    public AuthorizationService(RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository, UserRepository userRepository) {
        this.authorizationConfigurationRepository = authorizationConfigurationRepository;
        this.userRepository = userRepository;
    }

    public Boolean checkPermission(Long userId, Entity entity, Permission permission) {
        RoleType roleType = getRoleTypeByUserId(userId);
        return authorizationConfigurationRepository.existsByRoleTypeEntityAndPermission(roleType, entity, permission);
    }

    private RoleType getRoleTypeByUserId(Long userId) {
        return userRepository.findRoleTypeByUserId(userId);
    }
}
