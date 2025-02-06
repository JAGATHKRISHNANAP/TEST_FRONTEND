// // // import React, { useEffect, useRef } from 'react';
// // // import { useSelector } from 'react-redux';
// // // import BarChart from '../ChartViews/barchartView';
// // // import PieChart from '../ChartViews/piechartView';
// // // import LineChart from '../ChartViews/linechartview';
// // // import DualAxisChart from '../ChartViews/duelAxisChartView';
// // // import { ResizableBox } from 'react-resizable';
// // // import AreaChart from '../ChartViews/areaChartView';
// // // import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
// // // import MapViewChart from '../ChartViews/mapChartView';
// // // import PolarAreaChart from '../charts/polarArea';
// // // import Scatter from '../ChartViews/scatterChartView';
// // // import TreeHierarchyView from '../ChartViews/treeHierarchyView';
// // // import TextChartView from '../ChartViews/textChartView';
// // // import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
// // // import SampleAiTestChart  from '../ChartViews/sampleAiTestChartView'; 
// // // import AiMlChartData from '../ChartViews/AiMLChartsView';
// // // import DashboardSingleValueChart from '../ChartViews/DashboardSingleValueChart';
// // // import WordCloud from '../ChartViews/wordCloudView'
// // // const DroppableArea = () => {
// // //   const droppableAreaRef = useRef(null);
// // //   const chartdata = useSelector((state) => state.viewdashboard.dashboard_charts);
// // //   const textChart = useSelector((state) => state.viewdashboard.textChart);

// // //   // const [hierarchy,setHierarchy]=useState(null);
// // //   // const [hierarchyData,setHierarchyData]=useState(null);

// // //   useEffect(() => {
// // //     console.log("chartdata", chartdata);
// // //   }, [chartdata]);

// // //   return (
// // //     <div 
// // //       ref={(node) => {
// // //         droppableAreaRef.current = node;
// // //       }}
// // //       style={{ 
// // //         position: 'relative', 
// // //         backgroundColor: 'white', 
// // //         padding: '10px', 
// // //         border: '1px solid #ccc', 
// // //         minHeight: '85vh',
// // //         display: 'flex',
// // //         flexWrap: 'wrap', 
// // //         gap: '10px',
// // //         marginTop: 'px'

// // //       }}
// // //     >
// // //         {
// // //             textChart && textChart.length > 0 ? (
// // //                 textChart.map((text, index) => (
// // //                     <div key={index} style={{ padding: '20px',width: '500', height: '400px' ,border: '2px black',marginBottom:'10px'  }}>
// // //                         {text.chart_type === 'singleValueChart' && (
// // //                         // <div>
// // //                         //     <div style={{ textAlign: 'center' }}>
// // //                         //     <h3>{text.chart_heading.replace(/"/g, '')}</h3>
// // //                         //     <p>{text.value.total_x_axis}</p>
// // //                         //     </div>
// // //                         // </div>
// // //                         <DashboardSingleValueChart 
// // //                         chartHeading={text.chart_heading} 
// // //                         totalXAxis={text.value.total_x_axis} 
// // //                       />
// // //                         )}
// // //                     </div>
// // //                 ))
// // //             ) : (
// // //                 <p></p>
// // //             )
// // //         }

// // //       {chartdata && chartdata.length > 0 ? (
// // //         chartdata.map((chart, index) => (
// // //           console.log("chart",chart),
// // //           // console.log("dataframe_dict-----------------------------------------------------", chart.dataframe_dict),
// // //           console.log("dataframe_dict-----------------------------------------------------", chart.histogram_details),
// // //           console.log("X_axis-----------------------------------------------------", chart.aggregate),
// // //           console.log("chart_data-----------------------------------------------------", chart.chart_type), 
// // //           <div key={index} style={{ padding: '20px',width: '400', height: '400px'   }}>
// // //             {chart.chart_type === 'bar' && (
// // //               <BarChart
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //                 x_axis={chart.x_axis}
// // //                 y_axis={chart.y_axis}
               
