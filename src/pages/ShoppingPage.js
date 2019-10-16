import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import ShoppingContainer from '../containers/shopping/ShoppingContainer';

const ShoppingPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
      <ShoppingContainer />
    </>
  );
};

export default ShoppingPage;