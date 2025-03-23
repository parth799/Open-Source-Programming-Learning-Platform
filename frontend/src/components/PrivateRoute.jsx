import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

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

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 