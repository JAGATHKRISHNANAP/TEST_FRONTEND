import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the CSS for the resizable box
import './tooltip.css';

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
            console.log("values",combinedData 
            )
                
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
            .range([20, 60]); // Font size range

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
                className="wordCloudTooltip"
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