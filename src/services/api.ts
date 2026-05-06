import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000', // Sua URL do json-server
  timeout: 5000, // Se demorar mais de 5s, cancela
  headers: {
    'Content-Type': 'application/json',
  }
});
