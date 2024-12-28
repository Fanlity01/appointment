import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css'

const app = createApp(App);
axios.defaults.baseURL = 'http://localhost:8080/api';

// 请求拦截器，添加Token到请求头
axios.interceptors.request.use(config => { 
    const token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.token =  token;

    }
    return config;
}, error => { 
    return Promise.reject(error);
})
axios.interceptors.response.use(response => { 
    return response;
}, error => { 
    return Promise.reject(error);
})
app.config.globalProperties.$axios = axios;
app.use(router).mount('#app')
