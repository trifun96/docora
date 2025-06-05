import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './users/components/LandingPage/Background';
import LoginPage from './users/components/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
