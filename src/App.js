import React from 'react';
import { Route } from 'react-router-dom';
import NoteListPage from './pages/NoteListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import NotePage from './pages/NotePage';
// import BookmarkListPage from './pages/BookmarkListPage';

const App = () => {
  return (
    <>
      <Route component={NoteListPage} path="/" exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={NotePage} path="/:noteId" />
      {/* <Route component={BookmarkListPage} path="/bookmarks" exact /> */}
    </>
  );
};
export default App;
