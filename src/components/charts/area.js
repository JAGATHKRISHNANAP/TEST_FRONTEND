// // import React from "react";
// // import Chart from "react-apexcharts";
// // import { useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// // const AreaChart = ({ categories, values, aggregation }) => {
// //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// //     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
// //      const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
// //     const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //     const options = {
// //         chart: {
// //             type: 'area',
// //             events: {}
// //         },
// //         xaxis: {
// //             categories: categories || [],
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000']
// //                 }
// //             }
// //         },
// //         yaxis: {
// //             labels: {
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000'],
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) { // For values in crores (millions)
// //                         return (value / 10000000).toFixed(1) + 'M';
// //                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
// //                         return (value / 100000).toFixed(1) + 'L';
// //                     } else if (value >= 1000) { // For values in thousands
// //                         return (value / 1000).toFixed(1) + 'K';
// //                     } else {
// //                         return value; // For smaller values
// //                     }
// //                 }
// //             },
// //         },
// //         colors: [areaColor],
// //         plotOptions: {
// //             area: {
// //                 distributed: false,
// //                 dataLabels: {
// //                     hideOverflowingLabels: true
// //                 }
// //             }
// //         },
// //         dataLabels: {
// //             enabled: false,
// //             formatter: function (val, opts) {
// //                 return val;
// //             },
// //             offsetY: -2,
// //             style: {
// //                 fontSize: '12px',
// //                 colors: ["#304758"]
// //             }
// //         },
// //         grid: {
// //             borderColor: '#f1f3fa'
// //         }
// //     };

// //     const series = [{
// //         name: aggregation,
// //         data: values || []
// //     }];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 {/* <div className="area-chart">
// //                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
                    
// //                     <ResizableBox
// //                      width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
// //                       height='100px'
// //                       minConstraints={[600, 300]} // Minimum width and height
// //                       maxConstraints={[800, 500]} // Maximum width and height
// //                       resizeHandles={['e', 'w']} // Allow horizontal resizing
// //                       className="resizable-chart"
// //                     >
                     
// //                     <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
// //                     </div>
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="area"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
                
// //                 <div className="color-picker-container">
// //                     {/* Additional content */}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AreaChart;


// import React, { useEffect, useState, useRef } from "react";
// import Draggable from "react-draggable";
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
// import "./tooltip.css"; // Import the CSS for the tooltip

// const AreaChart = ({ categories, values, aggregation }) => {
//     const areaColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
       
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//       const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//      const [popupVisible, setPopupVisible] = useState(false); 
//    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
//     //    const xFontSize = useSelector((state) => state.toolTip.fontSizeX);
//     //    const yFontSize= useSelector((state) => state.toolTip.fontSizeY);
//         const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//         const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//         const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//        const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//        const valueColor= useSelector((state) => state.toolTip.valueColor);
//  const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

//     const [sortedCategories, setSortedCategories] = useState(categories);
//     const [sortedValues, setSortedValues] = useState(values);
// // const contextMenuRef = useRef(null);
     
//          useEffect(() => {
//              setSortedCategories(categories);
//              setSortedValues(values);
//          }, [categories, values]);
     
// const handleTop10 = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => b.value - a.value); // Sort descending
//     const top10 = sortedData.slice(0, 10); // Get top 10
//     setSortedCategories(top10.map(item => item.category));
//     setSortedValues(top10.map(item => item.value));

// setIsFiltered(true); // Mark as filtered
// };

// const handleBottom10 = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => a.value - b.value); // Sort ascending
//     const bottom10 = sortedData.slice(0, 10); // Get bottom 10
//     setSortedCategories(bottom10.map(item => item.category));
//     setSortedValues(bottom10.map(item => item.value));
//     setIsFiltered(true); // Mark as filtered
// }; const handleSortAscending = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map(item => item.category));
//     setSortedValues(sortedData.map(item => item.value));
// };

// const handleSortDescending = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map(item => item.category));
//     setSortedValues(sortedData.map(item => item.value));
// };
//     const options = {
//         chart: {
//             type: 'area',
//             events: {}
//         },
//         chart: {
            
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//                             index: 1, // Start with the first position in the toolbar
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//                             index: 2, // Position right after the previous custom icon
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending
//                         },
//                         {
//                             // Top 10: Using an upward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 3,
//                             title: 'Show Top 10',
//                             class: 'custom-top-10',
//                             click: handleTop10,
//                         },
//                         {
//                             // Bottom 10: Using a downward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 4,
//                             title: 'Show Bottom 10',
//                             class: 'custom-bottom-10',
//                             click: handleBottom10,
//                         },
//                     {
//                         icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//                         index: 5, // Reset
//                         title: 'Reset Chart',
//                         class: 'custom-reset',
//                         click: () => {
//                             setSortedCategories(categories); // Reset categories
//                             setSortedValues(values);         // Reset values
//                             setIsFiltered(false);            // Clear filter state
//                         },
//                     },
//                     ],
//                     download: true,
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                 },
//                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
//                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
//             }
//         },
//         xaxis: {
//             categories: sortedCategories || [],
//             title: {
//                 text: `${xAxis}`,
//               },
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${xFontSize}px`,
//                     fontWeight: 400,
//                     colors: categoryColor
//                 }
//             }
//         },
//         yaxis: {
//             title: {
//                 text: `${yAxis}`,
//               },
//             labels: {
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${yFontSize}px`, // Use Redux state for font size
//                 fontWeight: 400,
//                 colors: [valueColor],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) { // For values in crores (millions)
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) { // For values in thousands
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value; // For smaller values
//                     }
//                 }
//             },
//         },
//         colors: [areaColor],
//         plotOptions: {
//             area: {
//                 distributed: false,
//                 dataLabels: {
//                     hideOverflowingLabels: true
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: false,
//             formatter: function (val, opts) {
//                 return val;
//             },
//             offsetY: -2,
//             style: {
//                 fontSize: '12px',
//                 colors: ["#304758"]
//             }
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         }
//     };

