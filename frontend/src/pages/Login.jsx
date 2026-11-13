import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import keycloak, { keycloakReady } from "../auth/keycloak";
import "../styles/Home.css";

function Login() {
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const isManager = keycloak.tokenParsed?.realm_access?.roles?.includes("GESTOR");

  useEffect(() => {
    keycloakReady
      .then(() => setAuthenticated(Boolean(keycloak.authenticated)))
      .catch((loginError) => {
        console.error("Keycloak initialization failed", loginError);
        setError("Não foi possível inicializar a autenticação.");
      });
  }, []);

  if (authenticated && isManager) {
    return <Navigate to="/gestor" replace />;
  }

  async function handleLogin() {
    setError("");

    try {
      await keycloakReady;
      await keycloak.login({ redirectUri: `${window.location.origin}/login` });
    } catch (loginError) {
      console.error("Keycloak login failed", loginError);
      setError("Não foi possível iniciar o login. Tenta novamente.");
    }
  }

  async function handleLogout() {
    setError("");

    try {
      await keycloakReady;
      await keycloak.logout({ redirectUri: `${window.location.origin}/login` });
    } catch (logoutError) {
      console.error("Keycloak logout failed", logoutError);
      setError("Não foi possível terminar a sessão. Tenta novamente.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        <h1>TaxiManager 🚕</h1>
        <h2>Iniciar sessão</h2>
        {authenticated ? (
          <>
            <p>
              Já tens sessão iniciada
              {keycloak.tokenParsed?.preferred_username
                ? ` como ${keycloak.tokenParsed.preferred_username}`
                : ""}.
            </p>
            <Link to="/profile" className="main-btn">
              Ver perfil
            </Link>
            <button type="button" onClick={handleLogout}>
              Terminar sessão
            </button>
          </>
        ) : (
          <>
            <p>Inicia sessão na tua conta.</p>
            <button type="button" onClick={handleLogin}>
              Iniciar sessão com Keycloak
            </button>
          </>
        )}
        {error && <p role="alert">{error}</p>}
      </div>
    </div>
  );
}

export default Login;