// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { useSelector } from 'react-redux';
// import './TextChart.css'; 
// import { ResizableBox } from 'react-resizable';
// import "./tooltip.css";
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';
// const Treemap = ({ categories = [], values = [] }) => {
//     const svgRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const [sliderValue, setSliderValue] = useState(1);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [animationId, setAnimationId] = useState(null);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const chartColor = useSelector((state) => state.chartColor.chartColor);
//     const [boxSize, setBoxSize] = useState({ width: 500, height: 400 });
//     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
//     const [popupVisible, setPopupVisible] = useState(false);
//     const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//          const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//         const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//         const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//         const valueColor= useSelector((state) => state.toolTip.valueColor);
//     const handleSliderChange = (event) => {
//         setSliderValue(event.target.value);
//     };

   
//     const handlePlayPause = () => {
//         if (!isPlaying) {
//             setIsPlaying(true);
//             const id = setInterval(() => {
//                 setSliderValue((prevValue) => {
//                     if (prevValue >= 5) return 0.1;
//                     return parseFloat(prevValue) + 0.05;
//                 });
//             }, 4000);
//             setAnimationId(id);
//         } else {
//             setIsPlaying(false);
//             clearInterval(animationId);
//         }
//     };

//     useEffect(() => {
//         if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
//             return;
//         }

//         // Adjust values based on the slider
//         const adjustedValues = values.map(value => value * sliderValue);

//         // Create data structure
//         const data = {
//             name: "root",
//             children: categories.map((category, index) => ({
//                 name: category,
//                 value: adjustedValues[index] || 0
//             })).sort((a, b) => a.value - b.value) // Sort in ascending order
//         };

//         const { width, height } = boxSize;

//         const svg = d3.select(svgRef.current)
//             .attr("width", width)
//             .attr("height", height)
//             .style('text-anchor', 'start')
//         .style('font-size', `${xFontSize}px`) // Dynamic font size for x-axis
//         .style('font-family', fontStyle)
//         .style('fill', categoryColor); // Dynamic color for x-axis
           

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

//         // Add text labels
//         nodes.append("text")
//             .attr("x", 5)
//             .attr("y", 15)
//             .style('fill', categoryColor)
//             .style("font-size", d => {
//                 const availableWidth = d.x1 - d.x0;
//                 const availableHeight = d.y1 - d.y0;
//                 const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
//                 return `${minFontSize}px`;
//             })
//             .text(d => `${d.data.name}: ${d.data.value}`)
//             .style('font-family', fontStyle)
//             .transition()
//             .duration(4000)
//             .style("opacity", 1);

//     }, [categories, values, sliderValue, chartColor, boxSize,xFontSize,fontStyle,categoryColor]);

//     return (
//         <div>
            
//             <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
            
//             <ResizableBox 
            
//                 width={boxSize.width} 
//                 height={boxSize.height} 
//                 minConstraints={[300, 300]} 
//                 maxConstraints={[800, 600]} 
//                 onResize={(event, { size }) => setBoxSize(size)}
              
//             ><div>  
//             <label>Adjust Data with Scrubber: </label>
//             <input
//                 type="range"
//                 min="0.1"
//                 max="5"
//                 step="0.01"
//                 value={sliderValue}
//                 onChange={handleSliderChange}
//             />
//             <span>{sliderValue}</span>
//             <button onClick={handlePlayPause}>
//                 {isPlaying ? "Pause" : "Play"}
//             </button>
//         </div> 
//                 <svg ref={svgRef}></svg>
//                 <div ref={tooltipRef} className="maptooltip" style={{ display: 'none', position: 'absolute', opacity: 0 }}></div>
//             </ResizableBox>
//             {/* <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div> */}

//             {/* {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//             {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
//         </div>
//     );
// };

// export default Treemap;