//     const series = [{
//         name: aggregation,
//         data: sortedValues || []
//     }];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="area-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
//                       <ResizableBox
//                      width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
//                       height='100px'
//                       minConstraints={[600, 300]} // Minimum width and height
//                       maxConstraints={[800, 500]} // Maximum width and height
//                       resizeHandles={['e', 'w']} // Allow horizontal resizing
//                       className="resizable-chart"
//                     >
                     
//                      <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
//                      </div>
//                          <Chart
//                             options={options}
//                             series={series}
//                             type="area"
                        
//                             height="550"
//                         />
//                     </ResizableBox>
//                 </div>
//                 <div className="color-picker-container">
//                     {/* Additional content */}
//                 </div>
//             </div>
//             {/* {contextMenuVisible && (
//         <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//       )} */}
//       {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
//       {/* {barClicked && <DrillPieChart
//           categories={plotData.categories}
//           values={plotData.values}
//           aggregation={plotData.aggregation}
//           xAxis={xAxis}
//           yAxis={yAxis}
//           selectedTable={selectedTable}
//         />} */}
//               {/* {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable>
//       )} */}
//     </div>
//     );
// };

// export default AreaChart;

// import React, { useEffect, useState, useRef } from "react";
// import Draggable from "react-draggable";
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
// import "./tooltip.css"; // Import the CSS for the tooltip

// const AreaChart = ({ categories, values, aggregation }) => {
//     const areaColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
       
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//       const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//      const [popupVisible, setPopupVisible] = useState(false); 
//    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
//     //    const xFontSize = useSelector((state) => state.toolTip.fontSizeX);
//     //    const yFontSize= useSelector((state) => state.toolTip.fontSizeY);
//         const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//         const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//         const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//        const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//        const valueColor= useSelector((state) => state.toolTip.valueColor);
//  const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
//  const [legendPosition, setLegendPosition] = useState("right");

//     const [sortedCategories, setSortedCategories] = useState(categories);
//     const [sortedValues, setSortedValues] = useState(values);
// const contextMenuRef = useRef(null);
// const toggleLegendPosition = () => {
//     const positions = ["top", "bottom", "left", "right", "hide"];
//     const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
//     setLegendPosition(positions[newIndex]);
//   };
//          useEffect(() => {
//              setSortedCategories(categories);
//              setSortedValues(values);
//          }, [categories, values]);
     
// const handleTop10 = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => b.value - a.value); // Sort descending
//     const top10 = sortedData.slice(0, 10); // Get top 10
//     setSortedCategories(top10.map(item => item.category));
//     setSortedValues(top10.map(item => item.value));

// setIsFiltered(true); // Mark as filtered
// };

