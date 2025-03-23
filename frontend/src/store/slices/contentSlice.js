import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const initialState = {
  contents: [],
  selectedContent: null,
  roadmap: null,
  resources: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// Get content by language
export const getContentByLanguage = createAsyncThunk(
  'content/getByLanguage',
  async (language, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/content/language/${language}`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get content by ID
export const getContentById = createAsyncThunk(
  'content/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/content/${id}`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get roadmap by language
export const getRoadmap = createAsyncThunk(
  'content/getRoadmap',
  async (language, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/content/roadmap/${language}`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get resources by language
export const getResources = createAsyncThunk(
  'content/getResources',
  async ({ language, type }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_URL}/content/resources/${language}?type=${type}`,
        config
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    clearSelectedContent: (state) => {
      state.selectedContent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get content by language cases
      .addCase(getContentByLanguage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContentByLanguage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contents = action.payload;
      })
      .addCase(getContentByLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get content by ID cases
      .addCase(getContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedContent = action.payload;
      })
      .addCase(getContentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get roadmap cases
      .addCase(getRoadmap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoadmap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roadmap = action.payload;
      })
      .addCase(getRoadmap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get resources cases
      .addCase(getResources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.resources = action.payload;
      })
      .addCase(getResources.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset, clearSelectedContent } = contentSlice.actions;
export default contentSlice.reducer; 