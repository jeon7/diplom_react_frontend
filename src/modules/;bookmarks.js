import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notesAPI from '../lib/api/notes';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_BOOKMARKS,
  LIST_BOOKMARKS_SUCCESS,
  LIST_BOOKMARKS_FAILURE,
] = createRequestActionTypes('bookmarks/LIST_BOOKMARKS');

export const listBookmarks = createAction(
  LIST_BOOKMARKS,
  ({ tag, username, page }) => ({ tag, username, page }),
);

const listBookmarksSaga = createRequestSaga(LIST_BOOKMARKS, notesAPI.listBookmarks);

export function* bookmarksSaga() {
  yield takeLatest(LIST_BOOKMARKS, listBookmarksSaga);
}

const initialState = {
  bookmarks: null,
  error: null,
  lastPage: 1,
};

const bookmarks = handleActions(
  {
    [LIST_BOOKMARKS_SUCCESS]: (state, { payload: bookmarks, meta: response }) => ({
      ...state,
      bookmarks: bookmarks,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_BOOKMARKS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default bookmarks;