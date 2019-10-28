import client from './client';


export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// check for login and user
export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
