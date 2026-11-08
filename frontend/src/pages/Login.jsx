import { useState } from "react";
import { Link } from "react-router-dom";
import keycloak from "../auth/keycloak";
import "../styles/Home.css";

function Login() {
  const [error, setError] = useState("");
  const [apiResult, setApiResult] = useState("");

  async function handleLogin() {
    setError("");

    try {
      await keycloak.login({ redirectUri: `${window.location.origin}/login` });
    } catch (loginError) {
      console.error("Keycloak login failed", loginError);
      setError("Não foi possível iniciar o login. Tenta novamente.");
    }
  }

  async function handleLogout() {
    setError("");

    try {
      await keycloak.logout({
        redirectUri: `${window.location.origin}/login`,
      });
    } catch (logoutError) {
      console.error("Keycloak logout failed", logoutError);
      setError("Não foi possível terminar a sessão. Tenta novamente.");
    }
  }

  async function handleCheckApi() {
    setError("");
    setApiResult("");

    try {
      await keycloak.updateToken(30);

      const response = await fetch("http://localhost:8080/api/me", {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`A API respondeu com erro ${response.status}`);
      }

      const data = await response.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch (apiError) {
      console.error("API request failed", apiError);
      setError("Não foi possível consultar a API. Confirma se o backend está ligado.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        <h1>TaxiManager 🚕</h1>
        <h2>Bem-vindo de volta!</h2>
        {keycloak.authenticated ? (
          <>
            <p>
              Sessão iniciada
              {keycloak.tokenParsed?.preferred_username
                ? ` como ${keycloak.tokenParsed.preferred_username}`
                : ""}
              .
            </p>

            <button type="button" onClick={handleCheckApi}>
              Testar ligação à API
            </button>
            <button type="button" onClick={handleLogout}>
              Terminar sessão
            </button>

            {apiResult && <pre>{apiResult}</pre>}
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