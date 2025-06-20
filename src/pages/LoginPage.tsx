import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { showAlert } from '../utills/alert';
import { useUser } from '../hooks/useUser';


const LoginPage: React.FC =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
           const data = await login(email, password);
           if(data.status === 'success'){
                setUser(data.data.user);
                showAlert('success', 'Logged in successfully!');
                setTimeout(() => navigate('/'), 1000);
           } 
        }catch (err: unknown) {
            let message = 'Login failed, Please try again!';
            if (axios.isAxiosError(err)) {
              message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
              message = err.message;
            }
        
            showAlert('error', message);
          }  
    };
    return(
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
                <form className='form form--login' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>Email address</label>
                        <input id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="form__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form__group">
                        <button type="submit" className="btn btn--green">Login</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
export default LoginPage;