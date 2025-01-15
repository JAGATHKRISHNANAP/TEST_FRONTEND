import React, { useState, useEffect, useRef } from 'react';
import './resizable.css';
import Draggable from 'react-draggable';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PolarAreaChart from '../ChartViews/polarAreaChartView';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import ScatterChart from '../ChartViews/scatterChartView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView'; 
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import MapChart from '../ChartViews/mapChartView';
import SampleAiTestChart  from '../ChartViews/sampleAiTestChartView'; 
import { useDispatch, useSelector } from 'react-redux';
import SingleValueChart from '../ChartViews/singleValueChartView';
import { HierarchialBarChart_chart, sendChartData ,sendChartDetails} from "../../utils/api";
import { addTextChart, addChartData, removeChartData, updateSelectedCategory,updateDuealAxisChartData } from '../../features/ViewChartSlice/viewChartSlice';
import { ResizableBox } from 'react-resizable';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button ,Box} from '@mui/material';
const TextContainer = ({ width, heading, fetchedData, result }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ fontSize: `${width / 25}px` }}>{heading.replace(/"/g, '')}</h4>
      <div>
        <h2 style={{ fontSize: `${width / 10}px` }}>
          {fetchedData ? result : 'Loading data...'}
        </h2>
      </div>
    </div>
  );
};

