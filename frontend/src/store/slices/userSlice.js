import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Sample user data for when API is not available
const sampleUserData = {
  _id: 'sample-user-1',
  username: 'testuser',
  email: 'test@example.com',
  role: 'user',
  learningProgress: [
    {
      language: 'JavaScript',
      progress: 35,
      completedTopics: ['variables', 'data types', 'functions'],
      lastActivity: new Date().toISOString(),
    },
    {
      language: 'Python',
      progress: 20,
      completedTopics: ['syntax', 'variables'],
      lastActivity: new Date().toISOString(),
    },
    {
      language: 'Java',
      progress: 10,
      completedTopics: ['syntax'],
      lastActivity: new Date().toISOString(),
    }
  ],
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

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
      // Check if auth state exists and user has token
      const auth = thunkAPI.getState().auth;
      
      if (!auth || !auth.user || !auth.user.token) {
        console.warn('No auth token found, using sample data');
        return sampleUserData;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      
      try {
        const response = await axios.get(`${API_URL}/users/profile`, config);
        return response.data;
      } catch (error) {
        console.warn('API request failed, using sample data instead:', error.message);
        // If API request fails, use sample data
        return sampleUserData;
      }
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
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) {
        throw new Error('Not authenticated');
      }
      
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
  async ({ language, progress, completedTopic }, thunkAPI) => {
    try {
      // Get current user state
      const { profile } = thunkAPI.getState().user;
      const token = thunkAPI.getState().auth.user?.token;
      
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      // Create updated progress data
      const progressData = {
        language,
        progress,
      };
      
      // If a topic was completed, add it to the request
      if (completedTopic) {
        progressData.completedTopic = completedTopic;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        const response = await axios.put(
          `${API_URL}/users/progress`,
          progressData,
          config
        );
        return response.data;
      } catch (error) {
        console.warn('API request failed, simulating update locally:', error.message);
        
        // Simulate progress update locally for development
        const updatedProgress = [...(profile.learningProgress || [])];
        const langIndex = updatedProgress.findIndex(
          item => item.language.toLowerCase() === language.toLowerCase()
        );
        
        if (langIndex >= 0) {
          // Update existing language progress
          updatedProgress[langIndex] = {
            ...updatedProgress[langIndex],
            progress: progress || updatedProgress[langIndex].progress,
          };
          
          // Add completed topic if provided
          if (completedTopic && !updatedProgress[langIndex].completedTopics.includes(completedTopic)) {
            updatedProgress[langIndex].completedTopics = [
              ...(updatedProgress[langIndex].completedTopics || []),
              completedTopic
            ];
          }
        } else {
          // Add new language progress
          updatedProgress.push({
            language,
            progress: progress || 0,
            completedTopics: completedTopic ? [completedTopic] : [],
            lastActivity: new Date().toISOString(),
          });
        }
        
        // Return simulated response
        return {
          ...profile,
          learningProgress: updatedProgress,
        };
      }
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
        state.profile = action.payload;
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