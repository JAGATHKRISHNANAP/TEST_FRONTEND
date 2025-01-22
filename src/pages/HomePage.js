import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, ButtonGroup, CssBaseline, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FaFileExcel, FaFileCsv } from "react-icons/fa";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useNavigate } from 'react-router-dom';
import AppRouter from '../router/router';
import { useLocation } from 'react-router-dom';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { SketchPicker } from 'react-color'; // Import the Sketch color picker
import PaletteIcon from '@mui/icons-material/Palette'; // Icon for the color picker toggle button
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { BiSolidFileJson } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';

// import { login, logout } from './authSlice';
import { logout } from '../features/login/loginSlice';
function Navbar() {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const [username, setUsername] = React.useState(localStorage.getItem('user_name'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [viewMenuAnchorEl, setViewMenuAnchorEl] = React.useState(null);
  const [openViewMenu, setOpenViewMenu] = React.useState(false);
  const [activeRoute, setActiveRoute] = React.useState('');
  const [menuWidth, setMenuWidth] = React.useState(null);
  // const [appBarColor, setAppBarColor] = React.useState('#1976d2'); // State for AppBar color
  const [appBarColor, setAppBarColor] = React.useState(localStorage.getItem('theamColor') || '#1976d2'); 
  const [showColorPicker, setShowColorPicker] = React.useState(false); // Toggle for color picker
  const [showSecondNavbar, setShowSecondNavbar] = React.useState(false);

  const [openDesignMenu, setOpenDesignMenu] = React.useState(false);
  const [designMenuAnchorEl, setDesignMenuAnchorEl] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const buttonRef = React.useRef(null);
  const loginstatus=localStorage.getItem('loginstatus')
  console.log(loginstatus)

  const theamColor=localStorage.setItem('theamColor',appBarColor);

  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.loginStatus);
 
  // const secondNavbar=localStorage.getItem('show_second_navbar',showSecondNavbar);

  React.useEffect(() => {
    // Check session storage for the navbar flag
    setShowSecondNavbar(sessionStorage.getItem('show_second_navbar') === 'true');
 }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      setMenuWidth(buttonWidth);
    }
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const disableBackButton = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  };
  
  React.useEffect(() => {
    if (!isLoggedIn) {
      disableBackButton();
    }
  }, [isLoggedIn]);
  
  const handleViewMenuClick = (event) => {
    setViewMenuAnchorEl(event.currentTarget);
    setOpenViewMenu(true);
  };

  const handleViewMenuClose = () => {
    setOpenViewMenu(false);
    setViewMenuAnchorEl(null);
  };


  

  const handleDesignMenuClick = (event) => {
    setDesignMenuAnchorEl(event.currentTarget);
    setOpenDesignMenu(true);
  };
  
  const handleDesignMenuClose = () => {
    setDesignMenuAnchorEl(null);
    setOpenDesignMenu(false);
  };
  


  const handleNavigation = (route) => {
    setActiveRoute(route); 
    navigate(route);
    handleMenuClose();
    handleViewMenuClose();
    window.location.reload();
  };


  // const handleLoginLogout = () => {
  //   if (isLoggedIn) {
  //     sessionStorage.removeItem('session_id');
  //     sessionStorage.removeItem('username');
  //     setIsLoggedIn(false);
  //     navigate('/login');
  //   } else {
  //     navigate('/login');
  //   }
  // };


  const handleLoginLogout = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem('session_id');
      sessionStorage.removeItem('username');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };
  
  // const handleLoginLogout = () => {
  //   if (isLoggedIn) {
  //     sessionStorage.removeItem('session_id');
  //     sessionStorage.removeItem('username');
  //      // Set loginstatus to false on logout
  //     setIsLoggedIn(false);
  //     localStorage.setItem('loginstatus', false);
  //     navigate('/login')
      
  //   } else {
  //     // localStorage.setItem('loginstatus', 'true'); // This can be updated when login succeeds
  //     navigate('/login');
  //   }
  // };


//   const handleLoginLogout = () => {
//     if (isLoggedIn) {
//         sessionStorage.removeItem('session_id');
//         sessionStorage.removeItem('username');
//         setIsLoggedIn(false);
//         localStorage.setItem('loginstatus', 'false'); // Store as string
//         navigate('/login');
//     } else {
//         navigate('/login');
//     }
// };


// const handleLoginLogout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.login.loginStatus);

