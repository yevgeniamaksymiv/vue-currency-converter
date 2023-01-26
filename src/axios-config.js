import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.exchangerate.host',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceGetUsers = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {
  axiosInstance,
  axiosInstanceGetUsers
} 