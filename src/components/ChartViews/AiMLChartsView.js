import React, { useEffect, useState, lazy, Suspense } from 'react';

const LineChart = lazy(() => import('../ChartViews/linechartview'));
const BarChart = lazy(() => import('../ChartViews/barchartView'));
const PieChart = lazy(() => import('../ChartViews/piechartView'));
const AreaChart = lazy(() => import('../ChartViews/areaChartView'));
const ScatterChart = lazy(() => import('../ChartViews/scatterChartView'));
const DualAxisChart = lazy(() => import('../ChartViews/duelAxisChartView'));
const MapChart = lazy(() => import('../ChartViews/mapChartView'));

const AllCharts = ({ data: initialData = [] }) => {
    const [data, setChartData] = useState([]);

    useEffect(() => {
        if (initialData && Array.isArray(initialData) && initialData.length > 0) {
            setChartData(initialData[0] || []);
        } else {
            setChartData([]); // Fallback to an empty array if invalid
        }
    }, [initialData]);

    console.log("------------ai chart data--------------------", initialData);

    return (
        <Suspense fallback={<div>Loading Charts...</div>}>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '10px',
                }}
            >
                {data && data.length > 0 ? (
                    data.map((chartData, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #ddd',
                                padding: '5px',
                                borderRadius: '4px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '400px',
                                height: '360px',
                                overflow: 'hidden',
                            }}
                        >
                            {chartData.chart_type === "line" && (
                                <LineChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                />
                            )}
                            {chartData.chart_type === "bar" && (
                                <BarChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                    x_axis={chartData.x_axis}
                                    y_axis={chartData.y_axis}
                                />
                            )}
                            {chartData.chart_type === "pie" && (
                                <PieChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                />
                            )}
                            {chartData.chart_type === "area" && (
                                <AreaChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                />
                            )}
                            {chartData.chart_type === "scatter" && (
                                <ScatterChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                    x_axis={chartData.x_axis}
                                    y_axis={chartData.y_axis}
                                />
                            )}
                            {chartData.chart_type === "duelAxis" && (
                                <DualAxisChart
                                    categories={chartData.categories}
                                    series1={chartData.series1}
                                    series2={chartData.series2}
                                    aggregation={chartData.aggregation}
                                />
                            )}
                            {chartData.chart_type === "map" && (
                                <MapChart
                                    categories={chartData.categories}
                                    values={chartData.values}
                                    aggregation={chartData.aggregation}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div>No chart data available</div>
                )}
            </div>
        </Suspense>
    );
};

export default AllCharts;
