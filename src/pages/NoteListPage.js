import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import NotesListContainer from '../containers/notes/NotesListContainer';
import PaginationContainer from '../containers/notes/PaginationContainer';

const NoteListPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
      <NotesListContainer />
      <PaginationContainer />
    </>
  );
};

export default NoteListPage;
