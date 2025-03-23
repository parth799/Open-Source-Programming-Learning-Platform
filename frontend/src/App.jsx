import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import PrivateRoute from './components/auth/PrivateRoute';

// Main Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import LanguagePage from './components/LanguagePage';
import Roadmap from './components/Roadmap';
import Resources from './components/Resources';

// Context
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
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
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 