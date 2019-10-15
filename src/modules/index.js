import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import note, { noteSaga } from './note';
import notes, { notesSaga } from './notes'

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  note,
  notes
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), noteSaga(), notesSaga()]);
}

export default rootReducer;
