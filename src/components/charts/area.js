// import React from "react";
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// const AreaChart = ({ categories, values, aggregation }) => {
//     const areaColor = useSelector((state) => state.chartColor.chartColor);
//     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const options = {
//         chart: {
//             type: 'area',
//             events: {}
//         },
//         xaxis: {
//             categories: categories || [],
//             labels: {
//                 show: true,
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000']
//                 }
//             }
//         },
//         yaxis: {
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
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
//         data: values || []
//     }];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="area-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
//                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} >
//                     <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
//                     </div>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="area"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
//                 <div className="color-picker-container">
//                     {/* Additional content */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AreaChart;


import React, { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
import "./tooltip.css"; // Import the CSS for the tooltip

const AreaChart = ({ categories, values, aggregation }) => {
    const areaColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
       
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
      const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
     const [popupVisible, setPopupVisible] = useState(false);  const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

const contextMenuRef = useRef(null);
     
     
       const handleContextMenu = (event) => {
         event.preventDefault();
         setContextMenuPosition({ x: event.pageX, y: event.pageY });
         setContextMenuVisible(true);
       };
     
       const handleClickOutside = (event) => {
         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
             setContextMenuVisible(false);
         }
       };
     
       const handleShowPopup = () => {
         setPopupVisible(true);
         setContextMenuVisible(false); // Hide context menu when showing popup
       };
     
       const handleClosePopup = () => {
         setPopupVisible(false);
       };
     
       useEffect(() => {
         document.addEventListener('click', handleClickOutside);
         return () => {
           document.removeEventListener('click', handleClickOutside);
         };
       }, []);
    const options = {
        chart: {
            type: 'area',
            events: {}
        },
        chart: {
            
            toolbar: {
                tools: {
                
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
                offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
                offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
            }
        },
        xaxis: {
            categories: categories || [],
            title: {
                text: `${xAxis}`,
              },
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                }
            }
        },
        yaxis: {
            title: {
                text: `${yAxis}`,
              },
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000'],
                },
                formatter: (value) => {
                    if (value >= 10000000) { // For values in crores (millions)
                        return (value / 10000000).toFixed(1) + 'M';
                    } else if (value >= 100000) { // For values in lakhs (hundred thousand)
                        return (value / 100000).toFixed(1) + 'L';
                    } else if (value >= 1000) { // For values in thousands
                        return (value / 1000).toFixed(1) + 'K';
                    } else {
                        return value; // For smaller values
                    }
                }
            },
        },
        colors: [areaColor],
        plotOptions: {
            area: {
                distributed: false,
                dataLabels: {
                    hideOverflowingLabels: true
                }
            }
        },
        dataLabels: {
            enabled: false,
            formatter: function (val, opts) {
                return val;
            },
            offsetY: -2,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        grid: {
            borderColor: '#f1f3fa'
        }
    };

    const series = [{
        name: aggregation,
        data: values || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="area-chart">
                    {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
                     <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu} >
                     <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
                     </div>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
                <div className="color-picker-container">
                    {/* Additional content */}
                </div>
            </div>
            {contextMenuVisible && (
        <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
      )}
      {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
      {/* {barClicked && <DrillPieChart
          categories={plotData.categories}
          values={plotData.values}
          aggregation={plotData.aggregation}
          xAxis={xAxis}
          yAxis={yAxis}
          selectedTable={selectedTable}
        />} */}
              {popupVisible && (
        <Draggable>
          <div>
            <CustomToolTip onClose={handleClosePopup} />
          </div>
        </Draggable>
      )}
    </div>
    );
};

export default AreaChart;