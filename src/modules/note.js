import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notesAPI from '../lib/api/notes';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_NOTE,
  READ_NOTE_SUCCESS,
  READ_NOTE_FAILURE,
] = createRequestActionTypes('note/READ_NOTE');
const UNLOAD_NOTE = 'note/UNLOAD_NOTE';

export const readNote = createAction(READ_NOTE, id => id);
export const unloadNote = createAction(UNLOAD_NOTE);

const readNoteSaga = createRequestSaga(READ_NOTE, notesAPI.readNote);
export function* noteSaga() {
  yield takeLatest(READ_NOTE, readNoteSaga);
}

const initialState = {
  note: null,
  error: null,
};

const note = handleActions(
  {
    [READ_NOTE_SUCCESS]: (state, { payload: note }) => ({
      ...state,
      note,
    }),
    [READ_NOTE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_NOTE]: () => initialState,
  },
  initialState,
);

export default note;
