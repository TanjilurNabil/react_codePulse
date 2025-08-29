import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const[email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const hanldleLogin = (e) => {
        e.preventDefault();
        setMessage('');
        authService.login(email, password).then(() => {
            navigate('/welcome');
            window.location.reload();
        },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            });
    };
    return (
        <form onSubmit={hanldleLogin}>
            <div>
                <label>Email:</label>
                <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit'>Login</button>
            {message && <div className='error'>{ message}</div> }
        </form>
    );
};

export default Login;