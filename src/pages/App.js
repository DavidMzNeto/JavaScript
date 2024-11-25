import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LivroView } from "../livros/LivroView";
import { PesquisaLivros } from "../livros/pesquisa";
import styles from "./app.module.css";
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <button className="button">Estante</button>
            </Link>
          </li>
          <li>
            <Link to="/pesquisa">
              <button className="button">Pesquisar Livros</button>
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LivroView />} />
        <Route path="/pesquisa" element={<PesquisaLivros />} />
      </Routes>
    </Router>
  );
}

export default App;
