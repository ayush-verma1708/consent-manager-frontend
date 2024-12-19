// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ConsentCreationPage from './pages/ConsentCreationPage.js';
import BannerPage from './pages/BannerPage.js';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create-banner' element={<ConsentCreationPage />} />
      <Route path='/View-Banner' element={<BannerPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
