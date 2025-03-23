import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedLanguages: []
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    // Fetch available programming languages
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/content/languages`);
        setLanguages(response.data || []);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        // Fallback to some common languages if API fails
        setLanguages(['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go']);
      }
    };

    fetchLanguages();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Language selection validation
    if (formData.selectedLanguages.length === 0) {
      newErrors.selectedLanguages = 'Please select at least one language';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setServerError('');
    
    try {
      await signup(
        formData.username, 
        formData.email, 
        formData.password, 
        formData.selectedLanguages
      );
      navigate('/');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 8 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            
            <FormControl 
              fullWidth 
              margin="normal"
              error={!!errors.selectedLanguages}
            >
              <InputLabel id="languages-label">Programming Languages</InputLabel>
              <Select
                labelId="languages-label"
                id="selectedLanguages"
                name="selectedLanguages"
                multiple
                value={formData.selectedLanguages}
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedLanguages && (
                <Typography variant="caption" color="error">
                  {errors.selectedLanguages}
                </Typography>
              )}
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Already have an account? Login
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup; 