package com.opus.service;

import com.opus.dto.request.DepartmentRequestDTO;
import com.opus.dto.response.DepartmentDTO;
import com.opus.entity.Client;
import com.opus.entity.Department;
import com.opus.repository.ClientRepository;
import com.opus.repository.DepartmentRepository;
import com.opus.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    private final UserRepository userRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository, UserRepository userRepository) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    public List<DepartmentDTO> getALlDepartments(Long userId) {
        return departmentRepository.findAll(userRepository.findClientIdByUserId(userId)).stream().map(DepartmentDTO::fromEntity).collect(Collectors.toList());
    }

    public DepartmentDTO getDepartment(Long id) {
        Department department = getDepartmentEntity(id);

        return DepartmentDTO.fromEntity(department);
    }

    public DepartmentDTO createDepartment(Long userId, DepartmentRequestDTO departmentRequestDTO) {
        Department department = new Department();

        Client client = userRepository.findClientByUserId(userId);

        department.setName(departmentRequestDTO.name());
        department.setDescription(departmentRequestDTO.description());
        department.setClient(client);

        department = departmentRepository.save(department);
        return DepartmentDTO.fromEntity(department);
    }

    public DepartmentDTO updateDepartment(Long id, DepartmentRequestDTO departmentRequestDTO) {
        Department department = getDepartmentEntity(id);

        department.setName(departmentRequestDTO.name());
        department.setDescription(departmentRequestDTO.description());

        department = departmentRepository.save(department);
        return DepartmentDTO.fromEntity(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentEntity(id);

        departmentRepository.delete(department);
    }

    private Department getDepartmentEntity(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + id));
    }
}
