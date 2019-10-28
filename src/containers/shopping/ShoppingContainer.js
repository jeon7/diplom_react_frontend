import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shopping from '../../components/shopping/Shopping';
import { listNotes } from '../../modules/notes';
import { list } from '../../../node_modules/postcss/lib/postcss';

const ShoppingContainer = () => {
  const dispatch = useDispatch();
  const { notes, error } = useSelector(
    ({ notes }) => ({
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

  //todo: excute after loading=(false->true->false), useEffect
  let bookmarkedNotes = notes;

  console.log('shoppingContainer-bookmarkedNotes: ', bookmarkedNotes);
  return (
    <>
      <Shopping bookmarkedNotes={bookmarkedNotes} error={error} />
    </>
  );
};

export default ShoppingContainer;
