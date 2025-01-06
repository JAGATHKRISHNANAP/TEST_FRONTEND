// // // // // // // // // // // // // src/WordCloud.js
// // // // // // // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // // // import cloud from 'd3-cloud';

// // // // // // // // // // // // const WordCloud = () => {
// // // // // // // // // // // //     const data = [
// // // // // // // // // // // //         { text: 'React', size: 40 },
// // // // // // // // // // // //         { text: 'D3', size: 30 },
// // // // // // // // // // // //         { text: 'JavaScript', size: 50 },
// // // // // // // // // // // //         { text: 'CSS', size: 20 },
// // // // // // // // // // // //         { text: 'HTML', size: 25 },
// // // // // // // // // // // //         { text: 'Word Cloud', size: 45 },
// // // // // // // // // // // //         { text: 'Visualization', size: 35 },
// // // // // // // // // // // //         { text: 'Data', size: 15 },
// // // // // // // // // // // //         { text: 'Chart', size: 10 },
// // // // // // // // // // // //       ];
    
// // // // // // // // // // // //   const svgRef = useRef();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const width = 600;
// // // // // // // // // // // //     const height = 400;

// // // // // // // // // // // //     const layout = cloud()
// // // // // // // // // // // //       .size([width, height])
// // // // // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // // // // //       .padding(5)
// // // // // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90) // Random rotation: 0 or 90 degrees
// // // // // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // // // // //       .on("end", draw);

// // // // // // // // // // // //     layout.start();

// // // // // // // // // // // //     function draw(words) {
// // // // // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // // // // //         .attr("width", width)
// // // // // // // // // // // //         .attr("height", height)
// // // // // // // // // // // //         .append("g")
// // // // // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // // // //       svg.selectAll("text")
// // // // // // // // // // // //         .data(words)
// // // // // // // // // // // //         .enter().append("text")
// // // // // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // // // //         .text(d => d.text);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [data]);

// // // // // // // // // // // //   return <svg ref={svgRef}></svg>;
// // // // // // // // // // // // };

// // // // // // // // // // // // export default WordCloud;
// // // // // // // // // // // // src/WordCloud.js
// // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // // // // import Slider from '@mui/material/Slider';
// // // // // // // // // // // import { useSelector } from 'react-redux';

// // // // // // // // // // // const WordCloud = ({ categories = [], values = [], initialWidth = 800, initialHeight = 500 }) => {
// // // // // // // // // // //     const svgRef = useRef();
// // // // // // // // // // //     const [sliderValue, setSliderValue] = useState(1);
// // // // // // // // // // //     const chartColor = useSelector((state) => state.chartColor.chartColor);

// // // // // // // // // // //     // Adjust the word sizes with the slider
// // // // // // // // // // //     const handleSliderChange = (event, newValue) => {
// // // // // // // // // // //         setSliderValue(newValue);
// // // // // // // // // // //     };

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
// // // // // // // // // // //             console.warn("Categories or values array is empty.");
// // // // // // // // // // //             return;
// // // // // // // // // // //         }

// // // // // // // // // // //         // Adjust word sizes based on slider
// // // // // // // // // // //         const adjustedValues = values.map(value => value * sliderValue);
// // // // // // // // // // //         const data = categories.map((category, index) => ({
// // // // // // // // // // //             text: category,
// // // // // // // // // // //             size: adjustedValues[index] || 0
// // // // // // // // // // //         }));

// // // // // // // // // // //         // Log to verify data flow
// // // // // // // // // // //         console.log("Word Cloud data:", data);

// // // // // // // // // // //         const width = initialWidth;
// // // // // // // // // // //         const height = initialHeight;

// // // // // // // // // // //         // Define the layout for d3-cloud
// // // // // // // // // // //         const layout = cloud()
// // // // // // // // // // //             .size([width, height])
// // // // // // // // // // //             .words(data)
// // // // // // // // // // //             .padding(5)
// // // // // // // // // // //             .rotate(() => Math.floor(Math.random() * 2) * 90) // Random 0 or 90 degree rotation
// // // // // // // // // // //             .fontSize(d => d.size)
// // // // // // // // // // //             .on("end", draw);

// // // // // // // // // // //         layout.start();

// // // // // // // // // // //         function draw(words) {
// // // // // // // // // // //             // Clear any existing SVG content
// // // // // // // // // // //             d3.select(svgRef.current).selectAll("*").remove();

// // // // // // // // // // //             // Set up the SVG element and center the word cloud
// // // // // // // // // // //             const svg = d3.select(svgRef.current)
// // // // // // // // // // //                 .attr("width", width)
// // // // // // // // // // //                 .attr("height", height)
// // // // // // // // // // //                 .append("g")
// // // // // // // // // // //                 .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // // //             svg.selectAll("text")
// // // // // // // // // // //                 .data(words)
// // // // // // // // // // //                 .enter().append("text")
// // // // // // // // // // //                 .attr("font-family", "Impact")
// // // // // // // // // // //                 .attr("font-size", d => d.size)
// // // // // // // // // // //                 .attr("fill", () => chartColor || d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // // //                 .attr("text-anchor", "middle")
// // // // // // // // // // //                 .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // // //                 .text(d => d.text);
// // // // // // // // // // //         }
// // // // // // // // // // //     }, [categories, values, sliderValue, chartColor, initialWidth, initialHeight]);

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div>
// // // // // // // // // // //             <h3>Word Cloud of Data</h3>
// // // // // // // // // // //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// // // // // // // // // // //                 <label>Adjust Word Size:</label>
// // // // // // // // // // //                 <Slider
// // // // // // // // // // //                     min={0.1}
// // // // // // // // // // //                     max={5}
// // // // // // // // // // //                     step={0.1}
// // // // // // // // // // //                     value={sliderValue}
// // // // // // // // // // //                     onChange={handleSliderChange}
// // // // // // // // // // //                     sx={{ width: 200, margin: '0 15px' }}
// // // // // // // // // // //                 />
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <svg ref={svgRef}></svg>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // };

// // // // // // // // // // // export default WordCloud;
// // // // // // // // // // // src/App.js
// // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // import cloud from 'd3-cloud';

// // // // // // // // // // const App = () => {
// // // // // // // // // //   const [data, setData] = useState([]);
// // // // // // // // // //   const svgRef = useRef();

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (data.length === 0) return;

// // // // // // // // // //     const width = 600;
// // // // // // // // // //     const height = 400;

// // // // // // // // // //     const layout = cloud()
// // // // // // // // // //       .size([width, height])
// // // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // // //       .padding(5)
// // // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // // //       .on("end", draw);

// // // // // // // // // //     layout.start();

// // // // // // // // // //     function draw(words) {
// // // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // // //         .attr("width", width)
// // // // // // // // // //         .attr("height", height)
// // // // // // // // // //         .append("g")
// // // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // //       svg.selectAll("text")
// // // // // // // // // //         .data(words)
// // // // // // // // // //         .enter().append("text")
// // // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // //         .text(d => d.text);
// // // // // // // // // //     }
// // // // // // // // // //   }, [data]);

// // // // // // // // // //   const handleFileUpload = (event) => {
// // // // // // // // // //     const file = event.target.files[0];
// // // // // // // // // //     if (!file) return;

// // // // // // // // // //     const reader = new FileReader();
// // // // // // // // // //     reader.onload = (e) => {
// // // // // // // // // //       const text = e.target.result;
// // // // // // // // // //       const words = text.split(/\s+/); // Split text into words
// // // // // // // // // //       const wordCounts = {};
      
// // // // // // // // // //       // Count occurrences of each word
// // // // // // // // // //       words.forEach(word => {
// // // // // // // // // //         word = word.toLowerCase(); // Convert to lowercase
// // // // // // // // // //         if (word) {
// // // // // // // // // //           wordCounts[word] = (wordCounts[word] || 0) + 1;
// // // // // // // // // //         }
// // // // // // // // // //       });

// // // // // // // // // //       // Transform the word counts into the format for the word cloud
// // // // // // // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // // // // // // //         text: word,
// // // // // // // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // // // // // // //       }));

// // // // // // // // // //       setData(wordData); // Update state with word data
// // // // // // // // // //     };
// // // // // // // // // //     reader.readAsText(file);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <h1>Word Cloud from Text File</h1>
// // // // // // // // // //       <input type="file" accept=".txt" onChange={handleFileUpload} />
// // // // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default App;
// // // // // // // // // // src/App.js// src/App.js
// // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // // import * as XLSX from 'xlsx';

// // // // // // // // // const App = () => {
// // // // // // // // //   const [data, setData] = useState([]);
// // // // // // // // //   const svgRef = useRef();

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (data.length === 0) return;

// // // // // // // // //     const width = 600;
// // // // // // // // //     const height = 400;

// // // // // // // // //     const layout = cloud()
// // // // // // // // //       .size([width, height])
// // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // //       .padding(5)
// // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // //       .on("end", draw);

// // // // // // // // //     layout.start();

// // // // // // // // //     function draw(words) {
// // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // //         .attr("width", width)
// // // // // // // // //         .attr("height", height)
// // // // // // // // //         .append("g")
// // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // //       svg.selectAll("text")
// // // // // // // // //         .data(words)
// // // // // // // // //         .enter().append("text")
// // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // //         .text(d => d.text);
// // // // // // // // //     }
// // // // // // // // //   }, [data]);

// // // // // // // // //   const handleFileUpload = (event) => {
// // // // // // // // //     const file = event.target.files[0];
// // // // // // // // //     if (!file) return;

// // // // // // // // //     const reader = new FileReader();
// // // // // // // // //     reader.onload = (e) => {
// // // // // // // // //       const binaryStr = e.target.result;
// // // // // // // // //       const workbook = XLSX.read(binaryStr, { type: 'binary' });
// // // // // // // // //       const sheetName = workbook.SheetNames[0]; // Get the first sheet
// // // // // // // // //       const worksheet = workbook.Sheets[sheetName];

// // // // // // // // //       // Convert the data from the Excel sheet to JSON
// // // // // // // // //       const jsonData = XLSX.utils.sheet_to_json(worksheet);

