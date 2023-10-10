package com.opus.security;

import com.opus.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * The {@code JwtHelper} class provides utility methods for handling JSON Web Tokens (JWTs) for
 * authentication and authorization purposes. It can generate tokens, extract information from
 * tokens, and validate token expiration.
 *
 * <p>JWTs are signed using the HMAC-SHA512 (HS512) algorithm with a secret key for added security.
 *
 * <p>This class is designed to work with Spring Security UserDetails objects for user-based token
 * generation and validation.
 *
 * @author Saurabh Mahajan
 * @version 1.0
 * @since 2023-10-10
 */
@Component
public class JwtHelper {

    /**
     * The duration (in seconds) for which a generated JWT token is considered valid.
     */
    private static final Long JWT_TOKEN_VALIDITY = (long) (5 * 60 * 60); // 5 hours

    /**
     * The secret key used for signing and validating JWT tokens.
     * Random key
     */
    private final String secret = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t1u2v3w4x5yv5w6x7y8j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1A2B3C4D5E6F7G8H9I0J1K2L3M4N51w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1a2b3c4d5e6f7g8h9i0j"; // Replace with your actual secret key

    /**
     * Retrieves the username from a given JWT token.
     *
     * @param token The JWT token from which the username is to be extracted.
     * @return The username extracted from the token.
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Retrieves the expiration date from a given JWT token.
     *
     * @param token The JWT token from which the expiration date is to be extracted.
     * @return The expiration date extracted from the token.
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * Retrieves a specific claim from a JWT token using a claims resolver function.
     *
     * @param token          The JWT token from which the claim is to be extracted.
     * @param claimsResolver A function that resolves the desired claim from the token's Claims object.
     * @param <T>            The type of the claim to be retrieved.
     * @return The specified claim extracted from the token.
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses and retrieves all claims from a JWT token.
     *
     * @param token The JWT token to be parsed.
     * @return A Claims object containing all claims extracted from the token.
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    /**
     * Checks if a JWT token has expired.
     *
     * @param token The JWT token to be checked for expiration.
     * @return `true` if the token has expired, `false` otherwise.
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates a JWT token for a given UserDetails object.
     *
     * @param userDetails The UserDetails object representing the user for whom the token is generated.
     * @return The generated JWT token.
     */
    public String generateToken(User userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    /**
     * Generates a JSON Web Token (JWT) based on the provided claims and subject, using the
     * HS512 (HMAC-SHA512) signing algorithm with a secret key.
     *
     * @param claims  A Map containing the claims to be included in the JWT payload. These claims
     *                represent information about the token, such as user roles, permissions, or
     *                custom data.
     * @param subject A String representing the subject of the JWT, typically identifying the
     *                user or entity for whom the token is issued.
     * @return A String representing the generated JWT.
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        // Create a JWT using the provided claims, subject, and current timestamps
        // and sign it with the HS512 algorithm and a secret key.
        // The token's expiration time is set based on the JWT_TOKEN_VALIDITY constant.
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    /**
     * Validates a JWT (JSON Web Token) by checking if it corresponds to the provided user's credentials.
     *
     * @param token       The JWT to be validated.
     * @param userDetails The user details against which the token is validated.
     * @return True if the token is valid for the given user, false otherwise.
     */
    public Boolean validateToken(String token, User userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
