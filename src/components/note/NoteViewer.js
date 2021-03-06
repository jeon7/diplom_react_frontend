import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import Button from '../common/Button';


const NoteViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const NoteHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    line-height: 1.5;
    margin: 0;
    display: inline;
  }
`;
const BookmarkButton = styled(Button)`
  float: right;
  background: #F4EF4E;
  color: ${palette.gray[8]};
  &:hover {
    background: #EDC448;
  }
`;


const PortionView = styled.input`
  font-size: 1rem;
  padding: 0.2rem;
  margin-bottom: 2rem;
  width: 100%;
  border: none;
`;

const Textarea = styled.textarea`
  padding: 0;
  min-height: 320px;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  outline-color: 1px solid ${palette.gray[4]};
  width: 100%;
  border: none;
`;

const NoteViewer = ({ note, error, loading, actionButtons, isBookmarked, onBookmarkAdd, onBookmarkRemove }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <NoteViewerBlock>Can not find the note</NoteViewerBlock>;
    }
    return <NoteViewerBlock>NoteViwer Error!</NoteViewerBlock>;
  }

  // if during loading or no note 
  if (loading || !note) {
    return null;
  }

  const { title, standardPortion, ingredients, memo, user, createdDate, tags } = note;

  let onBookmarkClick = null;
  if (isBookmarked) {
    onBookmarkClick = onBookmarkRemove;
  } else {
    onBookmarkClick = onBookmarkAdd;
  }

  const showStandardPortion = `Standard Portion: ${standardPortion}`;

  return (
    <NoteViewerBlock>
      <NoteHead>
        <div>
          <h1>{title}</h1>
          <BookmarkButton onClick={onBookmarkClick}>
            {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          </BookmarkButton>
        </div>

        <SubInfo
          username={user.username}
          createdDate={createdDate}
          hasMarginTop
        />
        <Tags tags={tags} />
      </NoteHead>
      {actionButtons}
      <PortionView
        value={showStandardPortion}
        readOnly={true}
      />
      <Textarea
        value={ingredients}
        readOnly={true}
      />
      <Textarea
        value={memo}
        readOnly={true}
      />
    </NoteViewerBlock>
  );
};

export default NoteViewer;
