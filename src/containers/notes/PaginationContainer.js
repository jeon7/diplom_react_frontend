import React from 'react';
import Pagination from '../../components/notes/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
  const { lastPage, notes, loading } = useSelector(({ notes, loading }) => ({
    lastPage: notes.lastPage,
    notes: notes.notes,
    loading: loading['notes/LIST_NOTES'],
  }));

  if (!notes || loading) return null;

  const { tag, username, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
