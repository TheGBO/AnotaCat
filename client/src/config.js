import axios from 'axios';

const api = axios.create({baseURL:"https://anotacat.herokuapp.com/api"});

export default api;