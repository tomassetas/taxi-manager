package com.tomas.taxi_manager.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.tomas.taxi_manager.security.configs.KeycloakAdminProperties;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.net.URI;
import java.util.List;

/** Faz chamadas administrativas ao Keycloak em nome do backend. */
@Service
public class KeycloakAdminService {

    private final KeycloakAdminProperties properties;
    private final RestClient restClient;

    public KeycloakAdminService(KeycloakAdminProperties properties) {
        this.properties = properties;
        this.restClient = RestClient.builder()
                .baseUrl(properties.serverUrl())
                .build();
    }

    private void ensureClientSecretConfigured() {
        String clientSecret = properties.clientSecret();

        if (clientSecret == null || clientSecret.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "O secret do cliente técnico do Keycloak não está configurado.");
        }
    }


    private MultiValueMap<String, String> buildClientCredentialsForm() {
        ensureClientSecretConfigured();

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "client_credentials");
        form.add("client_id", properties.clientId());
        form.add("client_secret", properties.clientSecret());

        return form;
    }

    private String requestAccessToken() {
        Object response = restClient.post()
                .uri("/realms/{realm}/protocol/openid-connect/token", properties.realm())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(buildClientCredentialsForm())
                .retrieve()
                .body(Object.class);

        if (response instanceof Map<?, ?> tokenResponse) {
            Object accessToken = tokenResponse.get("access_token");

            if (accessToken instanceof String token && !token.isBlank()) {
                return token;
            }
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "O Keycloak não devolveu um access token válido.");
    }

    private Map<String, Object> buildKeycloakUser(
            String firstName,
            String lastName,
            String email) {
        return Map.of(
                "username", email,
                "email", email,
                "firstName", firstName,
                "lastName", lastName,
                "enabled", true
        );
    }
    
    private ResponseEntity<Void> sendCreateUserRequest(
            String accessToken,
            Map<String, Object> userRepresentation) {
        return restClient.post()
                .uri("/admin/realms/{realm}/users", properties.realm())
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(userRepresentation)
                .retrieve()
                .toBodilessEntity();
    }

    private String extractKeycloakSubject(URI location) {
        if (location == null || location.getPath() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "O Keycloak criou a conta, mas não devolveu o endereço do utilizador.");
        }

        String path = location.getPath();
        int lastSlash = path.lastIndexOf('/');

        if (lastSlash < 0 || lastSlash == path.length() - 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Não foi possível obter o ID da conta criada no Keycloak.");
        }

        return path.substring(lastSlash + 1);
    }

    public String createUserAccount(
            String firstName,
            String lastName,
            String email,
            String roleName){
        String accessToken = requestAccessToken();

        Map<String, Object> userRepresentation =
                buildKeycloakUser(firstName, lastName, email);

        ResponseEntity<Void> response =
                sendCreateUserRequest(accessToken, userRepresentation);

        URI location = response.getHeaders().getLocation();
        String keycloakSubject = extractKeycloakSubject(location);
        assignRealmRoleToUser(accessToken, keycloakSubject, roleName);

        return keycloakSubject;
    }

    private Map<?, ?> getRealmRoleRepresentation(
            String accessToken,
            String roleName) {
        Object response = restClient.get()
                .uri("/admin/realms/{realm}/roles/{roleName}",
                        properties.realm(), roleName)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .body(Object.class);

        if (response instanceof Map<?, ?> roleRepresentation) {
            return roleRepresentation;
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "O Keycloak não devolveu a role pedida.");
    }


    private void assignRealmRoleToUser(
            String accessToken,
            String keycloakSubject,
            String roleName) {
        Map<?, ?> roleRepresentation =
                getRealmRoleRepresentation(accessToken, roleName);

        restClient.post()
                .uri("/admin/realms/{realm}/users/{userId}/role-mappings/realm",
                        properties.realm(), keycloakSubject)
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(List.of(roleRepresentation))
                .retrieve()
                .toBodilessEntity();
}

}