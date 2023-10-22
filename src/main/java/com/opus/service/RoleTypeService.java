package com.opus.service;

import com.opus.dto.request.RoleTypeRequestDTO;
import com.opus.dto.response.RoleTypeDTO;
import com.opus.entity.RoleType;
import com.opus.repository.RoleTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleTypeService {

    private final RoleTypeRepository roleTypeRepository;

    @Autowired
    public RoleTypeService(RoleTypeRepository roleTypeRepository) {
        this.roleTypeRepository = roleTypeRepository;
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
}
