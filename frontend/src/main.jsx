import { createRoot } from "react-dom/client";
import App from "./App";
import { keycloakReady } from "./auth/keycloak";

const root = createRoot(document.getElementById("root"));

root.render(<App />);

keycloakReady.catch((error) => {
  console.error("Keycloak initialization failed", error);
});