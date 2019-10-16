import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notesAPI from '../lib/api/notes';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기

const [
  WRITE_NOTE,
  WRITE_NOTE_SUCCESS,
  WRITE_NOTE_FAILURE,
] = createRequestActionTypes('write/WRITE_NOTE'); // 포스트 작성

const SET_ORIGINAL_NOTE = 'write/SET_ORIGINAL_NOTE';

const [
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
] = createRequestActionTypes('write/UPDATE_NOTE'); // 포스트 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeNote = createAction(WRITE_NOTE,
  ({ title, standardPortion, ingredients, memo, tags }) => ({
    title,
    standardPortion,
    ingredients,
    memo,
    tags,
  }));
export const setOriginalNote = createAction(SET_ORIGINAL_NOTE, note => note);
export const updateNote = createAction(UPDATE_NOTE,
  ({ id, title, standardPortion, ingredients, memo, tags }) => ({
    id,
    title,
    standardPortion,
    ingredients,
    memo,
    tags,
  }));

// saga 생성
const writeNoteSaga = createRequestSaga(WRITE_NOTE, notesAPI.writeNote);
const updateNoteSaga = createRequestSaga(UPDATE_NOTE, notesAPI.updateNote);
export function* writeSaga() {
  yield takeLatest(WRITE_NOTE, writeNoteSaga);
  yield takeLatest(UPDATE_NOTE, updateNoteSaga);
}

const initialState = {
  title: '',
  standardPortion: null,
  ingredients: '',
  memo: '',
  tags: [],
  note: null,
  noteError: null,
  originalNoteId: null
};

const write = handleActions(
  {
    [INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_NOTE]: state => ({
      ...state,
      // note와 noteError를 초기화
      note: null,
      noteError: null,
    }),
    // 포스트 작성 성공
    [WRITE_NOTE_SUCCESS]: (state, { payload: note }) => ({
      ...state,
      note,
    }),
    // 포스트 작성 실패
    [WRITE_NOTE_FAILURE]: (state, { payload: noteError }) => ({
      ...state,
      noteError,
    }),
    // 포스트 수정 성공
    [UPDATE_NOTE_SUCCESS]: (state, { payload: note }) => ({
      ...state,
      note,
    }),
    // 포스트 수정 실패
    [UPDATE_NOTE_FAILURE]: (state, { payload: noteError }) => ({
      ...state,
      noteError,
    }),
    [SET_ORIGINAL_NOTE]: (state, { payload: note }) => ({
      ...state,
      title: note.title,
      standardPortion: note.standardPortion,
      ingredients: note.ingredients,
      memo: note.memo,
      tags: note.tags,
      originalNoteId: note._id
    })
  },
  initialState,
);

export default write;
