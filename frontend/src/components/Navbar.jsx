import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  Divider,
  Switch,
  FormControlLabel,
  Stack
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
  Book as BookIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const pages = ['Dashboard', 'Languages', 'Resources'];
const settings = ['Profile', 'Account', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toggleTheme, isDarkMode } = useTheme();

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

  const handleMenuClick = (page) => {
    handleCloseNavMenu();
    switch (page) {
      case 'Dashboard':
        navigate('/');
        break;
      case 'Languages':
        navigate('/languages');
        break;
      case 'Resources':
        navigate('/resources');
        break;
      default:
        break;
    }
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case 'Profile':
        navigate('/profile');
        break;
      case 'Account':
        navigate('/account');
        break;
      case 'Logout':
        dispatch(logout());
        navigate('/login');
        break;
      default:
        break;
    }
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
            CodeMaster
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                  {pages.map((page) => (
                    <ListItem key={page} onClick={() => handleMenuClick(page)}>
                      <ListItemIcon>
                        {page === 'Dashboard' && <DashboardIcon />}
                        {page === 'Languages' && <SchoolIcon />}
                        {page === 'Resources' && <BookIcon />}
                      </ListItemIcon>
                      <ListItemText primary={page} />
                    </ListItem>
                  ))}
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
            CodeMaster
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Theme Toggle */}
          <IconButton sx={{ ml: 1, mr: 2 }} onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <Typography sx={{ mr: 2 }}>
                  {user?.username || 'User'}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.username || 'User'} src="/static/images/avatar/2.jpg">
                      {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
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
                  to="/register"
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