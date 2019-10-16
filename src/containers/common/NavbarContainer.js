import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';

const NavbarContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  let linkMyNote = '/';
  let linkMyBookmark = '/';
  let linkShopping = '/';
  if (user) {
    linkMyNote = `/?username=${user.username}`;
    linkMyBookmark = `/?bookmark=list`;
    linkShopping = '/shopping';
  }

  return (
    <Navbar
      linkMyNote={linkMyNote}
      linkMyBookmark={linkMyBookmark}
      linkShopping={linkShopping} />
  );
};

export default NavbarContainer;