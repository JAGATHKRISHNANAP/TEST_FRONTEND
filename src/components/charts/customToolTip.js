
// import React, { useState,useEffect } from "react";
// import Draggable from "react-draggable";
// import {
//   Checkbox,
//   FormControlLabel,
//   Button,
//   TextField,
//   Grid,
//   Typography,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import Columns from "../dashbord-Elements/columns";
// import "./tooltip.css";

// const CustomToolTip = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const toolTipOptions = useSelector((state) => state.toolTip);
//   const [formState, setFormState] = useState(toolTipOptions);
//   const [customHeading, setCustomHeading] = useState(toolTipOptions.customHeading || "");
//   const [headingColor, setHeadingColor] = useState(toolTipOptions.headingColor || "#000000");
//   const [fontSizeX, setFontSizeX] = useState(toolTipOptions.fontSizeX || 16);
//   const [fontSizeY, setFontSizeY] = useState(toolTipOptions.fontSizeY || 16);
//   const [categoryColor, setCategoryColor] = useState(toolTipOptions.categoryColor || "#000000");
//   const [valueColor, setValueColor] = useState(toolTipOptions.valueColor || "#000000");
//   const [fontStyle, setFontStyle] = useState(toolTipOptions.fontStyle || "Arial");

//   const [currentChartType, setCurrentChartType] = useState(localStorage.getItem("selectedChartType"));
  
//   // Effect hook to check and update state if chartType changes
//   useEffect(() => {
//     const savedChartType = localStorage.getItem("selectedChartType");
//     if (savedChartType && savedChartType !== currentChartType) {
//       setCustomHeading(null); // Reset custom heading if chart type is different
//     }
//     setCurrentChartType(savedChartType);
//   }, [currentChartType]);
//   const handleChange = (event) => {
//     const { name, checked, value } = event.target;
//     if (name === "customHeading") {
//       setCustomHeading(value);
//     } else {
//       setFormState({
//         ...formState,
//         [name]: checked,
//       });
//     }
//   };

//   const handleSubmit = () => {
//     dispatch(
//       setToolTipOptions({
//         ...formState,
//         customHeading,
//         headingColor,
//         fontSizeX,
//         fontSizeY,
//         categoryColor,
//         valueColor,
//         fontStyle,
//       })
//     );
//     onClose();
//   };

//   return (
//     <div>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1000,
//         }}
//         onClick={onClose}
//       />
      
//       <Draggable handle=".tooltip-header">
//         <div
//           style={{
//             position: "fixed",
//             top: "10%",
//             left: "30%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "white",
//             padding: "20px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             zIndex: 2000,
//             width: "700px",
//             borderRadius: "10px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             cursor:'move'
//             }}
//         >
//           <div className="tooltip-header" style={{ cursor: "move", paddingBottom: "10px", borderBottom: "1px solid #ccc" }}>
//             <Typography variant="h5" gutterBottom>
//               Customize Tooltip
//             </Typography>
//             <button
//               onClick={onClose}
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "transparent",
//                 border: "none",
//                 fontSize: "20px",
//                 cursor: "pointer",
//               }}
//             >
//               &times;
//             </button>
//           </div>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Columns />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box>
//                 <Typography variant="subtitle1">Select Fields for Tooltip</Typography>
//                 <FormControlLabel
//                   label="Heading"
//                   control={
//                     <Checkbox
//                       name="heading"
//                       checked={formState.heading}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//                 <FormControlLabel
//                   label="Category Name"
//                   control={
//                     <Checkbox
//                       name="categoryName"
//                       checked={formState.categoryName}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//                 <FormControlLabel
//                   label="Value"
//                   control={
//                     <Checkbox
//                       name="value"
//                       checked={formState.value}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//               </Box>

//               <TextField
//                 label="Custom Heading"
//                 name="customHeading"
//                 value={customHeading}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <Box marginY={2}>
//                 <TextField
//                   label="Font Size for X (px)"
//                   type="number"
//                   value={fontSizeX}
//                   onChange={(e) => setFontSizeX(Number(e.target.value))}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <TextField
//                   label="Font Size for Y (px)"
//                   type="number"
//                   value={fontSizeY}
//                   onChange={(e) => setFontSizeY(Number(e.target.value))}
//                   fullWidth
//                   margin="normal"
//                 />
//               </Box>