// // // // // // // // //       // Assuming the words are in a column named 'Word' and we want to count them
// // // // // // // // //       const wordCounts = {};
// // // // // // // // //       jsonData.forEach(row => {
// // // // // // // // //         const word = row.Word; // Change 'Word' to your specific column name
// // // // // // // // //         if (word) {
// // // // // // // // //           const lowerCaseWord = word.toLowerCase();
// // // // // // // // //           wordCounts[lowerCaseWord] = (wordCounts[lowerCaseWord] || 0) + 1;
// // // // // // // // //         }
// // // // // // // // //       });

// // // // // // // // //       // Transform word counts into the format for the word cloud
// // // // // // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // // // // // //         text: word,
// // // // // // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // // // // // //       }));

// // // // // // // // //       setData(wordData); // Update state with word data
// // // // // // // // //     };
// // // // // // // // //     reader.readAsBinaryString(file); // Read as binary string for XLSX
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <h1>Word Cloud from Excel File</h1>
// // // // // // // // //       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
// // // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default App;
// // // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // // import * as d3 from 'd3';
// // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // import { useSelector } from 'react-redux';

// // // // // // // // const WordCloud = () => {
// // // // // // // //   const svgRef = useRef();
// // // // // // // //   const xAxisData = useSelector((state) => state.chart.xAxis); // Assumes xAxis data holds the words/categories
// // // // // // // //   const dimensions = { width: 960, height: 600 };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!xAxisData || xAxisData.length === 0) return;

// // // // // // // //     const words = xAxisData.map((text) => ({ text, size: 10 + Math.random() * 50 }));

// // // // // // // //     const layout = cloud()
// // // // // // // //       .size([dimensions.width, dimensions.height])
// // // // // // // //       .words(words)
// // // // // // // //       .padding(5)
// // // // // // // //       .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// // // // // // // //       .fontSize((d) => d.size)
// // // // // // // //       .on('end', draw);

// // // // // // // //     layout.start();

// // // // // // // //     function draw(words) {
// // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // //         .attr('width', dimensions.width)
// // // // // // // //         .attr('height', dimensions.height);

// // // // // // // //       svg.selectAll('*').remove(); // Clear previous renderings

// // // // // // // //       svg.append('g')
// // // // // // // //         .attr('transform', `translate(${dimensions.width / 2},${dimensions.height / 2})`)
// // // // // // // //         .selectAll('text')
// // // // // // // //         .data(words)
// // // // // // // //         .enter().append('text')
// // // // // // // //         .style('font-size', (d) => `${d.size}px`)
// // // // // // // //         .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // //         .attr('text-anchor', 'middle')
// // // // // // // //         .attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // // // // // //         .text((d) => d.text);
// // // // // // // //     }
// // // // // // // //   }, [xAxisData]);

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <h2>Word Cloud</h2>
// // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default WordCloud;
// // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // import * as d3 from 'd3';
// // // // // // // import cloud from 'd3-cloud';

// // // // // // // const D3WordCloud = ({ categories = [], values = [] }) => {
// // // // // // //     const svgRef = useRef();

// // // // // // //     useEffect(() => {
// // // // // // //         const data = categories.map((category, index) => ({
// // // // // // //             text: category,
// // // // // // //             size: values[index] || 10  // Adjust the size based on value; default to 10 if undefined
// // // // // // //         }));

// // // // // // //         const svg = d3.select(svgRef.current);
// // // // // // //         const width = 500;
// // // // // // //         const height = 300;

// // // // // // //         svg.selectAll('*').remove();  // Clear previous renderings

// // // // // // //         const layout = cloud()
// // // // // // //             .size([width, height])
// // // // // // //             .words(data)
// // // // // // //             .padding(5)
// // // // // // //             .fontSize(d => d.size)
// // // // // // //             .rotate(() => ~~(Math.random() * 2) * 90)  // Rotate randomly between 0 and 90 degrees
// // // // // // //             .on('end', draw);

// // // // // // //         layout.start();

// // // // // // //         function draw(words) {
// // // // // // //             svg.append('g')
// // // // // // //                 .attr('transform', `translate(${width / 2},${height / 2})`)
// // // // // // //                 .selectAll('text')
// // // // // // //                 .data(words)
// // // // // // //                 .enter().append('text')
// // // // // // //                 .style('font-size', d => `${d.size}px`)
// // // // // // //                 .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // //                 .attr('text-anchor', 'middle')
// // // // // // //                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // //                 .text(d => d.text)
// // // // // // //                 .on('mouseover', (event, d) => {
// // // // // // //                     d3.select(event.currentTarget).style('fill', 'red');
// // // // // // //                 })
// // // // // // //                 .on('mouseout', (event, d) => {
// // // // // // //                     d3.select(event.currentTarget).style('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]);
// // // // // // //                 });
// // // // // // //         }
// // // // // // //     }, [categories, values]);

// // // // // // //     return (
// // // // // // //         <div className="word-cloud">
// // // // // // //             <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 500 300" />
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default D3WordCloud;
// // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // import * as d3 from 'd3';
// // // // // // import cloud from 'd3-cloud'; // Make sure you have d3-cloud installed

// // // // // // const D3WordCloud = ({ categories = [], values = [] }) => {
// // // // // //     const svgRef = useRef(null);
// // // // // //     const width = 500;
// // // // // //     const height = 300;

// // // // // //     useEffect(() => {
// // // // // //         if (!categories.length || !values.length) return;

// // // // // //         // Map categories to data with size
// // // // // //         const data = categories.map((category, index) => ({
// // // // // //             text: category,
// // // // // //             size: values[index] || 10 // Use default size if undefined
// // // // // //         }));

// // // // // //         // Set up the word cloud layout
// // // // // //         const layout = cloud()
// // // // // //             .size([width, height])
// // // // // //             .words(data)
// // // // // //             .padding(5)
// // // // // //             .fontSize(d => d.size) // Map size to font size
// // // // // //             .rotate(() => ~~(Math.random() * 2) * 90) // Rotate randomly
// // // // // //             .on('end', draw);

// // // // // //         // Start layout
// // // // // //         layout.start();

// // // // // //         function draw(words) {
// // // // // //             // Clear previous SVG content
// // // // // //             d3.select(svgRef.current).selectAll('*').remove();

// // // // // //             const svg = d3.select(svgRef.current)
// // // // // //                 .attr('width', width)
// // // // // //                 .attr('height', height)
// // // // // //                 .append('g')
// // // // // //                 .attr('transform', `translate(${width / 2}, ${height / 2})`);

// // // // // //             svg.selectAll('text')
// // // // // //                 .data(words)
// // // // // //                 .enter().append('text')
// // // // // //                 .style('font-size', d => `${d.size}px`)
// // // // // //                 .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)]) // Random colors
// // // // // //                 .attr('text-anchor', 'middle')
// // // // // //                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // //                 .text(d => d.text)
// // // // // //                 .on('mouseover', (event, d) => {
// // // // // //                     d3.select(event.currentTarget).style('fill', 'red'); // Change color on hover
// // // // // //                 })
// // // // // //                 .on('mouseout', (event, d) => {
// // // // // //                     d3.select(event.currentTarget).style('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]); // Reset color
// // // // // //                 });
// // // // // //         }
// // // // // //     }, [categories, values]);

// // // // // //     return (
// // // // // //         <div className="word-cloud">
// // // // // //             <svg ref={svgRef} />
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default D3WordCloud;
// // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // import * as d3 from 'd3';
// // // // // import cloud from 'd3-cloud';

// // // // // const App = () => {
// // // // //   const [data, setData] = useState([]);
// // // // //   const [displayTop10, setDisplayTop10] = useState(false); // Toggle for top 10 words
// // // // //   const svgRef = useRef();
// // // // //   const tooltipRef = useRef();

// // // // //   useEffect(() => {
// // // // //     if (data.length === 0) return;

// // // // //     const width = 600;
// // // // //     const height = 400;

// // // // //     // Filter data for top 10 words if displayTop10 is true
// // // // //     const displayData = displayTop10 ? data.slice(0, 10) : data;

// // // // //     const layout = cloud()
// // // // //       .size([width, height])
// // // // //       .words(displayData.map(d => ({ text: d.text, size: d.size })))
// // // // //       .padding(5)
// // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // //       .fontSize(d => d.size)
// // // // //       .on("end", draw);

// // // // //     layout.start();

// // // // //     function draw(words) {
// // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // //       const svg = d3.select(svgRef.current)
// // // // //         .attr("width", width)
// // // // //         .attr("height", height)
// // // // //         .append("g")
// // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // //       svg.selectAll("text")
// // // // //         .data(words)
// // // // //         .enter().append("text")
// // // // //         .attr("font-family", "Impact")
// // // // //         .attr("font-size", d => d.size)
// // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // //         .attr("text-anchor", "middle")
// // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // //         .text(d => d.text)
// // // // //         .on("mouseover", (event, d) => {
// // // // //           d3.select(tooltipRef.current)
// // // // //             .style("display", "block")
// // // // //             .style("left", `${event.pageX + 5}px`)
// // // // //             .style("top", `${event.pageY + 5}px`)
// // // // //             .html(`Word: ${d.text}<br>Count: ${d.size / 10}`);
// // // // //         })
// // // // //         .on("mouseout", () => {
// // // // //           d3.select(tooltipRef.current).style("display", "none");
// // // // //         });
// // // // //     }
// // // // //   }, [data, displayTop10]);

// // // // //   const handleFileUpload = (event) => {
// // // // //     const file = event.target.files[0];
// // // // //     if (!file) return;

// // // // //     const reader = new FileReader();
// // // // //     reader.onload = (e) => {
// // // // //       const text = e.target.result;
// // // // //       const words = text.split(/\s+/); // Split text into words
// // // // //       const wordCounts = {};

// // // // //       words.forEach(word => {
// // // // //         word = word.toLowerCase(); // Convert to lowercase
// // // // //         if (word) {
// // // // //           wordCounts[word] = (wordCounts[word] || 0) + 1;
// // // // //         }
// // // // //       });

// // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // //         text: word,
// // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // //       })).sort((a, b) => b.size - a.size); // Sort by size in descending order

