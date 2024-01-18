package com.opus.dto.response;

import com.opus.enums.Entity;
import com.opus.enums.Permission;

public class RoleTypeEntityPermission {
    private Boolean read;
    private Boolean create;
    private Boolean update;
    private Boolean delete;

    public RoleTypeEntityPermission() {
    }

    public RoleTypeEntityPermission(Boolean read, Boolean create, Boolean update, Boolean delete) {
        this.read = read;
        this.create = create;
        this.update = update;
        this.delete = delete;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Boolean getCreate() {
        return create;
    }

    public void setCreate(Boolean create) {
        this.create = create;
    }

    public Boolean getUpdate() {
        return update;
    }

    public void setUpdate(Boolean update) {
        this.update = update;
    }

    public Boolean getDelete() {
        return delete;
    }

    public void setDelete(Boolean delete) {
        this.delete = delete;
    }
}
