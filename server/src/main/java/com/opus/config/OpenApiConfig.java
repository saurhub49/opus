package com.opus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springdoc.core.GroupedOpenApi;
import org.springdoc.core.SwaggerUiConfigParameters;

/**
 * Configuration class for setting up and customizing OpenAPI documentation. This class implements the WebMvcConfigurer
 * interface to configure web-related settings.
 */
@Configuration
@EnableWebMvc
public class OpenApiConfig implements WebMvcConfigurer {

    /**
     * Configures and returns a GroupedOpenApi bean for defining a group of OpenAPI documentation.
     *
     * @return The configured GroupedOpenApi bean for the "public-api" group.
     */
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public-api")
                .packagesToScan("com.opus.controllers") // Specify the package where your controllers are located
                .build();
    }

    /**
     * Overrides the default resource handling configuration to add resource handlers for serving the Swagger UI frontend.
     *
     * @param registry The ResourceHandlerRegistry for configuring resource handling.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Required to serve the Swagger UI frontend
        registry.addResourceHandler("/swagger-ui.html**")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
