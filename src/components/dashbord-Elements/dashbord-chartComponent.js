// src/components/dashbord-Elements/DashboardCharts.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider ,Tooltip } from '@mui/material';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, ScatterPlot as ScatterPlotIcon, Timeline as TimelineIcon } from '@mui/icons-material';
import { setChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import {aggregrate} from '../../features/Dashboard-Slice/dashboardtableSlice';
import { FaChartArea } from "react-icons/fa";
import { PiChartPolarFill } from "react-icons/pi";
import NotesIcon from '@mui/icons-material/Notes';
import LooksOneIcon from '@mui/icons-material/LooksOne';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MapIcon from '@mui/icons-material/Map';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Import for dual axis toggle
import ShowChart from '@mui/icons-material/ShowChart';
import CloudIcon from '@mui/icons-material/Cloud';
import { FcComboChart } from "react-icons/fc";
import { FcBarChart } from 'react-icons/fc'; 
import {resetCustomHeading}from'../../features/ToolTip/toolTipSlice';
function DashboardCharts() {
  const dispatch = useDispatch();
  const DchartType = useSelector((state) => state.chartType.type);
  const DxAxis = useSelector((state) => state.chart.xAxis);
  const DyAxis = useSelector((state) => state.chart.yAxis);

  
  const EchartType = useSelector((state) => state.chartdata.chartType);
  const ExAxis = useSelector((state) => state.chartdata.xAxis);
  const EyAxis = useSelector((state) => state.chartdata.yAxis);

  const chartType = DchartType||EchartType;
  const xAxis = (DxAxis && DxAxis.length > 0) ? DxAxis : ExAxis;
  const yAxis = (DyAxis && DyAxis.length > 0) ? DyAxis : EyAxis;
  


  console.log("EchartType:", EchartType);
  console.log("ExAxis:", ExAxis);
  console.log("EyAxis:", EyAxis);

  console.log("chartType:", chartType);
  console.log("yAxis:", xAxis);
  console.log("yAxis:", yAxis);

  useEffect(() => {
    const savedChartType = sessionStorage.getItem('selectedChartType');
    if (savedChartType) {
      dispatch(setChartType(savedChartType));
    }
  }, [dispatch]);
  useEffect(() => {
      console.log("chartType:", chartType);
  }, [chartType]);


  // const handleChartTypeChange = (selectedChartType) => {
  //   dispatch(setChartType(selectedChartType));
  // };
  const handleChartTypeChange = (selectedChartType) => {
    dispatch(setChartType(selectedChartType));
    sessionStorage.setItem('selectedChartType', selectedChartType); // Save to local storage
    dispatch(resetCustomHeading());
  //   let message = `Chart of type ${selectedChartType} selected. Ensure proper axis selection.`;

  //   // Custom message based on selected chart type and axis requirements
  //   if (selectedChartType === 'bar' && xAxis?.length === 1 && yAxis?.length === 1) {
  //     message = 'Select 1 for X-axis and 1 for Y-axis for Bar Chart creation.';
  //   } else if (selectedChartType === 'duealChart' && xAxis?.length === 2 && yAxis?.length === 1) {
  //     message = 'Select 2 for X-axis and 1 for Y-axis for Dual Chart creation.';
  //   } else if (selectedChartType === 'duealbarChart' && xAxis?.length === 2 && yAxis?.length === 1) {
  //     message = 'Select 2 for X-axis and 1 for Y-axis for Dual Bar Chart creation.';
  //   } else if (selectedChartType === 'AiCharts') {
  //     message = 'remove all x and y ';
  //   } else {
  //     message = `Chart of type ${selectedChartType} selected. Ensure proper axis selection.`;
  //   }

  //   // Show the alert message
  //   alert(message);
   };

  const isButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 1);
  const isdueaLButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 2);
  const isdueaLXButtonDisabled = !(xAxis?.length === 2 && yAxis?.length === 1);

  
  const isBARHIERARCHYButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length === 1);
  const isTreeButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length===0 );
  const isSingleValueButtonDisabled = !(xAxis?.length === 1  && yAxis?.length===0);
  
  // const 

