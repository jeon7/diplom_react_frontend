import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer'

const WritePage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonContainer />
      </Responsive>
    </>
  );
};

export default WritePage;
