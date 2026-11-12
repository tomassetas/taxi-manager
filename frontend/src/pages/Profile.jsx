import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import keycloak, { keycloakReady } from "../auth/keycloak";
import { getCurrentUser } from "../services/userService";
import "../styles/Home.css";

function Profile() {
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        await keycloakReady;
        if (!active) return;

        if (!keycloak.authenticated) {
          setAuthenticated(false);
          return;
        }

        setAuthenticated(true);
        await keycloak.updateToken(30);
        const currentUser = await getCurrentUser(keycloak.token);
        if (active) setProfile(currentUser);
      } catch (profileError) {
        console.error("Profile request failed", profileError);
        if (active) {
          setError(
            profileError instanceof Error
              ? profileError.message
              : "Não foi possível carregar o perfil."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

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
        <h2>Perfil</h2>
        {loading ? (
          <p>A carregar...</p>
        ) : !authenticated ? (
          <>
            <p>Inicia sessão para consultar o teu perfil.</p>
            <Link to="/login" className="main-btn">
              Iniciar sessão
            </Link>
          </>
        ) : (
          <>
            <p>
              Sessão iniciada
              {keycloak.tokenParsed?.preferred_username
                ? ` como ${keycloak.tokenParsed.preferred_username}`
                : ""}.
            </p>
            {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
            {error && <p role="alert">{error}</p>}
            <button type="button" onClick={handleLogout}>
              Terminar sessão
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
