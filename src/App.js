import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage';
import Layout from './components/layout/Layout';
import ResourcesPage from './pages/ResourcesPage';
import TutorialPage from './pages/TutorialPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />
          <Route path="/tutorial" element={<TutorialPage></TutorialPage>} />
          <Route path="/resources" element={<ResourcesPage></ResourcesPage>} />
          <Route path="*" element={<ErrorPage></ErrorPage>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
