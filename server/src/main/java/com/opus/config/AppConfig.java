package com.opus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 * Configuration class for application-wide settings and beans. This class defines beans related to password encoding
 * and authentication management.
 */
@Configuration
public class AppConfig {

    /**
     * Configures and returns a password encoder bean, specifically using the BCrypt hashing algorithm.
     *
     * @return The configured password encoder using BCrypt.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures and returns an authentication manager bean. This authentication manager is used for authentication
     * within the application.
     *
     * @param builder The AuthenticationConfiguration for building the authentication manager.
     * @return The configured authentication manager.
     * @throws Exception if there's an issue with authentication manager configuration.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
