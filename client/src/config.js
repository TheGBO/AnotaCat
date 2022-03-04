import axios from 'axios';

const api = axios.create({baseURL:"http://localhost:6088/api"});

export default api;