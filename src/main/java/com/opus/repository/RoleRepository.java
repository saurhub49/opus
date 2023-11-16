package com.opus.repository;

import com.opus.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Role r WHERE r.id = :id AND r.client.id = :clientId")
    boolean existsByIdAndClientId(Long id, Long clientId);

    @Query("SELECT r FROM Role r WHERE r.client.id = :clientId")
    List<Role> findAll(Long clientId);
}
