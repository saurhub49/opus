package com.opus.repository;

import com.opus.entity.Client;
import com.opus.entity.RoleType;
import com.opus.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u.employmentDetail.client FROM User u WHERE u.id = :userId")
    Client findClientIdByUserId(Long userId);

    @Query("SELECT u.employmentDetail.role.roleType FROM User u WHERE u.id = :userId")
    RoleType findRoleTypeByUserId(Long userId);
}