//               <Box marginY={2} display="flex" justifyContent="space-between" alignItems="center">
//                 <Box display="flex" alignItems="center" marginRight={2}>
//                   <Typography variant="subtitle1" style={{ marginRight: "8px" }}>Category Color</Typography>
//                   <Tooltip title="Pick a color for the category">
//                     <input
//                       type="color"
//                       value={categoryColor}
//                       onChange={(e) => setCategoryColor(e.target.value)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   </Tooltip>
//                 </Box>
//                 <Box display="flex" alignItems="center" marginRight={2}>
//                   <Typography variant="subtitle1" style={{ marginRight: "8px" }}>Value Color</Typography>
//                   <Tooltip title="Pick a color for the value">
//                     <input
//                       type="color"
//                       value={valueColor}
//                       onChange={(e) => setValueColor(e.target.value)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   </Tooltip>
//                 </Box>
//               </Box>

//               <Box display="flex" alignItems="center">
//                 <Typography variant="subtitle1" style={{ marginRight: "8px" }}>Heading Color</Typography>
//                 <Tooltip title="Pick a color for the heading">
//                   <input
//                     type="color"
//                     value={headingColor}
//                     onChange={(e) => setHeadingColor(e.target.value)}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </Tooltip>
//               </Box>

//               <Box marginY={2}>
//                 <Typography variant="subtitle1" style={{ marginRight: "8px" }}>Font Style</Typography>
//                 <select
//                   value={fontStyle}
//                   onChange={(e) => setFontStyle(e.target.value)}
//                   style={{ padding: "8px", fontSize: "16px", width: "100%" }}
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Courier New">Courier New</option>
//                   <option value="Verdana">Verdana</option>
//                 </select>
//               </Box>
//             </Grid>
//           </Grid>
//           <Box display="flex" justifyContent="flex-end" marginTop={3}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               style={{ padding: "10px 20px", fontSize: "16px" }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </div>
//       </Draggable>
//     </div>
//   );
// };

// export default CustomToolTip;


// import React, { useState,useEffect } from "react";
// import Draggable from "react-draggable";
// import {
//   Checkbox,
//   FormControlLabel,
//   Button,
//   TextField,
//   Grid,
//   Typography,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import Columns from "../dashbord-Elements/columns";
// import "./tooltip.css";

// const CustomToolTip = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const toolTipOptions = useSelector((state) => state.toolTip);
//   const [formState, setFormState] = useState(toolTipOptions);
//   const [customHeading, setCustomHeading] = useState(toolTipOptions.customHeading || "");
//   const [headingColor, setHeadingColor] = useState(toolTipOptions.headingColor || "#000000");
//   const [fontSizeX, setFontSizeX] = useState(toolTipOptions.fontSizeX || 16);
//   const [fontSizeY, setFontSizeY] = useState(toolTipOptions.fontSizeY || 16);
//   const [categoryColor, setCategoryColor] = useState(toolTipOptions.categoryColor || "#000000");
//   const [valueColor, setValueColor] = useState(toolTipOptions.valueColor || "#000000");
//   const [fontStyle, setFontStyle] = useState(toolTipOptions.fontStyle || "Arial");

//   const [currentChartType, setCurrentChartType] = useState(localStorage.getItem("selectedChartType"));
  
//   // Effect hook to check and update state if chartType changes
//   useEffect(() => {
//     const savedChartType = localStorage.getItem("selectedChartType");
//     if (savedChartType && savedChartType !== currentChartType) {
//       setCustomHeading(null); // Reset custom heading if chart type is different
//     }
//     setCurrentChartType(savedChartType);
//   }, [currentChartType]);
//   const handleChange = (event) => {
//     const { name, checked, value } = event.target;
//     if (name === "customHeading") {
//       setCustomHeading(value);
//     } else {
//       setFormState({
//         ...formState,
//         [name]: checked,
//       });
//     }
//   };

//   const handleSubmit = () => {
//     dispatch(
//       setToolTipOptions({
//         ...formState,
//         customHeading,
//         headingColor,
//         fontSizeX,
//         fontSizeY,
//         categoryColor,
//         valueColor,
//         fontStyle,
//       })
//     );
//     onClose();
//   };

//   return (
//     <div>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1000,
//         }}
//         onClick={onClose}
//       />
      
