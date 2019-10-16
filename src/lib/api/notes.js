import client from './client';
import qs from 'qs';

export const writeNote = ({ title, standardPortion, ingredients, memo, tags }) =>
  client.post('/api/notes', { title, standardPortion, ingredients, memo, tags });

export const readNote = id => client.get(`/api/notes/${id}`);

// e.g) /api/notes?username=tester&page=2
export const listNotes = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/notes?${queryString}`);
};

export const updateNote = ({ id, title, standardPortion, ingredients, memo, tags }) =>
  client.patch(`api/notes/${id}`, {
    title,
    standardPortion,
    ingredients,
    memo,
    tags
  });

export const removeNote = id => client.delete(`/api/notes/${id}`);
export const listBookmarks = () => client.get(`/api/bookmarks`);