// // //               />
// // //             )}
// // //             {/* You can add other chart types here */}
// // //             {chart.chart_type === 'pie' && (
// // //               <PieChart
// // //                 categories={chart.categories}
// // //                 values={chart.values}
               
// // //               />
// // //             )}
// // //             {chart.chart_type === 'line' && (
// // //               <LineChart
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //                 aggregation={chart.aggregate}
// // //                 x_axis={chart.x_axis}
// // //                 y_axis={chart.y_axis}
// // //               />
// // //             )}
// // //             {chart.chart_type === 'area' && (
// // //               <AreaChart
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //               />
// // //             )}


// // //           {chart.chart_type === 'polarArea' && (
// // //                         <PolarAreaChart
// // //                           categories={chart.categories}
// // //                           values={chart.values}
// // //                         />
// // //                       )}

// // //           {chart.chart_type === 'scatter' && (
// // //                         <Scatter
// // //                           categories={chart.categories}
// // //                           values={chart.values}
// // //                         />
// // //                       )}
// // //             {chart.chart_type === 'hierarchialBarChart' && (
// // //               <HierarchialBarChart
// // //               categories={chart.categories}
// // //               values={chart.values}
// // //               x_axis={chart.x_axis}
// // //               y_axis={chart.y_axis}
// // //               />
// // //             )}
          
// // //           {chart.chart_type === 'treeHierarchy' && (
// // //                         <TreeHierarchyView x_axis={chart.x_axis} treeData={chart.dataframe_dict} />
// // //                       )}

// // //           {chart.chart_type === 'sampleAitestChart' && (
// // //                                   <SampleAiTestChart data={chart.histogram_details} />
// // //                                 )}
// // // {chart.chart_type === 'AiCharts' && (
// // //                                   <AiMlChartData data={chart.histogram_details} />  
// // //                                 )} 
// // //           {chart.chart_type === 'mapchart' && (
// // //               <MapViewChart
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //               />
// // //             )}
// // //             {chart.chart_type === 'animatedTreeChart' && (
// // //               <AnimatedTreemap
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //                 chartColor={chart.chart_color}
// // //               />
// // //             )}
// // //            {chart.chart_type === 'duealChart' && (
// // //   <DualAxisChart
// // //     categories={chart.categories}
// // //     series1={chart.series1}
// // //     series2={chart.series2}
// // //     x_axis={chart.x_axis}
// // //     y_axis1={chart.y_axis[0]}
// // //     y_axis2={chart.y_axis[1]}
// // //     aggregation={chart.aggregate}
   
// // //   />
// // // )}



// // //             {chart.chart_type === 'polarArea' && (
// // //             <PolarAreaChart
// // //             categories={chart.categories}
// // //             values={chart.values}
// // //           />
// // //         )}
// // //         {chart.chart_type === 'wordCloud' && (
// // //           <WordCloud categories={chart.categories}
// // //           values={chart.values} />
// // //         )}
// // //         {chart.chart_type === 'textChart' && (
// // //               <TextChartView
// // //                 categories={chart.categories}
// // //                 values={chart.values}
// // //               />
// // //             )}
// // //         </div>
// // //         ))
// // //       ) : (
// // //         <p></p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DroppableArea;



// // import React, { useEffect, useRef } from 'react';
// // import { useSelector } from 'react-redux';
// // import BarChart from '../ChartViews/barchartView';
// // import PieChart from '../ChartViews/piechartView';
// // import LineChart from '../ChartViews/linechartview';
// // import DualAxisChart from '../ChartViews/duelAxisChartView';
// // import { ResizableBox } from 'react-resizable';
// // import AreaChart from '../ChartViews/areaChartView';
// // import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
// // import MapViewChart from '../ChartViews/mapChartView';
// // import PolarAreaChart from '../charts/polarArea';
// // import Scatter from '../ChartViews/scatterChartView';
// // import TreeHierarchyView from '../ChartViews/treeHierarchyView';
// // import TextChartView from '../ChartViews/textChartView';
// // import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
// // import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
// // import AiMlChartData from '../ChartViews/AiMLChartsView';
// // import DashboardSingleValueChart from '../ChartViews/DashboardSingleValueChart';
// // import WordCloud from '../ChartViews/wordCloudView';

