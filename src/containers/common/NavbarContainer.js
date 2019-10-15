import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';

const NavbarContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return (
    <Navbar user={user} />
  );
};

export default NavbarContainer;