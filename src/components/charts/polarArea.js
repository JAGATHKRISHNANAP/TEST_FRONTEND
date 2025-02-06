// // import { Legend } from "chart.js";
// // import React from "react";
// // import Chart from "react-apexcharts";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// // const PolarAreaChart = ({ categories, values, aggregation }) => {
// //     // const polarAreaColor = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

// //     const options = {
// //         chart: {
// //             type: 'polarArea',
// //             events: {}
// //         },
// //         labels: categories || [],
// //         // colors: [polarAreaColor],
// //         fill: {
// //             opacity: 1
// //         },
// //         stroke: {
// //             width: 1,
// //             // colors: ['#fff']
// //         },
// //         yaxis: {
// //             show: false,
// //             labels: {
// //                 formatter: function (value) {
// //                     return parseFloat(value).toFixed(2);
// //                 },
// //             Legend:false
// //             }
// //         },
// //         plotOptions: {
// //             polarArea: {
// //                 rings: {
// //                     strokeWidth: 0
// //                 },
// //                 spokes: {
// //                     strokeWidth: 0
// //                 },
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
// //                 // colors: ["#304758"]
// //             }
// //         },
// //         grid: {
// //             // borderColor: '#f1f3fa'
// //         }
// //     };

// //     const series = values || [];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="polar-area-chart">
// //                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
// //                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
                    
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="polarArea"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //                 <div className="color-picker-container">
// //                     {/* Additional content */}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PolarAreaChart;


// // import React from "react";
// // import Chart from "react-apexcharts";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// // const PolarAreaChart = ({ categories, values, aggregation }) => {
// //     // const polarAreaColor = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

// //     const options = {
// //         chart: {
// //             type: 'polarArea',
// //             events: {}
            
// //         },
        
// //         labels: categories || [],
// //         // colors: [polarAreaColor],
// //         fill: {
// //             opacity: 1
// //         },
// //         stroke: {
// //             width: 1,
// //             // colors: ['#fff']
// //         },
// //         yaxis: {
// //             show: false,
// //             labels: {
// //                 formatter: function (value) {
// //                     return parseFloat(value).toFixed(2);
// //                 },
// //             }
// //         },
// //         plotOptions: {
// //             polarArea: {
// //                 rings: {
// //                     strokeWidth: 0
// //                 },
// //                 spokes: {
// //                     strokeWidth: 0
// //                 },
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
// //                 // colors: ["#304758"]
// //             }
// //         },
// //         grid: {
// //             // borderColor: '#f1f3fa'
// //         }
// //     };

// //     const series = values || [];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="polar-area-chart">
// //                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
// //                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]} >
                    
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="polarArea"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //                 <div className="color-picker-container">
// //                     {/* Additional content */}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PolarAreaChart;

// import React, { useState } from "react";
// import Chart from "react-apexcharts";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

// const PolarAreaChart = ({ categories, values, aggregation }) => {
//     const [sortedData, setSortedData] = useState({ categories, values });

//     // Function to handle ascending sort
//     const handleSortAscending = () => {
//         const sortedCategories = [...categories];
//         const sortedValues = [...values];
//         const sortedIndex = sortedCategories.map((category, index) => [category, sortedValues[index]]);
        
//         sortedIndex.sort((a, b) => a[0] > b[0] ? 1 : -1);

//         const sortedCategoriesResult = sortedIndex.map(item => item[0]);
//         const sortedValuesResult = sortedIndex.map(item => item[1]);

//         setSortedData({
//             categories: sortedCategoriesResult,
//             values: sortedValuesResult
//         });
//     };

//     // Function to handle descending sort
//     const handleSortDescending = () => {
//         const sortedCategories = [...categories];
//         const sortedValues = [...values];
//         const sortedIndex = sortedCategories.map((category, index) => [category, sortedValues[index]]);
        
//         sortedIndex.sort((a, b) => a[0] < b[0] ? 1 : -1);

//         const sortedCategoriesResult = sortedIndex.map(item => item[0]);
//         const sortedValuesResult = sortedIndex.map(item => item[1]);

//         setSortedData({
//             categories: sortedCategoriesResult,
//             values: sortedValuesResult
//         });
//     };

