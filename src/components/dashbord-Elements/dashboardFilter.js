
// import React, { useState } from 'react';
// import ChartColor from '../charts/color'; // Update the path if necessary
// import { IconButton, Box, Typography, Grid, Tooltip } from '@mui/material';
// import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// import SettingsIcon from '@mui/icons-material/Settings';
// import CustomToolTip from '../charts/customToolTip'; // Importing customToolTip.js

// const ChartColorPage = () => {
//   const [openColorPicker, setOpenColorPicker] = useState(false);
//   const [openFilter, setOpenFilter] = useState(false); // State to handle the filter tooltip

//   const handleColorPickerToggle = () => {
//     setOpenColorPicker(!openColorPicker);
//   };

//   const handleFilterToggle = () => {
//     setOpenFilter(!openFilter); // Toggle the display of the filter content
//   };

//   return (
//     <div className="App">
//       <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
//         {/* Main container */}
//         <div className="dash-right-side-container">
//           {/* Grid layout for icons */}
//           <Grid
//             container
//             spacing={2}
//             justifyContent="center"
//             alignItems="center"
//             sx={{ padding: '30px' }}
//           >
//             {/* Color Picker Button */}
//             <Grid item>
//               <Tooltip title="Color Picker" arrow>
//                 <IconButton
//                 variant={chartType === 'sampleAitestChart' ? 'contained' : 'outlined'}
//                   color={openColorPicker ? 'primary' : 'default'}
//                   onClick={handleColorPickerToggle}
//                 >
//                   <ColorLensIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>

//             {/* Custom Tooltip Button */}
//             <Grid item>
//               <Tooltip title="Custom Tooltip" arrow>
//                 <IconButton
//                 variant={chartType === 'sampleAitestChart' ? 'contained' : 'outlined'}
//                   color={openFilter ? 'primary' : 'default'}
//                   onClick={handleFilterToggle}
//                 >
//                   <SettingsIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//           </Grid>

//           {/* Color Picker */}
//           {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

//           {/* Filter */}
//           {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default ChartColorPage;

import React, { useState } from 'react';
import ChartColor from '../charts/color'; // Update the path if necessary
import { IconButton, Box, Grid, Tooltip,Button } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
import SettingsIcon from '@mui/icons-material/Settings';
import CustomToolTip from '../charts/customToolTip'; // Importing customToolTip.js

const ChartColorPage = () => {
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openFilter, setOpenFilter] = useState(false); // State to handle the filter tooltip

  const handleColorPickerToggle = () => {
    setOpenColorPicker(!openColorPicker);
  };

  const handleFilterToggle = () => {
    setOpenFilter(!openFilter); // Toggle the display of the filter content
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1,
          backgroundColor: "white",
          height: "10vh", // Set the height to full viewport height
          display: "flex", // Enable flexbox
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          }}>
        {/* Main container */}
        <div className="dash-right-side-container">
          {/* Grid layout for icons */}
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ padding: '10px' }}
          >
            
<Grid item>
  <Tooltip title="Color Picker" arrow>
    <Button
      sx={{ margin: '1px' }}
      variant={openColorPicker ? 'contained' : 'outlined'}
      onClick={handleColorPickerToggle}
    >
      <ColorLensIcon />
    </Button>
  </Tooltip>
</Grid>
<Grid item>
  <Tooltip title="Custom Tooltip" arrow>
    <Button
      sx={{ margin: '2px' }}
      variant={openFilter ? 'contained' : 'outlined'}
      onClick={handleFilterToggle}
    >
       <SettingsIcon />
    </Button>
  </Tooltip>
</Grid>
            
          </Grid>

          {/* Color Picker */}
          {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

          {/* Filter */}
          {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
        </div>
      </Box>
    </div>
  );
};

export default ChartColorPage;
