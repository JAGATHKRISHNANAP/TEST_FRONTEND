


// // // import React, { useEffect, useRef, useState } from 'react';
// // // import * as d3 from 'd3';
// // // import { useSelector } from 'react-redux';
// // // import d3Cloud from 'd3-cloud';
// // // import './WordCloud.css';

// // // const WordCloud = () => {
// // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
   
// // //     const chartRef = useRef(null);
// // //     const tooltipRef = useRef(null);
// // //     const [wordCloudData, setWordCloudData] = useState({ categories: [], values: [] });
// // //     const [displayCount, setDisplayCount] = useState(10);
// // //     const [hasAlerted, setHasAlerted] = useState(false);
// // // const chartColor = useSelector((state) => state.chartColor.chartColor);

// // //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// // //     const xAxis = useSelector((state) => state.chart.xAxis); // categories
// // //     const databaseName = localStorage.getItem('company_name');
// // //     const chartDimensions = { width: 800, height: 500 };

// // //     useEffect(() => {
// // //         // Fetch word cloud data on component mount
// // //         const fetchWordCloudData = async () => {
// // //             try {
// // //                 const response = await fetch('http://localhost:5000/wordcloud-data', {
// // //                     method: 'POST',
// // //                     headers: {
// // //                         'Content-Type': 'application/json',
// // //                     },
// // //                     body: JSON.stringify({
// // //                         category: xAxis,
// // //                         tableName: selectedTable,
// // //                         databaseName: databaseName,
// // //                     }),
// // //                 });

// // //                 if (!response.ok) {
// // //                     throw new Error(`Error: ${response.status} ${response.statusText}`);
// // //                 }

// // //                 const data = await response.json();
// // //                 setWordCloudData(data);
// // //             } catch (error) {
// // //                 console.error('Error fetching word cloud data:', error);
// // //             }
// // //         };

// // //         fetchWordCloudData();
// // //     }, []);

// // //     useEffect(() => {
// // //         if (wordCloudData.categories.length > 0 && wordCloudData.values.length > 0) {
// // //             drawChart();
// // //         }
// // //     }, [wordCloudData, areaColor, displayCount]);

// // //     const getFilteredData = () => {
// // //         const words = wordCloudData.categories.map((category, index) => ({
// // //             text: category,
// // //             size: wordCloudData.values[index],
// // //         }));

// // //         // Sort and limit words based on the display count
// // //         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
// // //     };

// // //     const drawChart = () => {
// // //         d3.select(chartRef.current).select("svg").remove();
// // //         const { width, height } = chartDimensions;
    
// // //         const svg = d3.select(chartRef.current)
// // //             .append("svg")
// // //             .attr("width", width)
// // //             .attr("height", height)
// // //             .append("g")
// // //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// // //         const words = getFilteredData();
    
// // //         // Define the font size range
// // //         const colorScale = d3.scaleLinear()
// // //         .domain([Math.min(...wordCloudData.values), Math.max(...wordCloudData.values)])
// // //         .range(["#ddd", chartColor]); // '#ddd' for light color, `chartColor` for main color

// // //         const fontSizeScale = d3.scaleLinear()
// // //             .domain([Math.min(...wordCloudData.values), Math.max(...wordCloudData.values)]) // Adjusted to use value range
// // //             .range([15, 35]);
    
// // //         const layout = d3Cloud()
// // //             .size([width, height])
// // //             .words(words)
// // //             .padding(10)
// // //             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// // //             .fontSize(d => fontSizeScale(d.size)/2) // Dynamically adjust size based on data
// // //             .on("end", renderWords);
    
// // //         layout.start();
    
// // //         function renderWords(words) {
// // //             const textElements = svg.selectAll("text")
// // //                 .data(words)
// // //                 .enter()
// // //                 .append("text")
// // //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// // //                 .style("font-family", "sans-serif")
// // //                 .attr("fill", d => colorScale(d.size))
// // //                 .attr("text-anchor", "middle")
// // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // //                 .text(d => d.text);
    
