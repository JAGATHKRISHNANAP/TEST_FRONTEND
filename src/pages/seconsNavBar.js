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
import UserProfile from "../components/profile/userProfile";
import { AiOutlineCloudServer } from "react-icons/ai";
import { IoIosPaper } from 'react-icons/io';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { resetState } from '../features/Dashboard-Slice/chartSlice'; // Import resetState
import { AppBar} from '@mui/material';
function Navbar() {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const [username, setUsername] = React.useState(sessionStorage.getItem('user_name'));
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
  const dispatch = useDispatch(); // Initialize dispatch

  const buttonRef = React.useRef(null);
  let closeTimeout = null;
  const theamColor=localStorage.setItem('theamColor',appBarColor);
  // const secondNavbar=localStorage.getItem('show_second_navbar',showSecondNavbar);
  const userRole = sessionStorage.getItem('user_role');
  const isRouteAccessible = (route) => {
    switch (userRole) {
      case '2':
        return true; // Admin can access all routes
      case '1' ||' Developer':
        return !['/Charts_view', '/dashboard_view'].includes(route); // Developer can access all except View routes
      case '3':
        return ['/Charts_view', '/dashboard_view'].includes(route); // Viewer can only access View routes
      default:
        return false; // Default: no access
    }
  };

  const handleNavigation = (route) => {
    if (isRouteAccessible(route)) {
      setActiveRoute(route);
      navigate(route);
     
      handleViewMenuClose();
    
    } else {
     
      alert("You don't have permission to access this page."); // Example: alert message
     
    }
  };
  React.useEffect(() => {
    // Check session storage for the navbar flag
    setShowSecondNavbar(sessionStorage.getItem('show_second_navbar') === 'true');
 }, []);

  const handleMenuClick = (event) => {
    clearTimeout(closeTimeout);
    setAnchorEl(event.currentTarget);
    
    setOpenMenu(true);
    // if (buttonRef.current) {
    //   const buttonWidth = buttonRef.current.offsetWidth;
    //   setMenuWidth(buttonWidth);
    // }
  };

  // const handleMenuClose = () => {
  //   closeTimeout = setTimeout(() => {
  //     setOpenMenu(false);
  //     setAnchorEl(null);
  //   }, 300); // Small delay to prevent flickering
  // };

  const handleMenuEnter = () => {
   
    setOpenMenu(true);
  };
  const handleMouseLeave = () => {
    // Delay the menu close to prevent flickering if user hovers off quickly
    closeTimeout =setTimeout(() => {
        setOpenMenu(false);
        setAnchorEl(null);
    }, 800);  // Adjust time as needed (in ms)
};
  const disableBackButton = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  };
  const handleViewMenuClick = (event) => {
    setViewMenuAnchorEl(event.currentTarget);
    setOpenViewMenu(true);
  };

  const handleViewMenuClose = () => {
    setOpenViewMenu(false);
    setViewMenuAnchorEl(null);
  };
  const handleViewMenuEnter = () => {
    setOpenViewMenu(true);
    clearTimeout(closeTimeout);
  };

   const handleViewMenuMouseLeave = () => {
    closeTimeout =setTimeout(() => {
       setOpenViewMenu(false);
      setAnchorEl(null);
  }, 800);  // Adjust time as needed (in ms)
   
  };
  
  const handleDesignMouseEnter = () => {
    setOpenDesignMenu(true);  // Open menu when mouse enters the button
    clearTimeout(closeTimeout);
  };

  const handleDesignMenuClick = (event) => {
    setDesignMenuAnchorEl(event.currentTarget);
    setOpenDesignMenu(true);
  };
  
  const handleDesignMenuClose = () => {
    setDesignMenuAnchorEl(null);
    setOpenDesignMenu(false);
  };
  
  const handleDesignMenuMouseLeave = () => {
    // setTimeout(() => {
      closeTimeout =setTimeout(() => {
        setOpenDesignMenu(false); 
       setAnchorEl(null);
   }, 800);  // A
  
  };
  
 
  // const handleColorPickerToggle = () => {
  //   setShowColorPicker(!showColorPicker);
  // };

  const handleColorChange = (color) => {
    setAppBarColor(color.hex);
  };
  const handleMenuMouseEnter = () => {
    setOpenMenu(true);  // Open menu when mouse enters the button
    clearTimeout(closeTimeout);
  };
  
  const handleMenuMouseLeave = (event) => {
     // Check if the mouse is leaving both the button and the menu
  if (
    event.relatedTarget &&
    !event.currentTarget.contains(event.relatedTarget) &&
    (!anchorEl || !anchorEl.contains(event.relatedTarget))
  ) {
    setOpenMenu(false);
  }
};

  return (
    <AppBar
      position="fixed"
      sx={{
        top: '40px',
        height: '25px',
        backgroundColor: '#ffffff',
        color: '#1976d2',
        display: 'flex',
        justifyContent: 'center',
        zIndex: theme.zIndex.appBar + 1
      }}
    >
      <CssBaseline />
      <Toolbar>
      <ButtonGroup variant="text" aria-label="Basic button group" sx={{ height: '25px', display: 'flex' ,gap:0,
      '& .MuiButtonGroup-grouped:not(:last-of-type)': {
      borderRight: 'none', // Removes any border between buttons,
      border:'none'
    }}}>
            {userRole !== '3' && ( 
              <Button
                aria-controls={openMenu ? 'data-source-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onMouseEnter={handleMenuClick} // Opens the menu
                onMouseLeave={handleMouseLeave} // Delayed closing
              
                ref={buttonRef}
                sx={{
                  backgroundColor: activeRoute === '/excel_upload' || activeRoute === '/csv_upload' || activeRoute === '/Audio_upload'  ? '#c5c5c9' : 'inherit',
              alignItems: 'center',
                  maxWidth: '150px',
                  alignItems: 'center',
                 
                  fontSize: "16px", 
                 
                }}
              >
                <ListItemIcon sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center', width: '150px', color: '#000000',textTransform: 'none'  }}>
                  Data Source 
                </ListItemIcon>
              </Button>
            )}
              <Menu
  id="data-source-menu"
  anchorEl={anchorEl}
  open={openMenu}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "center",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "center",
  }}
  PaperProps={{
    // onChangeComplete:handleMenuClose,
    // onMouseLeave: handleMenuMouseLeave,
     onMouseEnter: handleMenuMouseEnter, // Keep menu open when hovered
    onMouseLeave: handleMenuMouseLeave, // Close menu with delay
    sx: {
      // width: menuWidth || 'auto',
      minWidth: 200,
      backgroundColor: '#ffffff',
      color: 'black',
    },
  }}