//   if (isLoggedIn) {
//     dispatch(logout()); // Dispatch the logout action
//     navigate('/login');
//   } else {
//     navigate('/login'); // Handle login redirection
//   }
// };
// const handleLoginLogout = () => {
//   if (isLoggedIn) {
//     dispatch(logout()); // Dispatch the logout action
//     navigate('/login');
//   } else {
//     navigate('/login'); // Handle login redirection
//   }
// };
  
  // React.useEffect(() => {
  //   // Update isLoggedIn and loginstatus from localStorage
  //   setIsLoggedIn(!!sessionStorage.getItem('session_id'));
  // }, []);
  

  React.useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('session_id'));
  }, []);

  const handleColorPickerToggle = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    setAppBarColor(color.hex);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <MuiAppBar position="fixed" open={false} sx={{ height: '40px', display: 'flex', justifyContent: 'center', backgroundColor: appBarColor }}>
        <Toolbar>
          {isLoggedIn && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ marginRight: 5 }}>
              <MenuIcon />
            </IconButton>
          )}

          {isLoggedIn && (
            <Typography variant="body2" sx={{ height: '10px', marginLeft: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar src="/broken-image.jpg" sx={{ width: '30px', height: '30px', border: '2px solid white', backgroundColor: appBarColor, color: 'white', marginRight: 1 }} />
              Hello, {username}
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Typography component="div" sx={{ fontSize: '12px', cursor: 'pointer', marginRight: 2 }} onClick={handleLoginLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Typography>

          {/* Toggle button for Color Picker */}
          <IconButton color="inherit" onClick={handleColorPickerToggle}>
            <PaletteIcon />
          </IconButton>

    

        </Toolbar>
      </MuiAppBar>

      {isLoggedIn && (
        <MuiAppBar position="fixed" sx={{ top: '40px', height: '25px', backgroundColor: '#ffffff', color: '#1976d2', display: 'flex', justifyContent: 'center', zIndex: theme.zIndex.appBar +1 }}>
          <Toolbar>
            <ButtonGroup variant="text" aria-label="Basic button group" sx={{ height: '25px', display: 'flex' }}>
              <Button
                aria-controls={openMenu ? 'data-source-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleMenuClick}
                ref={buttonRef}
                sx={{
                  backgroundColor: activeRoute === '/excel_upload' || activeRoute === '/csv_upload' || activeRoute === '/Audio_upload' ? '#c5c5c9' : 'inherit',
                  maxWidth: '150px',
                  alignItems: 'center',
                  color: 'inherit',
                }}
              >
                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000' }}>
                  Data Source <ArrowDropDownCircleIcon sx={{ color: appBarColor }} />
                </ListItemIcon>
              </Button>
              <Menu
                id="data-source-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    width: menuWidth || 'auto',
                    backgroundColor: '#424242',
                    color: '#fff',
                  },
                }}
              >
                <MenuItem onClick={() => handleNavigation('/excel_upload')}>
                  <FaFileExcel style={{ marginRight: 8 }} /> Excel
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/csv_upload')}>
                  <FaFileCsv style={{ marginRight: 8 }} /> CSV
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/Audio_upload')}>
                  <AudioFileIcon style={{ marginRight: 8 }} /> Audio
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/json_upload')}>
                  <BiSolidFileJson     style={{ marginRight: 8 ,fontSize: 20}} /> Json
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/custom_data_source')}>
                  <DashboardCustomizeIcon  style={{ marginRight: 8 ,fontSize: 20}} /> CustomJoin
                </MenuItem>
              </Menu>
              {/* <Button
                onClick={() => handleNavigation('/load_data')}
                sx={{
                  backgroundColor: location.pathname === '/load_data' ? '#c5c5c9' : 'inherit',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon sx={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'center', color: '#000000' }}>
                  design
                </ListItemIcon>
              </Button> */}


<Button
onClick={() => handleNavigation('/load_data')}
    sx={{
      backgroundColor: location.pathname === '/load_data' ? '#c5c5c9' : 'inherit',
      maxWidth: '150px',
      alignItems: 'center',
      color: 'inherit',
    }}
  >
    <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000',textTransform: 'none'  }}>
      Data Table 
    </ListItemIcon>
  </Button>
{/* 
<Button
          aria-controls={openDesignMenu ? 'design-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openDesignMenu ? 'true' : undefined}
          onClick={handleDesignMenuClick}
          sx={{
            backgroundColor:
              location.pathname === '/load_data'||
              location.pathname === '/Create_Dashboard' 
                ? '#c5c5c9'
                : 'inherit',
            alignItems: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '150px',
              justifyContent: 'center',
              color: '#000000',
            }}
          >
            Design <ArrowDropDownCircleIcon sx={{ color: appBarColor }} />
          </ListItemIcon>
        </Button> */}
        {/* <Menu
          id="design-menu"
          anchorEl={designMenuAnchorEl}
          open={openDesignMenu}
          onClose={handleDesignMenuClose}
          PaperProps={{
            sx: {
              width: menuWidth || 'auto',
              backgroundColor: '#424242',
              color: '#fff',
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation('/load_data')}>
            Design Chart
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/Create_Dashboard')}>
            Charts
          </MenuItem>
          

        </Menu> */}


<Button
          aria-controls={openDesignMenu ? 'design-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openDesignMenu ? 'true' : undefined}
          onClick={handleDesignMenuClick}
          sx={{
            backgroundColor:
            location.pathname === '/create_charts' ||
            location.pathname === '/dashboard_view'
                ? '#c5c5c9'
                : 'inherit',
            alignItems: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '150px',
              justifyContent: 'center',
              color: '#000000',
              textTransform: 'none' 
            }}
          >
            Design <ArrowDropDownCircleIcon sx={{ color: appBarColor }} />
          </ListItemIcon>
        </Button>
        <Menu
          id="design-menu"
          anchorEl={designMenuAnchorEl}
          open={openDesignMenu}
          // onMouseLeave={handleDesignMenuClose}
          onClose={handleDesignMenuClose}
          PaperProps={{
            sx: {
              width: menuWidth || 'auto',
              backgroundColor: '#424242',
              color: '#fff',
            },
          }}
        >
          
          <MenuItem onClick={() => handleNavigation('/create_charts')}>
            Chart
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/Create_Dashboard')}>
          Dashboard
          </MenuItem>
        </Menu>

{/* <Button
  aria-controls={openDesignMenu ? 'design-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={openDesignMenu ? 'true' : undefined}
  onMouseOver={handleDesignMenuClick}
  onMouseLeave={handleDesignMenuClose} // Close menu when mouse leaves the button
  sx={{
    backgroundColor:
      location.pathname === '/Create_Dashboard' ||
      location.pathname === '/dashboard_view'
        ? '#c5c5c9'
        : 'inherit',
    alignItems: 'center',
  }}
>
  <ListItemIcon
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '150px',
      justifyContent: 'center',
      color: '#000000',
      textTransform: 'none',
    }}
  >
    Design <ArrowDropDownCircleIcon sx={{ color: appBarColor }} />
  </ListItemIcon>
</Button>
<Menu
  id="design-menu"
  anchorEl={designMenuAnchorEl}
  open={openDesignMenu}
  onMouseLeave={handleDesignMenuClose} // Close menu when mouse leaves the menu
  onMouseEnter={() => setOpenDesignMenu(true)} // Prevent immediate close on hover
  PaperProps={{
    sx: {
      width: menuWidth || 'auto',
      backgroundColor: '#ffffff',
      color: 'black',
    },
  }}
>
  <MenuItem onClick={() => handleNavigation('/Create_Dashboard')}>
    Chart
  </MenuItem>
  <MenuItem onClick={() => handleNavigation('/dashboard_view')}>
    Dashboard
  </MenuItem>
</Menu> */}


              <Button
                onClick={() => handleNavigation('/Edit_Chart')}
                sx={{
                  backgroundColor: location.pathname === '/Edit_Chart' ? '#c5c5c9' : 'inherit',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon sx={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'center', color: '#000000' }}>
                  edit
                </ListItemIcon>
              </Button>

              <Button
                aria-controls={openViewMenu ? 'view-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openViewMenu ? 'true' : undefined}
                onClick={handleViewMenuClick}
                sx={{
                  backgroundColor: location.pathname === '/Charts_view' || location.pathname === '/dashboard_view' ? '#c5c5c9' : 'inherit',
                  maxWidth: '150px',
                  alignItems: 'center',
                  color: 'inherit',
                }}
              >
                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000' }}>
                  View <ArrowDropDownCircleIcon sx={{ color: appBarColor }} />
                </ListItemIcon>
              </Button>

              <Menu
                id="view-menu"
                anchorEl={viewMenuAnchorEl}
                open={openViewMenu}
                onClose={handleViewMenuClose}
                PaperProps={{
                  sx: {
                    width: menuWidth || 'auto',
                    backgroundColor: '#424242',
                    color: '#fff',
                  },
                }}
              >
                {/* <MenuItem onClick={() => handleNavigation('/Create_Dashboard')}>Charts</MenuItem>
                <MenuItem onClick={() => handleNavigation('/dashboard_view')}>Dashboard</MenuItem> */}
                <MenuItem onClick={() => handleNavigation('/Charts_view')}>Charts</MenuItem>
                <MenuItem onClick={() => handleNavigation('/dashboard_view')}>Dashboard</MenuItem>
              </Menu>
            </ButtonGroup>

            {showColorPicker && (
            <Box sx={{ position: 'absolute', top: '50px', right: '10px', zIndex: 0 }}>
              <SketchPicker color={appBarColor} onChangeComplete={handleColorChange} />
            </Box>
          )}

          </Toolbar>
        </MuiAppBar>
      )}

      {/* <Box component="main" sx={{ backgroundColor: '#dcdfe8', flexGrow: 1, p: 3, minHeight: '100vh', display: 'flex', flexDirection: 'column', mt: 10 }}>
        <AppRouter />
      </Box> */}
      <Box component="main" sx={{ backgroundColor: '#dcdfe8',marginTop:'30px',minHeight:'100vh', display: 'flex', flexDirection: 'column', mt: 0 }}>
        <AppRouter />
      </Box>

    </Box>
  );
}

export default Navbar;

