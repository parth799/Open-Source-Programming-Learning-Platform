import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const initialState = {
  profile: null,
  learningProgress: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// Get user profile
export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/users/profile`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${API_URL}/users/profile`, userData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update learning progress
export const updateProgress = createAsyncThunk(
  'user/updateProgress',
  async ({ language, progress }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URL}/users/progress`,
        { language, progress },
        config
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get profile cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
        state.learningProgress = action.payload.learningProgress;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update progress cases
      .addCase(updateProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.learningProgress = action.payload.learningProgress;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer; 