>

<MenuItem onClick={() => handleNavigation('/excel_upload')} sx={{
    backgroundColor: location.pathname === '/excel_upload' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/excel_upload' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
  <ListItemIcon><FaFileExcel size={18} style={{ marginRight: 6 ,color: 'black'}} /></ListItemIcon> 
  Excel
</MenuItem>
<MenuItem onClick={() => handleNavigation('/csv_upload')}  sx={{
    backgroundColor: location.pathname === '/csv_upload' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/csv_upload' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
  <ListItemIcon><FaFileCsv size={18} style={{ marginRight: 8,color: 'black' }} /></ListItemIcon> 
  CSV
</MenuItem>
<MenuItem onClick={() => handleNavigation('/json_upload')}  sx={{
    backgroundColor: location.pathname === '/json_upload' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/json_upload' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
  <ListItemIcon><IoIosPaper size={20} style={{ marginRight: 8,color: 'black' }} /></ListItemIcon> 
  JSON
</MenuItem>
<MenuItem onClick={() => handleNavigation('/custom_data_source')}  sx={{
    backgroundColor: location.pathname === '/custom_data_source' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/custom_data_source' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
  <ListItemIcon><DashboardCustomizeIcon fontSize="small" sx={{ marginRight: 1,color: 'black' }} /></ListItemIcon> 
  Custom Join
</MenuItem>
<MenuItem onClick={() => handleNavigation('/Create_DataSource')}  sx={{
    backgroundColor: location.pathname === '/Create_DataSource' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/Create_DataSource' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
  <ListItemIcon><AiOutlineCloudServer size={18} style={{ marginRight: 8,color: 'black' }} /></ListItemIcon> 
  Create DataSource
</MenuItem>
</Menu>
{userRole !== '3' && (  
    <>     
  <Button
  onClick={() => handleNavigation('/load_data')}
      sx={{
        backgroundColor: location.pathname === '/load_data' ? '#c5c5c9' : 'inherit',
        maxWidth: '150px',
        alignItems: 'center',
        color: 'inherit',
        fontSize: "16px",  border: 'none',
      }}
    >
      <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000',textTransform: 'none'  }}>
        Data Table 
      </ListItemIcon>
    </Button>
 
      <Button
    onClick={() => handleNavigation('/load_db')}
        sx={{
          backgroundColor: location.pathname === '/load_db' ? '#c5c5c9' : 'inherit',
          maxWidth: '200px',
          alignItems: 'center',
          color: 'inherit',
          fontSize: "16px",  border: 'none',
        }}
      >
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '200px', color: '#000000',textTransform: 'none'  }}>
          Database Connection
        </ListItemIcon>
      </Button>
      </>
)}
{userRole !== '3' && (
  <Button
 
          aria-controls={openDesignMenu ? 'design-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openDesignMenu ? 'true' : undefined}
          onMouseOver={handleDesignMenuClick}
          onMouseLeave={handleDesignMenuMouseLeave} 
          sx={{
            backgroundColor:
            location.pathname === '/dashboard'||
            location.pathname === '/Create_Dashboard' 
            // location.pathname === '/dashboard_view'
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
              textTransform: 'none' ,
              fontSize: "16px"
            }}
          >
            Design 
          </ListItemIcon>
        </Button>
)}
        <Menu
          id="design-menu"
          anchorEl={designMenuAnchorEl}
          open={openDesignMenu}
          // onClose={handleDesignMenuClose}
          PaperProps={{
            // onMouseLeave: handleDesignMenuMouseLeave, 
            onMouseEnter: handleDesignMouseEnter, // Keep menu open when hovered
            onMouseLeave: handleDesignMenuMouseLeave, // Close menu with delay
            // onChangeComplete:handleDesignMenuClose,
            // onMouseLeave: handleDesignMenuMouseLeave,
            sx: {
              width: '170px',
              backgroundColor: '#ffffff',
              color: 'black',
              
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation('/dashboard')} sx={{
    backgroundColor: location.pathname === '/dashboard' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/dashboard' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
          Chart
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/Create_Dashboard')} sx={{
    backgroundColor: location.pathname === '/Create_Dashboard' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/Create_Dashboard' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>
          Dashboard 
          </MenuItem>
          {/* <MenuItem onClick={() => handleNavigation('/dashboard_view')}>
          Dashboard
          </MenuItem> */}
        </Menu>
        {userRole !== '3' && (
              <Button
                onClick={() => handleNavigation('/Edit_Chart')}
                sx={{
                  backgroundColor: location.pathname === '/Edit_Chart' ? '#c5c5c9' : 'inherit',
                  alignItems: 'center',
                  fontSize: "16px", 
                }}
              >
                <ListItemIcon sx={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'center', color: '#000000',textTransform: 'none'  }}>
                  Edit
                </ListItemIcon>
              </Button>
        )}
   {(userRole === '3' || userRole === '2') && ( // Show for Viewer OR Admin
    <Button
        aria-controls={openViewMenu ? 'view-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openViewMenu ? 'true' : undefined}
        onMouseOver={handleViewMenuClick} // Opens the menu
        onMouseLeave={handleViewMenuMouseLeave} // Delayed closing
        sx={{
            backgroundColor: location.pathname === '/Charts_view' || location.pathname === '/dashboard_view' ? '#c5c5c9' : 'inherit',
            maxWidth: '150px',
            alignItems: 'center',
            color: 'inherit',
            fontSize: "16px",border: 'none',
        }}
    >
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000', textTransform: 'none' }}>
            View
        </ListItemIcon>
    </Button>
)}
              
              {/* <Button
                aria-controls={openViewMenu ? 'view-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openViewMenu ? 'true' : undefined}
                onMouseOver={handleViewMenuClick}
                sx={{
                  backgroundColor: location.pathname === '/Charts_view' || location.pathname === '/dashboard_view' ? '#c5c5c9' : 'inherit',
                  maxWidth: '150px',
                  alignItems: 'center',
                  color: 'inherit',
                  fontSize: "16px", 
                }}
              >
                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', width: '150px', color: '#000000' ,textTransform: 'none' }}>
                  View 
                </ListItemIcon>
              </Button>
         )} */}
              <Menu
                id="view-menu"
                anchorEl={viewMenuAnchorEl}
                open={openViewMenu}
                // onClose={handleViewMenuClose}
                PaperProps={{
                  // onMouseLeave: handleViewMenuMouseLeave,
                  onMouseEnter: handleViewMenuEnter, // Keep menu open when hovered
                  onMouseLeave: handleViewMenuMouseLeave, // Close menu with delay
                //   onChangeComplete:handleViewMenuClose,
                // onMouseLeave: handleViewMenuMouseLeave,
                  sx: {
                    width: menuWidth || 'auto',
                    backgroundColor: '#ffffff',
                    color: 'black',
                  },
                }}
              >
                {/* <MenuItem onClick={() => handleNavigation('/Create_Dashboard')}>Charts</MenuItem>
                <MenuItem onClick={() => handleNavigation('/dashboard_view')}>Dashboard</MenuItem> */}
                <MenuItem onClick={() => handleNavigation('/Charts_view')} sx={{
    backgroundColor: location.pathname === '/Charts_view' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/Charts_view' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>Chart</MenuItem>
                <MenuItem onClick={() => handleNavigation('/dashboard_view')} sx={{
    backgroundColor: location.pathname === '/dashboard_view' ? '#c5c5c9': 'inherit',
    color: location.pathname === '/dashboard_view' ? '#ffffff' : 'black',
    '&:hover': {
      backgroundColor: '#64b5f6'
    }
  }}>Dashboard</MenuItem>
              </Menu>
            </ButtonGroup>

            {showColorPicker && (
            <Box sx={{ position: 'absolute', top: '50px', right: '10px', zIndex: 0 }}>
              <SketchPicker color={appBarColor} onChangeComplete={handleColorChange} />
            </Box>
          )}

          </Toolbar>
        </AppBar>
    //    )}

    //   {/* <Box component="main" sx={{ backgroundColor: '#dcdfe8', flexGrow: 1, p: 3, minHeight: '100vh', display: 'flex', flexDirection: 'column', mt: 10 }}>
    //     <AppRouter />
    //   </Box> */}
    //   <Box component="main" sx={{ backgroundColor: '#dcdfe8',marginTop:'30px',minHeight:'100vh', display: 'flex', flexDirection: 'column', mt: 0 }}>
    //     <AppRouter />
    //   </Box>

    // </Box>
        )     
}

export default Navbar;

