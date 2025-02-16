import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AuthVerification from './pages/AuthVerification';

const App = () => {
  return (
    <Routes>
      <Route path="/authVerification" element={<AuthVerification />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;