import client from './client';

export const writeNote = ({ title, standardPortion, ingredients, memo, tags }) =>
  client.post('/api/notes', { title, standardPortion, ingredients, memo, tags });

export const readNote = id => client.get(`/api/notes/${id}`);