import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';

const NavBlock = styled.div`
  position: fixed;
  width: 100%;
  background: #65D2DE;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * import Responsive component style and added other style 
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  .section {
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 1px;
  }
`;


const Spacer = styled.div`
  height: 4rem;
`;

const Navbar = ({ linkMyNote, linkMyBookmark, linkShopping }) => {

  return (
    <>
      <NavBlock>
        <Wrapper>
          <Link to="/" className="section">Public Notes</Link>
          <Link to={linkMyNote} className="section">My Notes</Link>
          <Link to={linkMyBookmark} className="section">My Bookmarks</Link>
          <Link to={linkShopping} className="section">Shopping</Link>
        </Wrapper>
      </NavBlock>
      <Spacer />
    </>
  );
};

export default Navbar;