const ResizableChart = ({ data, onRemove, updateChartDetails, index, droppableAreaRef, context }) => {
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [width, setWidth] = useState(data.width);
  const [height, setHeight] = useState(data.height);
  const [position, setPosition] = useState(data.position || { x: 0, y: 0 }); // Initialize unique position
  const [result, setResult] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const isDashboard = context === "dashboard";
  const minWidth = isDashboard ? 200 : 800;
  const minHeight = isDashboard ? 50 : 300;

  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
  const dataFetchedRef = useRef(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [hierarchy,setHierarchy]=useState(null);
  const [hierarchyData,setHierarchyData]=useState(null);
  const [aiChartData,setAiChartData]=useState(null);
  const database_name =localStorage.getItem("company_name");
  const chart_id = data[0];
  const text_y_xis = data[2];
  const text_y_aggregate = data[4];
  const text_y_table = [data[1]];
  const text_y_database = data[10];
  const heading = data[7];
  const chartDataFromStore = useSelector((state) =>
    state.viewcharts.charts.find((chart) => chart.chart_id === chart_id)
  );
  // console.log("--------------------------------------------------------------------------------------",chartDataFromStore.series1);
  const sendDataToBackend = async () => {
    try {
      if (dataFetchedRef.current) return; // Prevent re-fetching
      dataFetchedRef.current = true; // Set the flag to prevent duplicate fetches
      const response = await sendChartData(chart_id, text_y_xis, text_y_database, text_y_table, text_y_aggregate);
      const fetchedData = response.data;
      const textChartData = { fetchedData, chart_id };
      dispatch(addTextChart(textChartData));
      setResult(fetchedData.total_x_axis);
      setFetchedData(fetchedData);
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  };

  useEffect(() => {
    updateChartDetails(data.chartName, { width, height, position });
    sendChartDetailsToBackend();
    sendDataToBackend();
  }, [width, height, position]);

  const handleResize = (e, { size }) => {
    if (size.width !== width || size.height !== height) {
      setWidth(size.width);
      setHeight(size.height);
      updateChartDetails(data.chartName, { width: size.width, height: size.height });
    }
  };

  const sendChartDetailsToBackend = async () => {
    try {
      const response = await sendChartDetails(data, position);
      if (data[5] === 'treeHierarchy') {
        setHierarchyData(response["data frame"]);
        setHierarchy(response["x_axis"]);
      }
      if (data[5] === 'sampleAitestChart') {
        setAiChartData(response['histogram_details']);
      }
      const { categories, values, series1, series2 } = response;
      if (categories) {
        if (values && categories.length === values.length) {
          const chartDataElement = {
            categories,
            values,
            x_axis: data[2],
            chart_type: data[5],
            chart_color: data[6],
            chart_id: data[0],
            y_axis: data[3],
            tableName: data[1],
            aggregate: data[4],
            filter_options: data[9],
            databaseName: data[10],
          };
          dispatch(addChartData(chartDataElement));
        } else if (series1 && series2 && categories.length === series1.length && categories.length === series2.length) {
          const chartDataElement = {
            categories,
            series1,
            series2,
            x_axis: data[2],
            chart_type: data[5],
            chart_id: data[0],
            y_axis: data[3],
            tableName: data[1],
            aggregate: data[4],
            filter_options: data[9],
            databaseName: data[10],
          };
          dispatch(addChartData(chartDataElement));
        }
      }
    } catch (error) {
      console.error('Error handling response:', error);
    }
  };


  const downloadChartAsImage = () => {
    const chartArea = document.querySelector('.chart-area');
    if (chartArea) {
      html2canvas(chartArea).then((canvas) => {
        canvas.toBlob((blob) => {
          fileDownload(blob, 'chart-image.png'); // Download as PNG
        });
      });
    }
  };
  
  const downloadCSV = () => {
    let csvContent = '';
    
    if (data[5] === 'duealChart') {
      if (chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.series1 && chartDataFromStore.series2) {
        csvContent += 'Category,Series 1,Series 2\n';
        chartDataFromStore.categories.forEach((category, index) => {
          csvContent += `${category},${chartDataFromStore.series1[index]},${chartDataFromStore.series2[index]}\n`;
        });
      }
      
    } else if (data[5] === 'treeHierarchy') {
      if (hierarchy && hierarchyData) {
        csvContent += 'Hierarchy,Data\n';
        hierarchyData.forEach((item, index) => {
          csvContent +=  `${hierarchy[index]},${JSON.stringify(item)}\n`;
        });
      }
    } 
    else if (data[5] === 'singleValueChart') {
      if (fetchedData) {
        csvContent += `${heading},Value\n`;
        csvContent += `${text_y_xis},${result}\n`;
      }
    } 
    else {
      if (chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.values) {
        csvContent += 'Category,Value\n';
        chartDataFromStore.categories.forEach((category, index) => {
          csvContent += `${category},${chartDataFromStore.values[index]}\n`;
        });
      }
    }
    
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // const handleDragStop = async (e, uiData) => {
  //   const newPosition = { x: uiData.x, y: uiData.y };
  //   if (newPosition.x !== position.x || newPosition.y !== position.y) {
  //     setPosition(newPosition);
  //     updateChartDetails(data.chartName, { position: newPosition });

  //     // Send new position to the backend
  //     try {
  //       await axios.post('http://localhost:5000/api/update-chart-position', {
  //         chart_id: data[0],
  //         position: newPosition, // Sending updated position to backend
  //       });
  //     } catch (error) {
  //       console.error('Error updating chart position:', error);
  //     }
  //   }
  // };

  const toggleTableModal = () => {
    setTableModalOpen(!tableModalOpen);
  };

  const handleRemove = () => {
    onRemove(data.chartName);
    dispatch(removeChartData(data[0]));
    dispatch(updateSelectedCategory(null));
  };

  const renderChart = () => {
    switch (data[5]) {
      case 'bar':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <BarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
        }
        break;
      case 'pie':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <PieChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
        }
        break;
        case 'polarArea':
          if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
            return <PolarAreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
          }
          break;


        case 'duealChart':
  if (
    chartDataFromStore?.categories?.length > 0 &&
    chartDataFromStore?.series1?.length > 0 &&
    chartDataFromStore?.series2?.length > 0
  ) {
    return (
      <DualAxisChart
        categories={chartDataFromStore.categories}
        series1={chartDataFromStore.series1.map(value => parseFloat(value))}
        series2={chartDataFromStore.series2.map(value => parseFloat(value))}
        aggregation={data[4]} x_axis={data[2]}
        y_axis1={data[3][0]} // Set y_axis1 to the first value in data[3]
  y_axis2={data[3][1]} 
      />
    );
  }
  break;

      case 'line':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <LineChart categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
        }
        break;
        case 'area':
          if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
            return <AreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
          }
          break;
      case 'animatedTreeChart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
        return <AnimatedTreemap categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} chartColor={data[6]} />;
            }
          break;
      case 'sampleAitestChart':
        return <SampleAiTestChart data={aiChartData} />;
      case 'treeHierarchy':
        return <TreeHierarchyView x_axis={hierarchy} treeData={hierarchyData} />;
        // break;  
        case 'scatter':
            if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
              return <ScatterChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
            }
            break;
            case 'hierarchialBarChart':
              if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                return <HierarchialBarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} chartColor={data[6]} />;
              }
              break;
            case 'mapchart':
            if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
              return <MapChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
            }
            break;
  

        
      case 'singleValueChart':
        // if (!result) {
        //   // sendDataToBackend(); // Manually trigger the fetch
        // }
        // return (
        //   <SingleValueChart
        //     width={width}
        //     heading={heading}
        //     result={result}
        //     fetchedData={fetchedData}
        //     handleResize={handleResize}
        //   />
        // );
        return (
                    <SingleValueChart
                      width={width}
                      heading={heading}
                      result={result}
                      fetchedData={fetchedData}
                      handleResize={handleResize}
                      minWidth={minWidth}
                      minHeight={minHeight} // Pass minimum constraints
                    />
                  );
      default:
        return <div>No chart available</div>;
    }
    return null;
  };
