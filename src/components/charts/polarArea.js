// import { Legend } from "chart.js";
// import React from "react";
// import Chart from "react-apexcharts";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// const PolarAreaChart = ({ categories, values, aggregation }) => {
//     // const polarAreaColor = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

//     const options = {
//         chart: {
//             type: 'polarArea',
//             events: {}
//         },
//         labels: categories || [],
//         // colors: [polarAreaColor],
//         fill: {
//             opacity: 1
//         },
//         stroke: {
//             width: 1,
//             // colors: ['#fff']
//         },
//         yaxis: {
//             show: false,
//             labels: {
//                 formatter: function (value) {
//                     return parseFloat(value).toFixed(2);
//                 },
//             Legend:false
//             }
//         },
//         plotOptions: {
//             polarArea: {
//                 rings: {
//                     strokeWidth: 0
//                 },
//                 spokes: {
//                     strokeWidth: 0
//                 },
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
//                 // colors: ["#304758"]
//             }
//         },
//         grid: {
//             // borderColor: '#f1f3fa'
//         }
//     };

//     const series = values || [];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="polar-area-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
//                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
                    
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="polarArea"
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

// export default PolarAreaChart;


// import React from "react";
// import Chart from "react-apexcharts";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// const PolarAreaChart = ({ categories, values, aggregation }) => {
//     // const polarAreaColor = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

//     const options = {
//         chart: {
//             type: 'polarArea',
//             events: {}
            
//         },
        
//         labels: categories || [],
//         // colors: [polarAreaColor],
//         fill: {
//             opacity: 1
//         },
//         stroke: {
//             width: 1,
//             // colors: ['#fff']
//         },
//         yaxis: {
//             show: false,
//             labels: {
//                 formatter: function (value) {
//                     return parseFloat(value).toFixed(2);
//                 },
//             }
//         },
//         plotOptions: {
//             polarArea: {
//                 rings: {
//                     strokeWidth: 0
//                 },
//                 spokes: {
//                     strokeWidth: 0
//                 },
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
//                 // colors: ["#304758"]
//             }
//         },
//         grid: {
//             // borderColor: '#f1f3fa'
//         }
//     };

//     const series = values || [];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="polar-area-chart">
//                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
//                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]} >
                    
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="polarArea"
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

// export default PolarAreaChart;

import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

const PolarAreaChart = ({ categories, values, aggregation }) => {
    const [sortedData, setSortedData] = useState({ categories, values });

    // Function to handle ascending sort
    const handleSortAscending = () => {
        const sortedCategories = [...categories];
        const sortedValues = [...values];
        const sortedIndex = sortedCategories.map((category, index) => [category, sortedValues[index]]);
        
        sortedIndex.sort((a, b) => a[0] > b[0] ? 1 : -1);

        const sortedCategoriesResult = sortedIndex.map(item => item[0]);
        const sortedValuesResult = sortedIndex.map(item => item[1]);

        setSortedData({
            categories: sortedCategoriesResult,
            values: sortedValuesResult
        });
    };

    // Function to handle descending sort
    const handleSortDescending = () => {
        const sortedCategories = [...categories];
        const sortedValues = [...values];
        const sortedIndex = sortedCategories.map((category, index) => [category, sortedValues[index]]);
        
        sortedIndex.sort((a, b) => a[0] < b[0] ? 1 : -1);

        const sortedCategoriesResult = sortedIndex.map(item => item[0]);
        const sortedValuesResult = sortedIndex.map(item => item[1]);

        setSortedData({
            categories: sortedCategoriesResult,
            values: sortedValuesResult
        });
    };

    const options = {
        chart: {
            type: 'polarArea',
            events: {},
            toolbar: {
                show: true,
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
                            index: 1,
                            title: 'Sort Ascending',
                            class: 'custom-sort-ascending',
                            click: handleSortAscending,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
                            index: 2,
                            title: 'Sort Descending',
                            class: 'custom-sort-descending',
                            click: handleSortDescending,
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
                offsetX: 0,
                offsetY: 0,
            },
        },
        labels: sortedData.categories || [],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value) {
                    return parseFloat(value).toFixed(2);
                },
            }
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
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
            }
        },
        grid: {},
    };

    const series = sortedData.values || [];

    return (
        <div className="app">
            <div className="row">
                <div className="polar-area-chart">
                    <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
                        <Chart
                            options={options}
                            series={series}
                            type="polarArea"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
                <div className="color-picker-container">
                    {/* Additional content */}
                </div>
            </div>
        </div>
    );
};

export default PolarAreaChart;
