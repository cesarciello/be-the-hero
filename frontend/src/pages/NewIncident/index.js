import "./styles.css";
import api from '../../services/api';
import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

export default function NewIncident() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem('ongId');
  const [description, setDescescription] = useState("");

  async function heandleCreateIncident(e) {
    e.preventDefault();
    try { 
      await api.post('incidents', { title, description, value }, {
        headers: {
          Authorization: ongId
        }
      });
      clearValues();
      history.push('/profile');
    } catch(err) {
      alert(`Não foi possivel criar esse inicente, tente novamente!`);
    }
  }

  function clearValues() {
    setTitle('');
    setValue('');
    setDescescription('');
  }

  function handleClearForm(e) {
    e.preventDefault();
    clearValues();
  }

  return (
    <div className="newIncident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo" />
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para um heroi resolver.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color={"#E02041"} />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={heandleCreateIncident}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Título"
          />
          <textarea
            value={description}
            onChange={e => setDescescription(e.target.value)}
            type="email"
            placeholder="Descrição"
          />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em Reais"
          />

          <div className="group-buttons">
            <button className="button" type="submit">
              Cadastrar
            </button>
            <button onClick={handleClearForm} className="button">
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
