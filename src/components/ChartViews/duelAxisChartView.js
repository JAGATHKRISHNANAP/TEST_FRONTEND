import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';
import { sendClickedCategory } from '../../utils/api';

const DualAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation = "Aggregation", x_axis = "X_axis", y_axis1 = "Y_axis_Bar", y_axis2 = "Y_axis_Line", otherChartCategories = [] }) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
    const [showResetButton, setShowResetButton] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const charts = useSelector((state) => state.viewcharts.charts);

    console.log("xaxis",x_axis,)

    useEffect(() => {
        // console.log("Received categories:", categories);
        // console.log("Received series1:", series1);
        // console.log("Received series2:", series2);
    }, [categories, series1, series2]);

    const handleClicked = async (event, chartContext, config) => {
        if (!isFilterActive) return;

        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = categories[clickedCategoryIndex];

        const isCategoryPresentInAllCharts = otherChartCategories.every(chartCats => chartCats.includes(clickedCategory));

        if (!isCategoryPresentInAllCharts) {
            alert("Filter cannot be applied as categories differ between charts.");
            return;
        }

        try {
            const response = await sendClickedCategory(clickedCategory, charts, x_axis);
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
        dispatch(updateSelectedCategory_xaxis(x_axis));
        dispatch(setChartStatus(true));
        setShowResetButton(true);
    };

    const handleReset = () => {
        dispatch(updateSelectedCategory(null));
        dispatch(setChartStatus(false));
        setShowResetButton(false);
    };

    const handleFilterToggle = () => {
        setIsFilterActive(prevState => !prevState);
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
                show: false,
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
        yaxis: [
            {
                seriesName: 'Bar Series',
                title: {
                    text: `${y_axis1}`,
                },
                labels: {
                    formatter: (value) => {
                        if (value >= 10000000) { // 1 crore or 10 million
                            return (value / 10000000).toFixed(1) + 'Cr';
                        } else if (value >= 1000000) { // million
                            return (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 100000) { // lakh
                            return (value / 100000).toFixed(1) + 'L';
                        } else if (value >= 1000) { // thousand
                            return (value / 1000).toFixed(1) + 'K';
                        } else {
                            return value;
                        }
                    },
                },
            },
            {
                opposite: true,  // Line chart axis on the opposite side
                seriesName: 'Line Series',
                title: {
                    text: `${y_axis2}`,
                },
                labels: {
                    formatter: (value) => {
                        if (value >= 1000000) {
                            return (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 1000) {
                            return (value / 1000).toFixed(1) + 'K';
                        } else {
                            return value;
                        }
                    },
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
        },
        colors: generateColors(categories.length),
        plotOptions: {
            bar: {
                distributed: true,
            },
        },
        title: {
            text: `${aggregation} of ${x_axis} vs. ${y_axis1} and ${y_axis2}`,
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
            show: true,
        },
    };

    const series = [
        {
            name: `${aggregation} (Bar)`,
            type: 'bar',
            data: series1.map(value => parseFloat(value)),
        },
        {
            name: `${aggregation} (Line)`,
            type: 'line',
            data: series2.map(value => parseFloat(value)),
        },
    ];

    return (
        <div className="chart-container" style={{ position: 'relative', width: '100%' }}>
            <ResizableBox width={400} height={300} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width="100%"
                    height="100%"
                />
            </ResizableBox>

            <button 
                onClick={handleFilterToggle} 
                style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '50%', 
                    background: '#1976d2', 
                    border: 'none', 
                    color: '#fff', 
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#75ACE2'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1976d2'}
            >
                {isFilterActive ? 
                    <FilterAltIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }} onClick={handleReset} /> : 
                    <FilterAltOffIcon style={{ fontSize: '20px', marginRight: '5px', color: '#00000' }}  />} 
            </button>
        </div>
    );
};

export default DualAxisChart;
