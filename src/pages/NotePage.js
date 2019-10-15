import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import NoteViewerContainer from '../containers/note/NoteViewerContainer';
const NotePage = () => {

  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
      <NoteViewerContainer />
    </>
  );
};

export default NotePage;