import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import './TextChart.css'; 
import { ResizableBox } from 'react-resizable';
import './tooltip.css';
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip';
import { saveAs } from 'file-saver';
const Treemap = ({ categories = [], values = [],aggregation=[] }) => {
    console.log("Duel Axis Chart Props:", { categories, });
   const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    
    // States for slider, animation, and context menu
    const [sliderValue, setSliderValue] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationId, setAnimationId] = useState(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    
    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
    const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

    // Redux selectors for styling and tooltips
    const toolTipOptions = useSelector((state) => state.toolTip);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const chartColor = useSelector((state) => state.chartColor.chartColor);
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || '12');
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || 'Arial');
    const yFontSize = useSelector((state) => state.toolTip.fontSizeY || '12');
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor = useSelector((state) => state.toolTip.valueColor);
    
    const [boxSize, setBoxSize] = useState({ width: 500, height: 400 });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
     useEffect(() => {
            setSortedCategories(categories);
            setSortedValues(values);
        }, [categories, values]);
    // Toggle the menu visibility when the hamburger icon is clicked
    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
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
    // Handle slider change
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
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
    const handleSortAscending = () => {
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => a.value - b.value);
    
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };
    
    const handleSortDescending = () => {
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => b.value - a.value);
    
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };
    
    const handleTop10 = () => {
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        }));
        sortedData.sort((a, b) => b.value - a.value); // Sort descending
        const top10 = sortedData.slice(0, 10); // Get top 10
        setSortedCategories(top10.map(item => item.category));
        setSortedValues(top10.map(item => item.value));
        setIsFiltered(true); // Mark as filtered
    };
    
    const handleBottom10 = () => {
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        }));
        sortedData.sort((a, b) => a.value - b.value); // Sort ascending
        const bottom10 = sortedData.slice(0, 10); // Get bottom 10
        setSortedCategories(bottom10.map(item => item.category));
        setSortedValues(bottom10.map(item => item.value));
        setIsFiltered(true); // Mark as filtered
    };
    
    const handleReset = () => {
        setSortedCategories(categories);
        setSortedValues(values);
        setIsFiltered(false); // Reset the filtered state
    };
    

    // Play/Pause button logic
    const handlePlayPause = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            const id = setInterval(() => {
                setSliderValue(prevValue => prevValue >= 5 ? 0.1 : parseFloat(prevValue) + 0.05);
            }, 4000);
            setAnimationId(id);
        } else {
            setIsPlaying(false);
            clearInterval(animationId);
        }
    };

    useEffect(() => {
        if (!Array.isArray(sortedCategories) || !Array.isArray(sortedValues) || sortedCategories.length === 0 || sortedValues.length === 0) return;
    
        const adjustedValues = sortedValues.map(value => value * sliderValue);
    
        const data = {
            name: 'root',
            children: sortedCategories.map((category, index) => ({
                name: category,
                value: adjustedValues[index] || 0,
            })).sort((a, b) => a.value - b.value),
        };
    
        const { width, height } = boxSize;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('text-anchor', 'start')
            .style('font-size', `${xFontSize}px`)
            .style('font-family', fontStyle)
            .style('fill', categoryColor);
    
        const tooltip = d3.select(tooltipRef.current);
    
        const treemapLayout = d3.treemap().size([width, height]).padding(5);
        const root = d3.hierarchy(data).sum(d => d.value);
    
        treemapLayout(root);
    
        svg.selectAll('g').remove();
    
        const colorScale = d3.scaleSequential()
            .domain([0, sortedCategories.length])
            .interpolator(d3.interpolateLab(d3.rgb(chartColor).brighter(4), chartColor));
    
        // const nodes = svg.selectAll('g')
        //     .data(root.leaves())
        //     .enter()
        //     .append('g')
        //     .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
        //     .on('mouseover', function (event, d) {
        //         tooltip.style('display', 'block')
        //             .style('opacity', 1)
        //             .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);
    
        //         d3.select(this).select('rect')
        //             .transition()
        //             .duration(200)
        //             .style('stroke', 'blue')
        //             .style('stroke-width', 3)
        //             .style('fill-opacity', 1);
        //     })
        //     .on('mousemove', function (event) {
        //         const svgElement = svgRef.current.getBoundingClientRect();
        //         tooltip.style('left', `${event.clientX - svgElement.left + 10}px`)
        //             .style('top', `${event.clientY - svgElement.top + 10}px`);
        //     })
        //     .on('mouseout', function () {
        //         tooltip.style('display', 'none');
                
        //         d3.select(this).select('rect')
        //             .transition()
        //             .duration(200)
        //             .style('stroke', '#fff')
        //             .style('stroke-width', 1)
        //             .style('fill-opacity', 0.8);
        //     });
        const currentAggregation = aggregation || "Aggregation";
        const currentXAxis = xAxis?.[0] || "X-Axis";
        const currentYAxis = yAxis || "Y-Axis";
        const nodes = svg.selectAll('g')
        
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
        
        .on('mouseover', function (event, d) {
            tooltip.style('display', 'block')
                .style('opacity', 1)
                .html(`
                    <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                         ${
                    toolTipOptions.heading
                      ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                      : ""
                  }<div>
                            ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${d.data.name}</div>` : ''}
                            ${toolTipOptions.value ? `<div><strong>Value:</strong> ${d.data.value}</div>` : ''}
                        </div>
                    </div>
                `);

            d3.select(this).select('rect')
                .transition()
                .duration(200)
                .style('stroke', 'blue')
                .style('stroke-width', 3)
                .style('fill-opacity', 1);
        })
        .on('mousemove', function (event) {
            tooltip.style('left', `${event.pageX + 10}px`)
                   .style('top', `${event.pageY + 10}px`);
        })
        
        .on('mouseout', function () {
            tooltip.style('display', 'none');

            d3.select(this).select('rect')
                .transition()
                .duration(200)
                .style('stroke', '#fff')
                .style('stroke-width', 1)
                .style('fill-opacity', 0.8);
        });

        nodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', (d, i) => colorScale(i))
            .attr('stroke', '#fff')
            .attr('fill-opacity', 0.8)
            .transition()
            .duration(1000)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0);
    
        nodes.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .style('fill', categoryColor)
            .style('font-size', d => {
                const availableWidth = d.x1 - d.x0;
                const availableHeight = d.y1 - d.y0;
                const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
                return `${minFontSize}px`;
            })
            .text(d => `${d.data.name}: ${d.data.value}`)
            .style('font-family', fontStyle)
            .transition()
            .duration(4000)
            .style('opacity', 1);
    
    }, [sortedCategories, sortedValues, sliderValue, chartColor, boxSize, xFontSize, fontStyle, categoryColor,toolTipOptions]);
    
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
            icon: <button style={{ background: 'none', border: 'none', fontSize: '20px'  }}>☰</button>, 
            title: 'Download Options', 
            click: toggleMenuVisibility 
        }
    ];
    const onResize = (event, { size }) => {
        setBoxSize({ width: size.width, height: 500 });
    };
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
        <div>
            {renderToolbar()}
            <div className="chart-title">
                <h3 style={{ color: headingColor }}>{customHeadings}</h3>
            </div>

            <ResizableBox 
                width={boxSize.width} 
                height={boxSize.height} 
                minConstraints={[300, 300]} 
                maxConstraints={[800, 600]} 
                onResize={onResize}
            >
                <div>
                    <label>Adjust Data with Scrubber: </label>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.01"
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                    <span>{sliderValue}</span>
                    <button onClick={handlePlayPause}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
                <svg ref={svgRef}></svg>
                <div ref={tooltipRef} className="map-tooltip"></div>
            </ResizableBox>
        </div>
    );
};

export default Treemap;
