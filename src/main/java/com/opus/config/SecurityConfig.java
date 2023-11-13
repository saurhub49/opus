package com.opus.config;

import com.opus.security.JwtAuthenticationEntryPoint;
import com.opus.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Configuration class for security settings in the application. This class defines various beans and configuration
 * related to security, such as CORS settings, authentication providers, and security filter chains.
 * <p>
 * It sets up security rules, exception handling, and authentication providers used in the application's security layer.
 * The class also configures CORS (Cross-Origin Resource Sharing) to allow or restrict cross-origin requests.
 *
 * @see CorsFilter
 * @see SecurityFilterChain
 * @see DaoAuthenticationProvider
 */
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint point;

    @Autowired
    private JwtAuthenticationFilter filter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Configures and returns a CORS (Cross-Origin Resource Sharing) filter, allowing or restricting cross-origin requests.
     *
     * @return The configured CORS filter.
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.applyPermitDefaultValues(); // Allow all origins, headers, and methods by default

        // You can further customize CORS configuration here if needed
        // config.addAllowedOrigin("https://example.com");
        // Explicitly specify allowed methods
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("OPTIONS");
//        config.addAllowedMethod("TRACE");
//        config.addAllowedMethod("CONNECT");

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }


    /**
     * Configures and returns a security filter chain responsible for handling security settings in the application.
     * This method sets up CORS, CSRF, authentication, and exception handling rules.
     *
     * @param http The HttpSecurity object for configuring security settings.
     * @return The configured SecurityFilterChain.
     * @throws Exception if there's an issue with security configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests()
                .requestMatchers("/auth/**", "/v3/api-docs").permitAll()
                .anyRequest()
                .authenticated()
                .and().exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Configures and returns a DAO (Data Access Object) authentication provider. This provider is used for authentication
     * in the application, utilizing a user details service and password encoder.
     *
     * @return The configured DAO authentication provider.
     */
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }
}
