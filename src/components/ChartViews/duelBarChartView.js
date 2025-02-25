
// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import ContectMenu from '../charts/contextMenu';
// import CustomToolTip from '../charts/customToolTip';

// const BarChart = ({ categories = [], series1 = [], series2 = [], aggregation = "Aggregation", x_axis = "X_axis", y_axis = "Y_axis_Line", xFontSize, fontStyle, categoryColor,yFontSize, valueColor,chartColor, otherChartCategories = [] }) => {

//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const [popupVisible, setPopupVisible] = useState(false);
//     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
   
//            const uniqueCategories = [...new Set(categories)]; // Use uniqueCategories
//            const uniqueSeries1 = [...new Set(series1)];       // Use uniqueSeries1
       
       
//            const series = uniqueSeries1.map(series1Value => ({
//                name: series1Value,  // Use the actual series1 value as the name
//                data: uniqueCategories.map(categoryValue => {
//                    const index = categories.findIndex((cat, i) => cat === categoryValue && series1[i] === series1Value);
//                    return index !== -1 ? series2[index] : 0;
//                })
//            }));
       
//     // Chart Options
//     const options = {
//         chart: {
//             type: 'bar',
//             height: 350,
             
//             toolbar: {
//                 tools: {
                
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
//             },
//         },
//         title: {
//             text: `${aggregate} of ${x_axis[0]} and ${x_axis[1]} vs ${y_axis[0]}`,
//             align: 'left',
//             margin: 10,
//             style: {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#333',
//             },
//         },
//         x_axis: {
//             categories: uniqueCategories, // X-axis categories
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${xFontSize}px`,
//                     fontWeight: 400,
//                     colors: categoryColor
//                 },
//             },
//         },
//         y_axis: {
//             title: {
//                 text: y_axis[0] || 'Values',
//                 labels: {
//                     formatter: (value) => {
//                         if (value >= 10000000) { // 1 crore or 10 million
//                             return (value / 10000000).toFixed(1) + 'Cr';
//                         } else if (value >= 1000000) { // million
//                             return (value / 1000000).toFixed(1) + 'M';
//                         } else if (value >= 100000) { // lakh
//                             return (value / 100000).toFixed(1) + 'L';
//                         } else if (value >= 1000) { // thousand
//                             return (value / 1000).toFixed(1) + 'K';
//                         } else {
//                             return value;
//                         }
//                     },
//                 },
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 600,
//                     color: '#333',
//                 },
                
//             },
//             labels: {
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${yFontSize}px`, // Use Redux state for font size
//                 fontWeight: 400,
//                 colors: [valueColor],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
//                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
//                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
//                     return value;
//                 },
//             },
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '50%',
//                 dataLabels: {
//                     position: 'top',
//                 },
//             },
//         },
//         dataLabels: {
//             enabled: false,
//             style: {
//                 fontSize: '10px',
//                 fontWeight: 500,
//                 colors: ['#fff'],
//             },
//         },
//         tooltip: {
//             enabled: true,
//             custom: function({ series, seriesIndex, dataPointIndex, w }) {
//                 const category = uniqueCategories[dataPointIndex];
//                 const series1Value = uniqueSeries1[seriesIndex]; // Get series1 value for tooltip
//                 const value = series[seriesIndex][dataPointIndex];
//                   let tooltipContent = '<div style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';
//                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
//                     tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
//                     tooltipContent += `<div><strong>category:</strong> ${category}</div>`;
//                 } else {
//                     if (toolTipOptions.heading) {
//                         tooltipContent += `<div><h4>${aggregate} of ${x_axis[0]} vs ${y_axis[0]}</h4></div>`;
//                     }
//                     tooltipContent += '<div>';
//                     if (toolTipOptions.categoryName) {
//                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
//                     }
//                     if (toolTipOptions.value) {
//                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
//                     }
//                     tooltipContent += '</div>';
//                 }
//                 tooltipContent += '</div>';
//                 return tooltipContent;
//             },
//         },
//     };

//     // Series for Grouped Bars
//     // const series = [
//     //     {
//     //         name: xAxis[0] || 'Series 1',
//     //         data: series1, // First dataset
//     //         color: '#008FFB', // Blue color
//     //     },
//     //     {
//     //         name: xAxis[1] || 'Series 2',
//     //         data: series2, // Second dataset
//     //         color: '#00E396', // Green color
//     //     },
//     // ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     <ResizableBox width={350} height={400} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                                 
//                          <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
                                       
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
//         </div>
//     );
// };

// export default BarChart;

import React, { useState } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ContectMenu from '../charts/contextMenu';
import CustomToolTip from '../charts/customToolTip';

const BarChart = ({ categories = [], series1 = [], series2 = [], aggregation = "Aggregation", x_axis = "X_axis", y_axis = "Y_axis_Line", xFontSize, fontStyle, categoryColor, yFontSize, valueColor, chartColor,customHeadings, headingColor, otherChartCategories = [] }) => {

    const aggregate = useSelector((state) => state.chart.aggregate);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    // const customHeadings = useSelector((state) => state.toolTip.customHeading);
    // const [popupVisible, setPopupVisible] = useState(false);
    // const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
   
    // Ensure categories and series are unique
    const uniqueCategories = [...new Set(categories)];
    const uniqueSeries1 = [...new Set(series1)];
   
    // Mapping series data to be used in chart
    const series = uniqueSeries1.map(series1Value => ({
        name: series1Value,  // Series name from series1
        data: uniqueCategories.map(categoryValue => {
            const index = categories.findIndex((cat, i) => cat === categoryValue && series1[i] === series1Value);
            return index !== -1 ? series2[index] : 0;
        })
    }));

    // Chart options
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                tools: {
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
            },
        },
        title: {
            text: `${aggregate} of ${x_axis[0]} and ${x_axis[1]} vs ${y_axis[0]}`,
            align: 'left',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
        xaxis: {
            categories: uniqueCategories, // X-axis categories
            labels: {
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${xFontSize}px`,
                    fontWeight: 400,
                    colors: categoryColor
                },
            },
        },
        yaxis: {
            title: {
                text: y_axis[0] || 'Values',
                style: {
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#333',
                },
            },
            labels: {
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${yFontSize}px`,
                    fontWeight: 400,
                    colors: [valueColor],
                },
                formatter: (value) => {
                    // Formatting y-axis values for better readability
                    if (value >= 10000000) return (value / 10000000).toFixed(1) + 'Cr';
                    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value;
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '10px',
                fontWeight: 500,
                colors: ['#fff'],
            },
        },
        tooltip: {
            enabled: true,
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const category = uniqueCategories[dataPointIndex];
                const series1Value = uniqueSeries1[seriesIndex]; // Get series1 value for tooltip
                const value = series[seriesIndex][dataPointIndex];
                  let tooltipContent = '<div style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';
                if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
                    tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
                    tooltipContent += `<div><strong>category:</strong> ${category}</div>`;
                } else {
                    if (toolTipOptions.heading) {
                        tooltipContent += `<div><h4>${aggregate} of ${x_axis[0]} vs ${y_axis[0]}</h4></div>`;
                    }
                    tooltipContent += '<div>';
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
                    }
                    if (toolTipOptions.value) {
                        tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
                    }
                    tooltipContent += '</div>';
                }
                tooltipContent += '</div>';
                return tooltipContent;
            },
        },
    };

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ResizableBox width={350} height={400} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                        <div className="chart-title">
                            <h3 >{customHeadings}</h3>
                        </div>
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
        </div>
    );
};

export default BarChart;
