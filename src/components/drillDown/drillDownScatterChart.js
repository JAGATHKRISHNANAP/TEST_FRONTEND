

import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

const DrillScatterChart = ({ categories, values, aggregation }) => {
    const barColor = useSelector((state) => state.chartColor.chartColor);
    const options = {
        chart: {
            events: {}
        },
        xaxis: {
            categories: categories || [],
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
            scatter: {
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
        data: values || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="scatter-chart">
                    <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
                        <Chart
                            options={options}
                            series={series}
                            type="scatter"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
                <div className="color-picker-container">
                    {/* Additional content */}
                </div>
            </div>
        </div>
    );
};

export default DrillScatterChart;
