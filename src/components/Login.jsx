import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
// import * as yup from 'yup';
// const schema = yup.object({
//         email: yup.string().email('Invalid email format').required('Email is required'),
//         password: yup.string().required('Password is required')
//     })
//         .required();
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
        <div className='row mt-5 align-items-center justify-content-center'>
            <div className='col-md-6 '>
                <div className='card h-100'>
                    <div className='card-header align-items-center'>
                        <h2>Login</h2>
                    </div>
                    <div className='card-body d-flex flex-column'>
<form onSubmit={hanldleLogin}>
            <div className='form-group'>
                <label>Email:</label>
                <input className='form-control' type="text"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='mt-2 d-flex justify-content-center'>
<button className='btn btn-primary' type='submit'>Login</button>
            </div>
            
            {message && <div className='error'>{ message}</div> }
        </form>
                    </div>
                </div>
                    
            </div>
        
            
        </div>
        
    );
};

export default Login;