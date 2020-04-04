import React, {useState} from 'react';
import './styles.css';
import herosImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom"
import api from '../../services/api'

export default function Logon(){

    const history = useHistory();
    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }catch (err){
            alert('Falha no login, tente novamente.')
        }
    }

    return(
        <div className="logon-cont">
            <section className="form">
                <img src={logo} alt="Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className='backLink' to="/register">
                        <FiLogIn size={16} color="E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heroes"/>
        </div>
    )
}