// // // // //       setData(wordData); // Update state with word data
// // // // //     };
// // // // //     reader.readAsText(file);
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Word Cloud from Text File</h1>
// // // // //       <input type="file" accept=".txt" onChange={handleFileUpload} />
// // // // //       <button onClick={() => setDisplayTop10(!displayTop10)}>
// // // // //         {displayTop10 ? 'Show All Words' : 'Show Top 10 Words'}
// // // // //       </button>
// // // // //       <svg ref={svgRef}></svg>
// // // // //       <div
// // // // //         ref={tooltipRef}
// // // // //         style={{
// // // // //           position: "absolute",
// // // // //           backgroundColor: "white",
// // // // //           border: "1px solid #ccc",
// // // // //           padding: "5px",
// // // // //           display: "none",
// // // // //           pointerEvents: "none",
// // // // //         }}
// // // // //       ></div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default App;

// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("All"); // Toggle between "All" and "Top 10"
// // // //     const tooltipRef = useRef(null);

// // // //     // Set fixed dimensions for the word cloud chart
// // // //     const chartDimensions = { width: 500, height: 800 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             // Sort words by size and take the top 10 largest values
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words; // Return all values when "All" is selected
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;

// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);

// // // //         const words = getFilteredData();

// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(8)
// // // //             .rotate(() => (Math.random() * 2) * 90)
// // // //             .fontSize(d => d.size)
// // // //             .on("end", renderWords);
// // // // //     const layout = cloud()
// // // // //       .size([width, height])
// // // // //       .words(displayData.map(d => ({ text: d.text, size: d.size })))
// // // // //       .padding(5)
// // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // //       .fontSize(d => d.size)
// // // // //       .on("end", draw);
// // // //         layout.start();

// // // //         function renderWords(words) {
// // // //           const textElements = svg.selectAll("text")
// // // //               .data(words)
// // // //               .enter()
// // // //               .append("text")
// // // //               .style("font-size", d => Math.sqrt(d.size) * 15 + "px")  // Rendering size only
// // // //               .style("font-family", "sans-serif")
// // // //               .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
              
// // // //               .attr("text-anchor", "middle")
// // // //               .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //               .text(d => d.text);
      
// // // //           // Tooltip event with unaltered original size
// // // //           textElements
// // // //               .on("mouseover", (event, d) => {
// // // //                   d3.select(tooltipRef.current)
// // // //                       .style("opacity", 1)
// // // //                       .html(`
// // // //                           Word: ${d.text}<br>
// // // //                           Original Size: ${values[categories.indexOf(d.text)]}<br> <!-- Directly reference original value -->
// // // //                           Rendered Font Size: ${Math.sqrt(d.size) * 15}
// // // //                       `)
// // // //                       .style("left", (event.pageX + 5) + "px")
// // // //                       .style("top", (event.pageY - 28) + "px");
// // // //               })
// // // //               .on("mouseout", () => {
// // // //                   d3.select(tooltipRef.current).style("opacity", 0);
// // // //               });
            
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="app">
// // // //             <div className="row">
// // // //                 <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                     <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                     <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //                 </div>

// // // //                 <div className="filter-options">
// // // //                     <label>
// // // //                         Display Mode:
// // // //                         <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                             <option value="All">All</option>
// // // //                             <option value="Top 10">Top 10 Largest</option>
// // // //                         </select>
// // // //                     </label>
// // // //                 </div>

// // // //                 <div className="color-picker-container">
// // // //                     {/* Additional content */}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // export default WordCloud;

// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("Top 10"); // Toggle between "All" and "Top 10"
// // // //     const tooltipRef = useRef(null);

// // // //     // Set fixed dimensions for the word cloud chart
// // // //     const chartDimensions = { width: 800, height: 500 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words;
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;

// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);

// // // //         const words = getFilteredData();

// // // //         const fontSizeScale = d3.scaleLinear()
// // // //             .domain([Math.min(...values), Math.max(...values)])
// // // //             .range([5, 40]);

// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(5)
// // // //             .rotate(() => Math.random() * 90)
// // // //             .fontSize(d => fontSizeScale(d.size))
// // // //             .on("end", renderWords);

// // // //         layout.start();

// // // //         function renderWords(words) {
// // // //             const textElements = svg.selectAll("text")
// // // //                 .data(words)
// // // //                 .enter()
// // // //                 .append("text")
// // // //                 .style("font-size", d => Math.sqrt(d.size) * 10 )
// // // //                 .style("font-family", "sans-serif")
// // // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // //                 .attr("text-anchor", "middle")
// // // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //                 .text(d => d.text);

// // // //             // Tooltip events
// // // //             textElements
// // // //                 .on("mouseover", (event, d) => {
// // // //                     d3.select(tooltipRef.current)
// // // //                         .style("opacity", 1)
// // // //                         .html(`
// // // //                             Word: ${d.text}<br>
// // // //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// // // //                             Rendered Font Size: ${fontSizeScale(d.size)}
// // // //                         `)
// // // //                         .style("left", (event.pageX + 5) + "px")
// // // //                         .style("top", (event.pageY - 28) + "px");
// // // //                 })
// // // //                 .on("mouseout", () => {
// // // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // // //                 });
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="centered-container">
// // // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //             </div>
// // // //             <div className="filter-options">
// // // //                 <label>
// // // //                     Display Mode:
// // // //                     <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                         <option value="All">All</option>
// // // //                         <option value="Top 10">Top 10 Largest</option>
// // // //                     </select>
// // // //                 </label>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // // export default WordCloud;
// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("Top 10");
// // // //     const tooltipRef = useRef(null);

// // // //     const chartDimensions = { width: 800, height: 500 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words;
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;
    
// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// // // //         const words = getFilteredData();
    
// // // //         const maxFontSize = 60; // Adjust maximum font size to fit within the layout
// // // //         const minFontSize = 15; // Adjust minimum font size
// // // //         const fontSizeScale = d3.scaleLinear()
// // // //             .domain([Math.min(...values), Math.max(...values)])
// // // //             .range([minFontSize, maxFontSize]);
    
// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(8) // Increase padding between words
// // // //             .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Random rotation
// // // //             .fontSize(d => fontSizeScale(d.size))
// // // //             .on("end", renderWords);
    
// // // //         layout.start();
    
// // // //         function renderWords(words) {
// // // //             const textElements = svg.selectAll("text")
// // // //                 .data(words)
// // // //                 .enter()
// // // //                 .append("text")
// // // //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// // // //                 .style("font-family", "sans-serif")
// // // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // //                 .attr("text-anchor", "middle")
// // // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //                 .text(d => d.text);
    
// // // //             // Tooltip events
// // // //             textElements
// // // //                 .on("mouseover", (event, d) => {
// // // //                     d3.select(tooltipRef.current)
// // // //                         .style("opacity", 1)
// // // //                         .html(`
// // // //                             Word: ${d.text}<br>
// // // //                             Original Size: ${d.size}<br>
// // // //                             Rendered Font Size: ${fontSizeScale(d.size)}
// // // //                         `)
// // // //                         .style("left", (event.pageX + 5) + "px")
// // // //                         .style("top", (event.pageY - 28) + "px");
// // // //                 })
// // // //                 .on("mouseout", () => {
// // // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // // //                 });
// // // //         }
// // // //     };
    

// // // //     return (
// // // //         <div className="centered-container">
// // // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //             </div>
// // // //             <div className="filter-options">
// // // //                 <label>
// // // //                     Display Mode:
// // // //                     <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                         <option value="All">All</option>
// // // //                         <option value="Top 10">Top 10 Largest</option>
// // // //                     </select>
// // // //                 </label>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // // export default WordCloud;
// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const tooltipRef = useRef(null);
// // // //     const [displayCount, setDisplayCount] = useState(10); 
// // // //     const [hasAlerted, setHasAlerted] = useState(false);

// // // //     const chartDimensions = { width: 800, height: 500 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //         console.log("categories",categories)
// // // //         console.log("values",values)
// // // //     }, [categories, values, areaColor, displayCount]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         // Sort and limit words based on the display count
// // // //         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;
    
// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// // // //         const words = getFilteredData();
    
// // // //         const maxFontSize = 60;
// // // //         const minFontSize = 15;
// // // //         const fontSizeScale = d3.scaleLinear()
// // // //             .domain([Math.min(...values), Math.max(...values)])
// // // //             .range([minFontSize, maxFontSize]);
    
// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(8)
// // // //             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// // // //             .fontSize(d => fontSizeScale(d.size))
// // // //             .on("end", renderWords);
    
// // // //         layout.start();
    
// // // //         function renderWords(words) {
// // // //             const textElements = svg.selectAll("text")
// // // //                 .data(words)
// // // //                 .enter()
// // // //                 .append("text")
// // // //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// // // //                 .style("font-family", "sans-serif")
// // // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // //                 .attr("text-anchor", "middle")
// // // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //                 .text(d => d.text);
    
// // // //             // Tooltip events
// // // //             textElements
// // // //                 .on("mouseover", (event, d) => {
// // // //                     d3.select(tooltipRef.current)
// // // //                         .style("opacity", 1)
// // // //                         .html(`
// // // //                             Word: ${d.text}<br>
// // // //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// // // //                            Rendered Font Size: ${fontSizeScale(d.size)}
                            
// // // //                         `)
// // // //                         .style("left", (event.pageX + 5) + "px")
// // // //                         .style("top", (event.pageY - 28) + "px");
// // // //                 })
// // // //                 .on("mouseout", () => {
// // // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // // //                 });
// // // //         }
// // // //     };
    
// // // //     const handleSliderChange = (event) => {
// // // //         const newCount = Number(event.target.value);
// // // //         setDisplayCount(newCount);

// // // //         // Show alert only if changing from default and the alert hasn't been shown yet
// // // //         if (!hasAlerted && newCount !== 10) {
// // // //             alert(`Display mode changed to show top ${newCount} words`);
// // // //             setHasAlerted(true);
// // // //         }
// // // //     };
// // // //     return (
// // // //         <div className="centered-container">
// // // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //             </div>
// // // //             <div className="filter-options">
// // // //                 <label>
// // // //                     Display Mode (Top N Words):
// // // //                     <input
// // // //                         type="range"
// // // //                         min="1"
// // // //                         max={categories.length}
// // // //                         value={displayCount}
// // // //                         onChange={handleSliderChange}
// // // //                     />
// // // //                     <span>{displayCount}</span>
// // // //                 </label>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // export default WordCloud;

