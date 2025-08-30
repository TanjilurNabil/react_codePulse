import axios from "axios";
import authService from "./authService";

const API_URL = 'https://localhost:7176/api/Categories/';
const user = authService.getCurrentUser();
const authHeader = () => {
    return { Authorization: 'Bearer ' + user.token };
};

const getCategories = () => {
    return axios.get(API_URL, { headers: authHeader() });
};
const createCategories = (name, urlHandle) => {
    return axios.post(API_URL, { name, urlHandle }, { headers: authHeader() });
};
const updateCategory = (id, name,urlHandle) => {
    return axios.put(API_URL + id, { name,urlHandle }, { headers: authHeader() });
};

const deleteCategory = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

export default {
    getCategories,
    createCategories,
    updateCategory,
    deleteCategory
}
