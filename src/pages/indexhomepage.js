import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppRouter from '../router/router';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


function Navbar() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const [username, setUsername] = React.useState(localStorage.getItem('user_name'));
  // const showDashboard = useSelector(state => state.dashboard.showDashboard);
  const navigate = useNavigate();
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout process: Clear session and navigate to login
      sessionStorage.removeItem('session_id');
      sessionStorage.removeItem('username');
      setIsLoggedIn(false);
      navigate('/login'); // Navigate to login page after logging out
    } else {
      // Navigate to login page if the user is not logged in
      navigate('/login');
    }
  };

  React.useEffect(() => {
    // Update login status based on sessionStorage
    setIsLoggedIn(!!sessionStorage.getItem('session_id'));
  }, []);
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>

          {isLoggedIn && (
            <Typography variant="body2" sx={{ marginLeft: 2 ,display:'flex', alignItems: 'center'}}>
              <Avatar src="/broken-image.jpg" sx={{border: '2px solid white',backgroundColor: '#1976d2', color: 'white',marginRight:1}} />
              Hello, {username}
            </Typography>
          )}

          
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}

            onClick={handleLoginLogout}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: '#dcdfe8',
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <AppRouter />
      </Box>
    </Box>
  );
}

export default Navbar;