// const handleBottom10 = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => a.value - b.value); // Sort ascending
//     const bottom10 = sortedData.slice(0, 10); // Get bottom 10
//     setSortedCategories(bottom10.map(item => item.category));
//     setSortedValues(bottom10.map(item => item.value));
//     setIsFiltered(true); // Mark as filtered
// }; const handleSortAscending = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map(item => item.category));
//     setSortedValues(sortedData.map(item => item.value));
// };

// const handleSortDescending = () => {
//     const sortedData = [...sortedValues].map((value, index) => ({
//         category: sortedCategories[index],
//         value
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map(item => item.category));
//     setSortedValues(sortedData.map(item => item.value));
// };
//     const options = {
//         chart: {
//             type: 'area',
//             events: {}
//         },
//         chart: {
            
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//                             index: 1, // Start with the first position in the toolbar
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//                             index: 2, // Position right after the previous custom icon
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending
//                         },
//                         {
//                             // Top 10: Using an upward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 3,
//                             title: 'Show Top 10',
//                             class: 'custom-top-10',
//                             click: handleTop10,
//                         },
//                         {
//                             // Bottom 10: Using a downward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 4,
//                             title: 'Show Bottom 10',
//                             class: 'custom-bottom-10',
//                             click: handleBottom10,
//                         },
//                     {
//                         icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//                         index: 5, // Reset
//                         title: 'Reset Chart',
//                         class: 'custom-reset',
//                         click: () => {
//                             setSortedCategories(categories); // Reset categories
//                             setSortedValues(values);         // Reset values
//                             setIsFiltered(false);            // Clear filter state
//                         },
//                     },
//                     {
//                         icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//                         index: 6,
//                         title: "Toggle Legend Position",
//                         class: "custom-legend-toggle",
//                         click: toggleLegendPosition,
//                       },
//                     ],
//                     download: true,
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                 },
//                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
//                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
//             }
//         },
//         legend: {
//             show: legendPosition !== "hide",
//             position: legendPosition === "hide" ? "bottom" : legendPosition,
//             horizontalAlign: "center",
//           },
//           colors: [areaColor],
//         xaxis: {
//             categories: sortedCategories || [],
//             title: {
//                 text: `${xAxis}`,
//               },
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${xFontSize}px`,
//                     fontWeight: 400,
//                     colors: categoryColor
//                 }
//             }
//         },
//         yaxis: {
//             title: {
//                 text: `${yAxis}`,
//               },
//             labels: {
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${yFontSize}px`, // Use Redux state for font size
//                 fontWeight: 400,
//                 colors: [valueColor],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) { // For values in crores (millions)
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) { // For values in thousands
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value; // For smaller values
//                     }
//                 }
//             },
//         },
//         colors: [areaColor],
//         plotOptions: {
//             area: {
//                 distributed: false,
//                 dataLabels: {
//                     hideOverflowingLabels: true
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: false,
//             formatter: function (val, opts) {
//                 return val;
//             },
//             offsetY: -2,
//             style: {
//                 fontSize: '12px',
//                 colors: ["#304758"]
//             }
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         }
//     };

//     // const series = [{
//     //     name: aggregation,
//     //     data: sortedValues || []
//     // }];
//     const series = sortedCategories.map((cat, index) => ({
//     name: cat,                 // This will be the legend label by default
//     data: sortedValues || []// A single data point
//   }));

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="area-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
//                       <ResizableBox
//                       width={isFiltered ? Math.max(10 * 30, 600) : Math.max((values ? values.length : 0) * 30, 600)}

//                       //   width={Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
//                         height='100px'
//                         minConstraints={[600, 300]} // Minimum width and height
//                         maxConstraints={[800, 500]} // Maximum width and height
//                         resizeHandles={['e', 'w']} // Allow horizontal resizing
//                         className="resizable-chart"
//                       ><div className="chart-title">{customHeadings}</div>
                   
//                          <Chart
//                             options={options}
//                             series={series}
//                             type="area"
                        
//                             height="550"
//                         />
//                     </ResizableBox>
//                 </div>
//                 <div className="color-picker-container">
//                     {/* Additional content */}
//                 </div>
//             </div>
//             {/* {contextMenuVisible && (
//         <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//       )} */}
//       {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
//       {/* {barClicked && <DrillPieChart
//           categories={plotData.categories}
//           values={plotData.values}
//           aggregation={plotData.aggregation}
//           xAxis={xAxis}
//           yAxis={yAxis}
//           selectedTable={selectedTable}
//         />} */}
//               {/* {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable>
//       )} */}
//     </div>
//     );
// };

