// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import { updateSelectedCategory, updateChartData, setChartStatus } from '../../features/ViewChartSlice/viewChartSlice';
// import { sendClickedCategory } from "../../utils/api";
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';

// const TextChart = (props) => {
//   const { categories, values, aggregation, x_axis } = props;
//   const dispatch = useDispatch();
//   const [showResetButton, setShowResetButton] = useState(false);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
//   const charts = useSelector((state) => state.viewcharts.charts);
//   const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality

//   const handleClicked = async (clickedCategory) => {
//     try {
//       const response = await sendClickedCategory(clickedCategory, charts, x_axis);
//       console.log("chart_data_list:", response.chart_data_list);
//       response.chart_data_list.forEach((chartData) => {
//         const { chart_id, data } = chartData;
//         dispatch(updateChartData({
//           chart_id,
//           categories: data.categories,
//           values: data.values,
//         }));
//       });
//     } catch (error) {
//       console.error(`Failed to send category ${clickedCategory}:`, error);
//     }
//     dispatch(updateSelectedCategory(clickedCategory));
//   };

//   const handleReset = () => {
//     dispatch(updateSelectedCategory(null));
//     dispatch(setChartStatus(false));
//     setShowResetButton(false);
//   };

//   const handleFilterToggle = () => {
//     setIsFilterActive(prevState => !prevState); // Toggle the filter state
//   };

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="text-chart">
//           <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
//             <div className="chart-title">{customHeadings}</div> {/* Added custom heading */}
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               {categories.map((category, index) => (
//                 <li 
//                   key={index}
//                   onClick={() => handleClicked(category)}
//                   style={{
//                     padding: '10px',
//                     borderBottom: '1px solid #ddd',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <span>{category}</span>
//                   <span>{values[index]}</span>
//                 </li>
//               ))}
//             </ul>
//           </ResizableBox>
//           <button
//             onClick={handleFilterToggle}
//             style={{
//               position: 'absolute',
//               top: '10px',
//               right: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               padding: '8px',
//               borderRadius: '50%',
//               background: '#1976d2',
//               border: 'none',
//               color: '#fff',
//               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//               cursor: 'pointer',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.background = '#75ACE2'}
//             onMouseLeave={(e) => e.currentTarget.style.background = '#1976d2'}
//           >
//             {isFilterActive ?
//               <FilterAltIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }} onClick={handleReset} /> :
//               <FilterAltOffIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }} />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default TextChart;
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import '../charts/tooltip.css';
// const TextChart = ({ categories, values, title }) => {
//     const svgRef = useRef();

//     useEffect(() => {
//         const svg = d3.select(svgRef.current)
//             .attr('width', 500)
//             .attr('height', categories.length * 30) // Set height based on number of categories

//         svg.selectAll('*').remove(); // Clear previous content

//         // Create a group for each category
//         const groups = svg.selectAll('g')
//             .data(categories)
//             .enter()
//             .append('g')
//             .attr('transform', (d, i) => `translate(0, ${i * 30})`); // Spacing for each category

//         // Append text for each category
//         groups.append('text')
//             .text((d, i) => `${d}: ${values[i]}`)
//             .attr('x', 10) // Set horizontal position
//             .attr('y', 20) // Set vertical position
//             .attr('font-size', '16px')
//             .attr('fill', '#333'); // Text color

//         // Optionally add a title
//         svg.append('text')
//             .attr('x', 10)
//             .attr('y', 20)
//             .text(title)
//             .attr('font-size', '20px')
//             .attr('font-weight', 'bold')
//             .attr('fill', '#000'); // Title color
//     }, [categories, values, title]);

//     return (
//         <svg ref={svgRef}></svg>
//     );
// };

// export default TextChart;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../charts/tooltip.css';

const TextChart = ({ categories, values, title }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', 400)
            .attr('height', categories.length * 40) // Set height based on number of categories
            .style('border', '2px solid #000') // Add border to the chart

        svg.selectAll('*').remove(); // Clear previous content

        // Create a group for each category
        const groups = svg.selectAll('g')
            .data(categories)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0, ${i * 30})`); // Spacing for each category

        // Append text for each category
        groups.append('text')
            .text((d, i) => `${d}: ${values[i]}`)
            .attr('x', 10) // Set horizontal position
            .attr('y', 20) // Set vertical position
            .attr('font-size', '16px')
            .attr('fill', '#333'); // Text color

        // Optionally add a title
        svg.append('text')
            .attr('x', 10)
            .attr('y', 20)
            .text(title)
            .attr('font-size', '20px')
            .attr('font-weight', 'bold')
            .attr('fill', '#000'); // Title color
    }, [categories, values, title]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default TextChart;
