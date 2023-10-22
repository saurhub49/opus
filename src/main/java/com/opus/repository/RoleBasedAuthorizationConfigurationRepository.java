package com.opus.repository;

import com.opus.entity.RoleBasedAuthorizationConfiguration;
import com.opus.entity.RoleType;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleBasedAuthorizationConfigurationRepository extends JpaRepository<RoleBasedAuthorizationConfiguration, Long> {

    @Query("SELECT CASE WHEN COUNT(rbac) > 0 THEN true ELSE false END FROM RoleBasedAuthorizationConfiguration rbac " +
            "WHERE rbac.roleTypeId = :roleTypeId " +
            "AND rbac.entity = :entity " +
            "AND rbac.permission = :permission")
    Boolean existsByRoleTypeEntityAndPermission(
            RoleType roleTypeId,
            Entity entity,
            Permission permission);
    
}