// // //             // Tooltip events
// // //             textElements
// // //                 .on("mouseover", (event, d) => {
// // //                     d3.select(tooltipRef.current)
// // //                         .style("opacity", 1)
// // //                         .html(`
// // //                             Word: ${d.text}<br>
// // //                             Original Size: ${wordCloudData.values[wordCloudData.categories.indexOf(d.text)]}<br>
// // //                             Rendered Font Size: ${fontSizeScale(d.size)}
// // //                         `)
// // //                         .style("left", (event.pageX + 5) + "px")
// // //                         .style("top", (event.pageY - 28) + "px");
// // //                 })
// // //                 .on("mouseout", () => {
// // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // //                 });
// // //         }
// // //     };
    

// // //     const handleSliderChange = (event) => {
// // //         const newCount = Number(event.target.value);
// // //         setDisplayCount(newCount);

// // //         if (!hasAlerted && newCount !== 10) {
// // //             alert(`Display mode changed to show top ${newCount} words`);
// // //             setHasAlerted(true);
// // //         }
// // //     };

// // //     return (
// // //         <div className="centered-container">
// // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // //             </div>
// // //             <div className="filter-options">
// // //                 <label>
// // //                     Display Mode (Top N Words):
// // //                     <input
// // //                         type="range"
// // //                         min="1"
// // //                         max={wordCloudData.categories.length}
// // //                         value={displayCount}
// // //                         onChange={handleSliderChange}
// // //                     />
// // //                     <span>{displayCount}</span>
// // //                 </label>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default WordCloud;

// // import React, { useEffect, useRef, useState } from "react";

// // import { useDispatch, useSelector } from "react-redux";
// // import * as d3 from "d3";
// // import d3Cloud from "d3-cloud";
// // import { ResizableBox } from "react-resizable";
// // import "react-resizable/css/styles.css"; // Import the CSS for the resizable box
// // import './WordCloud.css';

// // const WordCloud = ({ categories = [], values = [] }) => {
// //     const wordCloudRef = useRef(null); // Reference to the SVG container
// //     const [wordData, setWordData] = useState([]);
// //     const [displayCount, setDisplayCount] = useState(10);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     // Tooltip div
// //     const tooltipRef = useRef(null); 
     
// //     useEffect(() => {
// //         if (categories && values) {
// //             // Combine categories and values into a single dataset for word cloud
// //             const combinedData = categories.map((text, index) => ({
// //                 text,
// //                 size: values[index],
// //             }));
// //             console.log("values",combinedData 
// //             )
                
// //             // Sort and slice to display the top N words
// //             const filteredData = combinedData
// //                 .sort((a, b) => b.size - a.size)
// //                 .slice(0, displayCount);

// //             setWordData(filteredData);
// //             console.log("filteredData", filteredData);
// //         }
// //     }, [categories, values, displayCount]);

// //     useEffect(() => {
// //         if (wordData.length > 0) {
// //             drawWordCloud();
// //         }
// //     }, [wordData]);

// //     const drawWordCloud = () => {
// //         const { width, height } = { width: 400, height: 400 }; // Dimensions of the word cloud
// //         const svg = d3.select(wordCloudRef.current);
// //         svg.selectAll("*").remove(); // Clear existing content

// //         const fontSizeScale = d3
// //             .scaleLinear()
// //             .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
// //             .range([20, 60]); // Font size range

// //         const layout = d3Cloud()
// //             .size([width, height])
// //             .words(wordData)
// //             .padding(5)
// //             .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Random rotation
// //             .fontSize((d) => fontSizeScale(d.size))
// //             .on("end", (words) => {
// //                 svg.append("g")
// //                     .attr("transform", `translate(${width / 2}, ${height / 2})`)
// //                     .selectAll("text")
// //                     .data(words)
// //                     .enter()
// //                     .append("text")
// //                     .style("font-size", (d) => `${d.size}px`)
// //                     .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// //                     .attr("text-anchor", "middle")
// //                     .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// //                     .text((d) => d.text)
// //                     .on("mouseover", (event, d) => {
// //                         d3.select(event.target)
// //                             .style("cursor", "pointer")
// //                             .style("opacity", 0.7);
                    
// //                         tooltipRef.current.style.visibility = "visible";
                    
// //                         let tooltipContent = `<div style="background: white; color: black; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">`;
                    
