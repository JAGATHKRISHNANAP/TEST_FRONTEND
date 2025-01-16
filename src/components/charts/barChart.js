// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import DrillBarChart from '../drillDown/drillDownBarChart';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';
// import "./tooltip.css";
// import { sendCategoryToBackend } from '../../utils/api';
// import Draggable from 'react-draggable';





// const BarChart = ({ categories = [], values = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const barColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const [plotData, setPlotData] = useState({});
//     const [barClicked, setBarClicked] = useState(false);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const [sortedCategories, setSortedCategories] = useState(categories);
//     const [sortedValues, setSortedValues] = useState(values);
//     const contextMenuRef = useRef(null);

//     useEffect(() => {
//         setSortedCategories(categories);
//         setSortedValues(values);
//     }, [categories, values]);

//     const handleSortAscending = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => a.value - b.value);
//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleSortDescending = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => b.value - a.value);
//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//           const data = await sendCategoryToBackend(
//             clickedCategory,
//             xAxis,
//             yAxis,
//             selectedTable,
//             aggregate
//           );
//           setPlotData(data);
//           setBarClicked(true);
//         } catch (error) {
//           console.error('Error handling click event:', error);
//         }
//       };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const handleShowPopup = () => {
//         setPopupVisible(true);
//         setContextMenuVisible(false);
//     };

//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const generateColors = (numColors) => {
//         const colors = [];
//         for (let i = 0; i < numColors; i++) {
//             const hue = Math.floor((360 / numColors) * i);
//             colors.push(`hsl(${hue}, 70%, 50%)`);
//         }
//         return colors;
//     };

//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked
//             },
             
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
//                             index: 1, // Start with the first position in the toolbar
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
//                             index: 2, // Position right after the previous custom icon
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending
//                         }
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
//             categories: sortedCategories,
//             title: {
//                 text: `${xAxis}`,
//               },
//             labels: {

//                 show: true,
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000']
//                 },
//                 rotate: -45,
//                 formatter: function (val) {
//                     if (!val) return '';
//                     return val.length > 10 ? val.substring(0, 10) + "..." : val;
//                 }
//             },
//             tickPlacement: 'on',
//         },
//         yaxis: {
//             title: {
//                 text: `${yAxis}`,
//               },
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
//                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
//                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
//                     return value;
//                 }
//             },
//         },
//         colors: generateColors(categories.length),
//         plotOptions: {
//             bar: {
//                 distributed: true,
//                 dataLabels: {
//                     hideOverflowingLabels: true
//                 },
//                 barHeight: '80%',
//             }
//         },
//         title: {
//             text: `${aggregation} of ${xAxis} vs ${yAxis}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             offsetY: 0,
//             floating: false,
//             style: {
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//                 fontFamily: undefined,
//                 color: '#263238'
//             },
//         },
//         dataLabels: {
//             enabled: false,
//             offsetY: -2,
//             style: {
//                 fontSize: '12px',
//                 colors: ["#304758"]
//             }
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         },
//         tooltip: {
//             enabled: true,
//             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
//                     const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
//                     const value = series[seriesIndex][dataPointIndex];
//                     const currentAggregation = aggregation || 'Aggregation';
//                     const currentXAxis = xAxis[0] || 'X-Axis';
//                     const currentYAxis = yAxis || 'Y-Axis';

//                     return `
//                         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                             ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
//                             <div>
//                                 ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
//                                 ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
//                             </div>
//                         </div>
//                     `;
//                 }
//                 : undefined
//         },
//         legend: {
//             show: false
//         }
//     };

//     const series = [{
//         name: aggregation,
//         data: sortedValues
//     }];

//     return (
//         <div className="app">
//                             {/* <div className="color-picker-container">
//                     <button onClick={handleSortAscending}>Sort Ascending</button>
//                     <button onClick={handleSortDescending}>Sort Descending</button>
//                 </div> */}
//             <div className="row">
//                 <div className="mixed-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
//                     <ResizableBox width={800} height={600} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
//                         <div className="chart-title">{customHeadings}</div>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="bar"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>

