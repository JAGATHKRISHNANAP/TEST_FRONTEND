import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory,updateChartData } from '../../features/ViewChartSlice/viewChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendClickedCategory,sendaidashboardClickedCategory } from '../../utils/api';

import { update_Ai_Charts_Datas } from '../../features/aiCharts/aiChartSlice';

const BarChart = ({ categories = [], values = [], aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", otherChartCategories = [] }) => {
    const dispatch = useDispatch();
    // const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);

    const charts = useSelector((state) => state.viewcharts.charts);
    const chartType = useSelector((state) => state.chartType);

    // console.log("chartType:",chartType)
    
    useEffect(() => {
      }, [categories, values]);
      
const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = categories[clickedCategoryIndex];
    console.log("clicked category:", clickedCategory);
  
    try {
      // Check if the chart type is 'aichart'
      if (chartType.type === 'AiCharts') {
        console.log("AI chart detected. Triggering handleSubmit...");
        try {
          const data = await sendaidashboardClickedCategory(clickedCategory, x_axis);
            console.log("AI dashboard chart data list:", data.ai_ml_charts_details);
            dispatch(update_Ai_Charts_Datas(data.ai_ml_charts_details));
        } catch (err) {
          console.error(err);
        //   setError('Failed to fetch chart data. Please try again.');
        }
      } else {
        // Handle non-AI charts
        const response = await sendClickedCategory(clickedCategory, charts, x_axis);
        console.log("chart_data_list:", response.chart_data_list);  
        response.chart_data_list.forEach((chartData) => {
          const { chart_id, data } = chartData;
          dispatch(
            updateChartData({
              chart_id,
              categories: data.categories,
              values: data.values,
              series1: data.series1,
              series2: data.series2,
            })
          );
        });
      }
    } catch (error) {
      console.error(`Failed to send category ${clickedCategory}:`, error);
    }
  
    // Update the selected category in Redux
    dispatch(updateSelectedCategory(clickedCategory));
  };

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor((360 / numColors) * i);
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
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
            title: {
                text: `${x_axis}`,
              },
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
        colors: generateColors(categories.length),
        plotOptions: {
            bar: {
                distributed: true,
            },
        },
        title: {
            text: `${x_axis} vs. ${y_axis}`,
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
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </ResizableBox>
        </div>
    );
};

export default BarChart;