// // const DroppableArea = () => {
// //   const droppableAreaRef = useRef(null);
// //   const chartdata = useSelector((state) => state.viewdashboard.dashboard_charts);
// //   const textChart = useSelector((state) => state.viewdashboard.textChart);

// //   useEffect(() => {
// //     console.log("chartdata", chartdata);
// //   }, [chartdata]);

// //   return (
// //     <div
// //       ref={(node) => {
// //         droppableAreaRef.current = node;
// //       }}
// //       style={{
// //         display: "grid",
// //         gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", // Each cell at least 400px wide
// //         gridGap: "10px",
// //         padding: "20px",
// //         border: "1px solid #ccc",
// //         backgroundColor: "white",
// //         minHeight: "85vh",
// //       }}
// //     >
// //       {/* Render single value charts (if any) */}
// //       {textChart && textChart.length > 0
// //         ? textChart.map((text, index) => (
// //             <div
// //               key={`text-${index}`}
// //               style={{
// //                 padding: "20px",
// //                 height: "auto",
// //                 border: "2px solid black",
// //                 boxSizing: "border-box",
// //               }}
// //             >
// //               {text.chart_type === "singleValueChart" && (
// //                 <DashboardSingleValueChart
// //                   chartHeading={text.chart_heading}
// //                   totalXAxis={text.value.total_x_axis}
// //                 />
// //               )}
// //             </div>
// //           ))
// //         : null}

// //       {/* Render other charts */}
// //       {chartdata && chartdata.length > 0
// //         ? chartdata.map((chart, index) => (
// //           <div
// //           key={`chart-${index}`}
// //           style={{
// //             padding: "20px",
// //             minHeight: "450px", // Ensures a default height of 450px
// //             height: "auto", // Allows it to expand if needed
// //             border: "1px solid black",
// //             boxSizing: "border-box",
            
// //             minWidth: "450px", // Ensures a default height of 450px
// //             width: "auto",
// //           }}
// //         >
        
