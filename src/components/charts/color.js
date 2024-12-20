import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from "react-color";
import { setChartColor } from '../../features/Charts/colorSlice';
// import TextChart from "./textChart";
import "./TextChart.css";
import { Box } from "@mui/material";
const ChartColor = (props) => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

  const handleColorChange = (color) => {
    dispatch(setChartColor(color.hex));
  };

  return (
    <div className="App">    
      <Box sx={{ flexGrow: 1,width: '4px'}}>
        <div className="dash-right-side-container">
        <SketchPicker 
            color={color} 
            onChangeComplete={handleColorChange}
            styles={{ 
              default: { 
                picker: { 
                  marginLeft: '0px', 
                  width: '180px',// Adjust this to reduce the size of the picker
                  height: '300px' // Adjust this for height as well if necessary
                } 
              }
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default ChartColor;

