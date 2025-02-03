
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { ResizableBox } from "react-resizable";

const DrillBarChart = ({ categories, values, aggregation, xAxis, yAxis, selectedTable }) => {
    const [chartData, setChartData] = useState({
        categories: [],
        values: []
    });

    const barColor = useSelector(state => state.chartColor.chartColor);

    useEffect(() => {
        setChartData({
            categories: categories || [],
            values: values || []
        });
        console.log("Categories:------------------------", categories);
        console.log("Values:----------------------------", values);
    }, [categories, values]);

    const handleBarClick = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = chartData.categories[clickedCategoryIndex];
        
    };

    const options = {
        chart: {
            events: {
                dataPointSelection: handleBarClick
            }
        },
        xaxis: {
            categories: chartData.categories,
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                }
            }
        },
        yaxis: {
            labels: {
                show: true,
                formatter: function (value) {
                    return parseFloat(value).toFixed(2);
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                }
            }
        },
        colors: [barColor],
        plotOptions: {
            bar: {
                distributed: false,
                dataLabels: {
                    hideOverflowingLabels: true
                }
            }
        },
        dataLabels: {
            enabled: false,
            formatter: function (val, opts) {
                return val;
            },
            offsetY: -2,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        grid: {
            borderColor: '#f1f3fa'
        }
    };

    const series = [{
        name: aggregation,
        data: chartData.values
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                <ResizableBox width={500} height={250} minConstraints={[300, 300]}  maxConstraints={[1200, 800]} style={{ border: '2px solid black' }}>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="70%"
                        height="300"
                    />
                    </ResizableBox>
                </div>
            </div>
        </div>
    );
};

export default DrillBarChart;