//             </div>
//             {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//             {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
//             {barClicked && <DrillBarChart
//                 categories={plotData.categories}
//                 values={plotData.values}
//                 aggregation={plotData.aggregation}
//                 xAxis={xAxis}
//                 yAxis={yAxis}
//                 selectedTable={selectedTable}
//             />} */}
//                           {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable>
//       )}
//         </div>
//     );
// };

// export default BarChart;




// CLEANED ABOVE CODE IS BELOW


import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip';
import "./tooltip.css";
import { sendCategoryToBackend } from '../../utils/api';
import Draggable from 'react-draggable';

const BarChart = ({ categories = [], values = [], aggregation }) => {
    const dispatch = useDispatch();
    const barColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const [plotData, setPlotData] = useState({});
    const [barClicked, setBarClicked] = useState(false);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        setSortedCategories(categories);
        setSortedValues(values);
    }, [categories, values]);

    const handleSortAscending = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => a.value - b.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleSortDescending = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => b.value - a.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleClicked = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = categories[clickedCategoryIndex];
        dispatch(setClickedCategory(clickedCategory));
        try {
          const data = await sendCategoryToBackend(
            clickedCategory,
            xAxis,
            yAxis,
            selectedTable,
            aggregate
          );
          setPlotData(data);
          setBarClicked(true);
        } catch (error) {
          console.error('Error handling click event:', error);
        }
      };

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
        setContextMenuVisible(false);
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

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor((360 / numColors) * i);
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    const options = {
        chart: {
            events: {
                dataPointSelection: handleClicked
            },
             
            toolbar: {
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
                            index: 1, // Start with the first position in the toolbar
                            title: 'Sort Ascending',
                            class: 'custom-sort-ascending',
                            click: handleSortAscending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
                            index: 2, // Position right after the previous custom icon
                            title: 'Sort Descending',
                            class: 'custom-sort-descending',
                            click: handleSortDescending
                        }
                    ],
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: true,
                    reset: true,
                },
                offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
                offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
            }
        },
        
        xaxis: {
            categories: sortedCategories,
            title: {
                text: `${xAxis}`,
              },
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                },
                rotate: -45,
                formatter: function (val) {
                    if (!val) return '';
                    if (/\d{4}-\d{2}-\d{2}/.test(val)) {
                        const [year, month, day] = val.split('-');
                        val = `${day}-${month}-${year}`;
                    }
                    return val.length > 10 ? val.substring(0, 10) + "..." : val;
                }
            },
            
            tickPlacement: 'on',
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
                    if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
                    if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value;
                }
            },
        },
        colors: generateColors(categories.length),
        plotOptions: {
            bar: {
                distributed: true,
                dataLabels: {
                    hideOverflowingLabels: true
                },
                barHeight: '80%',
            }
        },
        title: {
            text: `${xAxis} vs ${yAxis}`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        dataLabels: {
            enabled: false,
            offsetY: -2,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        grid: {
            borderColor: '#f1f3fa'
        },
        tooltip: {
            enabled: true,
            custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
                ? function ({ series, seriesIndex, dataPointIndex, w }) {
                    const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
                    const value = series[seriesIndex][dataPointIndex];
                    const currentAggregation = aggregation || 'Aggregation';
                    const currentXAxis = xAxis[0] || 'X-Axis';
                    const currentYAxis = yAxis || 'Y-Axis';

                    return `
                        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                            ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
                            <div>
                                ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
                                ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
                            </div>
                        </div>
                    `;
                }
                : undefined
        },
        legend: {
            show: false
        }
    };

    const series = [{
        name: aggregation,
        data: sortedValues
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
                        <div className="chart-title">{customHeadings}</div>
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>

            </div>
                      {contextMenuVisible && (
                    <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
                )}
    
                {popupVisible && (
                    <div>
                        <CustomToolTip onClose={handleClosePopup} />
                    </div>
                )}
        </div>
    );
};

export default BarChart;













