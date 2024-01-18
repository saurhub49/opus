package com.opus.aspects;

import com.opus.annotations.CheckAuthorization;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.AuthorizationService;
import com.opus.service.CommonUtilsService;
import jakarta.persistence.EntityNotFoundException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CheckAuthorizationAspect {

    private final AuthorizationService authorizationService;
    private final CommonUtilsService commonUtilsService;

    public CheckAuthorizationAspect(AuthorizationService authorizationService, CommonUtilsService commonUtilsService) {
        this.authorizationService = authorizationService;
        this.commonUtilsService = commonUtilsService;
    }

    @Around(value = "@annotation(checkAuthorization)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint, CheckAuthorization checkAuthorization)
            throws Throwable {
        Entity entity = checkAuthorization.entity();
        Permission permission = checkAuthorization.permission();
        boolean belongsToClient = checkAuthorization.belongsToClient();
        Long userId = commonUtilsService.getUserIdFromAuthentication();

        if (!authorizationService.checkPermission(userId, entity, permission)) {
            throw new AccessDeniedException("Access denied for permission: " + permission + " on entity: " + entity);
        }

        if (belongsToClient) {
            Object[] args = joinPoint.getArgs();
            if (args.length > 0) {
                Object firstArgument = args[0];
                if (firstArgument instanceof Long entityId) {
                    if (!authorizationService.belongsToClient(userId, entityId, entity)) {
                        throw new EntityNotFoundException("Entity " + entity + " does not exist");
                    }
                }
            }
        }

        return joinPoint.proceed();
    }
}
