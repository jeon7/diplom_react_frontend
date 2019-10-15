import client from './client';

export const writeNote = ({ title, standardPortion, ingredients, memo, tags }) =>
  client.post('/api/notes', { title, standardPortion, ingredients, memo, tags });
