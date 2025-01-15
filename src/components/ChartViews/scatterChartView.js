import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory,setChartStatus,updateChartData ,updateSelectedCategory_xaxis} from '../../features/ViewChartSlice/viewChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendClickedCategory } from '../../utils/api';

const Scatter = ({ categories = [], values = [], aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", otherChartCategories = [] }) => {
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
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000'],
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
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000'],
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
        tooltip: {
            y: {
                formatter: (value) => {
                    // Return the exact value without formatting
                    return value.toLocaleString(); // Formats the number with commas for readability
                }
            }
        },
        // colors: generateColors(categories.length),
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
            <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                <Chart
                    options={options}
                    series={series}
                    type="scatter"
                    width="100%"
                    height="100%"
                />
            </ResizableBox>
        </div>
    );
};

export default Scatter;

