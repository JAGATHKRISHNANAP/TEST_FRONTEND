import React from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box

const PolarAreaChart = ({ categories, values, aggregation }) => {
    // const polarAreaColor = useSelector((state) => state.chartColor.chartColor); // Ensure this matches the state property

    const options = {
        chart: {
            type: 'polarArea',
            events: {}
        },
        labels: categories || [],
        // colors: [polarAreaColor],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            // colors: ['#fff']
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value) {
                    return parseFloat(value).toFixed(2);
                },
            }
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
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
                // colors: ["#304758"]
            }
        },
        grid: {
            // borderColor: '#f1f3fa'
        }
    };

    const series = values || [];

    return (
        <div className="app">
            <div className="row">
                <div className="polar-area-chart">
                    {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]}> */}
                    <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]}>
                    
                        <Chart
                            options={options}
                            series={series}
                            type="polarArea"
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

export default PolarAreaChart;
