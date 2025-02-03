

// // import React, { useEffect, useRef, useState, useMemo } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import * as d3 from 'd3';
// // import { ResizableBox } from 'react-resizable';
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import './tooltip.css';
// // import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';
// // // import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
// // const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
// //     const dispatch = useDispatch();
// //     const lineColor = useSelector((state) => state.chartColor.chartColor);
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const databaseName = localStorage.getItem('company_name');
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser'));
// //     const svgRef = useRef(null);
// //     const tooltipRef = useRef(null);
// //     const [chartData, setChartData] = useState({ categories, values });
// //     const [drillStack, setDrillStack] = useState([]);
// //     const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 400 });
// //     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //       const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
// //          const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
// //         const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
// //         const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// //         const valueColor= useSelector((state) => state.toolTip.valueColor);
    
// //         const contextMenuRef = useRef(null);
// //     useEffect(() => {
// //         setChartData({ categories, values });
// //     }, [categories, values]);

    

// //     // const handleContextMenu = (event) => {
// //     //     event.preventDefault();
// //     //     setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //     //     setContextMenuVisible(true);
// //     // }

// //     // const handleClickOutside = (event) => {
// //     //     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //     //         setContextMenuVisible(false);
// //     //     }
// //     // };

// //     // const handleShowPopup = () => {
// //     //     setPopupVisible(true);
// //     //     setContextMenuVisible(false);
// //     // };

// //     // const handleClosePopup = () => {
// //     //     setPopupVisible(false);
// //     // };

// //     // useEffect(() => {
// //     //     document.addEventListener('click', handleClickOutside);
// //     //     return () => {
// //     //         document.removeEventListener('click', handleClickOutside);
// //     //     };
// //     // }, []);

// //     const handleClicked = async (event, clickedCategoryIndex) => {
// //         const clickedCategory = chartData.categories[clickedCategoryIndex];
// //         if (!clickedCategory) return;

// //         dispatch(setClickedCategory(clickedCategory));

// //         try {
// //             const responseData = await fetchHierarchialDrilldownDataAPI({
// //                 clickedCategory,
// //                 xAxis,
// //                 yAxis,
// //                 selectedTable,
// //                 aggregate,
// //                 databaseName,
// //                 currentLevel: drillStack.length,
// //                 selectedUser
// //             });

// //             if (responseData.categories?.length && responseData.values?.length) {
// //                 setDrillStack((prev) => [...prev, chartData]);
// //                 setChartData({ categories: responseData.categories, values: responseData.values });
// //             } else {
// //                 console.log("No further levels to drill down.");
// //             }
// //         } catch (error) {
// //             console.error('Error fetching drilldown data:', error);
// //         }
// //     };

// //     const handleDrillUp = () => {
// //         if (drillStack.length > 0) {
// //             const previousData = drillStack[drillStack.length - 1];
// //             setChartData(previousData);
// //             setDrillStack(drillStack.slice(0, -1));
// //         }
// //     };

// //     const sortedData = useMemo(() => {
// //         return chartData.categories.map((category, index) => ({
// //             category,
// //             value: chartData.values[index],
// //         })).sort((a, b) => b.value - a.value);
// //     }, [chartData]);

//     // // useEffect(() => {
//     // //     if (!chartData.categories.length || !chartData.values.length) return;

//     // //     const { width, height } = chartDimensions;
//     // //     const margin = { top: 50, right: 30, bottom: 20, left: 100 };
//     // //     const adjustedWidth = width - margin.left - margin.right;
//     // //     const adjustedHeight = height - margin.top - margin.bottom;

//     // //     const svg = d3.select(svgRef.current);
//     // //     svg.selectAll('*').remove();

//     // //     const x = d3.scaleLinear()
//     // //         .domain([0, d3.max(sortedData, (d) => d.value)])
//     // //         .range([0, adjustedWidth]);

//     // //     const y = d3.scaleBand()
//     // //         .domain(sortedData.map((d) => d.category))
//     // //         .range([0, adjustedHeight])
//     // //         .padding(0.1);

//     // //     const g = svg.append('g')
//     // //         .attr('transform', `translate(${margin.left},${margin.top})`);

//     // //     g.append('g')
//     // //         .call(d3.axisTop(x).ticks(5))
//     // //         .selectAll('text')
//     // //         .attr('transform', 'rotate(-45)')
//     // //         .style('text-anchor', 'start');

