import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use((response) => {
  if (response.data.data && Object.keys(response.data).length === 1) {
    response.data = response.data.data;
  }

  return response;
});

export default api;
