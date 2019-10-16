import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';


const NoteViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const NoteHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
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
  /* 최소 크기 지정 및 padding 제거 */
  padding: 0;
  min-height: 320px;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  outline-color: 1px solid ${palette.gray[4]};
  width: 100%;
  border: none;
`;

const NoteViewer = ({ note, error, loading, actionButtons }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <NoteViewerBlock>Can not find the note</NoteViewerBlock>;
    }
    return <NoteViewerBlock>Error!</NoteViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !note) {
    return null;
  }

  const { title, standardPortion, ingredients, memo, user, createdDate, tags } = note;

  const showStandardPortion = `Standard Portion: ${standardPortion}`;

  return (
    <NoteViewerBlock>
      <NoteHead>
        <h1>{title}</h1>
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
