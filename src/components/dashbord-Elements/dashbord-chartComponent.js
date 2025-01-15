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
import CloudIcon from '@mui/icons-material/Cloud';

import { FcComboChart } from "react-icons/fc";

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
      console.log("chartType:", chartType);
  }, [chartType]);



  

  const handleChartTypeChange = (selectedChartType) => {
    dispatch(setChartType(selectedChartType));
  };

  const isButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 1);
  const isdueaLButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 2);
  const isBARHIERARCHYButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length >= 1);
  const isTreeButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length===0 );
  const isSingleValueButtonDisabled = !(xAxis?.length === 1  && yAxis?.length===0);
  // const aiChartButtonDisabled = (xAxis?.length === 1 && yAxis?.length === 1);

return (
  <div className="App">    
    <Box sx={{ flexGrow: 1 }}>
      <div className="dash-right-side-container">

        <Tooltip title="Bar Chart" arrow>
          {/* <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'bar' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('bar')}
          >
            <BarChartIcon /> 
          </Button> */}
                     <Button
              sx={{ margin: "2px" }}
              variant={chartType === 'bar' ? 'contained' : 'outlined'}
              onClick={() => handleChartTypeChange('bar')}
              disabled={isButtonDisabled} // Disable if xAxis and yAxis don't have a length of 1
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
        <Tooltip title="Dual Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'duealChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('duealChart')}
            disabled={isdueaLButtonDisabled}
          >
            <FcComboChart size={23}/>
          </Button>
        </Tooltip>

        {/* <Tooltip title="Dual Bar Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'duealbarChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('duealbarChart')}
          >
            <FcComboChart size={23}/>
          </Button>
        </Tooltip> */}

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
            disabled={isTreeButtonDisabled}
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
        <Tooltip title="wordCloud" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'wordCloud' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('wordCloud')}
            disabled={isTreeButtonDisabled}
            >
              <CloudIcon /> 
            </Button>
        </Tooltip>

        <Tooltip title="Sample AI Test Chart" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'sampleAitestChart' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('sampleAitestChart')}
            // disabled={aiChartButtonDisabled}
          >
            <TipsAndUpdatesIcon/>
          </Button>
        </Tooltip>

        <Tooltip title="AI Charts" arrow>
          <Button
            sx={{ margin: "2px" }}
            variant={chartType === 'AiCharts' ? 'contained' : 'outlined'}
            onClick={() => handleChartTypeChange('AiCharts')}
            // disabled={aiChartButtonDisabled}
          >
            <PsychologyIcon/>
          </Button>
        </Tooltip>


      </div>
    </Box>
  </div>
);
}

export default DashboardCharts;
