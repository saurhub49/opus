import axios, { AxiosError } from "axios";
import { useEffect } from "react";

interface AxiosContextProps {
    children: React.ReactElement;
}

const AxiosContext: React.FC<AxiosContextProps> = (props) => {
    useEffect(() => {
        const token = localStorage.getItem('token')
        
        axios.interceptors.request.use(
            (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        )
    }, []);

    return props.children;
}

export default AxiosContext;