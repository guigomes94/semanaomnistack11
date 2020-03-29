import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const [cases, setCases] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setCases(res.data);
    })
  }, [ongId]);

  async function handleDeleteCase(id) {
    try {
      await api.delete(`cases/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })

      setCases(cases.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro!! Tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, { ongName }</span>

        <Link className="button" to="/cases/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {cases.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' })
              .format(incident.value)}</p>

            <button onClick={() => handleDeleteCase(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
        </li>
        ))}
      </ul>
    </div>
  );
}