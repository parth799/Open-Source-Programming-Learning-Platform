import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios interceptor for authentication
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Load user data on initial load or token change
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`);
        setCurrentUser(res.data);
      } catch (error) {
        console.error('Failed to load user:', error);
        // If token is invalid, clear it
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
        }
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register a new user
  const signup = async (username, email, password, selectedLanguages) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
      username,
      email,
      password,
      learningLanguages: selectedLanguages
    });

    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setCurrentUser(res.data.user);
    return res.data;
  };

  // Login user
  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email,
      password
    });

    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setCurrentUser(res.data.user);
    return res.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, userData);
    setCurrentUser(res.data);
    return res.data;
  };

  // Update learning progress
  const updateProgress = async (language, progress) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/progress`, {
      language,
      progress
    });
    setCurrentUser(res.data);
    return res.data;
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateProfile,
    updateProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 