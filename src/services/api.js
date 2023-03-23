import axios from 'axios';

const _api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api",
    timeout:5000
});

_api.interceptors.request.use((config) => {

    const storedToken = localStorage.getItem('_token');

    if(storedToken){
        config.headers = {
            Authorization: `Bearer ${storedToken}`
        }
    }
    return config;
})

export default _api;