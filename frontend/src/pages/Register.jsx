import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import keycloak, { keycloakReady } from "../auth/keycloak";
import "../styles/Home.css";

function Register() {
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloakReady
      .then(() => setAuthenticated(Boolean(keycloak.authenticated)))
      .catch((registerError) => {
        console.error("Keycloak initialization failed", registerError);
        setError("Não foi possível inicializar a autenticação.");
      });
  }, []);

  async function handleRegister() {
    setError("");

    try {
      await keycloakReady;
      await keycloak.register({
        redirectUri: `${window.location.origin}/profile`,
      });
    } catch (registerError) {
      console.error("Keycloak registration failed", registerError);
      setError("Não foi possível iniciar o registo. Tenta novamente.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        <h1>TaxiManager 🚕</h1>
        <h2>Criar conta</h2>
        {authenticated ? (
          <>
            <p>
              Já tens sessão iniciada
              {keycloak.tokenParsed?.preferred_username
                ? ` como ${keycloak.tokenParsed.preferred_username}`
                : ""}.
            </p>
            <Link to="/profile" className="main-btn">
              Continuar para o perfil
            </Link>
          </>
        ) : (
          <>
            <p>
              A conta será criada pelo Keycloak. Depois, será necessário criar
              o perfil de cliente na aplicação.
            </p>
            <button type="button" onClick={handleRegister}>
              Continuar para o registo
            </button>
            <p>
              Já tens conta? <Link to="/login">Iniciar sessão</Link>
            </p>
          </>
        )}
        {error && <p role="alert">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
