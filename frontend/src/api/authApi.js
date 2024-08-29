import axios from 'axios';

export const register = async (userData) => {
    const { data } = await axios.post('/api/auth/register', userData);
    return data;
};

export const login = async (userData) => {
    const { data } = await axios.post('/api/auth/login', userData);
    return data;
};
