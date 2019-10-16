import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoteList from '../../components/notes/NoteList';
import { listNotes } from '../../modules/notes';

const NoteListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { notes, error, loading, user } = useSelector(
    ({ notes, loading, user }) => ({
      notes: notes.notes,
      error: notes.error,
      loading: loading['notes/LIST_NOTES'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listNotes({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <NoteList
      loading={loading}
      error={error}
      notes={notes}
      showWriteButton={user}
    />
  );
};

export default withRouter(NoteListContainer);
