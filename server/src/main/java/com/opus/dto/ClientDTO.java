package com.opus.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class ClientDTO {
    private Long id;
    @NotNull
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private Date createdDate;
    private Boolean status;
    private String website;
    private String pictureUrl;

    public ClientDTO() {
    }

    public ClientDTO(Long id, String name, Date createdDate, Boolean status, String website, String pictureUrl) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
        this.status = status;
        this.website = website;
        this.pictureUrl = pictureUrl;
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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    @Override
    public String toString() {
        return "ClientDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", createdDate=" + createdDate +
                ", status=" + status +
                ", website='" + website + '\'' +
                ", pictureUrl='" + pictureUrl + '\'' +
                '}';
    }
}
