// import React, { useEffect, useRef, useState } from 'react';
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
//     // const databaseName = useSelector((state) => state.database.databaseName);
//     const databaseName = localStorage.getItem('company_name');
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const svgRef = useRef(null);
//     const [chartData, setChartData] = useState({ categories, values });
//     const [drillStack, setDrillStack] = useState([]);
//     const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });
//     const tooltipRef = useRef(null);

//     useEffect(() => {
//         setChartData({ categories, values });
//     }, [categories, values]);


// const handleClicked = async (event, clickedCategoryIndex) => {
//     const clickedCategory = chartData.categories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     console.log("clicked Category:", clickedCategory);

//     try {
//         const responseData = await fetchHierarchialDrilldownDataAPI({
//             clickedCategory: clickedCategory,
//             xAxis: xAxis,
//             yAxis: yAxis,
//             selectedTable: selectedTable,
//             aggregate: aggregate,
//             databaseName: databaseName,
//             currentLevel: drillStack.length,
//         });

//         // Update chart data and drill stack if valid response is received
//         if (responseData.categories && responseData.values) {
//             setDrillStack([...drillStack, chartData]);
//             setChartData({ categories: responseData.categories, values: responseData.values });
//         } else {
//             console.log("No further levels to drill down.");
//         }
//     } catch (error) {
//         console.error('Failed to fetch drilldown data:', error);
//     }
// };

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
    
//         // g.selectAll('rect')
//         //     .on('click', (event, d) => {
//         //         const clickedCategoryIndex = chartData.categories.indexOf(d.category);
//         //         handleClicked(event, clickedCategoryIndex);
//         //     })
//         g.selectAll('rect')
//     .data(sortedData)
//     .join('rect')
//     .on('click', (event, d) => {
//         const clickedCategoryIndex = sortedCategories.indexOf(d.category); // Use sortedCategories
//         handleClicked(event, clickedCategoryIndex);
//         event.stopPropagation(); // Prevent the click from bubbling up to the SVG
//     })

//             .on('mouseover', (event, d) => {
//                 tooltip
//                     .style('top', `${event.pageY}px`)
//                     .style('left', `${event.pageX}px`)
//                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
//                     .attr('class', 'tooltiphierarchy visible');
//             })
//             .on('mousemove', (event) => {
//                 tooltip.style('top', `${event.pageY}px`).style('left', `${event.pageX}px`);
//             })
//             .on('mouseout', () => {
//                 tooltip.attr('class', 'tooltiphierarchy');
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

const D3HierarchialBarChart = ({ categories = [], values = [], aggregation }) => {
    const dispatch = useDispatch();
    const lineColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const databaseName = localStorage.getItem('company_name');
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);

    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [chartData, setChartData] = useState({ categories, values });
    const [drillStack, setDrillStack] = useState([]);
    const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

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
            .style('text-anchor', 'start');

        g.append('g')
            .call(d3.axisLeft(y).tickSizeOuter(0));

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
                    >
                        <svg ref={svgRef} width="100%" height="100%" />
                        <div ref={tooltipRef} className="tooltip"></div>
                    </ResizableBox>
                </div>
            </div>
        </div>
    );
};

export default D3HierarchialBarChart;




// import React, { useEffect, useRef, useState } from 'react';
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
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const svgRef = useRef(null);
//     const [chartData, setChartData] = useState({ categories, values });
//     const [drillStack, setDrillStack] = useState([]);
//     const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });
//     const tooltipRef = useRef(null);

//     useEffect(() => {
//         setChartData({ categories, values });
//     }, [categories, values]);

//     const handleClicked = async (event, clickedCategoryIndex) => {
//         const clickedCategory = chartData.categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         console.log("clicked Category:", clickedCategory);

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

//             if (responseData.categories && responseData.values) {
//                 setDrillStack([...drillStack, chartData]);
//                 setChartData({ categories: responseData.categories, values: responseData.values });
//             } else {
//                 console.log("No further levels to drill down.");
//             }
//         } catch (error) {
//             console.error('Failed to fetch drilldown data:', error);
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
//         const margin = { top: 50, right: 30, bottom: 50, left: 100 };
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
//             .attr('transform', `translate(0, 0)`);

//         g.append('text')
//             .attr('x', adjustedWidth / 2)
//             .attr('y', -margin.top / 2)
//             .attr('text-anchor', 'middle')
//             .text(yAxis)
//             .attr('class', 'axis-label');

//         g.append('g')
//             .call(d3.axisLeft(y).tickSizeOuter(0));

//         g.append('text')
//             .attr('x', -adjustedHeight / 2)
//             .attr('y', -margin.left / 1.5)
//             .attr('transform', 'rotate(-90)')
//             .attr('text-anchor', 'middle')
           
//             // .text(xAxis)
//             .attr('class', 'axis-label');

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
//         .on('mouseover', (event, d) => {
//             tooltip
//                 .style('top', `${event.clientY - 30}px`) // Adjust position relative to viewport
//                 .style('left', `${event.clientX + 15}px`) // Adjust position to the right of the mouse
//                 .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
//                 .attr('class', 'tooltiphierarchy visible');
//         })
//         .on('mousemove', (event) => {
//             tooltip
//                 .style('top', `${event.clientY - 30}px`) // Consistent vertical offset
//                 .style('left', `${event.clientX + 15}px`); // Consistent horizontal offset
//         })
//         .on('mouseout', () => {
//             tooltip.attr('class', 'tooltiphierarchy'); // Hide tooltip
//         });
    
    

//         svg.on("click", function(event) {
//             const clickedElement = event.target;
//             if (clickedElement.tagName !== 'rect') {
//                 handleDrillUp();
//             }
//         });

//     }, [chartData, lineColor, chartDimensions, xAxis, yAxis, aggregate]);

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