console.log("position:--------------------------------",position)
const renderTableData = () => {
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'center',
  };
  const thStyles = {
    borderBottom: '2px solid #ddd',
    padding: '12px 15px',
    textAlign: 'left',
  };

  const tdStyles = {
    borderBottom: '1px solid #ddd',
    padding: '8px 15px',
    textAlign: 'left',
  };
  if (data[5] === 'duealChart') {
    return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.series1 && chartDataFromStore.series2 ? (
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Category</th>
            <th style={thStyles}>Series 1</th>
            <th style={thStyles}>Series 2</th>
          </tr>
        </thead>
        <tbody>
          {chartDataFromStore.categories.map((category, index) => (
            <tr key={index}>
              <td style={tdStyles}>{category}</td>
              <td style={tdStyles}>{chartDataFromStore.series1[index]}</td>
              <td style={tdStyles}>{chartDataFromStore.series2[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  } else if (data[5] === 'treeHierarchy') {
    return hierarchy && hierarchyData ? (
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Hierarchy</th>
          </tr>
        </thead>
        <tbody>
          {hierarchyData.map((Hierarchy, index) => (
            <tr key={index}>
              <td style={tdStyles}>{hierarchy[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  } else if (data[5] === 'singleValueChart') {
    return fetchedData ? (
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>{heading}</th>
            <th style={thStyles}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyles}>{text_y_xis}</td>
            <td style={tdStyles}>{result}</td>
          </tr>
        </tbody>
      </table>
    ) : null;
  } else {
    return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.values ? (
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Category</th>
            <th style={thStyles}>Value</th>
          </tr>
        </thead>
        <tbody>
          {chartDataFromStore.categories.map((category, index) => (
            <tr key={index}>
              <td style={tdStyles}>{category}</td>
              <td style={tdStyles}>{chartDataFromStore.values[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  }
};


return (
  <div>
    {/* <Draggable 
      handle=".custom-handle1" 
      onStop={handleDragStop}
      bounds={false} 
    > */}
      <div 
        className="chart-container" 
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <div className="header">
          <IconButton onClick={toggleTableModal} aria-label="view">
            <VisibilityIcon />
          </IconButton>
          
          <IconButton onClick={handleRemove} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="chart-area">
          {renderChart()}
        </div>

        <Dialog 
          open={tableModalOpen} 
          onClose={toggleTableModal} 
          PaperProps={{ style: { minWidth: '400px', width: 'auto', maxWidth: '90%', maxHeight: '90%' } }}
        >
          <IconButton 
            onClick={toggleTableModal}
            aria-label="close" 
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <IconButton 
            onClick={downloadChartAsImage} 
            aria-label="download image" 
            style={{ position: 'absolute', left: '50px', top: '16px' }}
          >
            <ImageIcon />
          </IconButton>

          <div style={{ position: 'relative' }}>
            <IconButton 
              onClick={downloadCSV} 
              aria-label="download" 
              style={{ position: 'absolute', left: '16px', top: '16px' }}
            >
              <DownloadIcon />
            </IconButton>
          </div>

          <DialogTitle style={{ textAlign: 'center' }}>Chart Data</DialogTitle>

          <DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              {renderTableData()}
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    {/* </Draggable> */}
  </div>
);

};

export default ResizableChart;
