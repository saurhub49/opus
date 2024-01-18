package com.opus.controller;

import com.opus.service.CommonUtilsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {

    @Autowired
    private CommonUtilsService commonUtilsService;

    public Long getUserId() {
        return commonUtilsService.getUserIdFromAuthentication();
    }
}
