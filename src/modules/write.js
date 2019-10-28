import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notesAPI from '../lib/api/notes';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // initialize all content
const CHANGE_FIELD = 'write/CHANGE_FIELD';

const [
  WRITE_NOTE,
  WRITE_NOTE_SUCCESS,
  WRITE_NOTE_FAILURE,
] = createRequestActionTypes('write/WRITE_NOTE'); // write note

const SET_ORIGINAL_NOTE = 'write/SET_ORIGINAL_NOTE';

const [
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
] = createRequestActionTypes('write/UPDATE_NOTE'); // modify note

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

// create saga 
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
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_NOTE]: state => ({
      ...state,
      note: null,
      noteError: null,
    }),
    [WRITE_NOTE_SUCCESS]: (state, { payload: note }) => ({
      ...state,
      note,
    }),
    [WRITE_NOTE_FAILURE]: (state, { payload: noteError }) => ({
      ...state,
      noteError,
    }),
    [UPDATE_NOTE_SUCCESS]: (state, { payload: note }) => ({
      ...state,
      note,
    }),
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
