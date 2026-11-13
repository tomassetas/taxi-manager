import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <main className="login-page">
      <section className="login-card home-card">
        <h1>TaxiManager 🚕</h1>
        <p>Inicia sessão ou cria uma conta para continuar.</p>
        <div className="home-actions">
          <Link to="/login" className="main-btn">
            Iniciar sessão
          </Link>
          <Link to="/register" className="secondary-btn">
            Criar conta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;