import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readNote, unloadNote } from '../../modules/note';
import NoteViewer from '../../components/note/NoteViewer';

const NoteViewerContainer = ({ match }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { noteId } = match.params;
  const dispatch = useDispatch();
  const { note, error, loading } = useSelector(({ note, loading }) => ({
    note: note.note,
    error: note.error,
    loading: loading['note/READ_NOTE'],
  }));

  useEffect(() => {
    dispatch(readNote(noteId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadNote());
    };
  }, [dispatch, noteId]);

  return <NoteViewer note={note} loading={loading} error={error} />;
};

export default withRouter(NoteViewerContainer);
