import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import NoteListContainer from '../containers/notes/NoteListContainer';
import PaginationContainer from '../containers/notes/PaginationContainer';

const NoteListPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
      <NoteListContainer />
      <PaginationContainer />
    </>
  );
};

export default NoteListPage;
