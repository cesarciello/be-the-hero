import "./styles.scss";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";
import React, { useEffect, useState, useCallback } from "react";

export default function Profile() {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");
  let [listIncidents, setListIncidents] = useState([]);

  const getAllIncidentsByOng = useCallback( () => {
    api.get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setListIncidents(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [ongId])

  useEffect(() => {
    getAllIncidentsByOng()
  }, [ongId, getAllIncidentsByOng]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId }
      });
      getAllIncidentsByOng();
      alert("Caso Excluido com sucesso!");
    } catch (err) {
      alert("Erro ao deletar o caso!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logo" />

        <span>Bem vida, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadatrar novo caso
        </Link>
        <button onClick={ handleLogout } >
          <FiPower size={18} />
        </button>
      </header>

      <h1>Casos Cadastrados:</h1>

      <ul>
        {listIncidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {" "}
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}{" "}
            </p>

            <button>
              {" "}
              <FiTrash2
                onClick={() => handleDelete(incident.id)}
                size={20}
                color="#a8a8b3"
              />{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
