import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  },
});

export default api;