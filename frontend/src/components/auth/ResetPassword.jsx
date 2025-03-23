import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, Grid, Alert } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  const [validating, setValidating] = useState(true);
  
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    // Validate token when component mounts
    const validateToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`);
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
        setServerError('Invalid or expired password reset token.');
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    
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
    setSuccess('');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`, 
        { password: formData.password }
      );
      
      setSuccess(response.data.message || 'Password has been reset successfully.');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 8 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">
              Validating reset token...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (tokenValid === false) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 8 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Invalid Token
            </Typography>
            
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                  Request New Reset Link
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" sx={{ mt: 8 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={!!success}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={!!success}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !!success}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Back to Login
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

export default ResetPassword; 