return (
  <div className="App">    
    <Box sx={{ flexGrow: 1 }}>
      <div className="dash-right-side-container">

        <Tooltip title="Bar Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'bar' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('bar')}
            disabled={isButtonDisabled}
          >
            <BarChartIcon /> 
          </Button>
        </Tooltip>

        <Tooltip title="Pie Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'pie' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('pie')}
            disabled={isButtonDisabled}
          >
            <PieChartIcon /> 
          </Button>
        </Tooltip>

        <Tooltip title="Scatter Plot" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'scatter' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('scatter')}
            disabled={isButtonDisabled}
          >
            <ScatterPlotIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Line Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'line' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('line')}
            disabled={isButtonDisabled}
          >
            <TimelineIcon /> 
          </Button>
        </Tooltip>

        <Tooltip title="Area Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'area' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('area')}
            disabled={isButtonDisabled}
          >
            <FaChartArea size={23}/>
          </Button>
        </Tooltip>

        <Tooltip title="Polar Area Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'polarArea' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('polarArea')}
            disabled={isButtonDisabled}
          >
            <PiChartPolarFill size={23}/>
          </Button>
        </Tooltip>
      </div>
      
      <Divider />
      
      <div>
        {/*<Tooltip title="Dual Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'duealChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('duealChart')}
            disabled={isdueaLButtonDisabled}
          >
            <FcComboChart size={23}/>
          </Button>
        </Tooltip>

        <Tooltip title="Dual Bar Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'duealbarChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('duealbarChart')}
            disabled={isdueaLXButtonDisabled}
          >
            <FcBarChart size={23}/>
          </Button>
        </Tooltip>
         */}
<Tooltip title="Dual Chart" arrow>
  <Button
    sx={{ margin: "2px" }}
    variant={chartType === 'duealChart' ? 'contained' : 'outlined'}
    onClick={() => handleChartTypeChange('duealChart')}
    disabled={isdueaLButtonDisabled} // Fix here
  >
    <SwapHorizIcon size={23}/>
  </Button>
</Tooltip>

<Tooltip title="Dual Bar Chart" arrow>
  <Button
    sx={{ margin: "2px" }}
    variant={chartType === 'duealbarChart' ? 'contained' : 'outlined'}
    onClick={() => handleChartTypeChange('duealbarChart')}
    disabled={isdueaLXButtonDisabled} // Fix here
  >
    <ShowChart size={23}/>
  </Button>
</Tooltip>

        <Tooltip title="Text Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'textChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('textChart')}
            disabled={isButtonDisabled}
          >
            <NotesIcon /> 
          </Button>
        </Tooltip>

        <Tooltip title="Map Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'mapchat' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('mapchart')}
            disabled={isButtonDisabled}
          >
            <MapIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="Single Value Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'singleValueChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('singleValueChart')}
            disabled={isSingleValueButtonDisabled}
          >
            <LooksOneIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="Tree Hierarchy" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'treeHierarchy' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('treeHierarchy')}
            // disabled={isTreeButtonDisabled}
          >
            <AccountTreeIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="Animated Tree Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'animatedTreeChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('animatedTreeChart')}
            disabled={isButtonDisabled}
          >
            <SpaceDashboardIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="Hierarchical Bar Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'hierarchialBarChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('hierarchialBarChart')}
            disabled={isBARHIERARCHYButtonDisabled}
          >
            <AlignHorizontalLeftIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="Sample AI Test Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'sampleAitestChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('sampleAitestChart')}
          >
            <TipsAndUpdatesIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="AI Charts" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'AiCharts' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('AiCharts')}
          >
            <PsychologyIcon/>
          </Button>
          <Tooltip title="wordCloud" arrow></Tooltip>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'wordCloud' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('wordCloud')}
            disabled={isTreeButtonDisabled}
            >
              <CloudIcon /> 
            </Button>
            {/* <Tooltip title="boxPlot" arrow></Tooltip>
            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'boxPlot' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('boxPlot')}
            >
              <TipsAndUpdatesIcon /> 
            </Button> */}
        </Tooltip>
      </div>
    </Box>
  </div>
);
}

export default DashboardCharts;