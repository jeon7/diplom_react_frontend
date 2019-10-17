import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shopping from '../../components/shopping/Shopping';
import { listNotes } from '../../modules/notes';
import { list } from '../../../node_modules/postcss/lib/postcss';

const ShoppingContainer = () => {
  const dispatch = useDispatch();
  const { notes, error, loading, user } = useSelector(
    ({ notes, loading, user }) => ({
      notes: notes.notes,
      error: notes.error,
      // loading: loading['notes/LIST_NOTES'],
      // user: user.user
    }),
  );

  useEffect(() => {
    const { tag, username, page, bookmark, id } = {
      tag: '',
      username: '',
      page: '',
      bookmark: list,
      id: ''
    };
    dispatch(listNotes({ tag, username, page, bookmark, id }));
  }, [dispatch]);

  let bookmarkedNotes = notes;

  return (
    <>
      <Shopping bookmarkedNotes={bookmarkedNotes} error={error} />
    </>
  );
};

export default ShoppingContainer;
