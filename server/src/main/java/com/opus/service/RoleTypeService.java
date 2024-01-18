package com.opus.service;

import com.opus.dto.request.RoleTypeAuthorizationConfigurationDTO;
import com.opus.dto.request.RoleTypeRequestDTO;
import com.opus.dto.response.RoleTypeAuthorization;
import com.opus.dto.response.RoleTypeDTO;
import com.opus.dto.response.RoleTypeEntityPermission;
import com.opus.entity.RoleBasedAuthorizationConfiguration;
import com.opus.entity.RoleType;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.exceptions.OpusApplicationException;
import com.opus.repository.RoleBasedAuthorizationConfigurationRepository;
import com.opus.repository.RoleTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RoleTypeService {

    private final RoleTypeRepository roleTypeRepository;
    private final RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository;

    @Autowired
    public RoleTypeService(RoleTypeRepository roleTypeRepository, RoleBasedAuthorizationConfigurationRepository authorizationConfigurationRepository) {
        this.roleTypeRepository = roleTypeRepository;
        this.authorizationConfigurationRepository = authorizationConfigurationRepository;
    }

    public RoleTypeDTO createRoleType(RoleTypeRequestDTO roleTypeDto) {
        RoleType roleType = new RoleType();
        roleType.setName(roleTypeDto.name());
        roleType.setDescription(roleTypeDto.description());
        roleType = roleTypeRepository.save(roleType);
        return RoleTypeDTO.toDto(roleType);
    }

    public RoleTypeDTO getRoleTypeById(Long id) {
        RoleType roleType = roleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RoleType not found with id: " + id));
        return RoleTypeDTO.toDto(roleType);
    }

    public List<RoleTypeDTO> getAllRoleTypes() {
        List<RoleType> roleTypes = roleTypeRepository.findAll();
        return roleTypes.stream()
                .map(RoleTypeDTO::toDto)
                .collect(Collectors.toList());
    }

    public RoleTypeDTO updateRoleType(Long id, RoleTypeRequestDTO roleTypeDto) {
        RoleType existingRoleType = roleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RoleType not found with id: " + id));
        RoleType updatedRoleType = new RoleType();
        updatedRoleType.setId(existingRoleType.getId());
        updatedRoleType.setName(roleTypeDto.name());
        updatedRoleType.setDescription(roleTypeDto.description());
        updatedRoleType = roleTypeRepository.save(updatedRoleType);
        return RoleTypeDTO.toDto(updatedRoleType);
    }

    public void deleteRoleType(Long id) {
        RoleType existingRoleType = roleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RoleType not found with id: " + id));
        roleTypeRepository.delete(existingRoleType);
    }

    public List<RoleTypeAuthorization> getAllRoleTypeAuthorizations() {
        List<RoleType> roleTypes = roleTypeRepository.findAll();

        List<RoleTypeAuthorization> roleTypeAuthorizations = new ArrayList<>();

        for (RoleType roleType : roleTypes) {
            RoleTypeAuthorization newRoleTypeAuthorization = new RoleTypeAuthorization();
            Map<String, RoleTypeEntityPermission> permissions = new HashMap<>();

            for (Entity entity : Entity.values()) {
                permissions.put(entity.toString(), new RoleTypeEntityPermission(false, false, false, false));
            }

            for (RoleBasedAuthorizationConfiguration authorizationConfiguration : roleType.getAuthorizations()) {
                RoleTypeEntityPermission currentPermission = permissions.get(authorizationConfiguration.getEntity().toString());

                if (currentPermission != null) {
                    if (authorizationConfiguration.getPermission() == Permission.READ) {
                        currentPermission.setRead(true);
                    } else if (authorizationConfiguration.getPermission() == Permission.CREATE) {
                        currentPermission.setCreate(true);
                    } else if (authorizationConfiguration.getPermission() == Permission.UPDATE) {
                        currentPermission.setUpdate(true);
                    } else if (authorizationConfiguration.getPermission() == Permission.DELETE) {
                        currentPermission.setDelete(true);
                    }
                }

            }

            newRoleTypeAuthorization.setId(roleType.getId());
            newRoleTypeAuthorization.setName(roleType.getName().toString());
            newRoleTypeAuthorization.setDescription(roleType.getDescription());
            newRoleTypeAuthorization.setEntityPermissions(permissions);

            roleTypeAuthorizations.add(newRoleTypeAuthorization);
        }

        return roleTypeAuthorizations;
    }

    @Transactional
    public void addOrRemoveRoleTypeAuthorizationConfiguration(RoleTypeAuthorizationConfigurationDTO roleTypeAuthorizationConfigurationDTO) {
        Boolean authorizationExists = authorizationConfigurationRepository.existsByRoleTypeEntityAndPermission(new RoleType(roleTypeAuthorizationConfigurationDTO.roleTypeId()), Entity.valueOf(roleTypeAuthorizationConfigurationDTO.entity()), roleTypeAuthorizationConfigurationDTO.permission());
        if (roleTypeAuthorizationConfigurationDTO.value()) {
            if (authorizationExists) {
                throw new OpusApplicationException("Required permission already exist!");
            }

            authorizationConfigurationRepository.save(new RoleBasedAuthorizationConfiguration(new RoleType(roleTypeAuthorizationConfigurationDTO.roleTypeId()), Entity.valueOf(roleTypeAuthorizationConfigurationDTO.entity()), roleTypeAuthorizationConfigurationDTO.permission()));
        } else {
            if (!authorizationExists) {
                throw new OpusApplicationException("Required permission does not exist!");
            }

            authorizationConfigurationRepository.deleteByRoleTypeAndEntityAndPermission(new RoleType(roleTypeAuthorizationConfigurationDTO.roleTypeId()), Entity.valueOf(roleTypeAuthorizationConfigurationDTO.entity()), roleTypeAuthorizationConfigurationDTO.permission());
        }
    }
}