//     //     g.append('g')
//     //         .call(d3.axisLeft(y).tickSizeOuter(0));
//     //     // g.append('g')
//     //     // .call(d3.axisTop(x).ticks(5))
//     //     // .selectAll('text')
//     //     // .attr('transform', 'rotate(-45)')
//     //     // .style('text-anchor', 'start')
//     //     // .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
//     //     // .style('font-family', fontStyle)
//     //     // .style('fill', categoryColor); // Dynamic color for x-axis

//     // // Y Axis with dynamic styles
//     // g.append('g')
//     //     .call(d3.axisLeft(y).tickSizeOuter(0))
//     //     // .selectAll('text')
//     //     // .style('font-size', `${yFontSize}px`) // Dynamic font size for y-axis
//     //     // .style('fill', valueColor) // Dynamic color for y-axis
//     //     // .style('font-family', fontStyle)

// //     //     g.selectAll('rect')
// //     //         .data(sortedData, (d) => d.category)
// //     //         .join(
// //     //             (enter) =>
// //     //                 enter.append('rect')
// //     //                     .attr('y', (d) => y(d.category))
// //     //                     .attr('height', y.bandwidth())
// //     //                     .attr('fill', lineColor)
// //     //                     .attr('width', 0)
// //     //                     .transition()
// //     //                     .duration(750)
// //     //                     .attr('width', (d) => x(d.value)),
// //     //             (update) =>
// //     //                 update.transition()
// //     //                     .duration(750)
// //     //                     .attr('width', (d) => x(d.value)),
// //     //             (exit) => exit.remove()
// //     //         )
// //     //         .on('click', (event, d) => {
// //     //             const clickedCategoryIndex = sortedData.findIndex((item) => item.category === d.category);
// //     //             handleClicked(event, clickedCategoryIndex);
// //     //             event.stopPropagation();
// //     //         })
// //     //         .on('mouseover', (event, d) => {
// //     //             d3.select(tooltipRef.current)
// //     //                 .style('top', `${event.pageY - 20}px`)
// //     //                 .style('left', `${event.pageX + 20}px`)
// //     //                 .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
// //     //                 .attr('class', 'tooltiphierarchy visible');
// //     //         })
// //     //         .on('mousemove', (event) => {
// //     //             d3.select(tooltipRef.current)
// //     //                 .style('top', `${event.pageY - 205}px`)
// //     //                 .style('left', `${event.pageX - 248}px`);
// //     //         })
// //     //         .on('mouseout', () => {
// //     //             d3.select(tooltipRef.current).attr('class', 'tooltiphierarchy');
// //     //         });
            
// //     //     svg.on('click', (event) => {
// //     //         if (event.target.tagName !== 'rect') {
// //     //             handleDrillUp();
// //     //         }
// //     //     });
// //     // }, [sortedData, chartDimensions, lineColor,xFontSize, fontStyle, categoryColor, yFontSize, valueColor]);

// //     useEffect(() => {
// //         if (!chartData.categories.length || !chartData.values.length) return;
    
// //         const { width, height } = chartDimensions;
// //         const margin = { top: 50, right: 30, bottom: 20, left: 100 };
// //         const adjustedWidth = width - margin.left - margin.right;
// //         const adjustedHeight = height - margin.top - margin.bottom;
    
// //         const svg = d3.select(svgRef.current);
// //         svg.selectAll('*').remove();
    
// //         const x = d3.scaleLinear()
// //             .domain([0, d3.max(sortedData, (d) => d.value)])
// //             .range([0, adjustedWidth]);
    
// //         const y = d3.scaleBand()
// //             .domain(sortedData.map((d) => d.category))
// //             .range([0, adjustedHeight])
// //             .padding(0.1);
    
// //         const g = svg.append('g')
// //             .attr('transform', `translate(${margin.left},${margin.top})`);
    
// //         g.append('g')
// //             .call(d3.axisTop(x).ticks(5))
// //             .selectAll('text')
// //             .attr('transform', 'rotate(-45)')
// //             .style('text-anchor', 'start');
    
// //         g.append('g')
// //             .call(d3.axisLeft(y).tickSizeOuter(0));
    
