import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Sample data for when API is not available
const sampleContent = {
  javascript: [
    {
      _id: 'js-tutorial-1',
      type: 'tutorial',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript including variables, data types, functions, and control flow.',
      difficulty: 'beginner',
      language: 'javascript',
      topics: ['variables', 'data types', 'functions', 'control flow'],
      estimatedTime: '3 hours',
    },
    {
      _id: 'js-tutorial-2',
      type: 'tutorial',
      title: 'DOM Manipulation',
      description: 'Learn how to interact with the Document Object Model to create dynamic web pages.',
      difficulty: 'intermediate',
      language: 'javascript',
      topics: ['DOM', 'events', 'selectors', 'event listeners'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'js-practice-1',
      type: 'practice',
      title: 'JavaScript Coding Challenges',
      description: 'Test your JavaScript skills with these coding challenges covering fundamental concepts.',
      difficulty: 'beginner',
      language: 'javascript',
      topics: ['problem solving', 'algorithms', 'logic'],
      estimatedTime: '2 hours',
    },
  ],
  python: [
    {
      _id: 'py-tutorial-1',
      type: 'tutorial',
      title: 'Python Basics',
      description: 'Introduction to Python programming language, covering basic syntax, variables, and data structures.',
      difficulty: 'beginner',
      language: 'python',
      topics: ['syntax', 'variables', 'data structures'],
      estimatedTime: '3 hours',
    },
    {
      _id: 'py-tutorial-2',
      type: 'tutorial',
      title: 'Python Functions & OOP',
      description: 'Learn about functions, classes, and object-oriented programming in Python.',
      difficulty: 'intermediate',
      language: 'python',
      topics: ['functions', 'classes', 'inheritance', 'OOP'],
      estimatedTime: '5 hours',
    },
    {
      _id: 'py-practice-1',
      type: 'practice',
      title: 'Python Coding Exercises',
      description: 'Practice Python with exercises covering fundamental programming concepts.',
      difficulty: 'beginner',
      language: 'python',
      topics: ['algorithms', 'data structures', 'problem solving'],
      estimatedTime: '3 hours',
    },
  ],
  java: [
    {
      _id: 'java-tutorial-1',
      type: 'tutorial',
      title: 'Java Fundamentals',
      description: 'Introduction to Java programming, covering syntax, variables, and control structures.',
      difficulty: 'beginner',
      language: 'java',
      topics: ['syntax', 'variables', 'control flow'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'java-tutorial-2',
      type: 'tutorial',
      title: 'Java Object-Oriented Programming',
      description: 'Learn about classes, objects, inheritance, and polymorphism in Java.',
      difficulty: 'intermediate',
      language: 'java',
      topics: ['classes', 'objects', 'inheritance', 'polymorphism'],
      estimatedTime: '6 hours',
    },
    {
      _id: 'java-practice-1',
      type: 'practice',
      title: 'Java Programming Exercises',
      description: 'Practice Java with exercises covering object-oriented programming concepts.',
      difficulty: 'intermediate',
      language: 'java',
      topics: ['OOP', 'algorithms', 'data structures'],
      estimatedTime: '4 hours',
    },
  ],
  cpp: [
    {
      _id: 'cpp-tutorial-1',
      type: 'tutorial',
      title: 'C++ Basics',
      description: 'Introduction to C++ programming, covering syntax, variables, and data types.',
      difficulty: 'beginner',
      language: 'cpp',
      topics: ['syntax', 'variables', 'data types'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'cpp-tutorial-2',
      type: 'tutorial',
      title: 'C++ Object-Oriented Programming',
      description: 'Learn about classes, objects, inheritance, and polymorphism in C++.',
      difficulty: 'intermediate',
      language: 'cpp',
      topics: ['classes', 'objects', 'inheritance', 'polymorphism'],
      estimatedTime: '5 hours',
    },
    {
      _id: 'cpp-practice-1',
      type: 'practice',
      title: 'C++ Coding Challenges',
      description: 'Test your C++ skills with these programming challenges.',
      difficulty: 'advanced',
      language: 'cpp',
      topics: ['memory management', 'algorithms', 'optimization'],
      estimatedTime: '6 hours',
    },
  ],
};

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
      if (!language) return [];
      
      // Check if user is authenticated and has a token
      const auth = thunkAPI.getState().auth;
      let config = {};
      
      if (auth && auth.user && auth.user.token) {
        config = {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        };
      }
      
      try {
        const response = await axios.get(`${API_URL}/content/language/${language.toLowerCase()}`, config);
        if (response.data && response.data.length > 0) {
          return response.data;
        } else {
          // If API returns empty data, use sample data
          return sampleContent[language.toLowerCase()] || [];
        }
      } catch (error) {
        console.warn('API request failed, using sample data instead:', error.message);
        // If API request fails, use sample data
        return sampleContent[language.toLowerCase()] || [];
      }
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
      // Check if this ID exists in sample data first (for demo without API)
      for (const language in sampleContent) {
        const content = sampleContent[language].find(item => item._id === id);
        if (content) {
          return content;
        }
      }
      
      // If not found in sample data, try API
      const token = thunkAPI.getState().auth.user?.token;
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } : {};
      
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