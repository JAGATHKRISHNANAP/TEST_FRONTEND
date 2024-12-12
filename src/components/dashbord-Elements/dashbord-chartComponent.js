// src/components/dashbord-Elements/DashboardCharts.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider } from '@mui/material';
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

import { FcComboChart } from "react-icons/fc";

function DashboardCharts() {
  const dispatch = useDispatch();
  const chartType = useSelector((state) => state.chartType.type);

  const handleChartTypeChange = (selectedChartType) => {
    dispatch(setChartType(selectedChartType));
  };

  return (
    <div className="App">    
      <Box sx={{ flexGrow: 1 }}>
        <div className="dash-right-side-container">

          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'bar' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('bar')}
          >
            <BarChartIcon /> 
          </Button>

          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'pie' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('pie')}
          >
            <PieChartIcon /> 
          </Button>

          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'scatter' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('scatter')}
          >
            <ScatterPlotIcon />
          </Button>

          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'line' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('line')}
          >
            <TimelineIcon /> 
          </Button>

          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'area' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('area')}
            >
              <FaChartArea size={23}/>
            </Button>

            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'polarArea' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('polarArea')}
            >
              <PiChartPolarFill  size={23}/>
            </Button>
        </div>
        <div>
        <Divider />
        <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'duealChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('duealChart')}
            >

              <FcComboChart size={23}/>
            </Button>

            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'textChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('textChart')}
            >
              <NotesIcon /> 
            </Button>

            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'mapchat' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('mapchart')}
            >
              <MapIcon/>
            </Button>

            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'singleValueChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('singleValueChart')}
            >
              <LooksOneIcon/>
            </Button>


            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'treeHierarchy' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('treeHierarchy')}
            >
            <AccountTreeIcon/>
            </Button>


            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'animatedTreeChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('animatedTreeChart')}
            >
              <SpaceDashboardIcon/>
            </Button>

            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'hierarchialBarChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('hierarchialBarChart')}
            >
              <AlignHorizontalLeftIcon/>
            </Button>


            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'sampleAitestChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('sampleAitestChart')}
            >
            <TipsAndUpdatesIcon/>
            </Button>

            
            <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'AiCharts' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('AiCharts')}
            >
            <PsychologyIcon/>
            </Button>
        </div>
      </Box>
    </div>
  );
}

export default DashboardCharts;