// //         g.selectAll('rect')
// //             .data(sortedData, (d) => d.category)
// //             .join(
// //                 (enter) =>
// //                     enter.append('rect')
// //                         .attr('y', (d) => y(d.category))
// //                         .attr('height', y.bandwidth())
// //                         .attr('fill', lineColor)
// //                         .attr('width', 0)
// //                         .transition()
// //                         .duration(750)
// //                         .attr('width', (d) => x(d.value)),
// //                 (update) =>
// //                     update.transition()
// //                         .duration(750)
// //                         .attr('width', (d) => x(d.value)),
// //                 (exit) => exit.remove()
// //             )
// //             .on('click', (event, d) => {
// //                 const clickedCategoryIndex = sortedData.findIndex((item) => item.category === d.category);
// //                 handleClicked(event, clickedCategoryIndex);
// //                 event.stopPropagation();
// //             })
// //             .on('mouseover', (event, d) => {
// //                 d3.select(tooltipRef.current)
// //                     .style('top', `${event.pageY - 20}px`)
// //                     .style('left', `${event.pageX + 20}px`)
// //                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
// //                     .attr('class', 'tooltiphierarchy visible');
// //             })
// //             .on('mousemove', (event) => {
// //                 d3.select(tooltipRef.current)
// //                     .style('top', `${event.pageY - 205}px`)
// //                     .style('left', `${event.pageX - 248}px`);
// //             })
// //             .on('mouseout', () => {
// //                 d3.select(tooltipRef.current).attr('class', 'tooltiphierarchy');
// //             });
    
// //         // Add data labels to the bars
// //         g.selectAll('text.data-label')
// //             .data(sortedData, (d) => d.category)
// //             .join('text')
// //             .attr('class', 'data-label')
// //             .attr('x', (d) => x(d.value) - 5) // Position the label slightly inside the bar
// //             .attr('y', (d) => y(d.category) + y.bandwidth() / 2) // Center the label vertically
// //             .attr('dy', '.35em') // Vertically align the text
// //             .text((d) => d.value)
// //             .style('font-size', `${xFontSize}px`) // Dynamic font size
// //             .style('font-family', fontStyle) // Dynamic font style
// //             .style('fill', '#fff') // Set label color (make it white or adjust as needed)
// //             .style('text-anchor', 'end'); // Align the label to the end of the bar
    
// //         svg.on('click', (event) => {
// //             if (event.target.tagName !== 'rect') {
// //                 handleDrillUp();
// //             }
// //         });
// //     }, [sortedData, chartDimensions, lineColor, xFontSize, fontStyle, categoryColor, yFontSize, valueColor]);
    
// //     const onResize = (event, { size }) => {
// //         setChartDimensions({ width: size.width, height: size.height });
// //     };

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="d3-bar-chart">
// //                     <ResizableBox
// //                         width={chartDimensions.width}
// //                         height={chartDimensions.height}
// //                         minConstraints={[300, 300]}
// //                         maxConstraints={[1200, 800]}
// //                         onResize={onResize}
// //                         // onContextMenu={handleContextMenu}
// //                     ><div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
// //                         <svg ref={svgRef} width="100%" height="100 %" />
// //                         <div ref={tooltipRef} className="tooltip"></div>
// //                     </ResizableBox>
                    
// // {/* 
// //             {contextMenuVisible && (
// //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //             )}
// //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default D3HierarchialBarChart;



// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as d3 from 'd3';
// import { ResizableBox } from 'react-resizable';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import './tooltip.css';
// import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';

// const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const databaseName = localStorage.getItem('company_name');
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     // const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const selectedTable = localStorage.getItem("selectedTable");
//     const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//     const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//    const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//    const valueColor= useSelector((state) => state.toolTip.valueColor);
//     const svgRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const [chartData, setChartData] = useState({ categories, values });
//     const [drillStack, setDrillStack] = useState([]);
//     const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 500 });

//     useEffect(() => {
//         setChartData({ categories, values });
//     }, [categories, values]);

//     const handleClicked = async (event, clickedCategoryIndex) => {
//         const clickedCategory = chartData.categories[clickedCategoryIndex];
//         if (!clickedCategory) return;

//         dispatch(setClickedCategory(clickedCategory));

//         try {
//             const responseData = await fetchHierarchialDrilldownDataAPI({
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate,
//                 databaseName,
//                 currentLevel: drillStack.length,
//             });

//             if (responseData.categories?.length && responseData.values?.length) {
//                 setDrillStack((prev) => [...prev, chartData]);
//                 setChartData({ categories: responseData.categories, values: responseData.values });
//             } else {
//                 console.log("No further levels to drill down.");
//             }
//         } catch (error) {
//             console.error('Error fetching drilldown data:', error);
//         }
//     };

