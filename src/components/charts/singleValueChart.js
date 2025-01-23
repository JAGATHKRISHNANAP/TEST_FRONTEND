// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import "./TextChart.css";
// // // import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
// // // import { sendTestChartData } from "../../utils/api";
// // // import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

// // // const TextChart = (props) => {
// // //   const [fetchedData, setFetchedData] = useState(null);
// // //   const dispatch = useDispatch();
// // //   const toolTip = useSelector((state) => state.toolTip);
// // //   const [result, setResult] = useState(null); 


// // //   const text_y_xis = useSelector((state) => state.chart.xAxis);
// // //   console.log("text_y_xis", text_y_xis);
// // //   const text_y_database = localStorage.getItem('company_name');
// // //   console.log("text_y_database", text_y_database);
// // //   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
// // //     console.log("text_y_aggregate", text_y_aggregate);
// // //   const text_y_table = useSelector((state) => {
// // //     if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
// // //       return state.loadExcel.checkedPaths;
// // //     } else {
// // //       return state.loadCsv.checkedPaths;
// // //     }
// // //   });


// // //     console.log("text_y_table--------------------------------------", text_y_table[0]);


// // //   useEffect(() => {
// // //     console.log("Received categories:", props.categories);
// // //     console.log("Received values:", props.values);
// // //   }, [props.categories, props.values]);

// // //   useEffect(() => {
// // //     const sendDataToBackend = async () => {
// // //       try {
// // //         const response = await sendTestChartData(text_y_xis, text_y_database, text_y_table[0], text_y_aggregate);
// // //         console.log("Response from backend:", response);

// // //         const fetchedData = response.data;
// // //         setResult(fetchedData.total_x_axis);
// // //         console.log("Fetched Data:", fetchedData);

// // //         setFetchedData(fetchedData);
// // //       } catch (error) {
// // //         console.error("Error sending data to backend", error);
// // //       }
// // //     };

// // //     sendDataToBackend();
// // //   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]); 
  
// // //   useEffect(() => {
// // //     const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
// // //     dispatch(setToolTipOptions({ customHeading: toolTipText })); 
// // //   }, [text_y_aggregate, text_y_xis, dispatch]);


// // //   return (

// // //     <div align="center">
// // //     <Card sx={{ maxWidth:300}}>
// // //     <CardContent>
// // //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
// // //       {toolTip.customHeading}
// // //       </Typography>
// // //       <Typography variant="h5" component="div">
// // //       {fetchedData ? (
// // //         <p>{result}</p>
// // //       ) : (
// // //         <p>Loading data...</p>
// // //       )}
// // //       </Typography>
// // //     </CardContent>
    
// // //   </Card>
// // //   </div>
// // //   );
// // // };

// // // export default TextChart;



















// // import React, { useEffect, useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { ResizableBox } from "react-resizable";
// // import "./TextChart.css";
// // import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// // import { sendTestChartData } from "../../utils/api";
// // import { Typography } from "@mui/material";
// // import "react-resizable/css/styles.css"; // Import required styles

// // const TextChart = (props) => {
// //   const [fetchedData, setFetchedData] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [boxSize, setBoxSize] = useState({ width: 300, height: 200 }); // Store the current box size
// //   const dispatch = useDispatch();
// //   const toolTip = useSelector((state) => state.toolTip);
// // const [selectedUser, setSelectedUser] = React.useState(localStorage.getItem('selectedUser'));
// // console.log("selectedUser",selectedUser)
// //   const text_y_xis = useSelector((state) => state.chart.xAxis);
// //   const text_y_database = localStorage.getItem("company_name");
// //   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
// //   const text_y_table = useSelector((state) => {
// //     if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
// //       return state.loadExcel.checkedPaths;
// //     } else {
// //       return state.loadCsv.checkedPaths;
// //     }
// //   });

// //   useEffect(() => {
// //     const sendDataToBackend = async () => {
// //       try {
// //         const response = await sendTestChartData(
// //           text_y_xis,
// //           text_y_database,
// //           text_y_table[0],
// //           text_y_aggregate,
// //           selectedUser
// //         );
// //         const fetchedData = response.data;
// //         console.log("fetchedData",fetchedData)
        
// //         setResult(fetchedData.total_x_axis);
// //         setFetchedData(fetchedData);
// //       } catch (error) {
// //         console.error("Error sending data to backend", error);
// //       }
// //     };

// //     sendDataToBackend();
// //   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate,selectedUser]);

// //   useEffect(() => {
// //     const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
// //     dispatch(setToolTipOptions({ customHeading: toolTipText }));
// //   }, [text_y_aggregate, text_y_xis, dispatch]);

// //   // Calculate font size based on box width and height
// //   const calculateFontSize = (width, height) => {
// //     const baseFontSize = 16; // Default font size
// //     const scaleFactor = Math.min(width / 300, height / 200); // Scale font size based on box dimensions
// //     return baseFontSize * scaleFactor;
// //   };

