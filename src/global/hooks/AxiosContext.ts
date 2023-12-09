import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import logout from "../utils/logout.utils";

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
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        )
    }, []);

    return props.children;
}

export default AxiosContext;