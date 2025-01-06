

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TextChart.css";
import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
import { sendChartData } from "../../utils/api";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

  const [selectedUser, setSelectedUser] = React.useState(localStorage.getItem('selectedUser'));
const TextChart = (props) => {

  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
  const toolTip = useSelector((state) => state.toolTip);
  const [result, setResult] = useState(null);
  const text_y_xis = useSelector((state) => state.chart.xAxis);
  console.log("text_y_xis", text_y_xis);
  const text_y_database = useSelector((state) => state.database.databaseName);
  console.log("text_y_database", text_y_database);
  const text_y_aggregate = useSelector((state) => state.chart.aggregate);
    console.log("text_y_aggregate", text_y_aggregate);
  const text_y_table = useSelector((state) => state.loadExcel.checkedPaths);
    console.log("text_y_table", text_y_table);

  useEffect(() => {
    console.log("Received categories:", props.categories);
    console.log("Received values:", props.values);
  }, [props.categories, props.values]);

  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        const response = await sendChartData(text_y_xis, text_y_database, text_y_table, text_y_aggregate,selectedUser);
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
  }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate,selectedUser]); 
  
  useEffect(() => {
    const toolTipText = `Total ${text_y_aggregate} of ${text_y_xis}`;
    dispatch(setToolTipOptions({ customHeading: toolTipText })); 
  }, [text_y_aggregate, text_y_xis, dispatch]);



  return (

    <div align="center">
    <Card sx={{ maxWidth:200}}>
    <CardContent>
      <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
      {toolTip.customHeading}
      </Typography>
      <Typography variant="h7" component="div">
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



















