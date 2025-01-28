// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as d3 from 'd3';
// import axios from 'axios';
// import { ResizableBox } from 'react-resizable';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import './tooltip.css';

// const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     // const databaseName = useSelector((state) => state.database.databaseName);
//     const databaseName = localStorage.getItem('company_name');
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const svgRef = useRef(null);
//     const [chartData, setChartData] = useState({ categories, values });
//     const [drillStack, setDrillStack] = useState([]);
//     const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });
//     const tooltipRef = useRef(null);
//     const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser'));
//     useEffect(() => {
//         // Update chartData whenever categories or values change
//         setChartData({ categories, values });
//     }, [categories, values]);

//     const handleClicked = async (event, clickedCategoryIndex) => {
//         const clickedCategory = chartData.categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         console.log("clicked Catagory",clickedCategory)

//         try {
//             const response = await axios.post('http://localhost:5000/Hierarchial-backend-endpoint', {
//                 category: clickedCategory,
//                 xAxis: xAxis,
//                 yAxis: yAxis,
//                 tableName: selectedTable,
//                 aggregation: aggregate,
//                 databaseName: databaseName,
//                 currentLevel: drillStack.length,
//                 selectedUser
//             });

//             if (response.data.categories && response.data.values) {
//                 setDrillStack([...drillStack, chartData]);
//                 setChartData({ categories: response.data.categories, values: response.data.values });
//             } else {
//                 console.log("No further levels to drill down.");
//             }
//         } catch (error) {
//             console.error('Error sending category to backend:', error);
//         }
//     };

//     const handleDrillUp = () => {
//         if (drillStack.length > 0) {
//             const previousData = drillStack[drillStack.length - 1];
//             setChartData(previousData);
//             setDrillStack(drillStack.slice(0, -1));
//         }
//     };

//     useEffect(() => {
//         if (!chartData.categories.length || !chartData.values.length) return;
    
//         const sortedData = chartData.categories
//             .map((category, index) => ({ category, value: chartData.values[index] }))
//             .sort((a, b) => b.value - a.value);
    
//         const sortedCategories = sortedData.map((d) => d.category);
//         const sortedValues = sortedData.map((d) => d.value);
    
//         const { width, height } = chartDimensions;
//         const margin = { top: 50, right: 30, bottom: 20, left: 100 };
//         const adjustedWidth = width - margin.left - margin.right;
//         const adjustedHeight = height - margin.top - margin.bottom;
    
//         const svg = d3.select(svgRef.current);
//         svg.selectAll('*').remove();
    
//         const x = d3.scaleLinear()
//             .domain([0, d3.max(sortedValues)])
//             .range([0, adjustedWidth]);
    
//         const y = d3.scaleBand()
//             .domain(sortedCategories)
//             .range([0, adjustedHeight])
//             .padding(0.1);
    
//         const g = svg.append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);
    
//         g.append('g')
//             .call(d3.axisTop(x).ticks(5))
//             .selectAll('text')
//             .attr('transform', 'rotate(-45)')
//             .style('text-anchor', 'start');
    
//         g.append('g')
//             .call(d3.axisLeft(y).tickSizeOuter(0));
    
//         g.selectAll('rect')
//             .data(sortedData)
//             .enter()
//             .append('rect')
//             .attr('y', (d) => y(d.category))
//             .attr('height', y.bandwidth())
//             .attr('fill', lineColor)
//             .attr('width', 0)
//             .transition()
//             .duration(750)
//             .attr('width', d => x(d.value))
//             .ease(d3.easeCubicInOut);
    
//         const tooltip = d3.select(tooltipRef.current);
    
//         g.selectAll('rect')
//             .on('click', (event, d) => {
//                 const clickedCategoryIndex = chartData.categories.indexOf(d.category);
//                 handleClicked(event, clickedCategoryIndex);
//             })
//             .on('mouseover', (event, d) => {
//                 tooltip
//                     .style('top', `${event.pageY}px`)
//                     .style('left', `${event.pageX}px`)
//                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
//                     .attr('class', 'tooltip visible');
//             })
//             .on('mousemove', (event) => {
//                 tooltip.style('top', `${event.pageY}px`).style('left', `${event.pageX}px`);
//             })
//             .on('mouseout', () => {
//                 tooltip.attr('class', 'tooltip');
//             });
    
//         // Click event to SVG to handle drilling up
//         svg.on("click", function(event) {
//             const clickedElement = event.target;
//             if (clickedElement.tagName !== 'rect') {
//                 handleDrillUp();
//             }
//         });
    
//     }, [chartData, lineColor, chartDimensions, xAxis, yAxis,aggregate]);  // Add xAxis and yAxis as dependencies
    

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
//                         <svg ref={svgRef} width="100%" height="100%" />
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
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip';
// import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
    const dispatch = useDispatch();
    const lineColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const databaseName = localStorage.getItem('company_name');
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser'));
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [chartData, setChartData] = useState({ categories, values });
    const [drillStack, setDrillStack] = useState([]);
    const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 400 });
    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
      const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
         const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
        const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
        const categoryColor = useSelector((state) => state.toolTip.categoryColor);
        const valueColor= useSelector((state) => state.toolTip.valueColor);
    
        const contextMenuRef = useRef(null);
    useEffect(() => {
        setChartData({ categories, values });
    }, [categories, values]);

    

    // const handleContextMenu = (event) => {
    //     event.preventDefault();
    //     setContextMenuPosition({ x: event.pageX, y: event.pageY });
    //     setContextMenuVisible(true);
    // }

    // const handleClickOutside = (event) => {
    //     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
    //         setContextMenuVisible(false);
    //     }
    // };

    // const handleShowPopup = () => {
    //     setPopupVisible(true);
    //     setContextMenuVisible(false);
    // };

    // const handleClosePopup = () => {
    //     setPopupVisible(false);
    // };

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

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
                selectedUser
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

        // g.append('g')
        //     .call(d3.axisTop(x).ticks(5))
        //     .selectAll('text')
        //     .attr('transform', 'rotate(-45)')
        //     .style('text-anchor', 'start');

        // g.append('g')
        //     .call(d3.axisLeft(y).tickSizeOuter(0));
        g.append('g')
        .call(d3.axisTop(x).ticks(5))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'start')
        .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
        .style('font-family', fontStyle)
        .style('fill', categoryColor); // Dynamic color for x-axis

    // Y Axis with dynamic styles
    g.append('g')
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .selectAll('text')
        .style('font-size', `${yFontSize}px`) // Dynamic font size for y-axis
        .style('fill', valueColor) // Dynamic color for y-axis
        .style('font-family', fontStyle)

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
    }, [sortedData, chartDimensions, lineColor,xFontSize, fontStyle, categoryColor, yFontSize, valueColor]);

    const onResize = (event, { size }) => {
        setChartDimensions({ width: size.width, height: size.height });
    };

    return (
        <div className="app">
            <div className="row">
                <div className="d3-bar-chart">
                    <ResizableBox
                        width={chartDimensions.width}
                        height={chartDimensions.height}
                        minConstraints={[300, 300]}
                        maxConstraints={[1200, 800]}
                        onResize={onResize}
                        // onContextMenu={handleContextMenu}
                    ><div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
                        <svg ref={svgRef} width="100%" height="1000 %" />
                        <div ref={tooltipRef} className="tooltip"></div>
                    </ResizableBox>
                    
{/* 
            {contextMenuVisible && (
                <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
            )}
            {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
                </div>
            </div>
        </div>
    );
};

export default D3HierarchialBarChart;

