// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { useDispatch, useSelector } from "react-redux";
// import '../charts/TextChart.css'; 
// import {updateSelectedCategory,updateChartData,setChartStatus,updateSelectedCategory_xaxis} from '../../features/ViewChartSlice/viewChartSlice';
// import "../charts/tooltip.css"; // Import the CSS for the tooltip
// import { sendClickedCategory } from "../../utils/api";
// import { ResizableBox } from 'react-resizable';
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';

// const AnimatedTreemap = ({ categories = [], values = [] ,chartColor, aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", otherChartCategories = [] }) => {
//     const svgRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [boxSize, setBoxSize] = useState({ width: 300, height: 300 });
//     const [showResetButton, setShowResetButton] = useState(false);
//     const dispatch = useDispatch();
//      const charts = useSelector((state) => state.viewcharts.charts);
//     const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality
//        const handleClicked = async (event, chartContext, config) => {
//           if (!isFilterActive) return;
//           const clickedCategoryIndex = config.dataPointIndex;
//           const clickedCategory = categories[clickedCategoryIndex];
//           try {
//             // Trigger the API call to send the clicked category
//             const response = await sendClickedCategory(clickedCategory,charts,x_axis);
//             console.log("chart_data_list:", response.chart_data_list)
//             response.chart_data_list.forEach((chartData) => {
//                 const { chart_id, data } = chartData;
//                 dispatch(updateChartData({
//                   chart_id,
//                   categories: data.categories,
//                   values: data.values,
//                   series1:data.series1,
//                   series2:data.series2,
//                 }));
//               });
//         } catch (error) {
//             console.error(`Failed to send category ${clickedCategory}:`, error);
//         }
//               // Set the selected category and show the reset button
//               dispatch(updateSelectedCategory(clickedCategory));
//               dispatch(updateSelectedCategory_xaxis(x_axis));
//               dispatch(setChartStatus(true));
//               setShowResetButton(true);
//           };
//         //   dispatch(updateSelectedCategory(clickedCategory));
         
//         // };
       
        
        
//           const handleReset = () => {
//             // Reset the selected category and hide the reset button
//             dispatch(updateSelectedCategory(null));
//             dispatch(setChartStatus(false));
//             setShowResetButton(false);
//         };
        
//         const handleFilterToggle = () => {
//             setIsFilterActive(prevState => !prevState); // Toggle the filter state
//         };
        
//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     useEffect(() => {
//         if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
//             return;
//         }

//         // Create data structure
//         const data = {
//             name: "root",
//             children: categories.map((category, index) => ({
//                 name: category,
//                 value: values[index] || 0
//             })).sort((a, b) => a.value - b.value) // Sort in ascending order
//         };

//         const { width, height } = boxSize;

//         const svg = d3.select(svgRef.current)
//             .attr("width", width)
//             .attr("height", height)
//             .style("font-family", "Arial")
//             .style("font-size", "12px");

//         const tooltip = d3.select(tooltipRef.current);

//         const treemapLayout = d3.treemap()
//             .size([width, height])
//             .padding(5);

//         const root = d3.hierarchy(data)
//             .sum(d => d.value);

//         treemapLayout(root);

//         svg.selectAll('g').remove();

//         const colorScale = d3.scaleSequential()
//             .domain([0, categories.length])
//             .interpolator(d3.interpolateLab(
//                 d3.rgb(chartColor).brighter(4),  
//                 chartColor
//             ));

//         const nodes = svg.selectAll("g")
//             .data(root.leaves())
//             .enter()
//             .append("g")
//             .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
//             .on("mouseover", function (event, d) {
//                 tooltip.style("display", "block")
//                     .style("opacity", 1)
//                     .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);

//                 d3.select(this).select('rect')
//                     .transition()
//                     .duration(200)
//                     .style("stroke", "blue")
//                     .style("stroke-width", 3)
//                     .style("fill-opacity", 1);
//             })
//             .on("mousemove", function (event) {
//                 const svgElement = svgRef.current.getBoundingClientRect(); // Get the SVG bounding box
//                 tooltip.style("left", `${event.clientX - svgElement.left + 10}px`)
//                        .style("top", `${event.clientY - svgElement.top + 10}px`);
//             })
//             .on("mouseout", function () {
//                 tooltip.style("display", "none");

//                 d3.select(this).select('rect')
//                     .transition()
//                     .duration(200)
//                     .style("stroke", "#fff") // Reset stroke to normal
//                     .style("stroke-width", 1) // Reset stroke width
//                     .style("fill-opacity", 0.8); // Reset opacity
//             });

//         // Animate the rectangles
//         nodes.append("rect")
//             .attr("width", d => d.x1 - d.x0) // Set the width based on the data
//             .attr("height", d => d.y1 - d.y0) // Set the height based on the data
//             .attr("fill", (d, i) => colorScale(i))
//             .attr("stroke", "#fff")
//             .attr("fill-opacity", 0.8)
//             .transition()
//             .duration(1000)
//             .attr("width", d => d.x1 - d.x0)
//             .attr("height", d => d.y1 - d.y0);

