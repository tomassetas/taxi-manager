import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import keycloak, { keycloakReady } from "../auth/keycloak";
import "../styles/Home.css";

const gestorActions = [
  {
    title: "Criar gestor",
    description: "Criar uma conta para outro gestor.",
  },
  {
    title: "Criar motorista",
    description: "Criar uma conta de motorista, incluindo o número da carta.",
  },
  {
    title: "Registar táxi",
    description: "Adicionar um táxi à frota.",
  },
];

function GestorDashboard() {
  const [access, setAccess] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        await keycloakReady;
        if (!keycloak.authenticated) {
          if (active) setAccess("unauthenticated");
          return;
        }

        await keycloak.updateToken(30);
        const roles = keycloak.tokenParsed?.realm_access?.roles ?? [];
        if (active) setAccess(roles.includes("GESTOR") ? "allowed" : "forbidden");
      } catch (accessError) {
        console.error("Manager access check failed", accessError);
        if (active) {
          setError("Não foi possível verificar as permissões desta conta.");
          setAccess("error");
        }
      }
    }

    checkAccess();
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
      setError("Não foi possível terminar a sessão.");
    }
  }

  if (access === "checking") {
    return (
      <main className="login-page">
        <p role="status">A verificar a sessão e as permissões...</p>
      </main>
    );
  }

  if (access === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (access === "forbidden") {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>Acesso restrito</h1>
          <p>Esta área está disponível apenas para utilizadores com a role GESTOR.</p>
          <Link to="/" className="main-btn">Voltar ao início</Link>
        </section>
      </main>
    );
  }

  if (access === "error") {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>Não foi possível validar o acesso</h1>
          <p role="alert">{error}</p>
          <Link to="/login" className="main-btn">Voltar ao login</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page">
      <section className="login-card manager-dashboard">
        <Link to="/" className="back-link">← Voltar ao início</Link>
        <h1>TaxiManager 🚕</h1>
        <h2>Área do gestor</h2>
        <p>
          Olá
          {keycloak.tokenParsed?.preferred_username
            ? `, ${keycloak.tokenParsed.preferred_username}`
            : ""}. Estas são as ações disponíveis para a tua conta.
        </p>

        <div className="manager-actions">
          {gestorActions.map((action) => (
            <article className="manager-action" key={action.title}>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
              <span>Formulário a implementar</span>
            </article>
          ))}
        </div>

        {error && <p role="alert">{error}</p>}
        <button type="button" onClick={handleLogout}>Terminar sessão</button>
      </section>
    </main>
  );
}

export default GestorDashboard;
