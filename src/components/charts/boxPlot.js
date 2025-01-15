
// // import React, { useEffect, useRef } from 'react';
// // import * as d3 from 'd3';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';

// // const BoxPlot = (categories, values) => {
// //     const svgRef = useRef(null);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const xAxis = useSelector((state) => state.chart.xAxis); 
// //     const databaseName = localStorage.getItem('company_name');
// //     const chartColor = useSelector((state) => state.chartColor.chartColor);

// //   const selectedUser=localStorage.getItem('selectedUser');
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await axios.post('http://localhost:5000/boxplot-data', {
// //                     category: xAxis,
// //                     yAxis: yAxis,
// //                     tableName: selectedTable,
// //                     databaseName: databaseName,
// //                     selectedUser:selectedUser
// //                 });
                
// //                 if (Array.isArray(response.data)) {
// //                     renderBoxPlot(response.data);
// //                 } else {
// //                     console.error('Invalid box plot data:', response.data);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching box plot data:', error);
// //             }
// //         };

// //         fetchData();
// //     }, [xAxis, yAxis, selectedTable, chartColor]);

// //     const renderBoxPlot = (data) => {
// //         const svg = d3.select(svgRef.current);
// //         svg.selectAll('*').remove(); // Clear previous render

// //         const width = 800;
// //         const height = 600;
// //         const margin = { top: 20, right: 40, bottom: 160, left: 70 };

// //         // Extract values from JSON strings for x-axis display
// //         const categories = data.map(d => Object.values(d.category)[0]);

// //         const x = d3.scaleBand()
// //             .domain(categories)
// //             .range([margin.left, width - margin.right])
// //             .padding(0.4);

// //         const y = d3.scaleLinear()
// //             .domain([
// //                 d3.min(data, d => d.min) * 0.9,
// //                 d3.max(data, d => d.max) * 1.1
// //             ])
// //             .range([height - margin.bottom, margin.top]);

// //         const tooltip = d3.select("body").append("div")
// //             .style("position", "absolute")
// //             .style("background-color", "#f9f9f9")
// //             .style("border", "1px solid #ccc")
// //             .style("padding", "8px")
// //             .style("border-radius", "4px")
// //             .style("display", "none")
// //             .style("pointer-events", "none");

// //         const plotGroup = svg.append("g");

// //         data.forEach((d) => {
// //             const categoryValue = Object.values(d.category)[0];
// //             const tooltipContent = `
// //                 <strong>Category:</strong> ${categoryValue}<br/>
// //                 <strong>Min:</strong> ${d.min}<br/>
// //                 <strong>Q1:</strong> ${d.Q1}<br/>
// //                 <strong>Median:</strong> ${d.median}<br/>
// //                 <strong>Q3:</strong> ${d.Q3}<br/>
// //                 <strong>Max:</strong> ${d.max}
// //             `;

// //             plotGroup.append("line")
// //                 .attr("x1", x(categoryValue) + x.bandwidth() / 2)
// //                 .attr("x2", x(categoryValue) + x.bandwidth() / 2)
// //                 .attr("y1", y(d.min))
// //                 .attr("y2", y(d.max))
// //                 .attr("stroke", "#333")
// //                 .on("mouseover", () => showTooltip(tooltipContent))
// //                 .on("mousemove", moveTooltip)
// //                 .on("mouseout", hideTooltip);

// //             plotGroup.append("rect")
// //                 .attr("x", x(categoryValue))
// //                 .attr("width", x.bandwidth())
// //                 .attr("y", y(d.Q3))
// //                 .attr("height", y(d.Q1) - y(d.Q3))
// //                 .attr("fill", chartColor)
// //                 .attr("stroke", "#000")
// //                 .on("mouseover", () => showTooltip(tooltipContent))
// //                 .on("mousemove", moveTooltip)
// //                 .on("mouseout", hideTooltip);

// //             plotGroup.append("line")
// //                 .attr("x1", x(categoryValue))
// //                 .attr("x2", x(categoryValue) + x.bandwidth())
// //                 .attr("y1", y(d.median))
// //                 .attr("y2", y(d.median))
// //                 .attr("stroke", "#000")
// //                 .on("mouseover", () => showTooltip(tooltipContent))
// //                 .on("mousemove", moveTooltip)
// //                 .on("mouseout", hideTooltip);
// //         });

// //         svg.append("g")
// //             .attr("transform", `translate(${margin.left},0)`)
// //             .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")))
// //             .selectAll('text')
// //             .style('font-size', '12px')
// //             .style('fill', '#333');

// //         svg.append("g")
// //             .attr("transform", `translate(0,${height - margin.bottom})`)
// //             .call(d3.axisBottom(x).tickSizeOuter(0))
// //             .selectAll("text")
// //             .style('fill', '#000')
// //             .style('font-size', '10px')
// //             .style("text-anchor", "end")
// //             .attr("transform", "rotate(-30)") // Rotate labels to -30 degrees for readability
// //             .on("mouseover", function(event, d) {
// //                 tooltip.style("display", "block").html(d);
// //             })
// //             .on("mousemove", function(event) {
// //                 tooltip.style("left", `${event.pageX + 10}px`)
// //                        .style("top", `${event.pageY + 10}px`);
// //             })
// //             .on("mouseout", function() {
// //                 tooltip.style("display", "none");
// //             });

// //         svg.append("text")
// //             .attr("x", width / 2)
// //             .attr("y", height - 40)
// //             .attr("text-anchor", "middle")
// //             .text("Categories")
// //             .style('fill', '#000')
// //             .style('font-size', '16px');

// //         svg.append("text")
// //             .attr("transform", "rotate(-90)")
// //             .attr("y", margin.left - 50)
// //             .attr("x", -(height / 2))
// //             .attr("text-anchor", "middle")
// //             .text("Values")
// //             .style('fill', '#000')
// //             .style('font-size', '16px');

// //         function showTooltip(content) {
// //             tooltip.style("display", "block").html(content);
// //         }

// //         function moveTooltip(event) {
// //             tooltip.style("left", `${event.pageX + 10}px`)
// //                    .style("top", `${event.pageY + 10}px`);
// //         }

// //         function hideTooltip() {
// //             tooltip.style("display", "none");
// //         }
// //     };

// //     return (
// //         <svg ref={svgRef} width={800} height={500} />
// //     );
// // };

// // export default BoxPlot;

// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const ApexBoxPlot = ({ categories, values, aggregation }) => {
//   const [series, setSeries] = useState([]);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const databaseName = localStorage.getItem("company_name");
//   const chartColor = useSelector((state) => state.chartColor.chartColor);
//   const selectedUser = localStorage.getItem("selectedUser");
//   const filterOptions=localStorage.getItem("filterOptions")
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/boxplot-data", {
//           category: xAxis,
//           yAxis: yAxis,
//           tableName: selectedTable,
//           databaseName: databaseName,
//           selectedUser: selectedUser,
//           filterOptions:filterOptions
//         });

//         if (Array.isArray(response.data)) {
//           const formattedData = response.data.map((d) => ({
//             x: Object.values(d.category)[0], // x-axis (category name)
//             y: [d.min, d.Q1, d.median, d.Q3, d.max], // Box plot values
//           }));
//           setSeries([{ name: "BoxPlot", data: formattedData }]);
//         } else {
//           console.error("Invalid box plot data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching box plot data:", error);
//       }
//     };

//     fetchData();
//   }, [xAxis, yAxis, selectedTable, chartColor]);

//   const chartOptions = {
//     chart: {
//       type: "boxPlot",
//       height: 500,
//       toolbar: {
//         show: true,
//       },
//     },
//     colors: [chartColor],
//     title: {
//       text: "Box Plot",
//       align: "center",
//       style: {
//         fontSize: "16px",
//       },
//     },
//     xaxis: {
//       type: "category",
//       title: {
//         text: "Categories",
//         style: {
//           fontSize: "14px",
//         },
//       },
//       labels: {
//         rotate: -30,
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Values",
//         style: {
//           fontSize: "14px",
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       custom: ({ series, seriesIndex, dataPointIndex, w }) => {
//         const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
//         return `
//           <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
//             <strong>Category:</strong> ${data.x}<br/>
//             <strong>Min:</strong> ${data.y[0]}<br/>
//             <strong>Q1:</strong> ${data.y[1]}<br/>
//             <strong>Median:</strong> ${data.y[2]}<br/>
//             <strong>Q3:</strong> ${data.y[3]}<br/>
//             <strong>Max:</strong> ${data.y[4]}
//           </div>`;
//       },
//     },
//   };

//   return (
//     <div>
//       <Chart options={chartOptions} series={series} type="boxPlot" height={500} />
//     </div>
//   );
// };

// // export default ApexBoxPlot;
// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const ApexBoxPlot = () => {
//   const [series, setSeries] = useState([]);
//   const [filterOptions, setFilterOptions] = useState(
//     JSON.parse(localStorage.getItem("filterOptions") || "[]")
//   );

//   // Redux selectors
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const chartColor = useSelector((state) => state.chartColor.chartColor);

//   // LocalStorage values
//   const databaseName = localStorage.getItem("company_name");
//   const selectedUser = localStorage.getItem("selectedUser");

//   // Update filterOptions when localStorage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const updatedFilterOptions = JSON.parse(
//         localStorage.getItem("filterOptions") || "[]"
//       );
//       setFilterOptions(updatedFilterOptions);
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // Fetch box plot data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/boxplot-data", {
//           category: xAxis,
//           yAxis: yAxis,
//           tableName: selectedTable,
//           databaseName: databaseName,
//           selectedUser: selectedUser,
//           filterOptions: filterOptions,
//         });

//         if (Array.isArray(response.data)) {
//           const formattedData = response.data.map((d) => ({
//             x: Object.values(d.category)[0], // x-axis (category name)
//             y: [d.min, d.Q1, d.median, d.Q3, d.max], // Box plot values
//           }));
//           setSeries([{ name: "BoxPlot", data: formattedData }]);
//         } else {
//           console.error("Invalid box plot data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching box plot data:", error);
//       }
//     };

//     fetchData();
//   }, [xAxis, yAxis, selectedTable, chartColor, filterOptions]);

//   const chartOptions = {
//     chart: {
//       type: "boxPlot",
//       height: 500,
//       toolbar: {
//         show: true,
//       },
//     },
//     colors: [chartColor],
//     title: {
//       text: "Box Plot",
//       align: "center",
//       style: {
//         fontSize: "16px",
//       },
//     },
//     xaxis: {
//       type: "category",
//       title: {
//         text: "Categories",
//         style: {
//           fontSize: "14px",
//         },
//       },
//       labels: {
//         rotate: -30,
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Values",
//         style: {
//           fontSize: "14px",
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       custom: ({ series, seriesIndex, dataPointIndex, w }) => {
//         const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
//         return `
//           <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
//             <strong>Category:</strong> ${data.x}<br/>
//             <strong>Min:</strong> ${data.y[0]}<br/>
//             <strong>Q1:</strong> ${data.y[1]}<br/>
//             <strong>Median:</strong> ${data.y[2]}<br/>
//             <strong>Q3:</strong> ${data.y[3]}<br/>
//             <strong>Max:</strong> ${data.y[4]}
//           </div>`;
//       },
//     },
//   };

//   return (
//     <div>
//       <Chart options={chartOptions} series={series} type="boxPlot" height={500} />
//     </div>
//   );
// };

// export default ApexBoxPlot;
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useSelector } from "react-redux";

const ApexBoxPlot = () => {
  const [series, setSeries] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    JSON.parse(localStorage.getItem("filterOptions") || "[]")
  );

  // Redux selectors
  const yAxis = useSelector((state) => state.chart.yAxis);
  const xAxis = useSelector((state) => state.chart.xAxis);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const chartColor = useSelector((state) => state.chartColor.chartColor);
  const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

  // LocalStorage values
  const databaseName = localStorage.getItem("company_name");
  const selectedUser = localStorage.getItem("selectedUser");

  // Update filterOptions when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFilterOptions = JSON.parse(
        localStorage.getItem("filterOptions") || "[]"
      );
      setFilterOptions(updatedFilterOptions);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch box plot data whenever `filterOptions`, `xAxis`, `yAxis`, or `selectedTable` change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/boxplot-data", {
          category: xAxis,
          yAxis: yAxis,
          tableName: selectedTable,
          databaseName: databaseName,
          selectedUser: selectedUser,
          filterOptions: filterOptions,
        });

        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((d) => ({
            x: Object.values(d.category)[0], // x-axis (category name)
            y: [d.min, d.Q1, d.median, d.Q3, d.max], // Box plot values
          }));
          setSeries([{ name: "BoxPlot", data: formattedData }]);
        } else {
          console.error("Invalid box plot data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching box plot data:", error);
      }
    };

    if (filterOptions.length > 0) {
      fetchData();
    }
  }, [xAxis, yAxis, selectedTable, chartColor, filterOptions]); // Ensure the fetch is triggered when any of these change

  const chartOptions = {
    chart: {
      type: "boxPlot",
      height: 500,
      toolbar: {
        show: true,
      },
    },
    colors: [chartColor],
    title: {
      text: "Box Plot",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Categories",
        style: {
          fontSize: "14px",
        },
      },
      labels: {
        rotate: -30,
      },
    },
    yaxis: {
      title: {
        text: "Values",
        style: {
          fontSize: "14px",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `
          <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
            <strong>Category:</strong> ${data.x}<br/>
            <strong>Min:</strong> ${data.y[0]}<br/>
            <strong>Q1:</strong> ${data.y[1]}<br/>
            <strong>Median:</strong> ${data.y[2]}<br/>
            <strong>Q3:</strong> ${data.y[3]}<br/>
            <strong>Max:</strong> ${data.y[4]}
          </div>`;
      },
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={series} type="boxPlot" height={500} />
    </div>
  );
};

export default ApexBoxPlot;
