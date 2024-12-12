import React, { useEffect } from 'react';
import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import AreaChart from '../charts/area';
import PolarAreaChart from '../charts/polarArea';
import DuealChartInputsss from '../charts/duealChartInput';
import DuelAxisChart from '../charts/duelAxesChart';
import TextChart from '../charts/textChart';
import MapChart from '../charts/mapchart';
import SingleValueChart from '../charts/singleValueChart';
import ChartColor from '../charts/color';

const AllCharts = () => {
       const data = [
        {
            xaxis: "Region",
            yaxis: "order_id",
            categories: ["a", "b", "c", "d", "e"],
            values: [10, 20, 30, 40, 50],
            aggregation: "Sum",
            charttype: "bar"
        },
        {
            xaxis: "Product",
            yaxis: "total_cost",
            categories: ["p", "q", "r", "s", "t"],
            values: [60, 70, 80, 90, 100],
            aggregation: "Average",
            charttype: "pie"
        },
        {
            xaxis: "Company",
            yaxis: "Profit",
            categories: ["vivo", "oppo", "apple", "mi", "samsung"],
            values: [234, 342, 843, 904, 103],
            aggregation: "Count",
            charttype: "line"
        },
        {
            xaxis: "Quarter",
            yaxis: "Revenue",
            categories: ["Q1", "Q2", "Q3", "Q4"],
            values: [500, 700, 800, 600],
            aggregation: "Sum",
            charttype: "area"
        },

        {
            xaxis: "City",
            yaxis: "crime_rate",
            categories: ["NY", "LA", "Chicago", "Houston", "Phoenix"],
            values: [75, 80, 60, 50, 55],
            aggregation: "Average",
            charttype: "scatter"
        },
        {
            xaxis: "Country",
            yaxis: "GDP",
            categories: ["USA", "Germany", "India", "China", "Brazil"],
            values: [21000, 3800, 2700, 14000, 2100],
            aggregation: "Average",
            charttype: "polarArea"
        },
        {
            xaxis: "Product",
            yaxis: "profit_margin",
            categories: ["Mobile", "Laptop", "Tablet", "Camera", "Headphones"],
            series1:[25, 15, 30, 20, 10],
            series2:[15, 27, 38, 32, 40],
            aggregation: "Sum",
            charttype: "duelAxis"
        },
        
        {
            xaxis: "Region",
            yaxis: "income",
            categories: ["North", "South", "East", "West"],
            values: [4000, 5000, 3000, 6000],
            aggregation: "Average",
            charttype: "textChart"
        },
       
        {
            xaxis: "country",
            yaxis: "area_covered",
            categories: ["greenland", "india", "africa", "china", "japan"],
            values: [423, 696, 657, 545, 567],
            aggregation: "Sum",
            charttype: "map"
        },
        {
            xaxis: "Product",
            yaxis: "unit_cost",
            categories: ["Mobile", "Laptop", "Tablet", "Camera", "Headphones"],
            values: [300, 1000, 500, 700, 50],
            aggregation: "Sum",
            charttype: "singleValue"
        },
        
        {
            xaxis: "Product Category",
            yaxis: "quantity_sold",
            categories: ["Electronics", "Clothing", "Furniture", "Toys", "Food"],
            values: [10000, 15000, 8000, 12000, 25000],
            aggregation: "Count",
            charttype: "hierarchicalBar"
        },
       
    {
            xaxis: "Region",
            yaxis: "growth_rate",
            categories: ["North", "South", "East", "West"],
            values: [5, 10, 15, 20],
            aggregation: "Average",
            charttype: "treeMap"
        },
    ];
    
    useEffect(() => {
        data.forEach((chartData, index) => {
            console.log(`Chart ${index + 1}data:`, chartData);
        });
    }, []);



return (
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
                    width: '460px', // Fixed width
                    height: '360px', // Fixed height
                    overflow: 'hidden', // Prevent content overflow
                }}
            >
                {chartData.charttype === "line" && (
                    <LineChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "bar" && (
                    <BarChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />


                )}
                {chartData.charttype === "pie" && (
                    <Pie
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "area" && (
                    <AreaChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "scatter" && (
                    <ScatterPlot
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "polarArea" && (
                    <PolarAreaChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "duelAxis" && (
                    <DuelAxisChart
                        categories={chartData.categories}
                        series1={chartData.series1}
                        series2={chartData.series2}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "textChart" && (
                    <TextChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "map" && (
                    <MapChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
                {chartData.charttype === "singleValue" && (
                    <SingleValueChart
                        categories={chartData.categories}
                        values={chartData.values}
                        aggregation={chartData.aggregation}
                    />
                )}
            </div>
        ))}
    </div>
);
};

export default AllCharts;
