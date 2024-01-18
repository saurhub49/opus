package com.opus.service;

import com.opus.dto.response.EmployeeDetailsDTO;
import com.opus.entity.User;
import com.opus.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final UserRepository userRepository;

    public EmployeeService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<EmployeeDetailsDTO> getEmployees(Long userId) {
        List<User> users = userRepository.findAll(userRepository.findClientIdByUserId(userId));
        List<EmployeeDetailsDTO> employees = new ArrayList<>();

        for (User user : users) {
            if (user.getEmploymentDetail() != null) {
                employees.add(EmployeeDetailsDTO.fromEntity(user));
            }
        }
        return employees;
    }
}
