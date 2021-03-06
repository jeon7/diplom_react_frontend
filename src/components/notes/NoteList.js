import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const NoteListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WriteNoteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const NoteItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const NoteItem = ({ note }) => {
  const { createdDate, user, tags, title, memo, _id } = note;
  return (
    <NoteItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        createdDate={new Date(createdDate)}
      />
      <Tags tags={tags} />
      <p>{memo}</p>
    </NoteItemBlock>
  );
};

const NoteList = ({ notes, loading, error, showWriteButton }) => {
  if (error) {
    return <NoteListBlock>NoteList Error!</NoteListBlock>;
  }

  return (
    <NoteListBlock>
      <WriteNoteButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            New Note
          </Button>
        )}
      </WriteNoteButtonWrapper>
      {!loading && notes && (
        <div>
          {notes.map(note => (
            <NoteItem note={note} key={note._id} />
          ))}
        </div>
      )}
    </NoteListBlock>
  );
};

export default NoteList;
