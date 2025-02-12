import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TextChart.css";
import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
import { sendTestChartData } from "../../utils/api";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { io } from "socket.io-client";

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

    const newSocket = io("http://localhost:5000", {
      query: { text_y_xis, text_y_database, text_y_table, text_y_aggregate }
    });
    newSocket.on("chart_update", (data) => {
        console.log("jdaicjljd",data)
        console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]",data.data.total_x_axis)
        setResult(data.data.total_x_axis);
    });
  
    return () => newSocket.disconnect();

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





