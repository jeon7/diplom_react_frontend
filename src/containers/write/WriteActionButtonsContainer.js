import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeNote, updateNote } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, standardPortion, ingredients, memo, tags, note, noteError, originalNoteId } =
    useSelector(({ write }) => ({
      title: write.title,
      standardPortion: write.standardPortion,
      ingredients: write.ingredients,
      memo: write.memo,
      tags: write.tags,
      note: write.note,
      noteError: write.noteError,
      originalNoteId: write.originalNoteId
    }));

  // 포스트 등록
  const onPublish = () => {
    if (originalNoteId) {
      dispatch(
        updateNote({
          title,
          standardPortion,
          ingredients,
          memo,
          tags,
          id: originalNoteId
        }));
      return;
    }
    dispatch(
      writeNote({
        title,
        standardPortion,
        ingredients,
        memo,
        tags,
      }))
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (note) {
      const { _id } = note;
      history.push(`/${_id}`);
    }
    if (noteError) {
      console.log(noteError);
    }
  }, [history, note, noteError]);
  return <WriteActionButtons
    onPublish={onPublish}
    onCancel={onCancel}
    isEdit={!!originalNoteId} />;
};

export default withRouter(WriteActionButtonsContainer);
