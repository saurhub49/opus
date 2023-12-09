package com.opus.service;

import com.opus.dto.request.ConfirmUserDTO;
import com.opus.dto.request.CreateUserDTO;
import com.opus.dto.response.ProfileDetailsDTO;
import com.opus.entity.Client;
import com.opus.entity.EmploymentDetail;
import com.opus.entity.User;
import com.opus.entity.UserToken;
import com.opus.exceptions.OpusApplicationException;
import com.opus.repository.*;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final DepartmentRepository departmentRepository;

    private final EmployementDetailRepository employementDetailRepository;

    private final UserTokenRepository userTokenRepository;

    private final EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, DepartmentRepository departmentRepository, EmployementDetailRepository employementDetailRepository, UserTokenRepository userTokenRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
        this.employementDetailRepository = employementDetailRepository;
        this.userTokenRepository = userTokenRepository;
        this.emailService = emailService;
    }

    public void registerUser(Long currentUserId, CreateUserDTO createUserDTO) throws MessagingException {
        Optional<User> userOptional = userRepository.findByEmail(createUserDTO.email());
        if (userOptional.isPresent()) {
            throw new OpusApplicationException("Email already exists!!!");
        }

        Client client = userRepository.findClientByUserId(currentUserId);

        User newUser = new User();
        newUser.setEmail(createUserDTO.email());
        newUser.setFirstName(createUserDTO.firstName());
        newUser.setLastName(createUserDTO.lastName());
        newUser.setGender(createUserDTO.gender());
        newUser.setClient(client);

        newUser = userRepository.save(newUser);

        EmploymentDetail employmentDetail = new EmploymentDetail();
        employmentDetail.setClient(client);
        employmentDetail.setUser(newUser);
        employmentDetail.setDepartment(departmentRepository.findById(createUserDTO.departmentId()).get());
        employmentDetail.setRole(roleRepository.findById(createUserDTO.roleId()).get());

        employementDetailRepository.save(employmentDetail);

        UserToken userToken = new UserToken();
        userToken.setUser(newUser);
        userToken.setToken(UUID.randomUUID());

        userToken = userTokenRepository.save(userToken);

        emailService.sendUserConfirmationEmail(newUser.getEmail(), userToken.getToken().toString());
    }

    public void confirmUser(ConfirmUserDTO confirmUserDTO) {
        if (!Objects.equals(confirmUserDTO.password(), confirmUserDTO.confirmPassword())) {
            throw new OpusApplicationException("Password mismatch!");
        }

        UserToken userToken = userTokenRepository.findByToken(confirmUserDTO.token());
        if (userToken == null) {
            throw new OpusApplicationException("Invalid token!");
        }

        User user = userToken.getUser();
        user.setConfirmed(true);
        user.setPassword(passwordEncoder.encode(confirmUserDTO.password()));

        userRepository.save(user);
        userTokenRepository.delete(userToken);
    }

    public ProfileDetailsDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        return ProfileDetailsDTO.fromEntity(user);
    }
}
