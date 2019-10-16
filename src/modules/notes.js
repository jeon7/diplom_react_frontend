import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notesAPI from '../lib/api/notes';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_NOTES,
  LIST_NOTES_SUCCESS,
  LIST_NOTES_FAILURE,
] = createRequestActionTypes('notes/LIST_NOTES');


export const listNotes = createAction(
  LIST_NOTES,
  ({ tag, username, page, bookmark, id }) => ({ tag, username, page, bookmark, id }),
);

const listNotesSaga = createRequestSaga(LIST_NOTES, notesAPI.listNotes);

export function* notesSaga() {
  yield takeLatest(LIST_NOTES, listNotesSaga);
}

const initialState = {
  notes: null,
  error: null,
  lastPage: 1,
};

const notes = handleActions(
  {
    [LIST_NOTES_SUCCESS]: (state, { payload: notes, meta: response }) => ({
      ...state,
      notes,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_NOTES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default notes;
