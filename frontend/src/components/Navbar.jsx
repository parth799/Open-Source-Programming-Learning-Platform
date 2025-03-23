import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Code as CodeIcon,
  AccountCircle,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CodeLearn
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  
                  {isAuthenticated && (
                    <>
                      <ListItem component={RouterLink} to="/roadmap/javascript" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Learning Paths" />
                      </ListItem>
                      
                      <ListItem component={RouterLink} to="/resources/javascript" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon>
                          <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Resources" />
                      </ListItem>
                    </>
                  )}
                  
                  <Divider />
                  
                  {!isAuthenticated ? (
                    <>
                      <ListItem component={RouterLink} to="/login" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItem>
                      
                      <ListItem component={RouterLink} to="/signup" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemIcon>
                          <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign Up" />
                      </ListItem>
                    </>
                  ) : (
                    <ListItem button onClick={handleLogout} sx={{ color: 'inherit' }}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* Mobile Logo */}
          <CodeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CodeLearn
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated && (
              <>
                <Button
                  component={RouterLink}
                  to="/roadmap/javascript"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Learning Paths
                </Button>
                <Button
                  component={RouterLink}
                  to="/resources/javascript"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Resources
                </Button>
              </>
            )}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={currentUser?.username || 'User'}>
                      {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={RouterLink} to="/profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  color="inherit"
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 