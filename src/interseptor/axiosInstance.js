

import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'https://api.newtimes.az/api/',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    if(response.config.method === 'delete'){
      
      toast.error(response.data.message)
    }
    if(response.config.method === 'post'){
      
      toast.success(response.data.message)
    }
    return response.data;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - 401');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
