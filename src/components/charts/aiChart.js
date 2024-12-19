
// import React, { useEffect, useState, lazy, Suspense } from 'react';
// import { AiMLchartData } from '../../utils/api';

// // Dynamically import chart components
// const LineChart = lazy(() => import('../ChartViews/linechartview'));
// const BarChart = lazy(() => import('../ChartViews/barchartView'));
// const PieChart = lazy(() => import('../ChartViews/piechartView'));
// const AreaChart = lazy(() => import('../ChartViews/areaChartView'));
// const ScatterChart = lazy(() => import('../ChartViews/scatterChartView'));
// const DualAxisChart = lazy(() => import('../ChartViews/duelAxisChartView'));
// const MapChart = lazy(() => import('../ChartViews/mapChartView'));

// const AllCharts = () => {
//     const [data, setChartData] = useState([]);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const data = await AiMLchartData();
//                 console.log("Fetched Data:", data['ai_ml_charts_details']);

//                 if (Array.isArray(data['ai_ml_charts_details'])) {
//                     setChartData(data['ai_ml_charts_details']);
//                 } else {
//                     console.error("Data format error: Expected an array");
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         getData();
//     }, []);

//     console.log("--------------------------------", data);

//     return (
//         <Suspense fallback={<div>Loading Charts...</div>}>
//             <div
//                 style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     justifyContent: 'space-between',
//                     gap: '10px', // Add spacing between charts
//                 }}
//             >
//                 {data.map((chartData, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             backgroundColor: '#ffffff',
//                             border: '1px solid #ddd',
//                             padding: '5px',
//                             borderRadius: '4px',
//                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: '400px', // Fixed width
//                             height: '360px', // Fixed height
//                             overflow: 'hidden', // Prevent content overflow
//                         }}
//                     >
//                         {chartData.chart_type === "line" && (
//                             <LineChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                             />
//                         )}
//                         {chartData.chart_type === "bar" && (
//                             <BarChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                                 x_axis={chartData.x_axis}
//                                 y_axis={chartData.y_axis}
//                             />
//                         )}
//                         {chartData.chart_type === "pie" && (
//                             <PieChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                             />
//                         )}
//                         {chartData.chart_type === "area" && (
//                             <AreaChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                             />
//                         )}
//                         {chartData.chart_type === "scatter" && (
//                             <ScatterChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                                 x_axis={chartData.x_axis}
//                                 y_axis={chartData.y_axis}
//                             />
//                         )}
//                         {chartData.chart_type === "duelAxis" && (
//                             <DualAxisChart
//                                 categories={chartData.categories}
//                                 series1={chartData.series1}
//                                 series2={chartData.series2}
//                                 aggregation={chartData.aggregation}
//                             />
//                         )}
//                         {chartData.chart_type === "map" && (
//                             <MapChart
//                                 categories={chartData.categories}
//                                 values={chartData.values}
//                                 aggregation={chartData.aggregation}
//                             />
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </Suspense>
//     );
// };

// export default AllCharts;





import React, { useEffect, useState, lazy, Suspense } from 'react';
import { AiMLchartData } from '../../utils/api';

// Dynamically import chart components
const LineChart = lazy(() => import('../ChartViews/linechartview'));
const BarChart = lazy(() => import('../ChartViews/barchartView'));
const PieChart = lazy(() => import('../ChartViews/piechartView'));
const AreaChart = lazy(() => import('../ChartViews/areaChartView'));
const ScatterChart = lazy(() => import('../ChartViews/scatterChartView'));
const DualAxisChart = lazy(() => import('../ChartViews/duelAxisChartView'));
const MapChart = lazy(() => import('../ChartViews/mapChartView'));

const AllCharts = () => {
    const [data, setChartData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await AiMLchartData();
                console.log("Fetched Data:", data['ai_ml_charts_details']);

                if (Array.isArray(data['ai_ml_charts_details'])) {
                    setChartData(data['ai_ml_charts_details']);
                } else {
                    console.error("Data format error: Expected an array");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Stop loading after data fetch
            }
        };
        getData();
    }, []);

    console.log("--------------------------------", data);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Charts are loading...</div>;
    }

    return (
        <Suspense fallback={<div>Loading Charts...</div>}>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '10px', // Add spacing between charts
                }}
            >
                {data.map((chartData, index) => (
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
                            width: '400px', // Fixed width
                            height: '360px', // Fixed height
                            overflow: 'hidden', // Prevent content overflow
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
                ))}
            </div>
        </Suspense>
    );
};

export default AllCharts;
