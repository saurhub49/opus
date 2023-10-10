package com.opus.controllers;

import com.opus.services.CommonUtilsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {

    @Autowired
    private CommonUtilsService commonUtilsService;

    public Long getUserId() {
        return commonUtilsService.getUserIdFromAuthentication();
    }
}
