import axios from 'axios';
export const API = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 1000
});

export const APIe = axios.create({
    baseURL: 'http://localhost:8880/api/',
    timeout: 1000
});