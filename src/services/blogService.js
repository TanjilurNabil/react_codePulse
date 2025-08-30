import axios from "axios";
// import authService from "./authService";

const API_URL = 'https://localhost:7176/api/BlogPosts/';
// const user = authService.getCurrentUser();
// const authHeader = () => {
//     return {Authorization: 'Bearer '+ user.token}
// }

const getBlogPosts = () => {
    return axios.get(API_URL);
}

export default {
    getBlogPosts
}