import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 