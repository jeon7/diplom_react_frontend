import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import BookmarkListContainer from '../containers/notes/;BookmarkListContainer';
import PaginationContainer from '../containers/notes/PaginationContainer';

const BookmarkListPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
      <BookmarkListContainer />
      <PaginationContainer />
    </>
  );
};

export default BookmarkListPage;