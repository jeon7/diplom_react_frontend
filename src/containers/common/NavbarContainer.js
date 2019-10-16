import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';

const NavbarContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  let linkMyNote = '/';
  let linkMyBookmark = '/';
  if (user) {
    linkMyNote = `/?username=${user.username}`;
    // linkMyBookmark = `/....`;
  }

  return (
    <Navbar
      linkMyNote={linkMyNote}
      linkMyBookmark={linkMyBookmark} />
  );
};

export default NavbarContainer;