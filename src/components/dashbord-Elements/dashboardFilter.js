
// // // import React, { useState } from 'react';
// // // import ChartColor from '../charts/color'; // Update the path if necessary
// // // import { Button, IconButton, Box,Typography  } from '@mui/material';
// // // import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// // // import { useNavigate } from 'react-router-dom';
// // // import { color } from 'd3';

// // // const ChartColorPage = () => {
// // //   const [openColorPicker, setOpenColorPicker] = useState(false);
  
// // //   const handleColorPickerToggle = () => {
// // //     setOpenColorPicker(!openColorPicker);
// // //   };

// // //   return (
// // //     <div className="App">    
// // //       <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '25vh' }}> {/* Set background to white */}
// // //         <div className="dash-right-side-container">
// // //           <Box sx={{ padding: '20px' }}>
// // //             {/* Icon Button to open color picker */}
// // //             <IconButton
// // //               color="primary"
// // //               onClick={handleColorPickerToggle}
// // //               sx={{ marginBottom: '20px' }}
// // //               value:color
// // //             >
// // //               <ColorLensIcon />
// // //             </IconButton>
// // //             {/* If color picker is open, display it */}
// // //             {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}
// // //           </Box>
// // //         </div>
// // //       </Box>
// // //     </div>
// // //   );
// // // }

// // // // export default ChartColorPage;
// // // import React, { useState } from 'react';
// // // import ChartColor from '../charts/color'; // Update the path if necessary
// // // import { Button, IconButton, Box, Typography } from '@mui/material';
// // // import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// // // import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
// // // import { useNavigate } from 'react-router-dom';
// // // import { color } from 'd3';
// // // import CustomToolTip from '../charts/customToolTip'; // Importing customToolTip.js

// // // const ChartColorPage = () => {
// // //   const [openColorPicker, setOpenColorPicker] = useState(false);
// // //   const [openFilter, setOpenFilter] = useState(false); // State to handle the filter tooltip
  
// // //   const handleColorPickerToggle = () => {
// // //     setOpenColorPicker(!openColorPicker);
// // //   };

// // //   const handleFilterToggle = () => {
// // //     setOpenFilter(!openFilter); // Toggle the display of the filter content
// // //   };

// // //   const handleSubmit = () => {
// // //     dispatch(
// // //       setToolTipOptions({
// // //         ...formState,
// // //         customHeading,
// // //         headingColor,
// // //         fontSizeX,
// // //         fontSizeY,
// // //         categoryColor,
// // //         valueColor,
// // //       })
// // //     );
// // //     onClose();
// // //   };

// // //   return (
// // //     <div className="App">
// // //       <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '25vh' }}> {/* Set background to white */}
// // //         <div className="dash-right-side-container">
// // //           <Box sx={{ padding: '20px' }}>
// // //             {/* Icon Button to open color picker */}
// // //             <IconButton
// // //               color="primary"
// // //               onClick={handleColorPickerToggle}
// // //               sx={{ marginBottom: '20px' }}
// // //             >
// // //               <ColorLensIcon />
// // //             </IconButton>
// // //             {/* If color picker is open, display it */}
// // //             {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

// // //             {/* Filter Icon Button */}
// // //             <IconButton
// // //               color="primary"
// // //               onClick={handleFilterToggle}
// // //               sx={{ marginLeft: '20px' }}
// // //             >
// // //               <FilterListIcon />
// // //             </IconButton>
// // //             {/* If filter is open, display customToolTip.js content */}
// // //             {openFilter && <CustomToolTip />}
// // //           </Box>
// // //         </div>
// // //       </Box>
// // //     </div>
// // //   );
// // // };

// // // export default ChartColorPage;
// // import React, { useState } from 'react';
// // import ChartColor from '../charts/color'; // Update the path if necessary
// // import { Button, IconButton, Box, Typography } from '@mui/material';
// // import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// // import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
// // import { useNavigate } from 'react-router-dom';
// // import { color } from 'd3';
// // import CustomToolTip from '../charts/customToolTip'; // Importing customToolTip.js

// // const ChartColorPage = () => {
// //   const [openColorPicker, setOpenColorPicker] = useState(false);
// //   const [openFilter, setOpenFilter] = useState(false); // State to handle the filter tooltip
  
// //   const handleColorPickerToggle = () => {
// //     setOpenColorPicker(!openColorPicker);
// //   };

// //   const handleFilterToggle = () => {
// //     setOpenFilter(!openFilter); // Toggle the display of the filter content
// //   };

