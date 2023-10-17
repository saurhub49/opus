import axios from "axios";
import { useEffect } from "react";


export default function useAxiosConfig() {
    useEffect(() => {
        const token = localStorage.getItem('token')
        //axios.defaults.headers.common['Authorization'] = 'Bearer  ' + token;
        axios.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }, [])
}