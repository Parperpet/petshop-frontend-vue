import axios from 'axios';

export const api = axios.create({
  //Produção
  baseURL: 'https://petshop-backend-springboot.herokuapp.com/', 

  //Desenvolvimento
  // baseURL: 'http://localhost:8010', 
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Content-type": "application/json;charset=UTF-8"
  }
})