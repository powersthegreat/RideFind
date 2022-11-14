import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage';
import Layout from './components/layout/Layout';
import ResourcesPage from './pages/resourcePage/ResourcesPage';
import TutorialPage from './pages/tutorialPage/TutorialPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          
            <Route path="/" element={<MainPage/>} />
            <Route path="/tutorial" element={<TutorialPage/>} />
            <Route path="/resources" element={<ResourcesPage/>} />
            <Route path="*" element={<ErrorPage/>} />
         
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
