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
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .section {
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 1px;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const Navbar = ({ user }) => {
  let linkMyNote = '/';
  if (user) {
    linkMyNote = `/?username=${user.username}`;
  }
  return (
    <>
      <NavBlock>
        <Wrapper>
          <Link to="/" className="section">Public Notes</Link>
          <Link to={linkMyNote} className="section">My Notes</Link>
          <Link to="/" className="section">My Bookmark</Link>
          <Link to="/" className="section">Plan and Shopping</Link>
        </Wrapper>
      </NavBlock>
      <Spacer />
    </>
  );
};

export default Navbar;