// //                         if (toolTipOptions.heading) {
// //                             tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px;"><h4>Word Cloud Details</h4></div>`;
// //                         }
// //                         if (toolTipOptions.categoryName) {
// //                             tooltipContent += `<div><strong>Category:</strong> ${d.text}</div>`;
// //                         }
// //                         if (toolTipOptions.value) {
// //                             tooltipContent += `<div><strong>Value:</strong> ${d.size}</div>`;
// //                         }
                    
// //                         tooltipContent += `</div>`;
// //                         tooltipRef.current.innerHTML = tooltipContent;
                    
// //                         tooltipRef.current.style.left = `${event.pageX + 10}px`;
// //                         tooltipRef.current.style.top = `${event.pageY + 10}px`;
// //                     })
// //                     .on("mouseout", (event) => {
// //                         d3.select(event.target)
// //                             .style("cursor", "default")
// //                             .style("opacity", 1); // Reset visual effect
// //                         tooltipRef.current.style.visibility = "hidden"; // Hide tooltip on mouseout
// //                     });
                    
// //             });

// //         layout.start();
// //     };

// //     const handleSliderChange = (event) => {
// //         setDisplayCount(Number(event.target.value));
// //     };

// //     return (
// //         <div className="word-cloud-container">
// //             <ResizableBox width={400} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
          
// //                 <svg ref={wordCloudRef} width="100%" height="100%" />
// //                 <div className="word-cloud-controls">
// //                 <label>
// //                     Display Top N Words:
// //                     <input
// //                         type="range"
// //                         min="1"
// //                         max={categories ? categories.length : 10}
// //                         value={displayCount}
// //                         onChange={handleSliderChange}
// //                     />
// //                     <span>{displayCount}</span>
// //                 </label>
// //             </div>
// //             </ResizableBox>
// //             {/* Tooltip div */}
// //             <div 
// //                 ref={tooltipRef} 
// //                 className="tooltip"
// //                 style={{
// //                     position: "absolute",
// //                     visibility: "hidden",
// //                     backgroundColor: "rgba(0, 0, 0, 0.7)",
// //                     color: "#fff",
// //                     padding: "5px 10px",
// //                     borderRadius: "5px",
// //                     fontSize: "14px",
// //                     pointerEvents: "none", // Prevent tooltip from interfering with interactions
// //                 }} 
// //             />
            
// //         </div>
// //     );
// // };

// // export default WordCloud;

// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import * as d3 from "d3";
// import d3Cloud from "d3-cloud";
// import { ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css";
// import './WordCloud.css';

// const WordCloud = ({ categories = [], values = [] }) => {
//     const wordCloudRef = useRef(null);
//     const [wordData, setWordData] = useState([]);
//     const [displayCount, setDisplayCount] = useState(10);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const tooltipRef = useRef(null);

//     useEffect(() => {
//         if (categories && values) {
//             const combinedData = categories.map((text, index) => ({
//                 text,
//                 size: values[index],
//             }));
//             const filteredData = combinedData
//                 .sort((a, b) => b.size - a.size)
//                 .slice(0, displayCount);
//             setWordData(filteredData);
//         }
//     }, [categories, values, displayCount]);

//     useEffect(() => {
//         if (wordData.length > 0) {
//             drawWordCloud();
//         }
//     }, [wordData]);

//     const drawWordCloud = () => {
//         const { width, height } = { width: 400, height: 400 };
//         const svg = d3.select(wordCloudRef.current);
//         svg.selectAll("*").remove();

//         const fontSizeScale = d3
//             .scaleLinear()
//             .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
//             .range([20, 60]);

//         const layout = d3Cloud()
//             .size([width, height])
//             .words(wordData)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
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
//                         console.log("Mouseover triggered");
//                         console.log("Data:", d);
//                         console.log("toolTipOptions:", toolTipOptions);
//                         console.log("tooltipRef:", tooltipRef.current);
                    
//                         d3.select(event.target)
//                             .style("cursor", "pointer")
//                             .style("opacity", 0.7);
                    
//                         tooltipRef.current.style.visibility = "visible";
                    
//                         let tooltipContent = `<div style="background: white; color: black; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">`;
                    
//                         if (toolTipOptions.heading) {
//                             tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px;"><h4>Word Cloud Details</h4></div>`;
//                         }
//                         if (toolTipOptions.categoryName) {
//                             tooltipContent += `<div><strong>Category:</strong> ${d.text}</div>`;
//                         }
//                         if (toolTipOptions.value) {
//                             tooltipContent += `<div><strong>Value:</strong> ${d.size}</div>`;
//                         }
                    
