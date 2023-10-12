import axios from "axios";


export const setAxiosAuthorizationHeader = (bearerToken: string) => {
    localStorage.setItem('token', bearerToken);
    axios.defaults.headers.common['Authorization'] = 'Bearer  ' + bearerToken;
}

export const removeAxiosAuthorizationHeader = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
}