package com.opus.entity;

import com.opus.enums.Permission;
import com.opus.enums.Entity;
import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "role_based_authorization_configuration")
public class RoleBasedAuthorizationConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_type_id", nullable = false)
    private RoleType roleType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Entity entity;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;

    public RoleBasedAuthorizationConfiguration() {
    }

    public RoleBasedAuthorizationConfiguration(RoleType roleType, Entity entity, Permission permission) {
        this.roleType = roleType;
        this.entity = entity;
        this.permission = permission;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleType getRoleTypeId() {
        return roleType;
    }

    public void setRoleTypeId(RoleType roleTypeId) {
        this.roleType = roleTypeId;
    }

    public Entity getEntity() {
        return entity;
    }

    public void setEntity(Entity entity) {
        this.entity = entity;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }
}
