package com.tomas.taxi_manager.security.configs;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

class KeycloakRealmRoleConverterTest {

    private final KeycloakRealmRoleConverter converter = new KeycloakRealmRoleConverter();

    @Test
    void convertsRealmRolesAndScopesToAuthorities() {
        Jwt jwt = Jwt.withTokenValue("token")
                .header("alg", "none")
                .claim("scope", "profile")
                .claim("realm_access", Map.of("roles", List.of("MOTORISTA")))
                .build();

        var authorities = converter.convert(jwt);

        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_MOTORISTA")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("SCOPE_profile")));
    }
}