//         nodes.append("text")
//     .attr("x", 5)
//     .attr("y", 15)
//     .attr("fill", d => {
//         const bgColor = d3.rgb(colorScale(d.index));
//         const brightness = bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114;
//         return brightness > 110 ? "#000000" : "#FFFFFF";
//     })
//     .style("font-size", d => {
//         const availableWidth = d.x1 - d.x0;
//         const availableHeight = d.y1 - d.y0;
//         const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
//         return `${minFontSize}px`;
//     })
//     .each(function(d) {
//         // Split the text to make it fit within the box
//         const text = d3.select(this);
//         const words = `${d.data.name}: ${d.data.value}`.split(' ');
//         let word, line = [], lineNumber = 0, lineHeight = 1.1;
//         let y = text.attr("y");
//         let dy = 0;
//         const tspan = text.text(null).append("tspan").attr("x", 5).attr("y", y).attr("dy", `${dy}em`);

//         while (word = words.shift()) {
//             line.push(word);
//             tspan.text(line.join(" "));
//             if (tspan.node().getComputedTextLength() > d.x1 - d.x0 - 10) {
//                 line.pop();
//                 tspan.text(line.join(" "));
//                 line = [word];
//                 text.append("tspan")
//                     .attr("x", 5)
//                     .attr("y", y)
//                     .attr("dy", ++lineNumber * lineHeight + dy + "em")
//                     .text(word);
//             }
//         }
//     })
//     .transition()
//     .duration(4000)
//     .style("opacity", 1);

//     }, [categories, values, chartColor, boxSize]);

//     return (
//         <div>
//             <ResizableBox 
//                 width={boxSize.width} 
//                 height={boxSize.height} 
//                 minConstraints={[300, 300]} 
//                 maxConstraints={[800, 600]} 
//                 onResize={(event, { size }) => setBoxSize(size)}
//                 onContextMenu={handleContextMenu}
//             >
//                 <svg ref={svgRef}></svg>
//                 <div ref={tooltipRef} className="maptooltip" style={{ display: 'none', position: 'absolute', opacity: 0 }}></div>
//             </ResizableBox>
//             <button 
//                 onClick={handleFilterToggle} 
//                 style={{ 
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     padding: '8px', 
//                     borderRadius: '50%', 
//                     background: '#1976d2', 
//                     border: 'none', 
//                     color: '#fff', 
//                     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
//                     cursor: 'pointer',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = '#75ACE2'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = '#1976d2'}
//             >
//                 {isFilterActive ? 
//                     <FilterAltIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }} onClick={handleReset} /> : 
//                     <FilterAltOffIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }}  />} 
//             </button>
//         </div>
//     );
// };

// export default AnimatedTreemap;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import '../charts/TextChart.css'; 
import { ResizableBox } from 'react-resizable';
import {updateSelectedCategory,updateChartData,setChartStatus} from '../../features/ViewChartSlice/viewChartSlice';
import { sendClickedCategory} from '../../utils/api';


