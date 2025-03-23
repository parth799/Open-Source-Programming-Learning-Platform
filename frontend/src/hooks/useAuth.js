import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, logout, reset } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (userData) => {
    try {
      await dispatch(login(userData)).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const registerUser = async (userData) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const resetState = () => {
    dispatch(reset());
  };

  return {
    user,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    loginUser,
    registerUser,
    logoutUser,
    resetState,
  };
};

export default useAuth; 