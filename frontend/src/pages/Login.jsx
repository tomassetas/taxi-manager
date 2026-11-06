import { Link } from "react-router-dom";
import "../styles/Home.css";


function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        <h1>TaxiManager 🚕</h1>
        <h2>Bem-vindo de volta!</h2>
        <p>Inicia sessão na tua conta.</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email@exemplo.com"
            required
          />

          <label>Palavra-passe</label>
          <input
            type="password"
            placeholder="A tua palavra-passe"
            required
          />

          <button type="submit">Iniciar Sessão</button>
        </form>

      </div>
    </div>
  );
}

export default Login;