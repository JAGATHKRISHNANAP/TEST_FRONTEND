// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import { ResizableBox } from 'react-resizable';
// import { updateSelectedCategory,setChartStatus,updateChartData ,updateSelectedCategory_xaxis} from '../../features/ViewChartSlice/viewChartSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import { sendClickedCategory } from '../../utils/api';

// const Scatter = ({ categories = [], values = [], aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", otherChartCategories = [] }) => {
//     const dispatch = useDispatch();
//     const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
//     const [showResetButton, setShowResetButton] = useState(false); // State to show/hide the reset button
//     const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality
//     const charts = useSelector((state) => state.viewcharts.charts);
    
//     useEffect(() => {
//         // console.log("Received categories:",categories);
//         // console.log("Received values:", values);
//       }, [categories, values]);

//     const handleClicked = async (event, chartContext, config) => {
//         if (!isFilterActive) return; // If filter is not active, do nothing
    
//         // console.log("clicked category Axis", x_axis);
    
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
    
//         // Check if the clicked category is present in all other charts
//         const isCategoryPresentInAllCharts = otherChartCategories.every(chartCats => chartCats.includes(clickedCategory));
    
//         if (!isCategoryPresentInAllCharts) {
//             alert("Filter cannot be applied as categories differ between charts.");
//             return;
//         }
    
//         try {
//             // Trigger the API call to send the clicked category
//             const response = await sendClickedCategory(clickedCategory,charts,x_axis);
//             console.log("chart_data_list:", response.chart_data_list)
//             response.chart_data_list.forEach((chartData) => {
//                 const { chart_id, data } = chartData;
//                 dispatch(updateChartData({
//                   chart_id,
//                   categories: data.categories,
//                   values: data.values,
//                 }));
//               });
//         } catch (error) {
//             console.error(`Failed to send category ${clickedCategory}:`, error);
//         }
    
//         // Set the selected category and show the reset button
//         dispatch(updateSelectedCategory(clickedCategory));
//         dispatch(updateSelectedCategory_xaxis(x_axis))
//         dispatch(setChartStatus(true));
//         setShowResetButton(true);
//     };
    
//     const handleReset = () => {
//         // Reset the selected category and hide the reset button
//         dispatch(updateSelectedCategory(null));
//         dispatch(setChartStatus(false));
//         setShowResetButton(false);
//     };

