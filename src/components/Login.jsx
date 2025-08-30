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
            navigate('/');
            window.location.reload();
        },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            });
    };
    return (
        <form onSubmit={hanldleLogin}>
            <div className='form-group'>
                <label>Email:</label>
                <input className='form-control' type="text"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='mt-2'>
<button className='btn btn-primary ' type='submit'>Login</button>
            </div>
            
            {message && <div className='error'>{ message}</div> }
        </form>
    );
};

export default Login;