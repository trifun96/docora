import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './users/components/LandingPage/Background';
import LoginPage from './users/components/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docora" replace />} />
      
      <Route path="/docora" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
