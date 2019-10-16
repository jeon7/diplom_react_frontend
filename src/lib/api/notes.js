import client from './client';
import qs from 'qs';

export const writeNote = ({ title, standardPortion, ingredients, memo, tags }) =>
  client.post('/api/notes', { title, standardPortion, ingredients, memo, tags });

export const readNote = id => client.get(`/api/notes/${id}`);

// e.g) /api/notes?username=tester&page=2&tag=drinks
// bookmark list
export const listNotes = ({ page, username, tag, bookmark }) => {
  if (bookmark !== undefined) {
    const queryStringBookmarkCtrl = qs.stringify({
      bookmark
    });
    console.log(queryStringBookmarkCtrl);
    return client.patch(`/api/notes?${queryStringBookmarkCtrl}`);

  } else {
    const queryStringNoteList = qs.stringify({
      page,
      username,
      tag,
    });
    return client.get(`/api/notes?${queryStringNoteList}`);
  }
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

export const addBookmark = id => client.patch(`/api/notes?bookmark=add&id=${id}`);
export const removeBookmark = id => client.patch(`/api/notes?bookmark=remove&id=${id}`);

