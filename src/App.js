import React from 'react';
import { Route } from 'react-router-dom';
import NoteListPage from './pages/NoteListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import NotePage from './pages/NotePage';
import ShoppingPage from './pages/ShoppingPage';

const App = () => {
  return (
    <>
      <Route component={NoteListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={NotePage} path="/@:username/:noteId" />
      <Route component={ShoppingPage} path="/shopping" />
    </>
  );
};

export default App;