//     const handleFilterToggle = () => {
//         setIsFilterActive(prevState => !prevState); // Toggle the filter state
//     };
//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked,
//             },
//             toolbar: {
//                 show: false, // Disable the download/export toolbar
//             },
//         },
//         xaxis: {
//             categories: categories,
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
//                 },
//                 rotate: -45,
//                 show:false
//             },
//         },
//         yaxis: {
//             title: {
//                 text: `${y_axis}`,
//               },
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) { // For values in crores (millions)
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) { // For values in thousands
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value; // For smaller values
//                     }
//                 }
//             },
//         },
//         tooltip: {
//             y: {
//                 formatter: (value) => {
//                     // Return the exact value without formatting
//                     return value.toLocaleString(); // Formats the number with commas for readability
//                 }
//             }
//         },
//         // colors: generateColors(categories.length),
//         plotOptions: {
//             line: {
//                 distributed: true,
//             },
//         },
//         title: {
//             text: `${aggregation} of ${x_axis} vs. ${y_axis}`,
//             align: 'left',
//             style: {
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//                 color: '#263238',
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         grid: {
//             borderColor: '#f1f3fa',
//         },
//         legend: {
//             show: false,
//         },
//     };

//     const series = [{
//         name: aggregation,
//         data: values,
//     }];

//     return (
//         <div className="chart-container" style={{ position: 'relative', width: '100%' }}>
//             <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
//                 <Chart
//                     options={options}
//                     series={series}
//                     type="scatter"
//                     width="100%"
//                     height="100%"
//                 />
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

// export default Scatter;



import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory,setChartStatus,updateChartData ,updateSelectedCategory_xaxis} from '../../features/ViewChartSlice/viewChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendClickedCategory } from '../../utils/api';

const Scatter = ({ categories = [], values = [], aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", xFontSize="FontSize",fontStyle="fontStyle", categoryColor="categoryColor", yFontSize="yFontSize", valueColor="valueColor",chartColor="chartColor",customHeadings, headingColor, otherChartCategories = [] }) => {
    const dispatch = useDispatch();

    const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality
    const charts = useSelector((state) => state.viewcharts.charts);
    
    useEffect(() => {
        // console.log("Received categories:",categories);
        // console.log("Received values:", values);
      }, [categories, values]);

    // const handleClicked = async (event, chartContext, config) => {
    //     if (!isFilterActive) return; // If filter is not active, do nothing
    
    //     // console.log("clicked category Axis", x_axis);
    
    //     const clickedCategoryIndex = config.dataPointIndex;
    //     const clickedCategory = categories[clickedCategoryIndex];
    
    //     // Check if the clicked category is present in all other charts
    //     const isCategoryPresentInAllCharts = otherChartCategories.every(chartCats => chartCats.includes(clickedCategory));
    
    //     if (!isCategoryPresentInAllCharts) {
    //         alert("Filter cannot be applied as categories differ between charts.");
    //         return;
    //     }
    
    //     try {
    //         // Trigger the API call to send the clicked category
    //         const response = await sendClickedCategory(clickedCategory,charts,x_axis);
    //         console.log("chart_data_list:", response.chart_data_list)
    //         response.chart_data_list.forEach((chartData) => {
    //             const { chart_id, data } = chartData;
    //             dispatch(updateChartData({
    //               chart_id,
    //               categories: data.categories,
    //               values: data.values,
    //             }));
    //           });
    //     } catch (error) {
    //         console.error(`Failed to send category ${clickedCategory}:`, error);
    //     }
    
    //     // Set the selected category and show the reset button
    //     dispatch(updateSelectedCategory(clickedCategory));
    //     dispatch(updateSelectedCategory_xaxis(x_axis))
    //     dispatch(setChartStatus(true));
    //     setShowResetButton(true);
    // };
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
         
    


    const handleFilterToggle = () => {
        setIsFilterActive(prevState => !prevState); // Toggle the filter state
    };
    const options = {
        chart: {
            events: {
                dataPointSelection: handleClicked,
            },
            toolbar: {
                show: false, // Disable the download/export toolbar
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    fontSize:`${xFontSize}px`,// Use dynamic font size
                    fontStyle: fontStyle, // Apply dynamic font style
                     fontWeight: 400,
                    colors:categoryColor, // Apply dynamic category color
                },
                rotate: -45,
                show:true
            },
        },
        yaxis: {
            title: {
                text: `${y_axis}`,
              },
            labels: {
                style: {
                    fontSize:`${yFontSize}px`,// Use dynamic font size
                    fontStyle: fontStyle, // Apply dynamic font style
                     fontWeight: 400,
                    colors:valueColor, // Apply dynamic category color
                },
                formatter: (value) => {
                    if (value >= 10000000) { // For values in crores (millions)
                        return (value / 10000000).toFixed(1) + 'M';
                    } else if (value >= 100000) { // For values in lakhs (hundred thousand)
                        return (value / 100000).toFixed(1) + 'L';
                    } else if (value >= 1000) { // For values in thousands
                        return (value / 1000).toFixed(1) + 'K';
                    } else {
                        return value; // For smaller values
                    }
                }
            },
        },
        colors: [chartColor],
        tooltip: {
            y: {
                formatter: (value) => {
                    // Return the exact value without formatting
                    return value.toLocaleString(); // Formats the number with commas for readability
                }
            }
        },
        // colors: chartColor,
        plotOptions: {
            line: {
                distributed: true,
            },
        },
        title: {
            text: `${aggregation} of ${x_axis} vs. ${y_axis}`,
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#263238',
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: '#f1f3fa',
        },
        legend: {
            show: false,
        },
    };

    const series = [{
        name: aggregation,
        data: values,
    }];

    return (
        <div className="chart-container" style={{ position: 'relative', width: '100%' }}>
            <ResizableBox width={350} height={400} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
            <div className="chart-title">
            <h3 >{customHeadings}</h3>
          </div>{/* Added custom heading */}
                <Chart
                    options={options}
                    series={series}
                    type="scatter"
                    width="100%"
                    height="90%"
                />
            </ResizableBox>
        </div>
    );
};

export default Scatter;