//     const options = {
//         chart: {
//             type: 'polarArea',
//             events: {},
//             toolbar: {
//                 show: true,
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
//                             index: 1,
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
//                             index: 2,
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending,
//                         },
//                     ],
//                     download: true,
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                 },
//                 offsetX: 0,
//                 offsetY: 0,
//             },
//         },
//         labels: sortedData.categories || [],
//         fill: {
//             opacity: 1
//         },
//         stroke: {
//             width: 1,
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
//             }
//         },
//         grid: {},
//     };

//     const series = sortedData.values || [];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="polar-area-chart">
//                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import styles for resizing

// const PolarAreaChart = ({ categories = [], values = [] }) => {
//     const [sortedData, setSortedData] = useState({ categories, values });
//     const [legendPosition, setLegendPosition] = useState("right");
//     const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
//     const headingColor = useSelector((state) => state.toolTip.headingColor);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);

//     // Function to toggle legend position
//     const toggleLegendPosition = () => {
//         setLegendPosition((prev) => {
//             const positions = ["top", "bottom", "left", "right", "hide"];
//             const newIndex = (positions.indexOf(prev) + 1) % positions.length;
//             return positions[newIndex];
//         });
//     };

//     useEffect(() => {
//         setChartKey((prev) => prev + 1); // Update chart key to force re-render
//     }, [legendPosition]);

//     // Function to handle ascending sort
//     const handleSortAscending = () => {
//         const sorted = [...sortedData.categories]
//             .map((category, index) => ({ category, value: sortedData.values[index] }))
//             .sort((a, b) => a.category.localeCompare(b.category));

//         setSortedData({
//             categories: sorted.map(item => item.category),
//             values: sorted.map(item => item.value)
//         });
//     };

//     // Function to handle descending sort
//     const handleSortDescending = () => {
//         const sorted = [...sortedData.categories]
//             .map((category, index) => ({ category, value: sortedData.values[index] }))
//             .sort((a, b) => b.category.localeCompare(a.category));

//         setSortedData({
//             categories: sorted.map(item => item.category),
//             values: sorted.map(item => item.value)
//         });
//     };

//     const handleTop10 = () => {
//         const sortedIndices = values
//             .map((value, index) => ({ value, index }))
//             .sort((a, b) => b.value - a.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setSortedData({
//             categories: sortedIndices.map(index => categories[index]),
//             values: sortedIndices.map(index => values[index]),
//         });
//     };

//     const handleBottom10 = () => {
//         const sortedIndices = values
//             .map((value, index) => ({ value, index }))
//             .sort((a, b) => a.value - b.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setSortedData({
//             categories: sortedIndices.map(index => categories[index]),
//             values: sortedIndices.map(index => values[index]),
//         });
//     };

//     const handleReset = () => {
//         setSortedData({ categories, values });
//     };
//     const options = {
//         chart: {
//             type: "polarArea",
//             toolbar: {
//                 show: true,
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
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 3,
//                             title: "Show Top 10",
//                             class: "custom-top-10",
//                             click: handleTop10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 4,
//                             title: "Show Bottom 10",
//                             class: "custom-bottom-10",
//                             click: handleBottom10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//                             index: 5, // Reset
//                             title: "Reset Chart",
//                             class: "custom-reset",
//                             click: handleReset,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//                             index: 3,
//                             title: "Toggle Legend Position",
//                             class: "custom-legend-toggle",
//                             click: toggleLegendPosition,
//                         },
//                     ],
                    
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                     download: true,
//                 },
//             },
//         },
//         labels: sortedData.categories || [],
//         fill: { opacity: 1 },
//         stroke: { width: 1 },
//         legend: {
//             show: legendPosition !== "hide",
//             position: legendPosition === "hide" ? "right" : legendPosition,
//         },
//         yaxis: {
//             show: false,
//             labels: {
//                 formatter: (value) => parseFloat(value).toFixed(2),
//             },
//         },
//         plotOptions: {
//             polarArea: {
//                 rings: { strokeWidth: 0 },
//                 spokes: { strokeWidth: 0 },
//             },
//         },
//         dataLabels: {
//             enabled: false,
//             offsetY: -2,
//             style: { fontSize: "12px" },
//         },
//     };

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="polar-area-chart">
//                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                     <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//                         <Chart
//                             key={chartKey} // Force re-render when legend changes
//                             options={options}
//                             series={sortedData.values || []}
//                             type="polarArea"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PolarAreaChart;


