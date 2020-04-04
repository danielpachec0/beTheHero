import React, {useEffect, useState} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom"
import api from '../../services/api'


export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            } 
        }).then(response => {
            setIncidents(response.data);
            console.log(response.data)
        })
    },[ongId])


    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {headers : {
                Authorization: ongId,
            
            }});

            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (error) {
            alert('Erro ao deletar incidente.')
        }
    }

    function handleLogOut(){
        localStorage.clear();
        history.push('/')
    }    

    return(
        <div className='cont'>
            <header>
                <img src={logo} alt="Logo"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to='/incident/new'>Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color='#E02041'/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#A8A8B3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};