const AnimatedTreemap = ({ categories = [], values = [] ,chartColor, aggregation = "Aggregation", x_axis, y_axis="Y_axis", xFontSize="FontSize",fontStyle="fontStyle", categoryColor="categoryColor", yFontSize="yFontSize", valueColor="valueColor", otherChartCategories = [] }) => {
    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [boxSize, setBoxSize] = useState({ width: 300, height: 300 });
    const charts = useSelector((state) => state.viewcharts.charts);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    useEffect(() => {
        if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
            return;
        }

        // Create data structure
        const data = {
            name: "root",
            children: categories.map((category, index) => ({
                name: category,
                value: values[index] || 0
            })).sort((a, b) => a.value - b.value) // Sort in ascending order
        };

        const { width, height } = boxSize;
              const handleClicked = async (event, chartContext, config) => {
                // if (!isFilterActive) return;
                const clickedCategoryIndex = config.dataPointIndex;
                const clickedCategory = categories[clickedCategoryIndex];
                try {
                  // Trigger the API call to send the clicked category
                  const response = await sendClickedCategory(clickedCategory,charts,x_axis);
                  console.log("chart_data_list:", response.chart_data_list)
                  response.chart_data_list.forEach((chartData) => {
                      const { chart_id, data } = chartData;
                      dispatch(updateChartData({
                        chart_id,
                        categories: data.categories,
                        values: data.values,
                        series1:data.series1,
                        series2:data.series2,
                      }));
                    });
              } catch (error) {
                  console.error(`Failed to send category ${clickedCategory}:`, error);
              }
            
                dispatch(updateSelectedCategory(clickedCategory));
               
              };
             
 const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style('text-anchor', 'start')
        .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
        .style('font-family', fontStyle)
        .style('fill', categoryColor); // Dynamic color for x-axis
           


        const tooltip = d3.select(tooltipRef.current);

        const treemapLayout = d3.treemap()
            .size([width, height])
            .padding(5);

        const root = d3.hierarchy(data)
            .sum(d => d.value);

        treemapLayout(root);

        svg.selectAll('g').remove();

        const colorScale = d3.scaleSequential()
            .domain([0, categories.length])
            .interpolator(d3.interpolateLab(
                d3.rgb(chartColor).brighter(4),  
                chartColor
            ));

        // const nodes = svg.selectAll("g")
        //     .data(root.leaves())
        //     .enter()
        //     .append("g")
        //     .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
        //     .on("mouseover", function (event, d) {
        //         tooltip.style("display", "block")
        //             .style("opacity", 1)
        //             .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);

        //         d3.select(this).select('rect')
        //             .transition()
        //             .duration(200)
        //             .style("stroke", "blue")
        //             .style("stroke-width", 3)
        //             .style("fill-opacity", 1);
        //     })
        //     .on("mousemove", function (event) {
        //         const svgElement = svgRef.current.getBoundingClientRect(); // Get the SVG bounding box
        //         tooltip.style("left", `${event.clientX - svgElement.left + 10}px`)
        //                .style("top", `${event.clientY - svgElement.top + 10}px`);
        //     })
        //     .on("mouseout", function () {
        //         tooltip.style("display", "none");

        //         d3.select(this).select('rect')
        //             .transition()
        //             .duration(200)
        //             .style("stroke", "#fff") // Reset stroke to normal
        //             .style("stroke-width", 1) // Reset stroke width
        //             .style("fill-opacity", 0.8); // Reset opacity
        //     });
        const nodes = svg.selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
    .on("mouseover", function (event, d) {
        tooltip.style("display", "block")
            .style("opacity", 1)
            .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);

        d3.select(this).select('rect')
            .transition()
            .duration(200)
            .style("stroke", "blue")
            .style("stroke-width", 3)
            .style("fill-opacity", 1);
    })
    .on("mousemove", function (event) {
        const svgElement = svgRef.current.getBoundingClientRect(); // Get the SVG bounding box
        tooltip.style("left", `${event.clientX - svgElement.left + 10}px`)
               .style("top", `${event.clientY - svgElement.top + 10}px`);
    })
    .on("mouseout", function () {
        tooltip.style("display", "none");

        d3.select(this).select('rect')
            .transition()
            .duration(200)
            .style("stroke", "#fff") // Reset stroke to normal
            .style("stroke-width", 1) // Reset stroke width
            .style("fill-opacity", 0.8); // Reset opacity
    })
    // .on("click", function (event, d) {
    //     console.log(`Category clicked: ${d.data.name}`);
    // });
    .on("click", async function (event, d) {
        const clickedCategoryIndex = categories.findIndex(category => category === d.data.name);
        const clickedCategory = categories[clickedCategoryIndex];
    
        try {
            // Trigger the `handleClicked` function
            await handleClicked(event, null, {
                dataPointIndex: clickedCategoryIndex,
                categoryName: clickedCategory
            });
        } catch (error) {
            console.error(`Failed to handle click for category ${clickedCategory}:`, error);
        }
    });
    


// Continue with adding rect and text to nodes


        // Animate the rectangles
        nodes.append("rect")
            .attr("width", d => d.x1 - d.x0) // Set the width based on the data
            .attr("height", d => d.y1 - d.y0) // Set the height based on the data
            .attr("fill", (d, i) => colorScale(i))
            .attr("stroke", "#fff")
            .attr("fill-opacity", 0.8)
            .transition()
            .duration(1000)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0);

        nodes.append("text")
    .attr("x", 5)
    .attr("y", 15)
    .attr("fill", d => {
        const bgColor = d3.rgb(colorScale(d.index));
        const brightness = bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114;
        return brightness > 110 ? "#000000" : "#FFFFFF";
    })
    .style("font-size", d => {
        const availableWidth = d.x1 - d.x0;
        const availableHeight = d.y1 - d.y0;
        const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
        return `${minFontSize}px`;
    })
    .each(function(d) {
        // Split the text to make it fit within the box
        const text = d3.select(this);
        const words = `${d.data.name}: ${d.data.value}`.split(' ');
        let word, line = [], lineNumber = 0, lineHeight = 1.1;
        let y = text.attr("y");
        let dy = 0;
        const tspan = text.text(null).append("tspan").attr("x", 5).attr("y", y).attr("dy", `${dy}em`);

        while (word = words.shift()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > d.x1 - d.x0 - 10) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                text.append("tspan")
                    .attr("x", 5)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    })
    .transition()
    .duration(4000)
    .style("opacity", 1);

    }, [categories, values, chartColor, boxSize]);

    return (
        <div>
            <ResizableBox 
                width={boxSize.width} 
                height={boxSize.height} 
                minConstraints={[300, 300]} 
                maxConstraints={[800, 600]} 
                onResize={(event, { size }) => setBoxSize(size)}
                onContextMenu={handleContextMenu}
            >
                <svg ref={svgRef}></svg>
                <div ref={tooltipRef} className="maptooltip" style={{ display: 'none', position: 'absolute', opacity: 0 }}></div>
            </ResizableBox>
        </div>
    );
};

export default AnimatedTreemap;