// // // import React, { useEffect, useRef, useState } from 'react';
// // // import * as d3 from 'd3';
// // // import { useSelector } from 'react-redux';
// // // import d3Cloud from 'd3-cloud';
// // // import './WordCloud.css';

// // // const WordCloud = ({ categories, values }) => {
// // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // //     const chartRef = useRef(null);
// // //     const tooltipRef = useRef(null);
// // //     const [displayCount, setDisplayCount] = useState(10); 
// // //     const [hasAlerted, setHasAlerted] = useState(false);

// // //     const chartDimensions = { width: 800, height: 500 };

// // //     useEffect(() => {
// // //         if (categories && values) {
// // //             drawChart();
// // //         }
// // //         console.log("categories",categories)
// // //         console.log("values",values)
// // //     }, [categories, values, areaColor, displayCount]);

// // //     const getFilteredData = () => {
// // //         const words = categories.map((category, index) => ({
// // //             text: category,
// // //             size: values[index],
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
    
// // //         const maxFontSize = 60;
// // //         const minFontSize = 15;
// // //         const fontSizeScale = d3.scaleLinear()
// // //             .domain([Math.min(...values), Math.max(...values)])
// // //             .range([minFontSize, maxFontSize]);
    
// // //         const layout = d3Cloud()
// // //             .size([width, height])
// // //             .words(words)
// // //             .padding(8)
// // //             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// // //             .fontSize(d => fontSizeScale(d.size))
// // //             .on("end", renderWords);
    
// // //         layout.start();
    
// // //         function renderWords(words) {
// // //             const textElements = svg.selectAll("text")
// // //                 .data(words)
// // //                 .enter()
// // //                 .append("text")
// // //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// // //                 .style("font-family", "sans-serif")
// // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
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
// // //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// // //                            Rendered Font Size: ${fontSizeScale(d.size)}
                            
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

// // //         // Show alert only if changing from default and the alert hasn't been shown yet
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
// // //                         max={categories.length}
// // //                         value={displayCount}
// // //                         onChange={handleSliderChange}
// // //                     />
// // //                     <span>{displayCount}</span>
// // //                 </label>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // WordCloud.defaultProps = {
// // //     categories: [],
// // //     values: [],
// // // };

// // // export default WordCloud;// // // // // // // // // // // src/WordCloud.js
// // // // // // // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // // // import cloud from 'd3-cloud';

// // // // // // // // // // // // const WordCloud = () => {
// // // // // // // // // // // //     const data = [
// // // // // // // // // // // //         { text: 'React', size: 40 },
// // // // // // // // // // // //         { text: 'D3', size: 30 },
// // // // // // // // // // // //         { text: 'JavaScript', size: 50 },
// // // // // // // // // // // //         { text: 'CSS', size: 20 },
// // // // // // // // // // // //         { text: 'HTML', size: 25 },
// // // // // // // // // // // //         { text: 'Word Cloud', size: 45 },
// // // // // // // // // // // //         { text: 'Visualization', size: 35 },
// // // // // // // // // // // //         { text: 'Data', size: 15 },
// // // // // // // // // // // //         { text: 'Chart', size: 10 },
// // // // // // // // // // // //       ];
    
// // // // // // // // // // // //   const svgRef = useRef();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const width = 600;
// // // // // // // // // // // //     const height = 400;

// // // // // // // // // // // //     const layout = cloud()
// // // // // // // // // // // //       .size([width, height])
// // // // // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // // // // //       .padding(5)
// // // // // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90) // Random rotation: 0 or 90 degrees
// // // // // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // // // // //       .on("end", draw);

// // // // // // // // // // // //     layout.start();

// // // // // // // // // // // //     function draw(words) {
// // // // // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // // // // //         .attr("width", width)
// // // // // // // // // // // //         .attr("height", height)
// // // // // // // // // // // //         .append("g")
// // // // // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // // // //       svg.selectAll("text")
// // // // // // // // // // // //         .data(words)
// // // // // // // // // // // //         .enter().append("text")
// // // // // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // // // //         .text(d => d.text);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [data]);

// // // // // // // // // // // //   return <svg ref={svgRef}></svg>;
// // // // // // // // // // // // };

// // // // // // // // // // // // export default WordCloud;
// // // // // // // // // // // // src/WordCloud.js
// // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // // // // import Slider from '@mui/material/Slider';
// // // // // // // // // // // import { useSelector } from 'react-redux';

// // // // // // // // // // // const WordCloud = ({ categories = [], values = [], initialWidth = 800, initialHeight = 500 }) => {
// // // // // // // // // // //     const svgRef = useRef();
// // // // // // // // // // //     const [sliderValue, setSliderValue] = useState(1);
// // // // // // // // // // //     const chartColor = useSelector((state) => state.chartColor.chartColor);

// // // // // // // // // // //     // Adjust the word sizes with the slider
// // // // // // // // // // //     const handleSliderChange = (event, newValue) => {
// // // // // // // // // // //         setSliderValue(newValue);
// // // // // // // // // // //     };

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
// // // // // // // // // // //             console.warn("Categories or values array is empty.");
// // // // // // // // // // //             return;
// // // // // // // // // // //         }

// // // // // // // // // // //         // Adjust word sizes based on slider
// // // // // // // // // // //         const adjustedValues = values.map(value => value * sliderValue);
// // // // // // // // // // //         const data = categories.map((category, index) => ({
// // // // // // // // // // //             text: category,
// // // // // // // // // // //             size: adjustedValues[index] || 0
// // // // // // // // // // //         }));

// // // // // // // // // // //         // Log to verify data flow
// // // // // // // // // // //         console.log("Word Cloud data:", data);

// // // // // // // // // // //         const width = initialWidth;
// // // // // // // // // // //         const height = initialHeight;

// // // // // // // // // // //         // Define the layout for d3-cloud
// // // // // // // // // // //         const layout = cloud()
// // // // // // // // // // //             .size([width, height])
// // // // // // // // // // //             .words(data)
// // // // // // // // // // //             .padding(5)
// // // // // // // // // // //             .rotate(() => Math.floor(Math.random() * 2) * 90) // Random 0 or 90 degree rotation
// // // // // // // // // // //             .fontSize(d => d.size)
// // // // // // // // // // //             .on("end", draw);

// // // // // // // // // // //         layout.start();

// // // // // // // // // // //         function draw(words) {
// // // // // // // // // // //             // Clear any existing SVG content
// // // // // // // // // // //             d3.select(svgRef.current).selectAll("*").remove();

// // // // // // // // // // //             // Set up the SVG element and center the word cloud
// // // // // // // // // // //             const svg = d3.select(svgRef.current)
// // // // // // // // // // //                 .attr("width", width)
// // // // // // // // // // //                 .attr("height", height)
// // // // // // // // // // //                 .append("g")
// // // // // // // // // // //                 .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // // //             svg.selectAll("text")
// // // // // // // // // // //                 .data(words)
// // // // // // // // // // //                 .enter().append("text")
// // // // // // // // // // //                 .attr("font-family", "Impact")
// // // // // // // // // // //                 .attr("font-size", d => d.size)
// // // // // // // // // // //                 .attr("fill", () => chartColor || d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // // //                 .attr("text-anchor", "middle")
// // // // // // // // // // //                 .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // // //                 .text(d => d.text);
// // // // // // // // // // //         }
// // // // // // // // // // //     }, [categories, values, sliderValue, chartColor, initialWidth, initialHeight]);

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div>
// // // // // // // // // // //             <h3>Word Cloud of Data</h3>
// // // // // // // // // // //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// // // // // // // // // // //                 <label>Adjust Word Size:</label>
// // // // // // // // // // //                 <Slider
// // // // // // // // // // //                     min={0.1}
// // // // // // // // // // //                     max={5}
// // // // // // // // // // //                     step={0.1}
// // // // // // // // // // //                     value={sliderValue}
// // // // // // // // // // //                     onChange={handleSliderChange}
// // // // // // // // // // //                     sx={{ width: 200, margin: '0 15px' }}
// // // // // // // // // // //                 />
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <svg ref={svgRef}></svg>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // };

// // // // // // // // // // // export default WordCloud;
// // // // // // // // // // // src/App.js
// // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // // import cloud from 'd3-cloud';

// // // // // // // // // // const App = () => {
// // // // // // // // // //   const [data, setData] = useState([]);
// // // // // // // // // //   const svgRef = useRef();

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (data.length === 0) return;

// // // // // // // // // //     const width = 600;
// // // // // // // // // //     const height = 400;

// // // // // // // // // //     const layout = cloud()
// // // // // // // // // //       .size([width, height])
// // // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // // //       .padding(5)
// // // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // // //       .on("end", draw);

// // // // // // // // // //     layout.start();

// // // // // // // // // //     function draw(words) {
// // // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // // //         .attr("width", width)
// // // // // // // // // //         .attr("height", height)
// // // // // // // // // //         .append("g")
// // // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // // //       svg.selectAll("text")
// // // // // // // // // //         .data(words)
// // // // // // // // // //         .enter().append("text")
// // // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // // //         .text(d => d.text);
// // // // // // // // // //     }
// // // // // // // // // //   }, [data]);

// // // // // // // // // //   const handleFileUpload = (event) => {
// // // // // // // // // //     const file = event.target.files[0];
// // // // // // // // // //     if (!file) return;

// // // // // // // // // //     const reader = new FileReader();
// // // // // // // // // //     reader.onload = (e) => {
// // // // // // // // // //       const text = e.target.result;
// // // // // // // // // //       const words = text.split(/\s+/); // Split text into words
// // // // // // // // // //       const wordCounts = {};
      
// // // // // // // // // //       // Count occurrences of each word
// // // // // // // // // //       words.forEach(word => {
// // // // // // // // // //         word = word.toLowerCase(); // Convert to lowercase
// // // // // // // // // //         if (word) {
// // // // // // // // // //           wordCounts[word] = (wordCounts[word] || 0) + 1;
// // // // // // // // // //         }
// // // // // // // // // //       });

// // // // // // // // // //       // Transform the word counts into the format for the word cloud
// // // // // // // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // // // // // // //         text: word,
// // // // // // // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // // // // // // //       }));