//                         tooltipContent += `</div>`;
//                         tooltipRef.current.innerHTML = tooltipContent;
                    
//                         tooltipRef.current.style.left = `${event.pageX + 10}px`;
//                         tooltipRef.current.style.top = `${event.pageY + 10}px`;
//                     })
//                     .on("mouseleave", (event) => {
//                         d3.select(event.target)
//                             .style("cursor", "default")
//                             .style("opacity", 1);
//                         // Do not hide here. Let tooltip or word handle it.
//                     });

//                 d3.select(tooltipRef.current)
//                     .on("mouseleave", () => {
//                         tooltipRef.current.style.visibility = "hidden";
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
//                 <div className="word-cloud-controls">
//                     <label>
//                         Display Top N Words:
//                         <input
//                             type="range"
//                             min="1"
//                             max={categories ? categories.length : 10}
//                             value={displayCount}
//                             onChange={handleSliderChange}
//                         />
//                         <span>{displayCount}</span>
//                     </label>
//                 </div>
//             </ResizableBox>
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
//                     pointerEvents: "none",
//                 }}
//             />
//         </div>
//     );
// };

// export default WordCloud;
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import './WordCloud.css';

const WordCloud = ({ categories = [], values = [] }) => {
    const wordCloudRef = useRef(null);
    const [wordData, setWordData] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (categories && values) {
            const combinedData = categories.map((text, index) => ({
                text,
                size: values[index],
            }));
            const filteredData = combinedData
                .sort((a, b) => b.size - a.size)
                .slice(0, displayCount);
            setWordData(filteredData);
        }
    }, [categories, values, displayCount]);

    useEffect(() => {
        if (wordData.length > 0) {
            drawWordCloud();
        }
    }, [wordData]);

    const drawWordCloud = () => {
        const { width, height } = { width: 400, height: 400 };
        const svg = d3.select(wordCloudRef.current);
        svg.selectAll("*").remove();

        const fontSizeScale = d3
            .scaleLinear()
            .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
            .range([20, 60]);

        const layout = d3Cloud()
            .size([width, height])
            .words(wordData)
            .padding(5)
            .rotate(() => (Math.random() > 0.5 ? 0 : 90))
            .fontSize((d) => fontSizeScale(d.size))
            .on("end", (words) => {
                console.log("Words in cloud:", words);
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
                        console.log("Mouseover triggered");
                        console.log("Data:", d);
                        console.log("toolTipOptions:", toolTipOptions);
                        console.log("tooltipRef:", tooltipRef.current);
                    
                        d3.select(event.target)
                            .style("cursor", "pointer")
                            .style("opacity", 0.7);
                    
                        tooltipRef.current.style.visibility = "visible";
                    
                        let tooltipContent = `<div style="background: black; color: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px; z-index: 1000;">`;
                    
                        if (toolTipOptions.heading) {
                            tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px;"><h4>Word Cloud Details</h4></div>`;
                        }
                        if (toolTipOptions.categoryName) {
                            tooltipContent += `<div><strong>Category:</strong> ${d.text}</div>`;
                        }
                        if (toolTipOptions.value) {
                            tooltipContent += `<div><strong>Value:</strong> ${d.size}</div>`;
                        }
                    
                        tooltipContent += `</div>`;
                        tooltipRef.current.innerHTML = tooltipContent;
                    
                        tooltipRef.current.style.left = `${event.pageX + 10}px`;
                        tooltipRef.current.style.top = `${event.pageY + 10}px`;
                    })
                    .on("mouseleave", (event) => {
                        d3.select(event.target)
                            .style("cursor", "default")
                            .style("opacity", 1);
                    });

                d3.select(tooltipRef.current)
                    .on("mouseleave", () => {
                        tooltipRef.current.style.visibility = "hidden";
                    });
            });

        layout.start();
    };

    const handleSliderChange = (event) => {
        setDisplayCount(Number(event.target.value));
    };

    return (
        <div className="word-cloud-container" style={{position: "relative"}}>
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
                    pointerEvents: "none",
                    zIndex: 1000,
                }}
            />
        </div>
    );
};

export default WordCloud;