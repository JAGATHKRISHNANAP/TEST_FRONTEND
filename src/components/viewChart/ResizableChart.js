import React, { useState, useEffect,context, useRef,useCallback } from 'react';
import './resizable.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HierarchialBarChart_chart, sendChartData,sendChartDataview ,sendChartDetails} from "../../utils/api";
import { addTextChart, addChartData, removeChartData, updateSelectedCategory,updateDuealAxisChartData } from '../../features/ViewChartSlice/viewChartSlice';
import { ResizableBox } from 'react-resizable';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';

import ChartDataModal from './ChartDataModal';
import ChartContainer from './ChartContainer';
import ChartArea from './ChartArea';
import ChartContextMenu from './ChartContextMenu';
import ChartRenderer from './ChartRenderer';
import TableDataRenderer from './TableDataRenderer'; // Import TableDataRenderer
// import SingleValueChart from './SingleValueChart'; // Import SingleValueChart

const ResizableChart = ({ data, onRemove, updateChartDetails, 
  // position={data.position}
  chartId, droppableAreaRef,isChartView }) => {
  const [tableModalOpen, setTableModalOpen] = useState(false);
  
  const [width, setWidth] = useState(data.width);
  const [height, setHeight] = useState(data.height);
  // const [position, setPosition] = useState(data.position || { x: 0, y: 0 }); // Initialize unique position
  const [result, setResult] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
  const dataFetchedRef = useRef(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [hierarchy,setHierarchy]=useState(null);
  const [hierarchyData,setHierarchyData]=useState(null);
  const [aiChartData,setAiChartData]=useState(null);
  const database_name =localStorage.getItem("company_name");
  const isDashboard = context === "dashboard";
  const minWidth = isDashboard ? 200 : 800;
  const minHeight = isDashboard ? 50 : 300;
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedUser, setSelectedUser] = React.useState(localStorage.getItem('selectedUser'));
  const chart_id = data[0];
  const text_y_xis = data[2];
  const text_y_aggregate = data[4];
  const text_y_table = [data[1]];
  const text_y_database = data[10];
  const heading = data[7];
  const [aiMlChartData,setAiMLChartData]=useState(null);
  const [borderColor, setBorderColor] = useState("#000"); // Default black border
  const [borderSize, setBorderSize] = useState("1px"); // Default border size
  const [showBorder, setShowBorder] = useState(true); // Toggle border visibility
  // const { position, chartName } = data;
  const { position = { x: 0, y: 0 }, chartName } = data;

  const chartDataFromStore = useSelector((state) =>
    state.viewcharts.charts.find((chart) => chart.chart_id === chart_id)
  );
//   // const generateUniquePosition = useCallback((existingPositions) => {
//   //   const margin = 20;
//   //   const chartWidth = 500;
//   //   const chartHeight = 400;
//   //   const chartsPerRow = 4;

//   //   let row, col, newX, newY;
//   //   let positionFound = false;

//   //   for (let i = 0; i < 100; i++) { // Try a maximum of 100 times to find a position
//   //     const totalCharts = existingPositions.length / 2; // Divide by 2 because each position has x and y
//   //     row = Math.floor(totalCharts / chartsPerRow);
//   //     col = totalCharts % chartsPerRow;
//   //     newX = col * (chartWidth + margin) + margin;
//   //     newY = row * (chartHeight + margin) + margin;

//   //     const isPositionTaken = existingPositions.some((pos, idx) => pos === newX && existingPositions[idx + 1] === newY);

//   //     if (!isPositionTaken) {
//   //       positionFound = true;
//   //       break;
//   //     }
//   //   }

//   //   if (!positionFound) {
//   //     console.warn("Could not find a unique position after multiple attempts.");
//   //     // Fallback to a default position or throw an error
//   //     return { x: 0, y: 0 }; // Or throw new Error("Could not find unique position");
//   //   }
//   //   return { x: newX, y: newY };
//   // }, []);
//   const [chartPositions, setChartPositions] = useState([]); // Track all chart positions

// const generateUniquePosition = useCallback((existingPositions) => {
//   const margin = 20;
//   const chartWidth = 500;
//   const chartHeight = 400;
//   const chartsPerRow = 4;
  
//   let row, col, newX, newY;
//   let positionFound = false;
  
//   // Try to find an available position
//   for (let i = 0; i < 100; i++) { 
//     const totalCharts = existingPositions.length / 2; // Divide by 2 because each position has x and y
//     row = Math.floor(totalCharts / chartsPerRow);
//     col = totalCharts % chartsPerRow;
//     newX = col * (chartWidth + margin) + margin;
//     newY = row * (chartHeight + margin) + margin;

//     // Check if the new position overlaps with existing positions
//     const isPositionTaken = existingPositions.some((pos, idx) => {
//       return pos.x === newX && pos.y === newY;
//     });

//     if (!isPositionTaken) {
//       positionFound = true;
//       break;
//     }
//   }

//   if (!positionFound) {
//     console.warn("Could not find a unique position after multiple attempts.");
//     return { x: 0, y: 0 }; 
//   }

//   // Save the newly generated position
//   setChartPositions([...existingPositions, { x: newX, y: newY }]);

//   return { x: newX, y: newY };
// }, [chartPositions]); // Dependency on chartPositions




  const sendDataToBackend = async () => {
    try {
      if (dataFetchedRef.current) return; // Prevent re-fetching
      dataFetchedRef.current = true; // Set the flag to prevent duplicate fetches
      const response = await sendChartDataview(chart_id, text_y_xis, text_y_database, text_y_table, text_y_aggregate);
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
    
      const response = await sendChartDetails(data, position, selectedUser);
  
      if (data[5] === 'treeHierarchy') {
        setHierarchyData(response["data frame"]);
        setHierarchy(response["x_axis"]);
      }
      if(data[5]==='sampleAitestChart'){
        setAiChartData(response['histogram_details']);
      }

      if (data[5] === 'AiCharts') {
        console.log("response['histogram_details']",response['histogram_details'])
        setAiMLChartData(response['histogram_details']);
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
      console.error('Error sending chart details to backend:', error);
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
    } else if (data[5] === 'singleValueChart') {
      if (fetchedData) {
        csvContent += `${heading},Value\n`;
        csvContent += `${text_y_xis},${result}\n`;
      }
      
    } else {
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

  // const handleDragStop = async (e, uiData) => {
  //   const newPosition = { x: uiData.x, y: uiData.y };

  //   // Only update if the position has really changed.
  //   if (newPosition.x !== position.x || newPosition.y !== position.y) {
  //     // Notify the parent to update the chart details
  //     updateChartDetails(chartName, { position: newPosition });

      // Optionally, send the new position to the backend
      // try {
      //   await axios.post('http://localhost:5000/api/update-chart-position', {
      //     chart_id: data.chart_id, // Ensure you pass the correct identifier
      //     position: newPosition,
      //   });
      // } catch (error) {
      //   console.error('Error updating chart position:', error);
      // }
  //   }
  // };
  
  const handleDragStop = (e, uiData) => {
    if (!isChartView) { 
    const newPosition = { x: uiData.x, y: uiData.y };

    // Only update if the position has changed.
    if (newPosition.x !== position.x || newPosition.y !== position.y) {
      updateChartDetails(chartName, { position: newPosition });
    }
  }
  };  
  // const handleContextMenu = (event) => {
  //   event.preventDefault();
  //   setAnchorEl(event.currentTarget);
  //   setMenuPosition({
  //     top: event.clientY,
  //     left: event.clientX,
  //   });
  // };

  const handleContextMenu = (event) => {
    if (!isChartView) { // Only show menu if not in chart view
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      setMenuPosition({
        top: event.clientY,
        left: event.clientX,
      });
    }
  };
  // Close the context menu
  const handleCloseMenu = () => {
    setMenuPosition(null);
  };


  const toggleTableModal = () => {
    setTableModalOpen(!tableModalOpen);
    // handleCloseMenu();
  };
  const handleRemove = () => {
    onRemove(data.chartName);
    dispatch(removeChartData(data[0]));
    dispatch(updateSelectedCategory(null));
    console.log("Chart removed!");
    handleCloseMenu();
  };
  

  const renderChart = () => {  // This function has been moved to ChartRenderer.jsx
        return <ChartRenderer 
        data={data}
        chartDataFromStore={chartDataFromStore}
        hierarchy={hierarchy}
        hierarchyData={hierarchyData}
        aiChartData={aiChartData}
        aiMlChartData={aiMlChartData}
        result={result}
        fetchedData={fetchedData}
        width={width}
        handleResize={handleResize}
        />
  };


  const renderTableData = () => { // This function has been moved to TableDataRenderer.jsx
    return (
      <TableDataRenderer
        data={data}
        chartDataFromStore={chartDataFromStore}
        hierarchy={hierarchy}
        hierarchyData={hierarchyData}
        result={result}
        fetchedData={fetchedData}
        heading={heading}
        text_y_xis={text_y_xis}
      />
    );
  };


  return (
    <div>
      
      <ChartContainer position={position} handleDragStop={handleDragStop} handleContextMenu={handleContextMenu} > {/* Use ChartContainer */}
        <ChartArea showBorder={!isChartView}  borderSize={borderSize} borderColor={borderColor}> {/* Use ChartArea */}
          {renderChart()}
        </ChartArea>
        <ChartContextMenu  
          menuPosition={menuPosition}
          handleCloseMenu={handleCloseMenu}
          toggleTableModal={toggleTableModal}
          handleRemove={handleRemove}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          borderSize={borderSize}
          setBorderSize={setBorderSize}
          showBorder={showBorder}
          setShowBorder={setShowBorder}
        />
        <ChartDataModal
          tableModalOpen={tableModalOpen}
          toggleTableModal={toggleTableModal}
          downloadChartAsImage={downloadChartAsImage}
          downloadCSV={downloadCSV}
          renderTableData={renderTableData}
        />
      </ChartContainer>
    </div>

  );
};

export default ResizableChart;


//   const renderChart = () => {
//     switch (data[5]) {
//       case 'bar':
//         if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//           return <BarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//         }
//         break;
//       case 'pie':
//         if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//           return <PieChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//         }
//         break;
//         case 'polarArea':
//           if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//             return <PolarAreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//           }
//           break;

//         case 'duealChart':
//   if (
//     chartDataFromStore?.categories?.length > 0 &&
//     chartDataFromStore?.series1?.length > 0 &&
//     chartDataFromStore?.series2?.length > 0
//   ) {
//     return (
//       <DualAxisChart
//         categories={chartDataFromStore.categories}
//         series1={chartDataFromStore.series1.map(value => parseFloat(value))}
//         series2={chartDataFromStore.series2.map(value => parseFloat(value))}
//         aggregation={data[4]} x_axis={data[2]}
//         y_axis1={data[3][0]} // Set y_axis1 to the first value in data[3]
//   y_axis2={data[3][1]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} 
//       />
//     );
//   }
//   break;

//       case 'line':
//         if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//           return <LineChart categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
//         }
//         break;
//         case 'area':
//           if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//             return <AreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
//           }
//           break;
//       case 'animatedTreeChart':
//         if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//         //   return <AnimatedTreemap categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
//         // }
//         return <AnimatedTreemap categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} chartColor={data[6]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//             }
//           break;
//     case 'textChart':
//             if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//               return <TextChartView categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//             }
//                 break;
//       case 'sampleAitestChart':
//         return <SampleAiTestChart data={aiChartData} />;
//       case 'AiCharts':
//           return <AiMlChartData data={aiMlChartData} />;
//         break;
//       // case 'treeHierarchy':
//       //   return <TreeHierarchyView x_axis={hierarchy} treeData={hierarchyData} />;
//         // break;  
//       case 'treeHierarchy':
//         return <TreeHierarchyView x_axis={hierarchy} treeData={hierarchyData} />;
//         // break;  
//         case 'scatter':
//             if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//               return <ScatterChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
//             }
//             break;
//             case 'hierarchialBarChart':
//               if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//                 return <HierarchialBarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]}  />;
//               }
//               break;
//               // case 'wordCloud':
//               //   if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//               //     return <WordCloud categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))}  />;
//               //   }
//               //   break;
//             case 'mapchart':
//             if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//               return <MapChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
//             }
//             break;
//             case 'wordCloud':
//                 if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
//                   return <WordCloud categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
//                 }
//                 break;

        
//       // case 'singleValueChart':
//       //   if (!result) {
//       //     sendDataToBackend(); // Manually trigger the fetch
//       //   }
//       //   return (
//       //     <ResizableBox
//       //       width={300}
//       //       height={200}
//       //       minConstraints={[200, 90]}
//       //       maxConstraints={[400, 600]}
//       //       onResize={handleResize}
//       //     >
//       //       <div style={{ textAlign: 'center' }}>
//       //         <h4 style={{ fontSize: `${width / 20}px` }}>{heading.replace(/"/g, '')}</h4>
//       //         <div>
//       //           <h2 style={{ fontSize: `${width / 20}px` }}>
//       //             {fetchedData ? result : 'Loading data...'}
//       //           </h2>
//       //         </div>
//       //       </div>
//       //     </ResizableBox>
//       //   );
//       case 'singleValueChart':
//         // if (!result) {
//         //   // sendDataToBackend(); // Manually trigger the fetch
//         // }
//         // return (
//         //   <SingleValueChart
//         //     width={width}
//         //     heading={heading}
//         //     result={result}
//         //     fetchedData={fetchedData}
//         //     handleResize={handleResize}
//         //   />
//         // );
//         return (
//                     <SingleValueChart
//                       width={width}
//                       heading={heading}
//                       result={result}
//                       fetchedData={fetchedData}
//                       handleResize={handleResize}
//                       minWidth={minWidth}
//                       minHeight={minHeight} // Pass minimum constraints
//                     />
//                   );
//       default:
//         return <div>No chart available</div>;
//     }
//     return null;
//   };
// console.log("position:--------------------------------",position)
// const renderTableData = () => {
//   const tableStyles = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     margin: '20px 0',
//     fontSize: '18px',
//     textAlign: 'center',
//   };
//   const thStyles = {
//     borderBottom: '2px solid #ddd',
//     padding: '12px 15px',
//     textAlign: 'left',
//   };

//   const tdStyles = {
//     borderBottom: '1px solid #ddd',
//     padding: '8px 15px',
//     textAlign: 'left',
//   };
//   if (data[5] === 'duealChart') {
//     return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.series1 && chartDataFromStore.series2 ? (
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thStyles}>Category</th>
//             <th style={thStyles}>Series 1</th>
//             <th style={thStyles}>Series 2</th>
//           </tr>
//         </thead>
//         <tbody>
//           {chartDataFromStore.categories.map((category, index) => (
//             <tr key={index}>
//               <td style={tdStyles}>{category}</td>
//               <td style={tdStyles}>{chartDataFromStore.series1[index]}</td>
//               <td style={tdStyles}>{chartDataFromStore.series2[index]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : null;
//   } else if (data[5] === 'treeHierarchy') {
//     return hierarchy && hierarchyData ? (
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thStyles}>Hierarchy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {hierarchyData.map((Hierarchy, index) => (
//             <tr key={index}>
//               <td style={tdStyles}>{hierarchy[index]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : null;
//   } else if (data[5] === 'singleValueChart') {
//     return fetchedData ? (
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thStyles}>{heading}</th>
//             <th style={thStyles}>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={tdStyles}>{text_y_xis}</td>
//             <td style={tdStyles}>{result}</td>
//           </tr>
//         </tbody>
//       </table>
//     ) : null;
//   } else {
//     return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.values ? (
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thStyles}>Category</th>
//             <th style={thStyles}>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {chartDataFromStore.categories.map((category, index) => (
//             <tr key={index}>
//               <td style={tdStyles}>{category}</td>
//               <td style={tdStyles}>{chartDataFromStore.values[index]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : null;
//   }
// };


// return (
//   <div>
//     <Draggable 
//       onStop={handleDragStop}
//       // bounds={false} 
//       position={position}
//     >
      
//         <div
//       className="chart-container"
//       style={{ width: "auto", height: "auto", position: "relative" ,
//         // display: "grid",
//         // gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", // Each cell at least 400px wide
//         // gridGap: "10px",
//         // padding: "20px",
//         // border: "1px solid #ccc",
//         // backgroundColor: "white",
//       }}
//       onContextMenu={handleContextMenu} // Handle right-click
//     >
//       <div
//             className="chart-area"
//             style={{
//               padding: "20px",
//               border: showBorder ? `${borderSize} solid ${borderColor}` : "none",
//               boxSizing: "border-box",
//             }}
//           >
//             {renderChart()}
//           </div>

//           {/* Context Menu for Customization */}
//           <Menu
//             open={Boolean(menuPosition)}
//             onClose={handleCloseMenu}
//             anchorReference="anchorPosition"
//             anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
//           >
//             <MenuItem onClick={toggleTableModal}>
//               <VisibilityIcon sx={{ marginRight: "8px" }} /> View Data
//             </MenuItem>
//             <MenuItem onClick={handleRemove}>
//               <DeleteIcon sx={{ marginRight: "8px" }} /> Delete Chart
//             </MenuItem>
//             <MenuItem>
//               <label>Border Color:</label>
//               <input
//                 type="color"
//                 value={borderColor}
//                 onChange={(e) => setBorderColor(e.target.value)}
//                 style={{ marginLeft: "10px", cursor: "pointer" }}
//               />
//             </MenuItem>
//             <MenuItem>
//               <label>Border Size:</label>
//               <select value={borderSize} onChange={(e) => setBorderSize(e.target.value)} style={{ marginLeft: "10px" }}>
//                 <option value="1px">1px</option>
//                 <option value="2px">2px</option>
//                 <option value="3px">3px</option>
//                 <option value="4px">4px</option>
//                 <option value="5px">5px</option>
//               </select>
//             </MenuItem>
//             <MenuItem onClick={() => setShowBorder(!showBorder)}>
//               {showBorder ? "Hide Border" : "Show Border"}
//             </MenuItem>
//           </Menu>

//           {/* Dialog for Viewing Data */}
//           <Dialog
//             open={tableModalOpen}
//             onClose={toggleTableModal}
//             PaperProps={{
//               style: {
//                 minWidth: "400px",
//                 width: "auto",
//                 maxWidth: "90%",
//                 maxHeight: "90%",
//               },
//             }}
//           >
//             <IconButton onClick={toggleTableModal} aria-label="close" style={{ position: "absolute", right: 8, top: 8 }}>
//               <CloseIcon />
//             </IconButton>
//             <IconButton onClick={downloadChartAsImage} aria-label="download image" style={{ position: "absolute", left: "50px", top: "16px" }}>
//               <ImageIcon />
//             </IconButton>
//             <div style={{ position: "relative" }}>
//               <IconButton onClick={downloadCSV} aria-label="download" style={{ position: "absolute", left: "16px", top: "16px" }}>
//                 <DownloadIcon />
//               </IconButton>
//             </div>

//             <DialogTitle style={{ textAlign: "center" }}>Chart Data</DialogTitle>
//             <DialogContent>
//               <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
//                 {renderTableData()}
//               </Box>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </Draggable>
//     </div>
//   );
// };

// export default ResizableChart;