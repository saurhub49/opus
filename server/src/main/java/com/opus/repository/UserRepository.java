package com.opus.repository;

import com.opus.entity.Client;
import com.opus.entity.RoleType;
import com.opus.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.id = :id AND u.client.id = :clientId")
    boolean existsByIdAndClientId(Long id, Long clientId);

    @Query("SELECT u FROM User u where u.client.id = :clientId")
    List<User> findAll(Long clientId);

    Optional<User> findByEmail(String email);

    @Query("SELECT u.employmentDetail.client FROM User u WHERE u.id = :userId")
    Client findClientByUserId(Long userId);

    @Query("SELECT u.employmentDetail.client.id FROM User u WHERE u.id = :userId")
    Long findClientIdByUserId(Long userId);

    @Query("SELECT u.employmentDetail.role.roleType FROM User u WHERE u.id = :userId")
    RoleType findRoleTypeByUserId(Long userId);
}
