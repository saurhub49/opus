package com.opus.dto.response;

import com.opus.enums.Entity;
import com.opus.enums.RoleTypeName;

import java.util.Map;

public class RoleTypeAuthorization {
    private Long id;
    private String name;
    private String description;
    private Map<String, RoleTypeEntityPermission> entityPermissions;

    public RoleTypeAuthorization() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, RoleTypeEntityPermission> getEntityPermissions() {
        return entityPermissions;
    }

    public void setEntityPermissions(Map<String, RoleTypeEntityPermission> entityPermissions) {
        this.entityPermissions = entityPermissions;
    }
}
