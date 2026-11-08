import { createRoot } from "react-dom/client";
import App from "./App";
import keycloak from "./auth/keycloak";

const root = createRoot(document.getElementById("root"));

keycloak
  .init({
    onLoad: "check-sso",
    pkceMethod: "S256",
    checkLoginIframe: false,
  })
  .then(() => root.render(<App />))
  .catch((error) => {
    console.error("Keycloak initialization failed", error);
    root.render(
      <p role="alert">
        Não foi possível ligar ao serviço de autenticação. Confirma se o
        Keycloak está iniciado e tenta novamente.
      </p>,
    );
  });