//       <Draggable handle=".tooltip-header">
//         <div
//           style={{
//             position: "fixed",
//             top: "10%",
//             left: "30%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "white",
//             padding: "20px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             zIndex: 2000,
//             width: "700px",
//             borderRadius: "10px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             cursor:'move'
//             }}
//         >
//           <div className="tooltip-header" style={{ cursor: "move", paddingBottom: "10px", borderBottom: "1px solid #ccc" }}>
//             <Typography variant="h5" gutterBottom>
//               Customize Tooltip
//             </Typography>
//             <button
//               onClick={onClose}
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "transparent",
//                 border: "none",
//                 fontSize: "20px",
//                 cursor: "pointer",
//               }}
//             >
//               &times;
//             </button>
//           </div>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Columns />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box>
//                 <Typography variant="subtitle1" >Select Fields for Tooltip</Typography>
//                 <FormControlLabel
//                   label="Heading"
//                   control={
//                     <Checkbox
//                       name="heading"
//                       checked={formState.heading}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//                 <FormControlLabel
//                   label="Category Name"
//                   control={
//                     <Checkbox
//                       name="categoryName"
//                       checked={formState.categoryName}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//                 <FormControlLabel
//                   label="Value"
//                   control={
//                     <Checkbox
//                       name="value"
//                       checked={formState.value}
//                       onChange={handleChange}
//                     />
//                   }
//                 />
//               </Box>

//               <TextField
//                 label="Custom Heading"
//                 name="customHeading"
//                 value={customHeading}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
              
//             </Grid>
//           </Grid>
//           <Box display="flex" justifyContent="flex-end" marginTop={3}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               style={{ padding: "10px 20px", fontSize: "16px" }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </div>
//       </Draggable>
//     </div>
//   );
// };

// export default CustomToolTip;

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
import Columns from "../dashbord-Elements/columns";
import "./tooltip.css";

const CustomToolTip = ({ onClose }) => {
  const dispatch = useDispatch();
  const toolTipOptions = useSelector((state) => state.toolTip);
  const [formState, setFormState] = useState(toolTipOptions);
  const [customHeading, setCustomHeading] = useState(toolTipOptions.customHeading || "");
  const [headingColor, setHeadingColor] = useState(toolTipOptions.headingColor || "#000000");
  const [fontSizeX, setFontSizeX] = useState(toolTipOptions.fontSizeX || 16);
  const [fontSizeY, setFontSizeY] = useState(toolTipOptions.fontSizeY || 16);
  const [categoryColor, setCategoryColor] = useState(toolTipOptions.categoryColor || "#000000");
  const [valueColor, setValueColor] = useState(toolTipOptions.valueColor || "#000000");
  const [fontStyle, setFontStyle] = useState(toolTipOptions.fontStyle || "Arial");

  const [currentChartType, setCurrentChartType] = useState(localStorage.getItem("selectedChartType"));
  
  // Effect hook to check and update state if chartType changes
  useEffect(() => {
    const savedChartType = localStorage.getItem("selectedChartType");
    if (savedChartType && savedChartType !== currentChartType) {
      setCustomHeading(""); // Reset custom heading if chart type is different
    }
    setCurrentChartType(savedChartType);
  }, [currentChartType]);
  
  const handleChange = (event) => {
    const { name, checked, value } = event.target;
    if (name === "customHeading") {
      setCustomHeading(value);
    } else {
      setFormState({
        ...formState,
        [name]: checked,
      });
    }
  };

  const handleSubmit = () => {
    dispatch(
      setToolTipOptions({
        ...formState,
        customHeading,
        headingColor,
        fontSizeX,
        fontSizeY,
        categoryColor,
        valueColor,
        fontStyle,
      })
    );
    onClose();
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      
      <Draggable handle=".tooltip-header">
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 2000,
            width: "700px",
            borderRadius: "10px",
            maxHeight: "80vh",
            overflowY: "auto",
            cursor: 'move'
          }}
        >
          <div className="tooltip-header" style={{ cursor: "move", paddingBottom: "10px", borderBottom: "1px solid #ccc" }}>
            <Typography variant="h5" gutterBottom>
              Customize Tooltip
            </Typography>
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Columns />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                {/* Added bottom margin to give space after the title */}
                <Typography variant="subtitle1" gutterBottom>
                  Select Fields for Tooltip
                </Typography>
                
                {/* Heading checkbox on its own row */}
                <Box mb={2}>
                  <FormControlLabel
                    label="Heading"
                    control={
                      <Checkbox
                        name="heading"
                        checked={formState.heading}
                        onChange={handleChange}
                      />
                    }
                  />
                </Box>
                
                {/* Category Name and Value checkboxes in one row */}
                <Box display="flex" alignItems="center" gap={2}>
                  <FormControlLabel
                    label="Category Name"
                    control={
                      <Checkbox
                        name="categoryName"
                        checked={formState.categoryName}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Value"
                    control={
                      <Checkbox
                        name="value"
                        checked={formState.value}
                        onChange={handleChange}
                      />
                    }
                  />
                </Box>
              </Box>

              <TextField
                label="Custom Heading"
                name="customHeading"
                value={customHeading}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </Draggable>
    </div>
  );
};

export default CustomToolTip;
