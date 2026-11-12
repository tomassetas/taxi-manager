import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID, 
});

export const keycloakReady = keycloak.init({
  onLoad: "check-sso",
  pkceMethod: "S256",
  checkLoginIframe: false,
});

export default keycloak;
