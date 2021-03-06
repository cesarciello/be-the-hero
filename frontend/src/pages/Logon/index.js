import "./styles.scss";
import api from '../../services/api';
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile');
    } catch (err) {
      alert('Falha no login, Tente Novamente!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Faça seu Login</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
            type="text"
          />
          <button onClick={handleLogin} className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color={"#E02041"} />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img className="heroesImg" src={heroesImg} alt="Heroes" />
    </div>
  );
}
