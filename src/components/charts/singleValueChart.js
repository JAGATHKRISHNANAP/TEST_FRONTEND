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
  const text_y_table = useSelector((state) => {
    if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
      return state.loadExcel.checkedPaths;
    } else {
      return state.loadCsv.checkedPaths;
    }
  });


    console.log("text_y_table--------------------------------------", text_y_table[0]);


  useEffect(() => {
    console.log("Received categories:", props.categories);
    console.log("Received values:", props.values);
  }, [props.categories, props.values]);

  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        const response = await sendTestChartData(text_y_xis, text_y_database, text_y_table[0], text_y_aggregate);
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







// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client"; // Import socket.io client
// import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import { sendTestChartData } from "../../utils/api";
// import { Card, CardContent, Typography } from "@mui/material";

// const socket = io("http://localhost:5000"); // Adjust URL as per your backend

// const TextChart = (props) => {
//   const [fetchedData, setFetchedData] = useState(null);
//   const [result, setResult] = useState(null);
//   const dispatch = useDispatch();

//   const text_y_xis = useSelector((state) => state.chart.xAxis);
//   const text_y_database = localStorage.getItem("company_name");
//   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
//   const text_y_table = useSelector((state) => {
//     if (state.loadExcel.checkedPaths && state.loadExcel.checkedPaths.length > 0) {
//       return state.loadExcel.checkedPaths;
//     } else {
//       return state.loadCsv.checkedPaths;
//     }
//   });

//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   // Initial data fetch
//   useEffect(() => {
//     const sendDataToBackend = async () => {
//       try {
//         const response = await sendTestChartData(
//           text_y_xis,
//           text_y_database,
//           text_y_table[0],
//           text_y_aggregate
//         );
//         console.log("Response from backend:", response);

//         const fetchedData = response.data;
//         setResult(fetchedData.total_x_axis);
//         setFetchedData(fetchedData);
//       } catch (error) {
//         console.error("Error sending data to backend", error);
//       }
//     };

//     sendDataToBackend();

//     // Subscribe to WebSocket updates
//     socket.emit("connect_single_value_chart", {
//       table: text_y_table[0],
//       x_axis: text_y_xis,
//       aggregate: text_y_aggregate,
//       database: text_y_database,
//     });

//     // Listen for updates
//     socket.on("chart_update", (updatedData) => {
//       console.log("Real-time update received:", updatedData);
//       if (updatedData?.data?.total_x_axis !== undefined) {
//         setResult(updatedData.data.total_x_axis);
//       }
//     });

//     return () => {
//       socket.off("chart_update");
//     };
//   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]);

//   useEffect(() => {
//     const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
//     dispatch(setToolTipOptions({ customHeading: toolTipText }));
//   }, [text_y_aggregate, text_y_xis, dispatch]);

//   return (
//     <div align="center">
//       <Card sx={{ maxWidth: 300 }}>
//         <CardContent>
//           <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
//             {`Total ${text_y_aggregate} of ${text_y_xis}`}
//           </Typography>
//           <Typography sx={{ fontSize: 32 }} component="div">
//             {result !== null ? <p>{result}</p> : <p>Loading data...</p>}
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TextChart;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";
// import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import { sendTestChartData } from "../../utils/api";
// import { Card, CardContent, Typography } from "@mui/material";

// const socket = io("http://localhost:5000");

// const TextChart = () => {
//   const [result, setResult] = useState(null);
//   const dispatch = useDispatch();

//   const text_y_xis = useSelector((state) => state.chart.xAxis);
//   const text_y_database = localStorage.getItem("company_name");
//   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
//   const text_y_table = useSelector((state) => 
//     state.loadExcel.checkedPaths.length > 0 ? state.loadExcel.checkedPaths : state.loadCsv.checkedPaths
//   );

//   useEffect(() => {
//     sendTestChartData(text_y_xis, text_y_database, text_y_table[0], text_y_aggregate)
//       .then((response) => {
//         setResult(response.data.total_x_axis);
//       })
//       .catch((error) => console.error("Error fetching data:", error));

//     socket.emit("connect_single_value_chart", {
//       table: text_y_table[0],
//       x_axis: text_y_xis,
//       aggregate: text_y_aggregate,
//       database: text_y_database,
//     });

//     socket.on("chart_update", (updatedData) => {
//       if (updatedData?.data?.total_x_axis !== undefined) {
//         setResult(updatedData.data.total_x_axis);
//       }
//     });

//     return () => {
//       socket.off("chart_update");
//     };
//   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]);

//   return (
//     <Card sx={{ maxWidth: 300 }}>
//       <CardContent>
//         <Typography variant="h6">{`Total ${text_y_aggregate} of ${text_y_xis}`}</Typography>
//         <Typography variant="h4">{result !== null ? result : "Loading..."}</Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default TextChart;
