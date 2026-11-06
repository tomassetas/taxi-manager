import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <h2>🚕 TaxiManager</h2>

        <Link to="/login" className="login-btn">
          Iniciar Sessão
        </Link>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <span className="tag">GESTÃO INTELIGENTE DE TÁXIS</span>

          <h1>
            A gestão da tua frota,
            <span> mais simples.</span>
          </h1>

          <p>
            Gere motoristas, veículos, viagens e toda a operação
            da tua empresa de táxis num único lugar.
          </p>

          <Link to="/login" className="main-btn">
            Começar agora →
          </Link>
        </div>

        <div className="hero-icon">
          🚕
        </div>
      </main>

      <section className="features">
        <h2>Tudo o que precisas num só lugar</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🚖</span>
            <h3>Gestão de Táxis</h3>
            <p>Organiza e acompanha os veículos da tua frota.</p>
          </div>

          <div className="feature-card">
            <span>👨‍✈️</span>
            <h3>Motoristas</h3>
            <p>Gere motoristas, turnos e respetiva atividade.</p>
          </div>

          <div className="feature-card">
            <span>📊</span>
            <h3>Relatórios</h3>
            <p>Acompanha viagens, pagamentos e resultados.</p>
          </div>
        </div>
      </section>

      <footer>
        © 2026 TaxiManager — Gestão de frotas simplificada.
      </footer>

    </div>
  );
}

export default Home;