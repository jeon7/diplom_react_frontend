import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoteList from '../../components/notes/NoteList';
import { listBookmarks } from '../../modules/;bookmarks';

const BookmarkListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { notes, error, loading, user } = useSelector(
    ({ bookmarks, loading, user }) => ({
      notes: bookmarks.notes,
      error: bookmarks.error,
      loading: loading['bookmarks/LIST_BOOKMARKS'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listBookmarks({ tag, username, page }));
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

export default withRouter(BookmarkListContainer);
