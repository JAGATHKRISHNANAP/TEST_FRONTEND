

import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

const DrillLineChart = ({ categories, values, aggregation }) => {
    const lineColor = useSelector((state) => state.chartColor.chartColor);

    const options = {
        chart: {
            id: "basic-line"
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
        colors: [lineColor],
    };

    let seriesName = '';
    switch (aggregation) {
        case 'sum':
            seriesName = 'Sum';
            break;
        case 'minimum':
            seriesName = 'Minimum';
            break;
        case 'maximum':
            seriesName = 'Maximum';
            break;
        case 'average':
            seriesName = 'Average';
            break;
        case 'count':
            seriesName = 'Count';
            break;
        default:
            seriesName = '';
    }

    const series = [{
        name: seriesName,
        data: values || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="line-chart">
                    <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
            </div>
        </div>
    );
};

export default DrillLineChart;
