package com.opus.dto.response;

import com.opus.enums.Entity;
import com.opus.enums.RoleTypeName;

import java.util.Map;

public class RoleTypeAuthorization {
    private Long id;
    private RoleTypeName name;
    private String description;
    private Map<Entity, RoleTypeEntityPermission> entityPermissions;

    public RoleTypeAuthorization() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleTypeName getName() {
        return name;
    }

    public void setName(RoleTypeName name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<Entity, RoleTypeEntityPermission> getEntityPermissions() {
        return entityPermissions;
    }

    public void setEntityPermissions(Map<Entity, RoleTypeEntityPermission> entityPermissions) {
        this.entityPermissions = entityPermissions;
    }
}
