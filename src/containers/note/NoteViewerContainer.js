import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';
import { readNote, unloadNote } from '../../modules/note';
import { setOriginalNote } from '../../modules/write';
import NoteViewer from '../../components/note/NoteViewer';
import NoteActionButtons from '../../components/note/NoteActionButtons';
import { removeNote, addBookmark, removeBookmark } from '../../lib/api/notes';

const NoteViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { noteId } = match.params;
  const dispatch = useDispatch();

  const { note, error, loading, user } = useSelector(({ note, loading, user }) => ({
    note: note.note,
    error: note.error,
    loading: loading['note/READ_NOTE'],
    user: user.user
  }));


  const onEdit = () => {
    dispatch(setOriginalNote(note));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removeNote(noteId);
      history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(readNote(noteId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadNote());
    };
  }, [dispatch, noteId]);

  /////////////////////////////////////////////////////////////////////
  // for bookmark add remove
  /////////////////////////////////////////////////////////////////////

  // check user bookmarks

  useEffect(() => {
    dispatch(check());
  }, [dispatch])

  let bookmarkedNoteIds = null;
  let isBookmarked = false;
  if (user !== null) {
    bookmarkedNoteIds = user.bookmarkedNoteIds;
  }
  if (bookmarkedNoteIds) {
    isBookmarked = bookmarkedNoteIds.includes(noteId);;
    console.log('isBookmarked: ', isBookmarked);
  }

  const onBookmarkAdd = async () => {
    try {
      await addBookmark(noteId);
      isBookmarked = true;
      history.push('/?bookmark=list');
    } catch (e) {
      console.log(e);
    }
  }

  const onBookmarkRemove = async () => {
    try {
      await removeBookmark(noteId);
      isBookmarked = false;
      history.push('/?bookmark=list');
    } catch (e) {
      console.log(e);
    }
  }

  const ownNote = (user && user._id) === (note && note.user._id);
  console.log('ownNote: ', ownNote);
  return (
    <NoteViewer
      note={note}
      loading={loading}
      error={error}
      actionButtons={ownNote && <NoteActionButtons onEdit={onEdit} onRemove={onRemove} />}
      isBookmarked={isBookmarked}
      onBookmarkAdd={onBookmarkAdd}
      onBookmarkRemove={onBookmarkRemove}
    />
  );
};

export default withRouter(NoteViewerContainer);
