package com.opus.security;

import com.opus.entities.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * The {@code JwtAuthenticationFilter} class is responsible for filtering incoming HTTP requests
 * and processing JSON Web Tokens (JWTs) for authentication and authorization purposes. It extracts
 * the JWT from the request header, validates it, and sets the authentication context for
 * authenticated users.
 *
 * <p>When an HTTP request is received, this filter examines the "Authorization" header for a JWT.
 * If a valid JWT is found, it is used to authenticate the user, and the user's details are added
 * to the security context.
 *
 * <p>Additionally, this filter logs any authentication-related events or errors for monitoring
 * and debugging purposes.
 *
 * <p>This class is typically used in conjunction with Spring Security to secure protected resources
 * and ensure that only authenticated users can access them.
 *
 * @author Your Name
 * @version 1.0
 * @since 2023-10-10
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * Logger for logging authentication events and errors.
     */
    private final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    /**
     * Helper class for JWT operations, such as token validation and extraction.
     */
    @Autowired
    private JwtHelper jwtHelper;

    /**
     * Service for retrieving user details based on a username.
     */
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Performs the actual JWT authentication and sets the authentication context if a valid token is present.
     *
     * @param request     The incoming HTTP request.
     * @param response    The HTTP response.
     * @param filterChain The filter chain to continue processing the request.
     * @throws ServletException If a servlet-related error occurs.
     * @throws IOException      If an I/O error occurs.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Extract the "Authorization" header from the request
        String requestHeader = request.getHeader("Authorization");
        logger.info("Header: {}", requestHeader);

        String username = null;
        String token = null;

        // Check if the header starts with "Bearer" and extract the token
        if (requestHeader != null && requestHeader.startsWith("Bearer")) {
            token = requestHeader.substring(7);

            try {
                // Attempt to extract the username from the token
                username = this.jwtHelper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.info(e.getMessage());
                e.printStackTrace();
            } catch (ExpiredJwtException e) {
                logger.info("JWT token expired!");
                e.printStackTrace();
            } catch (MalformedJwtException e) {
                logger.info("Invalid token!");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            logger.info("Invalid Header!");
        }

        // If a valid username is found and no authentication context is set, perform authentication
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User userDetails = (User) this.userDetailsService.loadUserByUsername(username);

            // Validate the token and set the authentication context if valid
            Boolean isTokenValid = this.jwtHelper.validateToken(token, userDetails);
            if (isTokenValid) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.info("Token validation failed!");
            }
        }

        // Continue processing the request
        filterChain.doFilter(request, response);
    }
}
