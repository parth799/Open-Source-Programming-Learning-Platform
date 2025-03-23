import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { register, reset } from '../store/slices/authSlice';

const PROGRAMMING_LANGUAGES = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
  'TypeScript',
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedLanguages: [],
  });
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleLanguageChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedLanguages: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (formData.selectedLanguages.length === 0) {
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      languages: formData.selectedLanguages,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {isError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            error={!!passwordError}
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
            error={!!passwordError}
            helperText={passwordError}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="languages-label">Programming Languages</InputLabel>
            <Select
              labelId="languages-label"
              id="languages"
              multiple
              value={formData.selectedLanguages}
              onChange={handleLanguageChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {PROGRAMMING_LANGUAGES.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!!passwordError || formData.selectedLanguages.length === 0}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 