import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import d3Cloud from 'd3-cloud';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import '../charts/WordCloud.css';

// const WordCloud = () => {
//     const dispatch = useDispatch();
//     const areaColor = useSelector((state) => state.chartColor.chartColor);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const databaseName = localStorage.getItem('company_name');
    
//     const chartRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const [wordCloudData, setWordCloudData] = useState({ categories: [], values: [] });
//     const [displayCount, setDisplayCount] = useState(10);
//     const [isFilterActive, setIsFilterActive] = useState(false);

//     const chartDimensions = { width: 500, height: 500 };

//     useEffect(() => {
//         const fetchWordCloudData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/plot_chart', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         category: xAxis,
//                         tableName: selectedTable,
//                         databaseName: databaseName,
//                     }),
//                 });
//                 const data = await response.json();
//                 setWordCloudData(data);
//             } catch (error) {
//                 console.error('Error fetching word cloud data:', error);
//             }
//         };
//         fetchWordCloudData();
//     }, [xAxis, selectedTable, databaseName]);

//     useEffect(() => {
//         if (wordCloudData.categories.length > 0 && wordCloudData.values.length > 0) {
//             drawChart();
//         }
//     }, [wordCloudData, areaColor, displayCount]);

//     const getFilteredData = () => {
//         const words = wordCloudData.categories.map((category, index) => ({
//             text: category,
//             size: wordCloudData.values[index],
//         }));
//         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
//     };

//     const drawChart = () => {
//         d3.select(chartRef.current).select("svg").remove();
//         const { width, height } = chartDimensions;

//         const svg = d3.select(chartRef.current)
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append("g")
//             .attr("transform", `translate(${width / 2},${height / 2})`);

//         const words = getFilteredData();
//         const fontSizeScale = d3.scaleLinear()
//             .domain([Math.min(...wordCloudData.values), Math.max(...wordCloudData.values)])
//             .range([10, 60]);

//         const layout = d3Cloud()
//             .size([width, height])
//             .words(words)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.7 ? 0 : 90))
//             .fontSize(d => fontSizeScale(d.size))
//             .spiral("archimedean")
//             .on("end", renderWords);

//         layout.start();

//         function renderWords(words) {
//             const textElements = svg.selectAll("text")
//                 .data(words)
//                 .enter()
//                 .append("text")
//                 .style("font-size", d => `${d.size}px`)
//                 .style("font-family", "Impact")
//                 .attr("fill", () => areaColor || d3.schemeCategory10[Math.floor(Math.random() * 10)])
//                 .attr("text-anchor", "middle")
//                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
//                 .text(d => d.text)
//                 .on("mouseover", (event, d) => {
//                     d3.select(tooltipRef.current)
//                         .style("opacity", 1)
//                         .html(`Word: ${d.text}<br>Size: ${d.size}`)
//                         .style("left", (event.pageX + 5) + "px")
//                         .style("top", (event.pageY - 28) + "px");
//                 })
//                 .on("mouseout", () => {
//                     d3.select(tooltipRef.current).style("opacity", 0);
//                 });
//         }
//     };

//     const handleSliderChange = (event) => {
//         setDisplayCount(Number(event.target.value));
//     };

//     const toggleFilter = () => {
//         setIsFilterActive(!isFilterActive);
//         // Dispatch action to apply filter to word cloud data if needed
//     };

//     return (
//         <ResizableBox width={chartDimensions.width} height={chartDimensions.height} className="word-cloud-resizable">
//             <div className="centered-container">
//                 <div className="word-cloud" ref={chartRef} style={{ width: '100%', height: '100%' }} />
//                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
//                 <div className="filter-options">
//                     <label>
//                         Display Mode (Top N Words):
//                         <input
//                             type="range"
//                             min="1"
//                             max={wordCloudData.categories.length}
//                             value={displayCount}
//                             onChange={handleSliderChange}
//                         />
//                         <span>{displayCount}</span>
//                     </label>
//                     <button onClick={toggleFilter}>
//                         {isFilterActive ? <FilterAltOffIcon /> : <FilterAltIcon />} Filter
//                     </button>
//                 </div>
//             </div>
//         </ResizableBox>
//     );
// };

// export default WordCloud;

// const WordCloud = ({ categories = [], values = [] }) => {
//     const wordCloudRef = useRef(null); // Reference to the SVG container
//     const [wordData, setWordData] = useState([]);
//     const [displayCount, setDisplayCount] = useState(10);

//     // Tooltip div
//     const tooltipRef = useRef(null); 
     
//     useEffect(() => {
//         if (categories && values) {
//             // Combine categories and values into a single dataset for word cloud
//             const combinedData = categories.map((text, index) => ({
//                 text,
//                 size: values[index],
//             }));

//             // Sort and slice to display the top N words
//             const filteredData = combinedData
//                 .sort((a, b) => b.size - a.size)
//                 .slice(0, displayCount);

//             setWordData(filteredData);
//             console.log("filteredData", filteredData);
//         }
//     }, [categories, values, displayCount]);

//     useEffect(() => {
//         if (wordData.length > 0) {
//             drawWordCloud();
//         }
//     }, [wordData]);

//     const drawWordCloud = () => {
//         const { width, height } = { width: 400, height: 400 }; // Dimensions of the word cloud
//         const svg = d3.select(wordCloudRef.current);
//         svg.selectAll("*").remove(); // Clear existing content

//         const fontSizeScale = d3
//             .scaleLinear()
//             .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
//             .range([10, 50]); // Font size range

