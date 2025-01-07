

// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../charts/TextChart.css";
// import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
// import { sendChartData } from "../../utils/api";
// import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

// const TextChart = (props) => {

//   const [fetchedData, setFetchedData] = useState(null);
//   const dispatch = useDispatch();
//   const toolTip = useSelector((state) => state.toolTip);
//   const [result, setResult] = useState(null);
//   const text_y_xis = useSelector((state) => state.chart.xAxis);
//   console.log("text_y_xis", text_y_xis);
//   const text_y_database = useSelector((state) => state.database.databaseName);
//   console.log("text_y_database", text_y_database);
//   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
//     console.log("text_y_aggregate", text_y_aggregate);
//   const text_y_table = useSelector((state) => state.loadExcel.checkedPaths);
//     console.log("text_y_table", text_y_table);

//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   useEffect(() => {
//     const sendDataToBackend = async () => {
//       try {
//         const response = await sendChartData(text_y_xis, text_y_database, text_y_table, text_y_aggregate);
//         console.log("Response from backend:", response);

//         const fetchedData = response.data;
//         setResult(fetchedData.total_x_axis);
//         console.log("Fetched Data:", fetchedData);

//         setFetchedData(fetchedData);
//       } catch (error) {
//         console.error("Error sending data to backend", error);
//       }
//     };

//     sendDataToBackend();
//   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]); 
  
//   useEffect(() => {
//     const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
//     dispatch(setToolTipOptions({ customHeading: toolTipText })); 
//   }, [text_y_aggregate, text_y_xis, dispatch]);



//   return (

//     <div align="center">
//     <Card sx={{ maxWidth:300}}>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//       {toolTip.customHeading}
//       </Typography>
//       <Typography variant="h5" component="div">
//       {fetchedData ? (
//         <p>{result}</p>
//       ) : (
//         <p>Loading data...</p>
//       )}
//       </Typography>
//     </CardContent>
    
//   </Card>
//   </div>
//   );
// };

// export default TextChart;




// import React from 'react';
// import { ResizableBox } from 'react-resizable';

// const SingleValueChartView = ({ width, heading, result, fetchedData, handleResize }) => {
//   return (
//     <ResizableBox
//       width={400}
//       height={200}
//       minConstraints={[200, 90]}
//       maxConstraints={[800, 600]}
//       onResize={handleResize}
//     >
//       <div style={{ textAlign: 'center' }}>
//         {/* Set a fixed font size for the heading */}
//         <h4 style={{ fontSize: '20px' }}>{heading.replace(/"/g, '')}</h4>
//         <div>
//           {/* Dynamically adjust the font size of the result only, if needed */}
//           <h2 style={{ fontSize: `${width / 10}px` }}>
//             {fetchedData ? result : 'Loading data...'}
//           </h2>
//         </div>
//       </div>
//     </ResizableBox>
//   );
// };

// export default SingleValueChartView;




// import React from 'react';
// import { ResizableBox } from 'react-resizable';

// const SingleValueChartView = ({ width, heading, result, fetchedData, handleResize }) => {
//   // Calculate the font size for the heading dynamically based on the width
//   const headingFontSize = `${Math.max(16, width / 20)}px`; // Set a minimum font size of 16px

//   return (
//     <ResizableBox
//       width={400}
//       height={200}
//       minConstraints={[200, 90]}
//       maxConstraints={[800, 600]}
//       onResize={handleResize}
//     >
//       <div style={{ textAlign: 'center' }}>
//         {/* Dynamically adjust the font size of the heading */}
//         <h4 style={{ fontSize: headingFontSize }}>
//           {heading.replace(/"/g, '')}
//         </h4>
//         <div>
//           {/* Dynamically adjust the font size of the result */}
//           <h2 style={{ fontSize: `${width / 10}px` }}>
//             {fetchedData ? result : 'Loading data...'}
//           </h2>
//         </div>
//       </div>
//     </ResizableBox>
//   );
// };

// export default SingleValueChartView;







// import React from 'react';
// import { ResizableBox } from 'react-resizable';
// import { Card, CardHeader } from '@mui/material';

// const SingleValueChartView = ({ width, heading, result, fetchedData, handleResize }) => {
//   // Calculate the font size for the heading dynamically based on the width
//   const headingFontSize = `${Math.max(16, width / 20)}px`; // Set a minimum font size of 16px

//   return (
//     <Card variant="outlined" style={{ margin: '5px', overflow: 'hidden' , borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
//       <CardHeader
//         title={
//           <h4 style={{ fontSize: headingFontSize, margin: 0 }}>
//             {heading.replace(/"/g, '')}
//           </h4>
//         }
//         style={{ textAlign: 'center', padding: '8px' }}
//       />
//       {/* <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
//         <ResizableBox
//           width={200}
//           height={50}
//           minConstraints={[200, 50]}
//           maxConstraints={[800, 350]}
//           onResize={handleResize}
//           style={{
//             border: '1px dashed #ccc',
//             padding: '8px',
//             boxSizing: 'border-box',
//             width: '100%',
//           }}
//         >
//           <div style={{ textAlign: 'center', width: '100%', height: '50%' }}>
//             <h2 style={{ fontSize: `${width/ 10}px`, margin: '0' }}>
//               {fetchedData ? result : 'Loading data...'}
//             </h2>
//           </div>
//         </ResizableBox>
//       {/* </CardContent> */}
//     </Card>
//   );
// };

// export default SingleValueChartView;


// import React, { useState } from 'react';
// import { ResizableBox } from 'react-resizable';
// import { Card, CardHeader } from '@mui/material';

