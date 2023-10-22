package com.opus.annotations;

import com.opus.enums.Entity;
import com.opus.enums.Permission;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckAuthorization {
    Permission permission() default Permission.READ;

    Entity entity() default Entity.CLIENT;
}
