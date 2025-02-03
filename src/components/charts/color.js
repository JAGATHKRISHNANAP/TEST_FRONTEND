// import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { SketchPicker } from "react-color";
// import { setChartColor } from '../../features/Charts/colorSlice';
// // import TextChart from "./textChart";
// import "./TextChart.css";
// import { Box } from "@mui/material";
// const ChartColor = (props) => {
//   const dispatch = useDispatch();
//   const color = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

//   const handleColorChange = (color) => {
//     dispatch(setChartColor(color.hex));
//   };

//   return (
//     <div className="App">    
//       <Box sx={{ flexGrow: 1,width: '4px'}}>
//         <div className="dash-right-side-container">
//         <SketchPicker 
//             color={color} 
//             onChangeComplete={handleColorChange}
//             styles={{ 
//               default: { 
//                 picker: { 
//                   marginLeft: '0px', 
//                   width: '180px',// Adjust this to reduce the size of the picker
//                   height: '300px' // Adjust this for height as well if necessary
//                 } 
//               }
//             }}
//           />
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default ChartColor;


// import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { SketchPicker } from "react-color";
// import { setChartColor } from '../../features/Charts/colorSlice';
// import { Box, IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close'; // Close icon

// const ChartColor = (props) => {
//   const dispatch = useDispatch();
//   const color = useSelector((state) => state.chartColor.chartColor);

//   const handleColorChange = (color) => {
//     dispatch(setChartColor(color.hex));
//   };

//   return (
//     <div className="App">
//       {/* Box to center the SketchPicker */}
//       <Box 
//         sx={{
//           position: 'fixed',   // Fixed to stay on the screen even when scrolling
//           top: '50%',          // Center vertically
//           left: '50%',         // Center horizontally
//           transform: 'translate(-50%, -50%)', // Ensure it is perfectly centered
//           zIndex: 1000,        // Make sure the picker is above other content
//           backgroundColor: 'white', // Optional: To make the background of the picker white
//           borderRadius: '8px', // Optional: To give the picker a rounded look
//           boxShadow: 3,        // Optional: Add shadow for better visibility
//           padding: '16px',     // Optional: Add padding around the picker
//         }}
//       >
//         <div className="dash-right-side-container" style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: 1000,
          
//         }}>
//           {/* Color Picker */}
//           <SketchPicker 
//             color={color} 
//             onChangeComplete={handleColorChange}
//             styles={{ 
//               default: { 
//                 picker: { 
//                   width: '200px', // Adjust this to reduce the size of the picker
//                   height: '300px', // Adjust this for height as well if necessary
//                 } 
//               }
//             }}
//           />
//           {/* Close Button */}
//           <IconButton
//             color="secondary"
//             onClick={props.onClose}
//             sx={{
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               zIndex: 2,
//               margin: 1,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default ChartColor;

import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from "react-color";
import { setChartColor } from '../../features/Charts/colorSlice';
import { Box } from "@mui/material";

const ChartColor = ({ onClose }) => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.chartColor.chartColor);
  const pickerRef = useRef(null); // Ref for color picker

  const handleColorChange = (color) => {
    dispatch(setChartColor(color.hex));
  };

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose(); // Close the picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box 
      ref={pickerRef} // Attach ref to the box
      sx={{
        position: 'fixed',
        top: '70%',
        left: '94%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        // backgroundColor: 'white',
        borderRadius: '7px',
        // boxShadow: 3,
        padding: '16px',
      }}
    >
      <SketchPicker 
        color={color} 
        onChangeComplete={handleColorChange}
        styles={{ 
          default: { 
            picker: { width: '190px', height: '300px' } 
          } 
        }}
      />
    </Box>
  );
};

export default ChartColor;
