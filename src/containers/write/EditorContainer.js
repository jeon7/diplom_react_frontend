import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, standardPortion, ingredients, memo } = useSelector(({ write }) => ({
    title: write.title,
    standardPortion: write.standardPortion,
    ingredients: write.ingredients,
    memo: write.memo
  }));
  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);
  // initialize when unmount
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor
    onChangeField={onChangeField}
    title={title}
    standardPortion={standardPortion}
    ingredients={ingredients}
    memo={memo} />;
};

export default EditorContainer;
