import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.exchangerate.host',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;