//     const handleDrillUp = () => {
//         if (drillStack.length > 0) {
//             const previousData = drillStack[drillStack.length - 1];
//             setChartData(previousData);
//             setDrillStack(drillStack.slice(0, -1));
//         }
//     };

//     const sortedData = useMemo(() => {
//         return chartData.categories.map((category, index) => ({
//             category,
//             value: chartData.values[index],
//         })).sort((a, b) => b.value - a.value);
//     }, [chartData]);

//     useEffect(() => {
//         if (!chartData.categories.length || !chartData.values.length) return;

//         const { width, height } = chartDimensions;
//         const margin = { top: 50, right: 30, bottom: 20, left: 100 };
//         const adjustedWidth = width - margin.left - margin.right;
//         const adjustedHeight = height - margin.top - margin.bottom;

//         const svg = d3.select(svgRef.current);
//         svg.selectAll('*').remove();

//         const x = d3.scaleLinear()
//             .domain([0, d3.max(sortedData, (d) => d.value)])
//             .range([0, adjustedWidth]);

//         const y = d3.scaleBand()
//             .domain(sortedData.map((d) => d.category))
//             .range([0, adjustedHeight])
//             .padding(0.1);

//         const g = svg.append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         // g.append('g')
//         //     .call(d3.axisTop(x).ticks(5))
//         //     .selectAll('text')
//         //     .attr('transform', 'rotate(-45)')
//         //     .style('text-anchor', 'start');

//         // g.append('g')
//         //     .call(d3.axisLeft(y).tickSizeOuter(0));
//         // g.append('g')
//         // .call(d3.axisLeft(y).tickSizeOuter(0));
//     g.append('g')
//     .call(d3.axisTop(x).ticks(5))
//     .selectAll('text')
//     .attr('transform', 'rotate(-45)')
//     .style('text-anchor', 'start')
//     .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
//     .style('font-family', fontStyle)
//     .style('fill', categoryColor); // Dynamic color for x-axis

// // Y Axis with dynamic styles
// g.append('g')
//     .call(d3.axisLeft(y).tickSizeOuter(0))
//     .selectAll('text')
//     .style('font-size', `${yFontSize}px`) // Dynamic font size for y-axis
//     .style('fill', valueColor) // Dynamic color for y-axis
//     .style('font-family', fontStyle)

//         g.selectAll('rect')
//             .data(sortedData, (d) => d.category)
//             .join(
//                 (enter) =>
//                     enter.append('rect')
//                         .attr('y', (d) => y(d.category))
//                         .attr('height', y.bandwidth())
//                         .attr('fill', lineColor)
//                         .attr('width', 0)
//                         .transition()
//                         .duration(750)
//                         .attr('width', (d) => x(d.value)),
//                 (update) =>
//                     update.transition()
//                         .duration(750)
//                         .attr('width', (d) => x(d.value)),
//                 (exit) => exit.remove()
//             )
//             .on('click', (event, d) => {
//                 const clickedCategoryIndex = sortedData.findIndex((item) => item.category === d.category);
//                 handleClicked(event, clickedCategoryIndex);
//                 event.stopPropagation();
//             })
//             .on('mouseover', (event, d) => {
//                 d3.select(tooltipRef.current)
//                     .style('top', `${event.pageY - 20}px`)
//                     .style('left', `${event.pageX + 20}px`)
//                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
//                     .attr('class', 'tooltiphierarchy visible');
//             })
//             .on('mousemove', (event) => {
//                 d3.select(tooltipRef.current)
//                     .style('top', `${event.pageY - 205}px`)
//                     .style('left', `${event.pageX - 248}px`);
//             })
//             .on('mouseout', () => {
//                 d3.select(tooltipRef.current).attr('class', 'tooltiphierarchy');
//             });

//         svg.on('click', (event) => {
//             if (event.target.tagName !== 'rect') {
//                 handleDrillUp();
//             }
//         });
      
//     }, [sortedData, chartDimensions, lineColor]);

