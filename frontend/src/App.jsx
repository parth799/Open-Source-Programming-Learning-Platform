import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LanguagePage from './pages/LanguagePage';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import ContentDetails from './pages/ContentDetails';

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
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/language/:languageId" element={<LanguagePage />} />
            <Route path="/roadmap/:languageId" element={<Roadmap />} />
            <Route path="/resources/:languageId" element={<Resources />} />
            <Route path="/content/:contentId" element={<ContentDetails />} />
          </Route>
          
          {/* Redirect any unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App; 