// //   return (
// //     <div align="center">
// //       <ResizableBox
// //         width={boxSize.width}
// //         height={boxSize.height}
// //         minConstraints={[200, 150]} // Minimum width and height
// //         maxConstraints={[600, 400]} // Maximum width and height
// //         resizeHandles={["se"]} // Resize handle on the bottom-right corner
// //         onResizeStop={(e, data) => {
// //           setBoxSize({ width: data.size.width, height: data.size.height });
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             border: "1px solid #ccc",
// //             borderRadius: "8px",
// //             padding: "16px",
// //             boxSizing: "border-box",
// //           }}
// //         >
// //           <Typography
// //             sx={{
// //               fontSize: calculateFontSize(boxSize.width, boxSize.height) * 0.8,
// //             }}
// //             color="text.secondary"
// //             gutterBottom
// //           >
// //             {toolTip.customHeading}
// //           </Typography>
// //           <Typography
// //             sx={{
// //               fontSize: calculateFontSize(boxSize.width, boxSize.height),
// //             }}
// //             variant="h5"
// //             component="div"
// //           >
// //             {fetchedData ? (
// //               <p style={{ margin: 0 }}>{result}</p>
// //             ) : (
// //               <p style={{ margin: 0 }}>Loading data...</p>
// //             )}
// //           </Typography>
// //         </div>
// //       </ResizableBox>
// //     </div>
// //   );
// // };

// // export default TextChart;

// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./TextChart.css";
// import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
// import { sendTestChartData } from "../../utils/api";
// import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

// const TextChart = (props) => {
//   const [fetchedData, setFetchedData] = useState(null);
//   const dispatch = useDispatch();
//   const toolTip = useSelector((state) => state.toolTip);
//   const [result, setResult] = useState(null); 

//   const [selectedUser, setSelectedUser] = React.useState(localStorage.getItem('selectedUser'));
//   const text_y_xis = useSelector((state) => state.chart.xAxis);
//   console.log("text_y_xis", text_y_xis);
//   const text_y_database = localStorage.getItem('company_name');
//   console.log("text_y_database", text_y_database);
//   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
//     console.log("text_y_aggregate", text_y_aggregate);
//   const text_y_table = useSelector((state) => {
//     if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
//       return state.loadExcel.checkedPaths;
//     } else {
//       return state.loadCsv.checkedPaths;
//     }
//   });


//     console.log("text_y_table--------------------------------------", text_y_table[0]);


//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   useEffect(() => {
//     const sendDataToBackend = async () => {
//       try {
//         const response = await sendTestChartData(text_y_xis, text_y_database, text_y_table[0], text_y_aggregate, selectedUser);
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
//   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate,selectedUser]); 
  
//   useEffect(() => {
//     const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
//     dispatch(setToolTipOptions({ customHeading: toolTipText })); 
//   }, [text_y_aggregate, text_y_xis, dispatch]);


//   return (

//     <div align="center">
//     <Card sx={{ maxWidth:300}}>
//     <CardContent>
//       <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
//       {toolTip.customHeading}
//       </Typography>
//       <Typography sx={{ fontSize: 32 }} component="div">
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
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TextChart.css";
import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
import { sendTestChartData } from "../../utils/api";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const TextChart = (props) => {
  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
  const toolTip = useSelector((state) => state.toolTip);
  const [result, setResult] = useState(null); 


  const text_y_xis = useSelector((state) => state.chart.xAxis);
  console.log("text_y_xis", text_y_xis);
  const text_y_database = localStorage.getItem('company_name');
  console.log("text_y_database", text_y_database);
  const text_y_aggregate = useSelector((state) => state.chart.aggregate);
    console.log("text_y_aggregate", text_y_aggregate);
  // const text_y_table = useSelector((state) => {
  //   if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
  //     return state.loadExcel.checkedPaths;
  //   } else {
  //     return state.loadCsv.checkedPaths;
  //   }
  // });
  const text_y_table =localStorage.getItem('selectedTable'); 


    console.log("text_y_table--------------------------------------", text_y_table[0]);


  useEffect(() => {
    console.log("Received categories:", props.categories);
    console.log("Received values:", props.values);
  }, [props.categories, props.values]);

  useEffect(() => {
    const sendDataToBackend = async () => {
  const selectedUser = localStorage.getItem('selectedUser');

      try {
        const response = await sendTestChartData(text_y_xis, text_y_database, text_y_table, text_y_aggregate,selectedUser);
        console.log("Response from backend:", response);

        const fetchedData = response.data;
        setResult(fetchedData.total_x_axis);
        console.log("Fetched Data:", fetchedData);

        setFetchedData(fetchedData);
      } catch (error) {
        console.error("Error sending data to backend", error);
      }
    };

    sendDataToBackend();
  }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]); 
  
  useEffect(() => {
    const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
    dispatch(setToolTipOptions({ customHeading: toolTipText })); 
  }, [text_y_aggregate, text_y_xis, dispatch]);


  return (

    <div align="center">
    <Card sx={{ maxWidth:300}}>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
      {toolTip.customHeading}
      </Typography>
      <Typography sx={{ fontSize: 32 }} component="div">
      {fetchedData ? (
        <p>{result}</p>
      ) : (
        <p>Loading data...</p>
      )}
      </Typography>
    </CardContent>
    
  </Card>
  </div>
  );
};

export default TextChart;