const PolarAreaChart = ({ categories = [], values = [] }) => {
    const [sortedData, setSortedData] = useState({ categories, values });
    const [legendPosition, setLegendPosition] = useState("right");
    const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);

    // Function to toggle legend position
    const toggleLegendPosition = () => {
        const positions = ["top", "bottom", "left", "right", "hide"];
        const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
        setLegendPosition(positions[newIndex]);
    };

    useEffect(() => {
        setChartKey((prev) => prev + 1); // Force re-render
    }, [legendPosition]);

    // Sorting Functions
    const handleSort = (order) => {
        const sorted = [...sortedData.categories]
            .map((category, index) => ({ category, value: sortedData.values[index] }))
            .sort((a, b) => (order === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)));

        setSortedData({
            categories: sorted.map((item) => item.category),
            values: sorted.map((item) => item.value),
        });
    };

    // Top & Bottom 10 Filters
    const handleTopBottom = (type) => {
        const sortedIndices = values
            .map((value, index) => ({ value, index }))
            .sort((a, b) => (type === "top" ? b.value - a.value : a.value - b.value))
            .slice(0, 10)
            .map((item) => item.index);

        setSortedData({
            categories: sortedIndices.map((index) => categories[index]),
            values: sortedIndices.map((index) => values[index]),
        });
    };

    const handleReset = () => setSortedData({ categories, values });

    const options = {
        chart: {
            type: "polarArea",
            toolbar: {
                show: true,
                
                tools: {
                    customIcons: [
                        // {
                        //     icon: "⇧",
                        //     title: "Sort Ascending",
                        //     class: "custom-sort-asc",
                        //     click: () => handleSort("asc"),
                        // },
                        // {
                        //     icon: "⇩",
                        //     title: "Sort Descending",
                        //     class: "custom-sort-desc",
                        //     click: () => handleSort("desc"),
                        // },
                        {
                            icon: "⏶",
                            title: "Top 10",
                            class: "custom-top-10",
                            click: () => handleTopBottom("top"),
                        },
                        {
                            icon: "⏷",
                            title: "Bottom 10",
                            class: "custom-bottom-10",
                            click: () => handleTopBottom("bottom"),
                        },
                        {
                            icon: "↺",
                            title: "Reset",
                            class: "custom-reset",
                            click: handleReset,
                        },
                        {
                            icon: "📍",
                            title: "Toggle Legend",
                            class: "custom-legend-toggle",
                            click: toggleLegendPosition,
                        },
                    ],
                    offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
                    offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
                },
            },
        },
        labels: sortedData.categories || [],
        legend: {
          show: legendPosition !== "hide",
          position: legendPosition, // Ensure it's not conflicting
          floating: true, // Prevent overlap
          horizontalAlign: "center", // Align properly
          offsetY: 10,
      },
      
        yaxis: {
            show: false,
            labels: { formatter: (value) => parseFloat(value).toFixed(2) },
        },
        plotOptions: {
            polarArea: {
                rings: { strokeWidth: 0 },
                spokes: { strokeWidth: 0 },
            },
        },
        dataLabels: {
            enabled: false,
            offsetY: -2,
            style: { fontSize: "12px" },
        },
        tooltip: {
          enabled: true,
          theme: "light",
          y: {
              formatter: (value) => value.toLocaleString(),
          },
          style: {
              fontSize: "12px",
          },
          fixed: {
              enabled: true,
              position: "topRight", // or "topLeft"
          },
      },
      
    };

  return (
    <div className="app">
      <div className="row">
        <div className="pie-chart" >
        <ResizableBox   style={{ paddingTop: '35px' }} width={500} height={500} minConstraints={[300, 300]} maxConstraints={[1000, 800]}>

            <div className="chart-title">{customHeadings}</div> {/* Added custom heading */}
            <Chart
              options={options}
            
                        series={sortedData.values || []}
                        type="polarArea"
              width="100%"
              height="90%"
            />
          </ResizableBox>
        </div>
      </div>


    </div>
  );
}
export default PolarAreaChart;