// // // // // // // // // //       setData(wordData); // Update state with word data
// // // // // // // // // //     };
// // // // // // // // // //     reader.readAsText(file);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <h1>Word Cloud from Text File</h1>
// // // // // // // // // //       <input type="file" accept=".txt" onChange={handleFileUpload} />
// // // // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default App;
// // // // // // // // // // src/App.js// src/App.js
// // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // import * as d3 from 'd3';
// // // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // // import * as XLSX from 'xlsx';

// // // // // // // // // const App = () => {
// // // // // // // // //   const [data, setData] = useState([]);
// // // // // // // // //   const svgRef = useRef();

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (data.length === 0) return;

// // // // // // // // //     const width = 600;
// // // // // // // // //     const height = 400;

// // // // // // // // //     const layout = cloud()
// // // // // // // // //       .size([width, height])
// // // // // // // // //       .words(data.map(d => ({ text: d.text, size: d.size })))
// // // // // // // // //       .padding(5)
// // // // // // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // // // // // //       .fontSize(d => d.size)
// // // // // // // // //       .on("end", draw);

// // // // // // // // //     layout.start();

// // // // // // // // //     function draw(words) {
// // // // // // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // // //         .attr("width", width)
// // // // // // // // //         .attr("height", height)
// // // // // // // // //         .append("g")
// // // // // // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // // // // // //       svg.selectAll("text")
// // // // // // // // //         .data(words)
// // // // // // // // //         .enter().append("text")
// // // // // // // // //         .attr("font-family", "Impact")
// // // // // // // // //         .attr("font-size", d => d.size)
// // // // // // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // // //         .attr("text-anchor", "middle")
// // // // // // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // // // //         .text(d => d.text);
// // // // // // // // //     }
// // // // // // // // //   }, [data]);

// // // // // // // // //   const handleFileUpload = (event) => {
// // // // // // // // //     const file = event.target.files[0];
// // // // // // // // //     if (!file) return;

// // // // // // // // //     const reader = new FileReader();
// // // // // // // // //     reader.onload = (e) => {
// // // // // // // // //       const binaryStr = e.target.result;
// // // // // // // // //       const workbook = XLSX.read(binaryStr, { type: 'binary' });
// // // // // // // // //       const sheetName = workbook.SheetNames[0]; // Get the first sheet
// // // // // // // // //       const worksheet = workbook.Sheets[sheetName];

// // // // // // // // //       // Convert the data from the Excel sheet to JSON
// // // // // // // // //       const jsonData = XLSX.utils.sheet_to_json(worksheet);

// // // // // // // // //       // Assuming the words are in a column named 'Word' and we want to count them
// // // // // // // // //       const wordCounts = {};
// // // // // // // // //       jsonData.forEach(row => {
// // // // // // // // //         const word = row.Word; // Change 'Word' to your specific column name
// // // // // // // // //         if (word) {
// // // // // // // // //           const lowerCaseWord = word.toLowerCase();
// // // // // // // // //           wordCounts[lowerCaseWord] = (wordCounts[lowerCaseWord] || 0) + 1;
// // // // // // // // //         }
// // // // // // // // //       });

// // // // // // // // //       // Transform word counts into the format for the word cloud
// // // // // // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // // // // // //         text: word,
// // // // // // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // // // // // //       }));

// // // // // // // // //       setData(wordData); // Update state with word data
// // // // // // // // //     };
// // // // // // // // //     reader.readAsBinaryString(file); // Read as binary string for XLSX
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <h1>Word Cloud from Excel File</h1>
// // // // // // // // //       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
// // // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default App;
// // // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // // import * as d3 from 'd3';
// // // // // // // // import cloud from 'd3-cloud';
// // // // // // // // import { useSelector } from 'react-redux';

// // // // // // // // const WordCloud = () => {
// // // // // // // //   const svgRef = useRef();
// // // // // // // //   const xAxisData = useSelector((state) => state.chart.xAxis); // Assumes xAxis data holds the words/categories
// // // // // // // //   const dimensions = { width: 960, height: 600 };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!xAxisData || xAxisData.length === 0) return;

// // // // // // // //     const words = xAxisData.map((text) => ({ text, size: 10 + Math.random() * 50 }));

// // // // // // // //     const layout = cloud()
// // // // // // // //       .size([dimensions.width, dimensions.height])
// // // // // // // //       .words(words)
// // // // // // // //       .padding(5)
// // // // // // // //       .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// // // // // // // //       .fontSize((d) => d.size)
// // // // // // // //       .on('end', draw);

// // // // // // // //     layout.start();

// // // // // // // //     function draw(words) {
// // // // // // // //       const svg = d3.select(svgRef.current)
// // // // // // // //         .attr('width', dimensions.width)
// // // // // // // //         .attr('height', dimensions.height);

// // // // // // // //       svg.selectAll('*').remove(); // Clear previous renderings

// // // // // // // //       svg.append('g')
// // // // // // // //         .attr('transform', `translate(${dimensions.width / 2},${dimensions.height / 2})`)
// // // // // // // //         .selectAll('text')
// // // // // // // //         .data(words)
// // // // // // // //         .enter().append('text')
// // // // // // // //         .style('font-size', (d) => `${d.size}px`)
// // // // // // // //         .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // // //         .attr('text-anchor', 'middle')
// // // // // // // //         .attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // // // // // //         .text((d) => d.text);
// // // // // // // //     }
// // // // // // // //   }, [xAxisData]);

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <h2>Word Cloud</h2>
// // // // // // // //       <svg ref={svgRef}></svg>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default WordCloud;
// // // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // // import * as d3 from 'd3';
// // // // // // // import cloud from 'd3-cloud';

// // // // // // // const D3WordCloud = ({ categories = [], values = [] }) => {
// // // // // // //     const svgRef = useRef();

// // // // // // //     useEffect(() => {
// // // // // // //         const data = categories.map((category, index) => ({
// // // // // // //             text: category,
// // // // // // //             size: values[index] || 10  // Adjust the size based on value; default to 10 if undefined
// // // // // // //         }));

// // // // // // //         const svg = d3.select(svgRef.current);
// // // // // // //         const width = 500;
// // // // // // //         const height = 300;

// // // // // // //         svg.selectAll('*').remove();  // Clear previous renderings

// // // // // // //         const layout = cloud()
// // // // // // //             .size([width, height])
// // // // // // //             .words(data)
// // // // // // //             .padding(5)
// // // // // // //             .fontSize(d => d.size)
// // // // // // //             .rotate(() => ~~(Math.random() * 2) * 90)  // Rotate randomly between 0 and 90 degrees
// // // // // // //             .on('end', draw);

// // // // // // //         layout.start();

// // // // // // //         function draw(words) {
// // // // // // //             svg.append('g')
// // // // // // //                 .attr('transform', `translate(${width / 2},${height / 2})`)
// // // // // // //                 .selectAll('text')
// // // // // // //                 .data(words)
// // // // // // //                 .enter().append('text')
// // // // // // //                 .style('font-size', d => `${d.size}px`)
// // // // // // //                 .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // // // //                 .attr('text-anchor', 'middle')
// // // // // // //                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // // //                 .text(d => d.text)
// // // // // // //                 .on('mouseover', (event, d) => {
// // // // // // //                     d3.select(event.currentTarget).style('fill', 'red');
// // // // // // //                 })
// // // // // // //                 .on('mouseout', (event, d) => {
// // // // // // //                     d3.select(event.currentTarget).style('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]);
// // // // // // //                 });
// // // // // // //         }
// // // // // // //     }, [categories, values]);

// // // // // // //     return (
// // // // // // //         <div className="word-cloud">
// // // // // // //             <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 500 300" />
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default D3WordCloud;
// // // // // // import React, { useEffect, useRef } from 'react';
// // // // // // import * as d3 from 'd3';
// // // // // // import cloud from 'd3-cloud'; // Make sure you have d3-cloud installed

// // // // // // const D3WordCloud = ({ categories = [], values = [] }) => {
// // // // // //     const svgRef = useRef(null);
// // // // // //     const width = 500;
// // // // // //     const height = 300;

// // // // // //     useEffect(() => {
// // // // // //         if (!categories.length || !values.length) return;

// // // // // //         // Map categories to data with size
// // // // // //         const data = categories.map((category, index) => ({
// // // // // //             text: category,
// // // // // //             size: values[index] || 10 // Use default size if undefined
// // // // // //         }));

// // // // // //         // Set up the word cloud layout
// // // // // //         const layout = cloud()
// // // // // //             .size([width, height])
// // // // // //             .words(data)
// // // // // //             .padding(5)
// // // // // //             .fontSize(d => d.size) // Map size to font size
// // // // // //             .rotate(() => ~~(Math.random() * 2) * 90) // Rotate randomly
// // // // // //             .on('end', draw);

// // // // // //         // Start layout
// // // // // //         layout.start();

// // // // // //         function draw(words) {
// // // // // //             // Clear previous SVG content
// // // // // //             d3.select(svgRef.current).selectAll('*').remove();

// // // // // //             const svg = d3.select(svgRef.current)
// // // // // //                 .attr('width', width)
// // // // // //                 .attr('height', height)
// // // // // //                 .append('g')
// // // // // //                 .attr('transform', `translate(${width / 2}, ${height / 2})`);

// // // // // //             svg.selectAll('text')
// // // // // //                 .data(words)
// // // // // //                 .enter().append('text')
// // // // // //                 .style('font-size', d => `${d.size}px`)
// // // // // //                 .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)]) // Random colors
// // // // // //                 .attr('text-anchor', 'middle')
// // // // // //                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // // //                 .text(d => d.text)
// // // // // //                 .on('mouseover', (event, d) => {
// // // // // //                     d3.select(event.currentTarget).style('fill', 'red'); // Change color on hover
// // // // // //                 })
// // // // // //                 .on('mouseout', (event, d) => {
// // // // // //                     d3.select(event.currentTarget).style('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]); // Reset color
// // // // // //                 });
// // // // // //         }
// // // // // //     }, [categories, values]);

// // // // // //     return (
// // // // // //         <div className="word-cloud">
// // // // // //             <svg ref={svgRef} />
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default D3WordCloud;
// // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // import * as d3 from 'd3';
// // // // // import cloud from 'd3-cloud';

// // // // // const App = () => {
// // // // //   const [data, setData] = useState([]);
// // // // //   const [displayTop10, setDisplayTop10] = useState(false); // Toggle for top 10 words
// // // // //   const svgRef = useRef();
// // // // //   const tooltipRef = useRef();

