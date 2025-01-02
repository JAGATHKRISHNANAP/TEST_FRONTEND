import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

const AreaChart = ({ categories, values, aggregation }) => {
    const areaColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);

    const options = {
        chart: {
            type: 'area',
            events: {}
        },
        xaxis: {
            categories: categories || [],
            title: {
                text: `${xAxis}`,
              },
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
            title: {
                text: `${yAxis}`,
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
        colors: [areaColor],
        plotOptions: {
            area: {
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
        data: values || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="area-chart">
                    {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
                     <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} >
                        <Chart
                            options={options}
                            series={series}
                            type="area"
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

export default AreaChart;
