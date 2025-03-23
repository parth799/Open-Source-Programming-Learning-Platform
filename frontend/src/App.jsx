import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import LanguagePage from './pages/LanguagePage';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/language/:languageId" element={<LanguagePage />} />
            <Route path="/roadmap/:languageId" element={<Roadmap />} />
            <Route path="/resources/:languageId" element={<Resources />} />
          </Route>
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App; 