// export default AreaChart;
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./tooltip.css";

const AreaChart = ({ categories = [], values = [], aggregation }) => {
  // Redux selectors
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);

  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");

  // Default color palette for categories
  const defaultColors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
  ];

  // 1) Transform data into multiple series (one per category).
  //    Each series has a single data point.
  const series = sortedCategories.map((cat, index) => ({
    name: cat,                // This becomes the legend label
    data: sortedValues || [] // Single data point for the category
  }));

  // 2) Build a color array that assigns a unique color per category.
  const multiSeriesColors = sortedCategories.map(
    (_, i) => defaultColors[i % defaultColors.length]
  );

  // Re-initialize sorted data if categories or values change
  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
  }, [categories, values]);

  // Example sorting & filtering
  const handleSortAscending = () => {
    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => a.value - b.value);
    setSortedCategories(combined.map((c) => c.category));
    setSortedValues(combined.map((c) => c.value));
  };

  const handleSortDescending = () => {
    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => b.value - a.value);
    setSortedCategories(combined.map((c) => c.category));
    setSortedValues(combined.map((c) => c.value));
  };

  const handleTop10 = () => {
    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => b.value - a.value);
    const top10 = combined.slice(0, 10);
    setSortedCategories(top10.map((item) => item.category));
    setSortedValues(top10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => a.value - b.value);
    const bottom10 = combined.slice(0, 10);
    setSortedCategories(bottom10.map((item) => item.category));
    setSortedValues(bottom10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleReset = () => {
    setSortedCategories(categories);
    setSortedValues(values);
    setIsFiltered(false);
  };

  // Toggle legend position
  const toggleLegendPosition = () => {
    const positions = ["top", "bottom", "left", "right", "hide"];
    const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
    setLegendPosition(positions[newIndex]);
  };

  // ApexCharts options
  const options = {
    chart: {
      type: "area",
      toolbar: {
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: "Sort Ascending",
              class: "custom-sort-ascending",
              click: handleSortAscending,
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: "Sort Descending",
              class: "custom-sort-descending",
              click: handleSortDescending,
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: "Show Top 10",
              class: "custom-top-10",
              click: handleTop10,
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: "Show Bottom 10",
              class: "custom-bottom-10",
              click: handleBottom10,
            },
            {
              icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
              index: 5,
              title: "Reset Chart",
              class: "custom-reset",
              click: handleReset,
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            },
          ],
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
        },
        offsetX: -10,
        offsetY: 0,
      },
    },
    legend: {
      show: legendPosition !== "hide",
      position: legendPosition === "hide" ? "bottom" : legendPosition,
      horizontalAlign: "center",
    },
    // Provide multiple colors for multiple series
    colors: multiSeriesColors,
    xaxis: {
      // Because each series is just a single data point,
      // you might only want a placeholder on the x-axis:
      categories: sortedCategories || [],
      title: {
        text: xAxis,
      },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${xFontSize}px`,
          fontWeight: 400,
          colors: categoryColor,
        },
      },
    },
    yaxis: {
      title: {
        text: yAxis,
      },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          colors: [valueColor],
        },
        formatter: (value) => {
          if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
          if (value >= 100000) return (value / 100000).toFixed(1) + "L";
          if (value >= 1000) return (value / 1000).toFixed(1) + "K";
          return value;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      area: {
        distributed: false,
      },
    },
    title: {
      text: `${xAxis} vs ${yAxis}`,
      align: "left",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
  };
  const series1 = [{
    name: aggregation,
    data: sortedValues || []
}];

  return (
    <div className="app">
      <div className="row">
        <div className="area-chart">
          <ResizableBox
            width={
              isFiltered
                ? Math.max(10 * 30, 600)
                : Math.max((values ? values.length : 0) * 30, 600)
            }
            height="100px"
            minConstraints={[600, 300]}
            maxConstraints={[800, 500]}
            resizeHandles={["e", "w"]}
            className="resizable-chart"
          >
            <div
              className="chart-title"
              style={{ color: headingColor, marginBottom: "10px" }}
            >
              {customHeadings}
            </div>
            <Chart options={options} series={series1} type="area" height="550" />
          </ResizableBox>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