// // // // //   useEffect(() => {
// // // // //     if (data.length === 0) return;

// // // // //     const width = 600;
// // // // //     const height = 400;

// // // // //     // Filter data for top 10 words if displayTop10 is true
// // // // //     const displayData = displayTop10 ? data.slice(0, 10) : data;

// // // // //     const layout = cloud()
// // // // //       .size([width, height])
// // // // //       .words(displayData.map(d => ({ text: d.text, size: d.size })))
// // // // //       .padding(5)
// // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // //       .fontSize(d => d.size)
// // // // //       .on("end", draw);

// // // // //     layout.start();

// // // // //     function draw(words) {
// // // // //       d3.select(svgRef.current).selectAll("*").remove(); // Clear previous content

// // // // //       const svg = d3.select(svgRef.current)
// // // // //         .attr("width", width)
// // // // //         .attr("height", height)
// // // // //         .append("g")
// // // // //         .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // // // //       svg.selectAll("text")
// // // // //         .data(words)
// // // // //         .enter().append("text")
// // // // //         .attr("font-family", "Impact")
// // // // //         .attr("font-size", d => d.size)
// // // // //         .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // // //         .attr("text-anchor", "middle")
// // // // //         .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
// // // // //         .text(d => d.text)
// // // // //         .on("mouseover", (event, d) => {
// // // // //           d3.select(tooltipRef.current)
// // // // //             .style("display", "block")
// // // // //             .style("left", `${event.pageX + 5}px`)
// // // // //             .style("top", `${event.pageY + 5}px`)
// // // // //             .html(`Word: ${d.text}<br>Count: ${d.size / 10}`);
// // // // //         })
// // // // //         .on("mouseout", () => {
// // // // //           d3.select(tooltipRef.current).style("display", "none");
// // // // //         });
// // // // //     }
// // // // //   }, [data, displayTop10]);

// // // // //   const handleFileUpload = (event) => {
// // // // //     const file = event.target.files[0];
// // // // //     if (!file) return;

// // // // //     const reader = new FileReader();
// // // // //     reader.onload = (e) => {
// // // // //       const text = e.target.result;
// // // // //       const words = text.split(/\s+/); // Split text into words
// // // // //       const wordCounts = {};

// // // // //       words.forEach(word => {
// // // // //         word = word.toLowerCase(); // Convert to lowercase
// // // // //         if (word) {
// // // // //           wordCounts[word] = (wordCounts[word] || 0) + 1;
// // // // //         }
// // // // //       });

// // // // //       const wordData = Object.keys(wordCounts).map(word => ({
// // // // //         text: word,
// // // // //         size: wordCounts[word] * 10, // Scale size for better visualization
// // // // //       })).sort((a, b) => b.size - a.size); // Sort by size in descending order

// // // // //       setData(wordData); // Update state with word data
// // // // //     };
// // // // //     reader.readAsText(file);
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Word Cloud from Text File</h1>
// // // // //       <input type="file" accept=".txt" onChange={handleFileUpload} />
// // // // //       <button onClick={() => setDisplayTop10(!displayTop10)}>
// // // // //         {displayTop10 ? 'Show All Words' : 'Show Top 10 Words'}
// // // // //       </button>
// // // // //       <svg ref={svgRef}></svg>
// // // // //       <div
// // // // //         ref={tooltipRef}
// // // // //         style={{
// // // // //           position: "absolute",
// // // // //           backgroundColor: "white",
// // // // //           border: "1px solid #ccc",
// // // // //           padding: "5px",
// // // // //           display: "none",
// // // // //           pointerEvents: "none",
// // // // //         }}
// // // // //       ></div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default App;

// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("All"); // Toggle between "All" and "Top 10"
// // // //     const tooltipRef = useRef(null);

// // // //     // Set fixed dimensions for the word cloud chart
// // // //     const chartDimensions = { width: 500, height: 800 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             // Sort words by size and take the top 10 largest values
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words; // Return all values when "All" is selected
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;

// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);

// // // //         const words = getFilteredData();

// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(8)
// // // //             .rotate(() => (Math.random() * 2) * 90)
// // // //             .fontSize(d => d.size)
// // // //             .on("end", renderWords);
// // // // //     const layout = cloud()
// // // // //       .size([width, height])
// // // // //       .words(displayData.map(d => ({ text: d.text, size: d.size })))
// // // // //       .padding(5)
// // // // //       .rotate(() => Math.floor(Math.random() * 2) * 90)
// // // // //       .fontSize(d => d.size)
// // // // //       .on("end", draw);
// // // //         layout.start();

// // // //         function renderWords(words) {
// // // //           const textElements = svg.selectAll("text")
// // // //               .data(words)
// // // //               .enter()
// // // //               .append("text")
// // // //               .style("font-size", d => Math.sqrt(d.size) * 15 + "px")  // Rendering size only
// // // //               .style("font-family", "sans-serif")
// // // //               .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
              
// // // //               .attr("text-anchor", "middle")
// // // //               .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //               .text(d => d.text);
      
// // // //           // Tooltip event with unaltered original size
// // // //           textElements
// // // //               .on("mouseover", (event, d) => {
// // // //                   d3.select(tooltipRef.current)
// // // //                       .style("opacity", 1)
// // // //                       .html(`
// // // //                           Word: ${d.text}<br>
// // // //                           Original Size: ${values[categories.indexOf(d.text)]}<br> <!-- Directly reference original value -->
// // // //                           Rendered Font Size: ${Math.sqrt(d.size) * 15}
// // // //                       `)
// // // //                       .style("left", (event.pageX + 5) + "px")
// // // //                       .style("top", (event.pageY - 28) + "px");
// // // //               })
// // // //               .on("mouseout", () => {
// // // //                   d3.select(tooltipRef.current).style("opacity", 0);
// // // //               });
            
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="app">
// // // //             <div className="row">
// // // //                 <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                     <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                     <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //                 </div>

// // // //                 <div className="filter-options">
// // // //                     <label>
// // // //                         Display Mode:
// // // //                         <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                             <option value="All">All</option>
// // // //                             <option value="Top 10">Top 10 Largest</option>
// // // //                         </select>
// // // //                     </label>
// // // //                 </div>

// // // //                 <div className="color-picker-container">
// // // //                     {/* Additional content */}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // export default WordCloud;

// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("Top 10"); // Toggle between "All" and "Top 10"
// // // //     const tooltipRef = useRef(null);

// // // //     // Set fixed dimensions for the word cloud chart
// // // //     const chartDimensions = { width: 800, height: 500 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words;
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;

// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);

// // // //         const words = getFilteredData();

// // // //         const fontSizeScale = d3.scaleLinear()
// // // //             .domain([Math.min(...values), Math.max(...values)])
// // // //             .range([5, 40]);

// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(5)
// // // //             .rotate(() => Math.random() * 90)
// // // //             .fontSize(d => fontSizeScale(d.size))
// // // //             .on("end", renderWords);

// // // //         layout.start();

// // // //         function renderWords(words) {
// // // //             const textElements = svg.selectAll("text")
// // // //                 .data(words)
// // // //                 .enter()
// // // //                 .append("text")
// // // //                 .style("font-size", d => Math.sqrt(d.size) * 10 )
// // // //                 .style("font-family", "sans-serif")
// // // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // //                 .attr("text-anchor", "middle")
// // // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //                 .text(d => d.text);

// // // //             // Tooltip events
// // // //             textElements
// // // //                 .on("mouseover", (event, d) => {
// // // //                     d3.select(tooltipRef.current)
// // // //                         .style("opacity", 1)
// // // //                         .html(`
// // // //                             Word: ${d.text}<br>
// // // //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// // // //                             Rendered Font Size: ${fontSizeScale(d.size)}
// // // //                         `)
// // // //                         .style("left", (event.pageX + 5) + "px")
// // // //                         .style("top", (event.pageY - 28) + "px");
// // // //                 })
// // // //                 .on("mouseout", () => {
// // // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // // //                 });
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="centered-container">
// // // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //             </div>
// // // //             <div className="filter-options">
// // // //                 <label>
// // // //                     Display Mode:
// // // //                     <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                         <option value="All">All</option>
// // // //                         <option value="Top 10">Top 10 Largest</option>
// // // //                     </select>
// // // //                 </label>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // // export default WordCloud;






// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { useSelector } from 'react-redux';
// // // // import d3Cloud from 'd3-cloud';
// // // // import './WordCloud.css';

// // // // const WordCloud = ({ categories, values }) => {
// // // //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// // // //     const chartRef = useRef(null);
// // // //     const [displayMode, setDisplayMode] = useState("Top 10");
// // // //     const tooltipRef = useRef(null);

// // // //     const chartDimensions = { width: 800, height: 500 };

// // // //     useEffect(() => {
// // // //         if (categories && values) {
// // // //             drawChart();
// // // //         }
// // // //     }, [categories, values, areaColor, displayMode]);

// // // //     const getFilteredData = () => {
// // // //         const words = categories.map((category, index) => ({
// // // //             text: category,
// // // //             size: values[index],
// // // //         }));

// // // //         if (displayMode === "Top 10") {
// // // //             return words.sort((a, b) => b.size - a.size).slice(0, 10);
// // // //         }
// // // //         return words;
// // // //     };

// // // //     const drawChart = () => {
// // // //         d3.select(chartRef.current).select("svg").remove();
// // // //         const { width, height } = chartDimensions;
    
// // // //         const svg = d3.select(chartRef.current)
// // // //             .append("svg")
// // // //             .attr("width", width)
// // // //             .attr("height", height)
// // // //             .append("g")
// // // //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// // // //         const words = getFilteredData();
    
// // // //         const maxFontSize = 60; // Adjust maximum font size to fit within the layout
// // // //         const minFontSize = 15; // Adjust minimum font size
// // // //         const fontSizeScale = d3.scaleLinear()
// // // //             .domain([Math.min(...values), Math.max(...values)])
// // // //             .range([minFontSize, maxFontSize]);
    
// // // //         const layout = d3Cloud()
// // // //             .size([width, height])
// // // //             .words(words)
// // // //             .padding(8) // Increase padding between words
// // // //             .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Random rotation
// // // //             .fontSize(d => fontSizeScale(d.size))
// // // //             .on("end", renderWords);
    
