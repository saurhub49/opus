package com.opus.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * The {@code JwtAuthenticationEntryPoint} class is an implementation of Spring Security's
 * {@link AuthenticationEntryPoint} interface. It is used to
 * handle unauthorized access attempts by setting an HTTP 401 Unauthorized status code and
 * sending an error message to the client.
 *
 * <p>When an unauthenticated user attempts to access a secured resource, this class is invoked
 * to handle the authentication failure and send an appropriate response to the client.
 *
 * <p>This class is typically used in conjunction with Spring Security to handle authentication
 * exceptions and provide meaningful error messages to clients attempting to access protected
 * resources without proper authentication.
 *
 * @author Saurabh Mahajan
 * @version 1.0
 * @since 2023-10-10
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Handles the commencement of an authentication failure by setting the HTTP status code
     * to 401 Unauthorized and sending an error message to the client.
     *
     * @param request       The HTTP request that resulted in the authentication failure.
     * @param response      The HTTP response where the error message will be written.
     * @param authException The AuthenticationException that triggered the authentication failure.
     * @throws IOException      If an I/O error occurs while writing the error message.
     * @throws ServletException If a servlet-related error occurs.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter writer = response.getWriter();
        writer.println("Access Denied! " + authException.getMessage());
    }
}
