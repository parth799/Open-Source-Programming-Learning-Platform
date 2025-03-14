import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Programming Learning Platform
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/languages"
          >
            Languages
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/roadmaps"
          >
            Roadmaps
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/resources"
          >
            Resources
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 