// // // //         layout.start();
    
// // // //         function renderWords(words) {
// // // //             const textElements = svg.selectAll("text")
// // // //                 .data(words)
// // // //                 .enter()
// // // //                 .append("text")
// // // //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// // // //                 .style("font-family", "sans-serif")
// // // //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// // // //                 .attr("text-anchor", "middle")
// // // //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// // // //                 .text(d => d.text);
    
// // // //             // Tooltip events
// // // //             textElements
// // // //                 .on("mouseover", (event, d) => {
// // // //                     d3.select(tooltipRef.current)
// // // //                         .style("opacity", 1)
// // // //                         .html(`
// // // //                             Word: ${d.text}<br>
// // // //                             Original Size: ${d.size}<br>
// // // //                             Rendered Font Size: ${fontSizeScale(d.size)}
// // // //                         `)
// // // //                         .style("left", (event.pageX + 5) + "px")
// // // //                         .style("top", (event.pageY - 28) + "px");
// // // //                 })
// // // //                 .on("mouseout", () => {
// // // //                     d3.select(tooltipRef.current).style("opacity", 0);
// // // //                 });
// // // //         }
// // // //     };
    

// // // //     return (
// // // //         <div className="centered-container">
// // // //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// // // //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// // // //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// // // //             </div>
// // // //             <div className="filter-options">
// // // //                 <label>
// // // //                     Display Mode:
// // // //                     <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
// // // //                         <option value="All">All</option>
// // // //                         <option value="Top 10">Top 10 Largest</option>
// // // //                     </select>
// // // //                 </label>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // WordCloud.defaultProps = {
// // // //     categories: [],
// // // //     values: [],
// // // // };

// // // // // // export default WordCloud;
// // import React, { useEffect, useRef, useState } from 'react';
// // import * as d3 from 'd3';
// // import { useSelector } from 'react-redux';
// // import d3Cloud from 'd3-cloud';
// // import './WordCloud.css';

// // const WordCloud = ({ categories, values }) => {
// //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// //     const chartRef = useRef(null);
// //     const tooltipRef = useRef(null);
// //     const [displayCount, setDisplayCount] = useState(10); 
// //     const [hasAlerted, setHasAlerted] = useState(false);

// //     const chartDimensions = { width: 800, height: 500 };

// //     useEffect(() => {
// //         if (categories && values) {
// //             drawChart();
// //         }
// //         console.log("categories",categories)
// //         console.log("values",values)
// //     }, [categories, values, areaColor, displayCount]);

// //     const getFilteredData = () => {
// //         const words = categories.map((category, index) => ({
// //             text: category,
// //             size: values[index],
// //         }));

// //         // Sort and limit words based on the display count
// //         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
// //     };

// //     const drawChart = () => {
// //         d3.select(chartRef.current).select("svg").remove();
// //         const { width, height } = chartDimensions;
    
// //         const svg = d3.select(chartRef.current)
// //             .append("svg")
// //             .attr("width", width)
// //             .attr("height", height)
// //             .append("g")
// //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// //         const words = getFilteredData();
    
// //         const maxFontSize = 60;
// //         const minFontSize = 15;
// //         const fontSizeScale = d3.scaleLinear()
// //             .domain([Math.min(...values), Math.max(...values)])
// //             .range([minFontSize, maxFontSize]);
    
// //         const layout = d3Cloud()
// //             .size([width, height])
// //             .words(words)
// //             .padding(8)
// //             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// //             .fontSize(d => fontSizeScale(d.size))
// //             .on("end", renderWords);
    
// //         layout.start();
    
// //         function renderWords(words) {
// //             const textElements = svg.selectAll("text")
// //                 .data(words)
// //                 .enter()
// //                 .append("text")
// //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// //                 .style("font-family", "sans-serif")
// //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// //                 .attr("text-anchor", "middle")
// //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// //                 .text(d => d.text);
    
// //             // Tooltip events
// //             textElements
// //                 .on("mouseover", (event, d) => {
// //                     d3.select(tooltipRef.current)
// //                         .style("opacity", 1)
// //                         .html(`
// //                             Word: ${d.text}<br>
// //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// //                            Rendered Font Size: ${fontSizeScale(d.size)}
                            
// //                         `)
// //                         .style("left", (event.pageX + 5) + "px")
// //                         .style("top", (event.pageY - 28) + "px");
// //                 })
// //                 .on("mouseout", () => {
// //                     d3.select(tooltipRef.current).style("opacity", 0);
// //                 });
// //         }
// //     };
    
// //     const handleSliderChange = (event) => {
// //         const newCount = Number(event.target.value);
// //         setDisplayCount(newCount);

// //         // Show alert only if changing from default and the alert hasn't been shown yet
// //         if (!hasAlerted && newCount !== 10) {
// //             alert(`Display mode changed to show top ${newCount} words`);
// //             setHasAlerted(true);
// //         }
// //     };
// //     return (
// //         <div className="centered-container">
// //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// //             </div>
// //             <div className="filter-options">
// //                 <label>
// //                     Display Mode (Top N Words):
// //                     <input
// //                         type="range"
// //                         min="1"
// //                         max={categories.length}
// //                         value={displayCount}
// //                         onChange={handleSliderChange}
// //                     />
// //                     <span>{displayCount}</span>
// //                 </label>
// //             </div>
// //         </div>
// //     );
// // };

// // WordCloud.defaultProps = {
// //     categories: [],
// //     values: [],
// // };

// // export default WordCloud;



// // import React, { useEffect, useRef, useState } from 'react';
// // import * as d3 from 'd3';
// // import { useSelector } from 'react-redux';
// // import d3Cloud from 'd3-cloud';
// // import './WordCloud.css';

// // const WordCloud = ({ categories, values }) => {
// //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// //     const chartRef = useRef(null);
// //     const tooltipRef = useRef(null);
// //     const [displayCount, setDisplayCount] = useState(10); 
// //     const [hasAlerted, setHasAlerted] = useState(false);

// //     const chartDimensions = { width: 800, height: 500 };

// //     useEffect(() => {
// //         if (categories && values) {
// //             drawChart();
// //         }
// //         console.log("categories",categories)
// //         console.log("values",values)
// //     }, [categories, values, areaColor, displayCount]);

// //     const getFilteredData = () => {
// //         const words = categories.map((category, index) => ({
// //             text: category,
// //             size: values[index],
// //         }));

// //         // Sort and limit words based on the display count
// //         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
// //     };

// //     const drawChart = () => {
// //         d3.select(chartRef.current).select("svg").remove();
// //         const { width, height } = chartDimensions;
    
// //         const svg = d3.select(chartRef.current)
// //             .append("svg")
// //             .attr("width", width)
// //             .attr("height", height)
// //             .append("g")
// //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// //         const words = getFilteredData();
    
// //         const maxFontSize = 60;
// //         const minFontSize = 15;
// //         const fontSizeScale = d3.scaleLinear()
// //             .domain([Math.min(...values), Math.max(...values)])
// //             .range([minFontSize, maxFontSize]);
    
// //         const layout = d3Cloud()
// //             .size([width, height])
// //             .words(words)
// //             .padding(8)
// //             .rotate(() => (Math.random() > 0.5 ? 0 : 90))
// //             .fontSize(d => fontSizeScale(d.size))
// //             .on("end", renderWords);
    
// //         layout.start();
    
// //         function renderWords(words) {
// //             const textElements = svg.selectAll("text")
// //                 .data(words)
// //                 .enter()
// //                 .append("text")
// //                 .style("font-size", d => `${fontSizeScale(d.size)}px`)
// //                 .style("font-family", "sans-serif")
// //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// //                 .attr("text-anchor", "middle")
// //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// //                 .text(d => d.text);
    
// //             // Tooltip events
// //             textElements
// //                 .on("mouseover", (event, d) => {
// //                     d3.select(tooltipRef.current)
// //                         .style("opacity", 1)
// //                         .html(`
// //                             Word: ${d.text}<br>
// //                             Original Size: ${values[categories.indexOf(d.text)]}<br>
// //                            Rendered Font Size: ${fontSizeScale(d.size)}
                            
// //                         `)
// //                         .style("left", (event.pageX + 5) + "px")
// //                         .style("top", (event.pageY - 28) + "px");
// //                 })
// //                 .on("mouseout", () => {
// //                     d3.select(tooltipRef.current).style("opacity", 0);
// //                 });
// //         }
// //     };
    
// //     const handleSliderChange = (event) => {
// //         const newCount = Number(event.target.value);
// //         setDisplayCount(newCount);

// //         // Show alert only if changing from default and the alert hasn't been shown yet
// //         if (!hasAlerted && newCount !== 10) {
// //             alert(`Display mode changed to show top ${newCount} words`);
// //             setHasAlerted(true);
// //         }
// //     };
// //     return (
// //         <div className="centered-container">
// //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// //                 <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
// //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// //             </div>
// //             <div className="filter-options">
// //                 <label>
// //                     Display Mode (Top N Words):
// //                     <input
// //                         type="range"
// //                         min="1"
// //                         max={categories.length}
// //                         value={displayCount}
// //                         onChange={handleSliderChange}
// //                     />
// //                     <span>{displayCount}</span>
// //                 </label>
// //             </div>
// //         </div>
// //     );
// // };

// // WordCloud.defaultProps = {
// //     categories: [],
// //     values: [],
// // };
// // export default WordCloud;




// // import React, { useEffect, useRef, useState } from 'react';
// // import * as d3 from 'd3';
// // import { useSelector } from 'react-redux';
// // import d3Cloud from 'd3-cloud';
// // import './WordCloud.css';

// // const WordCloud = (categories,values) => {
// //     const areaColor = useSelector((state) => state.chartColor.chartColor);
// //     const chartRef = useRef(null);
// //     const tooltipRef = useRef(null);
// //     const [wordCloudData, setWordCloudData] = useState({ categories: [], values: [] });
// //     const [displayCount, setDisplayCount] = useState(10);
// //     const [hasAlerted, setHasAlerted] = useState(false);

// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const xAxis = useSelector((state) => state.chart.xAxis); // categories
// //     const databaseName = localStorage.getItem('company_name');
// //     const chartDimensions = { width: 800, height: 500 };

