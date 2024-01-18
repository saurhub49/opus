package com.opus.repository;

import com.opus.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Department d WHERE d.id = :id AND d.client.id = :clientId")
    boolean existsByIdAndClientId(Long id, Long clientId);

    @Query("SELECT d FROM Department d WHERE d.client.id = :clientId")
    List<Department> findAll(Long clientId);
}