// const SingleValueChartView = ({ width, heading, result, fetchedData }) => {
//   // State to track the resizable box's width and height
//   const [boxDimensions, setBoxDimensions] = useState({ width: 200, height: 50 });

//   // Calculate font sizes dynamically
//   const headingFontSize = `${Math.max(16, width / 20)}px`; // Minimum font size of 16px
//   const valueFontSize = `${Math.max(14, boxDimensions.width / 10)}px`; // Adjust h2 font size dynamically

//   // Handle resizing
//   const handleResize = (event, { size }) => {
//     setBoxDimensions({ width: size.width, height: size.height });
//   };

//   return (
//     <Card
//       variant="outlined"
//       style={{
//         // margin: '5px',
//         overflow: 'hidden',
//         borderRadius: '16px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <CardHeader
//         title={
//           <h4 style={{ fontSize: headingFontSize, margin: 0 }}>
//             {heading.replace(/"/g, '')}
//           </h4>
//         }
//         style={{ textAlign: 'center', padding: '8px' }}
//       />

//       <ResizableBox
//         width={boxDimensions.width}
//         height={boxDimensions.height}
//         minConstraints={[200, 50]}
//         maxConstraints={[800, 350]}
//         onResize={handleResize}
//         style={{
//           border: '1px dashed #ccc',
//           padding: '8px',
//           boxSizing: 'border-box',
//           width: '100%',
//         }}
//       >
//         <div style={{ textAlign: 'center', width: '100%', height: '50%' }}>
//           <h2 style={{ fontSize: valueFontSize, margin: '0' }}>
//             {fetchedData ? result : 'Loading data...'}
//           </h2>
//         </div>
//       </ResizableBox>
//     </Card>
//   );
// };

// export default SingleValueChartView;











// import React, { useState } from 'react';
// import { ResizableBox } from 'react-resizable';
// import { Card, CardHeader } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';

// const SingleValueChartView = ({ width, heading, result, fetchedData }) => {
//   // State to track the resizable box's width and height
//   const [boxDimensions, setBoxDimensions] = useState({ width: 200, height: 50 });

//   // Calculate font sizes dynamically
//   const headingFontSize = `${Math.max(16, boxDimensions.width / 20)}px`; // Minimum font size of 16px
//   const valueFontSize = `${Math.max(14, width / 10)}px`; // Adjust h2 font size dynamically

//   // Handle resizing
//   const handleResize = (event, { size }) => {
//     setBoxDimensions({ width: size.width, height: size.height });
//   };

//   return (
//     <Card
//       variant="outlined"
//       style={{
//         margin: '5px',
//         overflow: 'hidden',
//         borderRadius: '16px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <CardHeader
//         title={
//           <h4 style={{ fontSize: headingFontSize, margin: 0 }}>
//             {heading.replace(/"/g, '')}
//           </h4>
//         }
//         style={{ textAlign: 'center', padding: '8px' }}
//       />

//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
//         <ResizableBox
//           width={boxDimensions.width}
//           height={boxDimensions.height}
//           minConstraints={[200, 50]}
//           maxConstraints={[800, 350]}
//           onResize={handleResize}
//           style={{
//             border: '0px solid #ccc', // Solid border for clarity
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             boxSizing: 'border-box',
//           }}
//         >
//           <h2 style={{ fontSize: valueFontSize, margin: '0', textAlign: 'center',fontWeight: 'bold' }}>
//             {fetchedData ? result : <CircularProgress 
//   size={20} 
//   style={{ color: 'primary', margin: '10px' }} 
// />}
//           </h2>
//         </ResizableBox>
//       </div>
//     </Card>
//   );
// };

// export default SingleValueChartView;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ResizableBox } from 'react-resizable';
import { Card, CardHeader } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const SingleValueChartView = ({ width, heading, result, fetchedData }) => {
  const location = useLocation();
  // State to track the resizable box's width and height
  const [boxDimensions, setBoxDimensions] = useState({ width: 300, height: 50 });
  const [maxConstraints, setMaxConstraints] = useState([800, 350]); // Default maxConstraints
  // Set initial maxConstraints based on the route on mount
  useEffect(() => {
    if (location.pathname === '/Charts_view') {
      setMaxConstraints([1200, 600]); // Larger constraints for Charts_view route
    } else {
      setMaxConstraints([800, 350]); // Default constraints for other routes
    }
  }, [location.pathname]);

  // Calculate font sizes dynamically
  const headingFontSize = `${Math.max(16, boxDimensions.width / 20)}px`; // Minimum font size of 16px
  const valueFontSize = `${Math.max(14, width / 10)}px`; // Adjust h2 font size dynamically

  // Handle resizing
  const handleResize = (event, { size }) => {
    setBoxDimensions({ width: size.width, height: size.height });
  };

  return (
    <Card
      variant="outlined"
      style={{
        margin: '5px',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <CardHeader
        title={
          <h4 style={{ fontSize: headingFontSize, margin: 0 }}>
            {heading.replace(/"/g, '')}
          </h4>
        }
        style={{ textAlign: 'center', padding: '8px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
        <ResizableBox
          width={boxDimensions.width}
          height={boxDimensions.height}
          minConstraints={[200, 50]}
          maxConstraints={maxConstraints}
          onResize={handleResize}
          style={{
            border: '0px solid #ccc', // Solid border for clarity
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ fontSize: valueFontSize, margin: '0', textAlign: 'center', fontWeight: 'bold' }}>
            {fetchedData ? result : (
              <CircularProgress 
                size={20} 
                style={{ color: 'primary', margin: '10px' }} 
              />
            )}
          </h2>
        </ResizableBox>
      </div>
    </Card>
  );
};

export default SingleValueChartView;