// //     console.log("cat",categories)
// //     console.log()
// //     useEffect(() => {
// //         const fetchWordCloudData = async () => {
// //             try {
// //                 const response = await fetch('http://localhost:5000/wordcloud-data', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     },
// //                     body: JSON.stringify({
// //                         category: xAxis,
                    
// //                     tableName: selectedTable,
// //                     databaseName: databaseName,
                        
// //                     }),
// //                 });

// //                 if (!response.ok) {
// //                     throw new Error(`Error: ${response.status} ${response.statusText}`);
// //                 }

// //                 const data = await response.json();
// //                 setWordCloudData(data);
// //             } catch (error) {
// //                 console.error('Error fetching word cloud data:', error);
// //             }
// //         };
        
// //         fetchWordCloudData();
// //     }, [categories,values]);

// //     useEffect(() => {
// //         if (wordCloudData.categories.length > 0 && wordCloudData.values.length > 0) {
// //             drawChart();
// //         }
// //         console.log("words",wordCloudData)
       
// //     }, [wordCloudData, areaColor, displayCount]);

// //     const getFilteredData = () => {
// //         const words = wordCloudData.categories.map((category, index) => ({
// //             text: category,
// //             size: wordCloudData.values[index],
// //         }));

// //         // Sort and limit words based on the display count
// //         return words.sort((a, b) => b.size - a.size).slice(0, displayCount);
// //     };

// //     // const drawChart = () => {
// //     //     d3.select(chartRef.current).select("svg").remove();
// //     //     const { width, height } = chartDimensions;
    
// //     //     const svg = d3.select(chartRef.current)
// //     //         .append("svg")
// //     //         .attr("width", width)
// //     //         .attr("height", height)
// //     //         .append("g")
// //     //         .attr("transform", `translate(${width / 2},${height / 2})`);
    
// //     //     const words = getFilteredData();
    
// //     //     const maxFontSize = 20;
// //     //     const minFontSize = 8;
// //     //     const fontSizeScale = d3.scaleLinear()
// //     //         .domain([Math.min(...wordCloudData.values), Math.max(...wordCloudData.values)])
// //     //         .range([minFontSize, maxFontSize]);
    
// //     //     const layout = d3Cloud()
// //     //         .size([width, height])
// //     //         .words(words)
// //     //         .padding(8)
// //     //         .rotate(() => (Math.random() > 0.5 ? 0 : 45))
// //     //         .fontSize(d => fontSizeScale(d.size))
// //     //         .on("end", renderWords);
    
// //     //     layout.start();
    
// //     //     function renderWords(words) {
// //     //         const textElements = svg.selectAll("text")
// //     //             .data(words)
// //     //             .enter()
// //     //             .append("text")
// //     //             .style("font-size", d => `${fontSizeScale(d.size)}px`)
// //     //             .style("font-family", "sans-serif")
// //     //             .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() *10)])
// //     //             .attr("text-anchor", "middle")
// //     //             .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// //     //             .text(d => d.text);
    
// //     //         // Tooltip events
// //     //         textElements
// //     //             .on("mouseover", (event, d) => {
// //     //                 d3.select(tooltipRef.current)
// //     //                     .style("opacity", 1)
// //     //                     .html(`
// //     //                         Word: ${d.text}<br>
// //     //                         Original Size: ${wordCloudData.values[wordCloudData.categories.indexOf(d.text)]}<br>
// //     //                         Rendered Font Size: ${fontSizeScale(d.size)}
// //     //                     `)
// //     //                     .style("left", (event.pageX + 5) + "px")
// //     //                     .style("top", (event.pageY - 28) + "px");
// //     //             })
// //     //             .on("mouseout", () => {
// //     //                 d3.select(tooltipRef.current).style("opacity", 0);
// //     //             });
// //     //     }
// //     // };
// //     const drawChart = () => {
// //         d3.select(chartRef.current).select("svg").remove();
// //         const { width, height } = chartDimensions;
    
// //         const svg = d3.select(chartRef.current)
// //             .append("svg")
// //             .attr("width", width)
// //             .attr("height", height)
// //             .append("g")
// //             .attr("transform", `translate(${width / 2},${height / 2})`);
    
// //         const words = getFilteredData();
    
// //         const maxFontSize = 60; // Increase for larger words
// //         const minFontSize = 10; // Smaller font size for less common words
// //         const fontSizeScale = d3.scaleLinear()
// //             .domain([Math.min(...wordCloudData.values), Math.max(...wordCloudData.values)])
// //             .range([minFontSize, maxFontSize]);
    
// //         const layout = d3Cloud()
// //             .size([width, height])
// //             .words(words)
// //             .padding(5) // Padding to prevent overlap
// //             .rotate(0) // Rotate words for variation
// //             .fontSize(d => fontSizeScale(d.size))
// //             .spiral("archimedean") // Archimedean spiral for a spread-out layout
// //             .on("end", renderWords);
    
// //         layout.start();
    
// //         function renderWords(words) {
// //             const textElements = svg.selectAll("text")
// //                 .data(words)
// //                 .enter()
// //                 .append("text")
// //                 .style("font-size", d => `${d.size}px`)
// //                 .style("font-family", "Impact") // Bold font for word cloud
// //                 .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// //                 .attr("text-anchor", "middle")
// //                 .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
// //                 .text(d => d.text);
    
// //             // Tooltip events for hover details (optional)
// //             textElements
// //                 .on("mouseover", (event, d) => {
// //                     d3.select(tooltipRef.current)
// //                         .style("opacity", 1)
// //                         .html(`Word: ${d.text}<br>Size: ${d.size}`)
// //                         .style("left", (event.pageX + 5) + "px")
// //                         .style("top", (event.pageY - 28) + "px");
// //                 })
// //                 .on("mouseout", () => {
// //                     d3.select(tooltipRef.current).style("opacity", 0);
// //                 });
// //         }
// //     };
    
    
// //     const handleSliderChange = (event) => {
// //         const newCount = Number(event.target.value);
// //         setDisplayCount(newCount);

// //         // Show alert only if changing from default and the alert hasn't been shown yet
// //         if (!hasAlerted && newCount !== 10) {
// //             alert(`Display mode changed to show top ${newCount} words`);
// //             setHasAlerted(true);
// //         }
// //     };

// //     return (
// //         <div className="centered-container">
// //             <div className="word-cloud" style={{ width: chartDimensions.width, height: chartDimensions.height }}>
// //                  <div ref={chartRef} style={{ width: '100%', height: '100%' }} /> 
// //                 <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
// //             </div>
// //             <div className="filter-options">
// //                 <label>
// //                     Display Mode (Top N Words):
// //                     <input
// //                         type="range"
// //                         min="1"
// //                         max={wordCloudData.categories.length}
// //                         value={displayCount}
// //                         onChange={handleSliderChange}
// //                     />
// //                     <span>{displayCount}</span>
// //                 </label>
// //             </div>
// //         </div>
// //     );
// // };

// // export default WordCloud;



// // import React, { useEffect, useRef, useState } from "react";
// // import * as d3 from "d3";
// // import d3Cloud from "d3-cloud";
// // import { ResizableBox } from "react-resizable";
// // import "react-resizable/css/styles.css"; // Import the CSS for the resizable box

// // const WordCloud = ({ categories, values }) => {
// //     const wordCloudRef = useRef(null); // Reference to the SVG container
// //     const [wordData, setWordData] = useState([]);
// //     const [displayCount, setDisplayCount] = useState(10);

// //     useEffect(() => {
// //         if (categories && values) {
// //             // Combine categories and values into a single dataset for word cloud
// //             const combinedData = categories.map((text, index) => ({
// //                 text,
// //                 size: values[index],
// //             }));

// //             // Sort and slice to display the top N words
// //             const filteredData = combinedData
// //                 .sort((a, b) => b.size - a.size)
// //                 .slice(0, displayCount);

// //             setWordData(filteredData);
// //             console.log("filteredData",filteredData)
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
// //             .range([10, 50]); // Font size range

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
// //                     .text((d) => d.text);
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
// //             </ResizableBox>
// //             <div className="word-cloud-controls">
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
// //         </div>
// //     );
// // };

// // export default WordCloud;
// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import d3Cloud from "d3-cloud";
// import { ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css"; // Import the CSS for the resizable box
// import './WordCloud.css';

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
//         const { width, height } = { width: 600, height: 500 }; // Dimensions of the word cloud
//         const svg = d3.select(wordCloudRef.current);
//         svg.selectAll("*").remove(); // Clear existing content

//         const fontSizeScale = d3
//             .scaleLinear()
//             .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
//             .range([20, 60]); // Font size range

//         const layout = d3Cloud()
//             .size([width, height])
//             .words(wordData)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 0 : 0)) // Random rotation
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
//                         tooltipRef.current.style.visibility = "visible";
//                     tooltipRef.current.textContent = `Word: ${d.text}, Frequency: ${d.size}`;
//                     tooltipRef.current.style.left = `${event.pageX + 10}px`; // Offset to avoid overlap
//                     tooltipRef.current.style.top = `${event.pageY + 10}px`;
//                 })
//                     .on("mouseout", (event) => {
//                         d3.select(event.target)
//                             .style("cursor", "default")
//                             .style("opacity", 1); // Reset visual effect
//                         tooltipRef.current.style.visibility = "hidden"; // Hide tooltip on mouseout
//                     });
                    
//             });

//         layout.start();
//     };

//     const handleSliderChange = (event) => {
//         setDisplayCount(Number(event.target.value));
//     };

//     return (
//         <div className="word-cloud-container">
//             <ResizableBox width={600} height={500} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
          
//                 <svg ref={wordCloudRef} width="100%" height="100%" />
//                 <div className="word-cloud-controls">
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
            
//         </div>
//     );
// };

// export default WordCloud;




import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the CSS for the resizable box
import './WordCloud.css';

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
        const { width, height } = { width: 600, height: 500 }; // Dimensions of the word cloud
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
            .rotate(() => (Math.random() > 0.5 ? 0 : 0)) // Random rotation
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
                    .attr("transform", (d) => `translate(${d.x + 50},${d.y}) rotate(${d.rotate})`) // Added 50px padding on the left
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
            <ResizableBox width={600} height={500} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
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
