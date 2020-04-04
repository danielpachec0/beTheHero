import React,{useState} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom"
import api from '../../services/api'


export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    
    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso.');
    }
  }


  return(
        <div className="container">
            <div className="content">
            <section>
          <img src={logo} alt="Be The Hero"/>
          
          <h1>Cadastrar novo caso</h1>
          <p>Descravo o caso detalhadamente.</p>
          
          <Link className="backLink" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            value = {title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titulo do caso"
          />
          <textarea 
            value = {description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input 
            value = {value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}