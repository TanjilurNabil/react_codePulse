import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
const Register = () => {
    const[email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const hanldleRegistration = (e) => {
        e.preventDefault();
        setMessage('');
        authService.register(email, password).then(() => {
            navigate('/login');
            window.location.reload();
        },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            });
    };
    return (
        <form onSubmit={hanldleRegistration}>
            <div>
                <label>Email:</label>
                <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit'>Register</button>
            {message && <div className='error'>{ message}</div> }
        </form>
    );
};

export default Register;