// //   return (
// //     <div className="App">
// //       <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '25vh' }}> {/* Set background to white */}
// //         <div className="dash-right-side-container">
// //           <Box sx={{ padding: '20px' }}>
// //             {/* Icon Button to open color picker */}
// //             <IconButton
// //               color="primary"
// //               onClick={handleColorPickerToggle}
// //               sx={{ marginBottom: '20px' }}
// //             >
// //               <ColorLensIcon />
// //             </IconButton>
// //             {/* If color picker is open, display it */}
// //             {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

// //             {/* Filter Icon Button */}
// //             <IconButton
// //               color="primary"
// //               onClick={handleFilterToggle}
// //               sx={{ marginLeft: '20px' }}
// //             >
// //               <FilterListIcon />
// //             </IconButton>
// //             {/* If filter is open, display customToolTip.js content */}
// //             {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
// //           </Box>
// //         </div>
// //       </Box>
// //     </div>
// //   );
// // };

// // export default ChartColorPage;

// import React, { useState } from 'react';
// import ChartColor from '../charts/color'; // Update the path if necessary
// import { Button, IconButton, Box, Typography } from '@mui/material';
// import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
// import { useNavigate } from 'react-router-dom';
// import { color } from 'd3';
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
//       <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '25vh' }}> {/* Set background to white */}
//         <div className="dash-right-side-container">
//           <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             {/* Icon Button for Color Picker */}
//             <IconButton
//               color="primary"
//               onClick={handleColorPickerToggle}
//               sx={{ marginBottom: '8px' }}
//             >
//               <ColorLensIcon />
//             </IconButton>
//             <Typography variant="caption">Color Picker</Typography> {/* Label under the icon */}

//             {/* If color picker is open, display it */}
//             {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

//             {/* Filter Icon Button */}
//             <IconButton
//               color="primary"
//               onClick={handleFilterToggle}
//               sx={{ marginTop: '20px' }}
//             >
//               <FilterListIcon />
//             </IconButton>
//             <Typography variant="caption" sx={{ marginTop: '4px' }}>Filter</Typography> {/* Label under the icon */}

//             {/* If filter is open, display customToolTip.js content */}
//             {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
//           </Box>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default ChartColorPage;

// import React, { useState } from 'react';
// import ChartColor from '../charts/color'; // Update the path if necessary
// import { Button, IconButton, Box, Typography } from '@mui/material';
// import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
// import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
// import { useNavigate } from 'react-router-dom';
// import { color } from 'd3';
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
//       <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '25vh' }}> {/* Set background to white */}
//         <div className="dash-right-side-container">
//           <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             {/* Color Picker Icon and Label */}
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
//               <IconButton
//                 color="primary"
//                 onClick={handleColorPickerToggle}
//                 sx={{ marginBottom: '8px' }}
//               >
//                 <ColorLensIcon />
//               </IconButton>
//               <Typography variant="caption">Color </Typography> {/* Label under the icon */}
//             </Box>

//             {/* Filter Icon and Label */}
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               <IconButton
//                 color="primary"
//                 onClick={handleFilterToggle}
//                 sx={{ marginBottom: '8px' }}
//               >
//                 <FilterListIcon />
//               </IconButton>
//               <Typography variant="caption">Filter</Typography> {/* Label under the icon */}
//             </Box>
//           </Box>

//           {/* If color picker is open, display it */}
//           {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}

//           {/* If filter is open, display customToolTip.js content */}
//           {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default ChartColorPage;

import React, { useState } from 'react';
import ChartColor from '../charts/color'; // Update the path if necessary
import { Button, IconButton, Box, Typography, Grid } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens'; // Icon for color picker
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
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
      <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
        {/* Main container */}
        <div className="dash-right-side-container">
          {/* Grid layout for icons */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ padding: '30px' }}
          >
            {/* Color Picker Icon and Label */}
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                  color="primary"
                  onClick={handleColorPickerToggle}
                  sx={{ marginBottom: '8px' }}
                >
                  <ColorLensIcon />
                </IconButton>
                <Typography variant="caption">Color</Typography>
              </Box>
            </Grid>

            {/* Filter Icon and Label */}
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                  color="primary"
                  onClick={handleFilterToggle}
                  sx={{ marginBottom: '8px' }}
                >
                  <FilterListIcon />
                </IconButton>
                <Typography variant="caption">Filter</Typography>
              </Box>
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
