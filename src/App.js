import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>} />
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