//         const layout = d3Cloud()
//             .size([width, height])
//             .words(wordData)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Random rotation
//             .fontSize((d) => fontSizeScale(d.size))
//             .on("end", (words) => {
//                 svg.append("g")
//                     .attr("transform", `translate(${width / 2}, ${height / 2})`)
//                     .selectAll("text")
//                     .data(words)
//                     .enter()
//                     .append("text")
//                     .style("font-size", (d) => `${d.size}px`)
//                     .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
//                     .attr("text-anchor", "middle")
//                     .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
//                     .text((d) => d.text)
//                     .on("mouseover", (event, d) => {
//                         d3.select(event.target)
//                             .style("cursor", "pointer")
//                             .style("opacity", 0.7); // Add visual effect on hover
//                         // Show the tooltip with word information
//                         tooltipRef.current.style("visibility", "visible")
//                             .text(`Word: ${d.text}, Frequency: ${d.size}`)
//                             .style("left", `${event.pageX + 10}px`) // Offset to avoid overlap
//                             .style("top", `${event.pageY + 10}px`);
//                     })
//                     .on("mouseout", (event) => {
//                         d3.select(event.target)
//                             .style("cursor", "default")
//                             .style("opacity", 1); // Reset visual effect
//                         tooltipRef.current.style("visibility", "hidden"); // Hide tooltip on mouseout
//                     });
//             });

//         layout.start();
//     };

//     const handleSliderChange = (event) => {
//         setDisplayCount(Number(event.target.value));
//     };

//     return (
//         <div className="word-cloud-container">
//             <ResizableBox width={400} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
//                 <svg ref={wordCloudRef} width="100%" height="100%" />
//             </ResizableBox>
//             {/* Tooltip div */}
//             <div 
//                 ref={tooltipRef} 
//                 className="tooltip"
//                 style={{
//                     position: "absolute",
//                     visibility: "hidden",
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     color: "#fff",
//                     padding: "5px 10px",
//                     borderRadius: "5px",
//                     fontSize: "14px",
//                     pointerEvents: "none", // Prevent tooltip from interfering with interactions
//                 }} 
//             />
//             <div className="word-cloud-controls">
//                 <label>
//                     Display Top N Words:
//                     <input
//                         type="range"
//                         min="1"
//                         max={categories ? categories.length : 10}
//                         value={displayCount}
//                         onChange={handleSliderChange}
//                     />
//                     <span>{displayCount}</span>
//                 </label>
//             </div>
//         </div>
//     );
// };

// export default WordCloud;


const WordCloud = ({ categories = [], values = [] }) => {
    const wordCloudRef = useRef(null); // Reference to the SVG container
    const [wordData, setWordData] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);

    // Tooltip div
    const tooltipRef = useRef(null); 
     
    useEffect(() => {
        if (categories && values) {
            // Combine categories and values into a single dataset for word cloud
            const combinedData = categories.map((text, index) => ({
                text,
                size: values[index],
            }));

            // Sort and slice to display the top N words
            const filteredData = combinedData
                .sort((a, b) => b.size - a.size)
                .slice(0, displayCount);

            setWordData(filteredData);
            console.log("filteredData", filteredData);
        }
    }, [categories, values, displayCount]);

    useEffect(() => {
        if (wordData.length > 0) {
            drawWordCloud();
        }
    }, [wordData]);

    const drawWordCloud = () => {
        const { width, height } = { width: 400, height: 400 }; // Dimensions of the word cloud
        const svg = d3.select(wordCloudRef.current);
        svg.selectAll("*").remove(); // Clear existing content

        const fontSizeScale = d3
            .scaleLinear()
            .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
            .range([10, 50]); // Font size range

        const layout = d3Cloud()
            .size([width, height])
            .words(wordData)
            .padding(5)
            .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Random rotation
            .fontSize((d) => fontSizeScale(d.size))
            .on("end", (words) => {
                svg.append("g")
                    .attr("transform", `translate(${width / 2}, ${height / 2})`)
                    .selectAll("text")
                    .data(words)
                    .enter()
                    .append("text")
                    .style("font-size", (d) => `${d.size}px`)
                    .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
                    .attr("text-anchor", "middle")
                    .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
                    .text((d) => d.text)
                    .on("mouseover", (event, d) => {
                        d3.select(event.target)
                            .style("cursor", "pointer")
                            .style("opacity", 0.7); // Add visual effect on hover
                        // Show the tooltip with word information
                        tooltipRef.current.style.visibility = "visible";
                    tooltipRef.current.textContent = `Word: ${d.text}, Frequency: ${d.size}`;
                    tooltipRef.current.style.left = `${event.pageX + 10}px`; // Offset to avoid overlap
                    tooltipRef.current.style.top = `${event.pageY + 10}px`;
                })
                    .on("mouseout", (event) => {
                        d3.select(event.target)
                            .style("cursor", "default")
                            .style("opacity", 1); // Reset visual effect
                        tooltipRef.current.style.visibility = "hidden"; // Hide tooltip on mouseout
                    });
                    
            });

        layout.start();
    };

    const handleSliderChange = (event) => {
        setDisplayCount(Number(event.target.value));
    };

    return (
        <div className="word-cloud-container">
            <ResizableBox width={400} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
          
                <svg ref={wordCloudRef} width="100%" height="100%" />
                <div className="word-cloud-controls">
                <label>
                    Display Top N Words:
                    <input
                        type="range"
                        min="1"
                        max={categories ? categories.length : 10}
                        value={displayCount}
                        onChange={handleSliderChange}
                    />
                    <span>{displayCount}</span>
                </label>
            </div>
            </ResizableBox>
            {/* Tooltip div */}
            <div 
                ref={tooltipRef} 
                className="tooltip"
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    pointerEvents: "none", // Prevent tooltip from interfering with interactions
                }} 
            />
            
        </div>
    );
};

export default WordCloud;