//     const onResize = (event, { size }) => {
//         setChartDimensions({ width: size.width, height: size.height });
//     };

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="d3-bar-chart">
//                     <ResizableBox 
//                         width={chartDimensions.width}
//                         height={chartDimensions.height}
//                         minConstraints={[300, 300]}
//                         maxConstraints={[1200, 800]}
//                         onResize={onResize}
//                     >
//                         <svg ref={svgRef} width="100%" height="90%" />
//                         <div ref={tooltipRef} className="tooltip"></div>
//                     </ResizableBox>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default D3HierarchialBarChart;

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { ResizableBox } from 'react-resizable';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import './tooltip.css';
import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
import { saveAs } from 'file-saver';
const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
    const dispatch = useDispatch();
    const lineColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const databaseName = localStorage.getItem('company_name');
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = localStorage.getItem("selectedTable");
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
    const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor = useSelector((state) => state.toolTip.valueColor);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [chartData, setChartData] = useState({ categories, values });
    const [drillStack, setDrillStack] = useState([]);
    const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 500 });
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Toggle the menu visibility when the hamburger icon is clicked
    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
        console.log('Menu visibility:', !isMenuVisible);
    };
    
    const downloadSVG = () => {
        const svg = d3.select(svgRef.current);
        const svgData = new XMLSerializer().serializeToString(svg.node());
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'chart.svg');
    };
    
    // Function to download the chart as PNG
    const downloadPNG = () => {
        const svg = d3.select(svgRef.current).node();
        const svgString = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;
        
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = DOMURL.createObjectURL(svgBlob);
        
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const imgURI = canvas.toDataURL('image/png');
            const pngBlob = dataURItoBlob(imgURI);
            saveAs(pngBlob, 'chart.png');
        };
        img.src = url;
    };
    
    // Function to convert data URI to Blob (for PNG download)
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    }
    
    // Function to download chart data as CSV
    const downloadCSV = () => {
        const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'chart_data.csv');
    };
    const renderDownloadMenu = () => (
        <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
            <ul>
                <li><button onClick={downloadSVG}>Download as SVG</button></li>
                <li><button onClick={downloadPNG}>Download as PNG</button></li>
                <li><button onClick={downloadCSV}>Download as CSV</button></li>
            </ul>
        </div>
    );
    useEffect(() => {
        setChartData({ categories, values });
    }, [categories, values]);

    const handleClicked = async (event, clickedCategoryIndex) => {
        const clickedCategory = chartData.categories[clickedCategoryIndex];
        if (!clickedCategory) return;

        dispatch(setClickedCategory(clickedCategory));

        try {
            const responseData = await fetchHierarchialDrilldownDataAPI({
                clickedCategory,
                xAxis,
                yAxis,
                selectedTable,
                aggregate,
                databaseName,
                currentLevel: drillStack.length,
            });

            if (responseData.categories?.length && responseData.values?.length) {
                setDrillStack((prev) => [...prev, chartData]);
                setChartData({ categories: responseData.categories, values: responseData.values });
            } else {
                console.log("No further levels to drill down.");
            }
        } catch (error) {
            console.error('Error fetching drilldown data:', error);
        }
    };

    const handleDrillUp = () => {
        if (drillStack.length > 0) {
            const previousData = drillStack[drillStack.length - 1];
            setChartData(previousData);
            setDrillStack(drillStack.slice(0, -1));
        }
    };
//  // Function to handle ascending sort
//  const handleSortAscending = () => {
//     const sorted = [...sortedIndices.categories]
//         .map((category, index) => ({ category, value: sortedData.values[index] }))
//         .sort((a, b) => a.category.localeCompare(b.category));

//     setSortedData({
//         categories: sorted.map(item => item.category),
//         values: sorted.map(item => item.value)
//     });
// };

// // Function to handle descending sort
// const handleSortDescending = () => {
//     const sorted = [...sortedData.categories]
//         .map((category, index) => ({ category, value: sortedData.values[index] }))
//         .sort((a, b) => b.category.localeCompare(a.category));

