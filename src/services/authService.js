import axios from "axios";

const API_URL = 'https://localhost:7176/api/Auth/';

const register = (email, password) => {
    return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data && response.data.token) {
                // localStorage.setItem('email', JSON.stringify(response.data.email));
                // localStorage.setItem('token', JSON.stringify(response.data.token));
                // localStorage.setItem('roles', JSON.stringify(response.data.roles));
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => { 
    localStorage.removeItem('user');
}
const getCurrentUser = () => { 
    return JSON.parse(localStorage.getItem('user'));
}
export default {
    register,
    login,
    logout,
    getCurrentUser
}