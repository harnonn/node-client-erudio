import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import padlock from '../../assets/padlock.png';
import api from '../../services/api' ;

export default function Login() {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate(); //antigo history!

    async function login(e) {
        e.preventDefault();
        const data = {
            username,
            password,
        };
        try {
            const response = await api.post('auth/signin', data);
            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log(response.data.accessToken);
            navigate('/books');
        } catch (error) {
            console.log(error);
            alert('Login failed! Try again');
        }
    }


    return  (
       <div className='login-container'>
            <section className='form'>
                <img src={logoImage} alt='Erudio Logo'/>
                <form onSubmit={login}>
                    <h1>Access you Account</h1>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Username'/>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password'/>
                    <button type='submit' className='button'>Login</button>
                </form>
            </section>
            <img src={padlock} alt='Login'/>
       </div>
    )
}