//     setSortedData({
//         categories: sorted.map(item => item.category),
//         values: sorted.map(item => item.value)
//     });
// };

    const handleTop10 = () => {
        const sortedIndices = values
            .map((value, index) => ({ value, index }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
            .map(item => item.index);

        setChartData({
            categories: sortedIndices.map(index => categories[index]),
            values: sortedIndices.map(index => values[index]),
        });
    };

    const handleBottom10 = () => {
        const sortedIndices = values
            .map((value, index) => ({ value, index }))
            .sort((a, b) => a.value - b.value)
            .slice(0, 10)
            .map(item => item.index);

        setChartData({
            categories: sortedIndices.map(index => categories[index]),
            values: sortedIndices.map(index => values[index]),
        });
    };

    const handleReset = () => {
        setChartData({ categories, values });
    };

    const sortedData = useMemo(() => {
        return chartData.categories.map((category, index) => ({
            category,
            value: chartData.values[index],
        })).sort((a, b) => b.value - a.value);
    }, [chartData]);

    useEffect(() => {
        if (!chartData.categories.length || !chartData.values.length) return;

        const { width, height } = chartDimensions;
        const margin = { top: 50, right: 30, bottom: 20, left: 100 };
        const adjustedWidth = width - margin.left - margin.right;
        const adjustedHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const x = d3.scaleLinear()
            .domain([0, d3.max(sortedData, (d) => d.value)])
            .range([0, adjustedWidth]);

        const y = d3.scaleBand()
            .domain(sortedData.map((d) => d.category))
            .range([0, adjustedHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .call(d3.axisTop(x).ticks(5))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'start')
            .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
            .style('font-family', fontStyle)
            .style('fill', categoryColor); // Dynamic color for x-axis

        g.append('g')
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .selectAll('text')
            .style('font-size', `${yFontSize}px`) // Dynamic font size for y-axis
            .style('fill', valueColor) // Dynamic color for y-axis
            .style('font-family', fontStyle);

        g.selectAll('rect')
            .data(sortedData, (d) => d.category)
            .join(
                (enter) =>
                    enter.append('rect')
                        .attr('y', (d) => y(d.category))
                        .attr('height', y.bandwidth())
                        .attr('fill', lineColor)
                        .attr('width', 0)
                        .transition()
                        .duration(750)
                        .attr('width', (d) => x(d.value)),
                (update) =>
                    update.transition()
                        .duration(750)
                        .attr('width', (d) => x(d.value)),
                (exit) => exit.remove()
            )
            .on('click', (event, d) => {
                const clickedCategoryIndex = sortedData.findIndex((item) => item.category === d.category);
                handleClicked(event, clickedCategoryIndex);
                event.stopPropagation();
            })
            .on('mouseover', (event, d) => {
                d3.select(tooltipRef.current)
                    .style('top', `${event.pageY - 20}px`)
                    .style('left', `${event.pageX + 20}px`)
                    .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
                    .attr('class', 'tooltiphierarchy visible');
            })
            .on('mousemove', (event) => {
                d3.select(tooltipRef.current)
                    .style('top', `${event.pageY - 205}px`)
                    .style('left', `${event.pageX - 248}px`);
            })
            .on('mouseout', () => {
                d3.select(tooltipRef.current).attr('class', 'tooltiphierarchy');
            });

        svg.on('click', (event) => {
            if (event.target.tagName !== 'rect') {
                handleDrillUp();
            }
        });

    }, [sortedData, chartDimensions, lineColor]);

    const onResize = (event, { size }) => {
        setChartDimensions({ width: size.width, height: size.height });
    };

  
    const toolbarTools = [
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, 
            title: 'Show Top 10', 
            click: handleTop10, 
            iconColor: 'pink' 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, 
            title: 'Show Bottom 10', 
            click: handleBottom10 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '20px' }}>↺</button>, 
            title: 'Reset Chart', 
            click: handleReset 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', fontSize: '20px' }}>☰</button>, 
            title: 'Download Options', 
            click: toggleMenuVisibility 
        }
    ];
    
    const renderToolbar = () => (
        <div className="toolbar">
            {toolbarTools.map((tool, index) => (
                <button key={index} title={tool.title} onClick={tool.click}>
                    {tool.icon}
                </button>
            ))}
            {renderDownloadMenu()} {/* Add the download menu here */}
        </div>
    );
    
    return (
        <div className="app">
            <div className="row">
                {renderToolbar()}
                <div className="d3-bar-chart">
                    <ResizableBox
                        width={chartDimensions.width}
                        height={chartDimensions.height}
                        minConstraints={[300, 300]}
                        maxConstraints={[1200, 800]}
                        onResize={onResize}
                    >
                        <div className="chart-title">
                            <h3 style={{ color: headingColor }}>{customHeadings}</h3>
                        </div>
                        <svg ref={svgRef} width="100%" height="100%" />
                        <div ref={tooltipRef} className="tooltip"></div>
                    </ResizableBox>
                </div>
            </div>
        </div>
    );
};

export default D3HierarchialBarChart;
