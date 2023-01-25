import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.exchangerate.host',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceGetUsers = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {
  axiosInstance,
  axiosInstanceGetUsers
} 