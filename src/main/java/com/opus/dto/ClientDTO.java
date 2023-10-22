package com.opus.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ClientDTO {
    private Long id;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Date createDate;
    private Boolean status;
    private String website;
    private String pictureUrl;

    public ClientDTO() {
    }

    public ClientDTO(Long id, String name, Date createDate, Boolean status, String website, String pictureUrl) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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
                ", createDate=" + createDate +
                ", status=" + status +
                ", website='" + website + '\'' +
                ", pictureUrl='" + pictureUrl + '\'' +
                '}';
    }
}