// //               {chart.chart_type === "bar" && (
// //                 <BarChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   x_axis={chart.x_axis}
// //                   y_axis={chart.y_axis}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "pie" && (
// //                 <PieChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "line" && (
// //                 <LineChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   aggregation={chart.aggregate}
// //                   x_axis={chart.x_axis}
// //                   y_axis={chart.y_axis}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "area" && (
// //                 <AreaChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "polarArea" && (
// //                 <PolarAreaChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "scatter" && (
// //                 <Scatter
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "hierarchialBarChart" && (
// //                 <HierarchialBarChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   x_axis={chart.x_axis}
// //                   y_axis={chart.y_axis}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "treeHierarchy" && (
// //                 <TreeHierarchyView
// //                   x_axis={chart.x_axis}
// //                   treeData={chart.dataframe_dict}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "sampleAitestChart" && (
// //                 <SampleAiTestChart data={chart.histogram_details} />
// //               )}
// //               {chart.chart_type === "AiCharts" && (
// //                 <AiMlChartData data={chart.histogram_details} />
// //               )}
// //               {chart.chart_type === "mapchart" && (
// //                 <MapViewChart
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "animatedTreeChart" && (
// //                 <AnimatedTreemap
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
                  
// //                 />
// //               )}
// //               {chart.chart_type === "duealChart" && (
// //                 <DualAxisChart
// //                   categories={chart.categories}
// //                   series1={chart.series1}
// //                   series2={chart.series2}
// //                   x_axis={chart.x_axis}
// //                   y_axis1={chart.y_axis[0]}
// //                   y_axis2={chart.y_axis[1]}
// //                   aggregation={chart.aggregate}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "wordCloud" && (
// //                 <WordCloud
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //               {chart.chart_type === "textChart" && (
// //                 <TextChartView
// //                   categories={chart.categories}
// //                   values={chart.values}
// //                   chartColor={chart.chart_color}
// //                 />
// //               )}
// //             </div>
// //           ))
// //         : null}
// //     </div>
// //   );
// // };

// // export default DroppableArea;

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import BarChart from '../ChartViews/barchartView';
// import PieChart from '../ChartViews/piechartView';
// import LineChart from '../ChartViews/linechartview';
// import DualAxisChart from '../ChartViews/duelAxisChartView';
// import AreaChart from '../ChartViews/areaChartView';
// import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
// import MapViewChart from '../ChartViews/mapChartView';
// import PolarAreaChart from '../charts/polarArea';
// import Scatter from '../ChartViews/scatterChartView';
// import TreeHierarchyView from '../ChartViews/treeHierarchyView';
// import TextChartView from '../ChartViews/textChartView';
// import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
// import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
// import AiMlChartData from '../ChartViews/AiMLChartsView';
// import DashboardSingleValueChart from '../ChartViews/DashboardSingleValueChart';
// import WordCloud from '../ChartViews/wordCloudView';


// // ---------------------------------------------------------------------
// // ChartWrapper: a container component that displays a custom context menu on right-click
// // ---------------------------------------------------------------------
// const ChartWrapper = ({ children, style }) => {
//   // Local state for border properties
//   const [borderSize, setBorderSize] = useState('1px');
//   const [borderColor, setBorderColor] = useState('#000000');
//   const [showBorder, setShowBorder] = useState(true);

//   // State for context menu visibility and position
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

//   // Handle right-click (context menu) event
//   const handleContextMenu = (e) => {
//     e.preventDefault();
//     // Set the menu position using the click's client coordinates.
//     setMenuPosition({ x: e.clientX, y: e.clientY });
//     setMenuVisible(true);
//   };

//   // Close the menu when needed
//   const closeMenu = () => {
//     setMenuVisible(false);
//   };

//   // Build the current border style
//   const currentBorder = showBorder ? `${borderSize} solid ${borderColor}` : 'none';

//   return (
//     <div
//       onContextMenu={handleContextMenu}
//       style={{
//         position: 'relative',
//         padding: '20px',
//         minHeight: '450px',
//         border: currentBorder,
//         boxSizing: 'border-box',
//         ...style,
//       }}
//     >
//       {children}

//       {/* Custom context menu */}
//       {menuVisible && (
//         <div
//           style={{
//             position: 'fixed', // use fixed to use the viewport coordinates
//             top: menuPosition.y,
//             left: menuPosition.x,
//             backgroundColor: '#fff',
//             border: '1px solid #ccc',
//             padding: '10px',
//             zIndex: 1000,
//             boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
//           }}
//           onMouseLeave={closeMenu}
//         >
//           <div style={{ marginBottom: '8px' }}>
//             <label>
//               Border Size:&nbsp;
//               <select
//                 value={borderSize}
//                 onChange={(e) => setBorderSize(e.target.value)}
//               >
//                 <option value="0px">0px</option>
//                 <option value="1px">1px</option>
//                 <option value="2px">2px</option>
//                 <option value="3px">3px</option>
//                 <option value="4px">4px</option>
//               </select>
//             </label>
//           </div>
//           <div style={{ marginBottom: '8px' }}>
//             <label>
//               Border Color:&nbsp;
//               <input
//                 type="color"
//                 value={borderColor}
//                 onChange={(e) => setBorderColor(e.target.value)}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Show Border:&nbsp;
//               <input
//                 type="checkbox"
//                 checked={showBorder}
//                 onChange={(e) => setShowBorder(e.target.checked)}
//               />
//             </label>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------------------------------------------------------------
// // Main DroppableArea Component
// // ---------------------------------------------------------------------
// const DroppableArea = () => {
//   const chartdata = useSelector((state) => state.viewdashboard.dashboard_charts);
//   const textChart = useSelector((state) => state.viewdashboard.textChart);

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
//         gridGap: "10px",
//         padding: "20px",
//         border: "1px solid #ccc",
//         backgroundColor: "white",
//         minHeight: "85vh",
//       }}
//     >
//       {/* Render single value charts (if any) */}
//       {textChart &&
//         textChart.length > 0 &&
//         textChart.map((text, index) => (
//           <ChartWrapper key={`text-${index}`} style={{ minWidth: '400px' }}>
//             {text.chart_type === "singleValueChart" && (
//               <DashboardSingleValueChart
//                 chartHeading={text.chart_heading}
//                 totalXAxis={text.value.total_x_axis}
//               />
//             )}
//           </ChartWrapper>
//         ))
//       }

//       {/* Render other charts */}
//       {chartdata &&
//         chartdata.length > 0 &&
//         chartdata.map((chart, index) => (
//           <ChartWrapper key={`chart-${index}`} style={{ position: "absolute", // Allow chart to be placed based on its x, y coordinates
//             left: `${chart.positions.x}px`,
//             top: `${chart.positions.y}px`,minWidth: '400px' }}>
//             {chart.chart_type === "bar" && (
//               <BarChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 x_axis={chart.x_axis}
//                 y_axis={chart.y_axis}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "pie" && (
//               <PieChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "line" && (
//               <LineChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 aggregation={chart.aggregate}
//                 x_axis={chart.x_axis}
//                 y_axis={chart.y_axis}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "area" && (
//               <AreaChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "polarArea" && (
//               <PolarAreaChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "scatter" && (
//               <Scatter
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "hierarchialBarChart" && (
//               <HierarchialBarChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 x_axis={chart.x_axis}
//                 y_axis={chart.y_axis}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "treeHierarchy" && (
//               <TreeHierarchyView
//                 x_axis={chart.x_axis}
//                 treeData={chart.dataframe_dict}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "sampleAitestChart" && (
//               <SampleAiTestChart data={chart.histogram_details} />
//             )}
//             {chart.chart_type === "AiCharts" && (
//               <AiMlChartData data={chart.histogram_details} />
//             )}
//             {chart.chart_type === "mapchart" && (
//               <MapViewChart
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "animatedTreeChart" && (
//               <AnimatedTreemap
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "duealChart" && (
//               <DualAxisChart
//                 categories={chart.categories}
//                 series1={chart.series1}
//                 series2={chart.series2}
//                 x_axis={chart.x_axis}
//                 y_axis1={chart.y_axis[0]}
//                 y_axis2={chart.y_axis[1]}
//                 aggregation={chart.aggregate}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "wordCloud" && (
//               <WordCloud
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//             {chart.chart_type === "textChart" && (
//               <TextChartView
//                 categories={chart.categories}
//                 values={chart.values}
//                 chartColor={chart.chart_color}
//               />
//             )}
//           </ChartWrapper>
//         ))
//       }
//     </div>
//   );
// };

// export default DroppableArea;

 import React from 'react';
 import { useSelector } from 'react-redux';
 import ChartWrapper from './ChartWrapper';
 import ChartRenderer from './ChartRenderer';
 import TextChartContainer from './TextChartContainer';

 const DroppableArea = () => {
   const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);

   return (
     <div
       style={{
         display: 'grid',
         
         gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
         gridAutoRows: 'minmax(200px, auto)', 
         gridGap: '10px',
         padding: '20px',
         
         backgroundColor: 'white',
         minHeight: '95vh',
         
       }}
     >
       {/* Render Text Charts */}
       <TextChartContainer />

       {/* Render Other Charts */}
       {chartData?.map((chart, index) => (
        <ChartWrapper key={`chart-${index}`} style={{padding:'1px' ,marginTop:'50px',position: "absolute", // Allow chart to be placed based on its x, y coordinates
left: `${chart.positions.x}px`,
top: `${chart.positions.y}px`,minWidth: '400px' }}>
           <ChartRenderer chart={chart} />
         </ChartWrapper>
       ))}
     </div>
   );
 };

 export default DroppableArea;
