import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { ResizableBox } from "react-resizable";

const DrillPieChart = ({ categories, values, aggregation, xAxis, yAxis, selectedTable }) => {
    const [chartData, setChartData] = useState({
        categories: [],
        values: []
    });

    const [drilldownData, setDrilldownData] = useState(null);
    const barColor = useSelector(state => state.chartColor.chartColor);

    useEffect(() => {
        setChartData({
            categories: categories || [],
            values: values || []
        });
        console.log("Categories:------------------------", categories);
        console.log("Values:----------------------------", values);
    }, [categories, values]);

    const handlePieSliceClick = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = chartData.categories[clickedCategoryIndex];

        // Fetch the drilldown data for the clicked category
        try {
            const response = await axios.get(`/api/drilldown-data?category=${clickedCategory}&table=${selectedTable}`);
            const { categories: drilldownCategories, values: drilldownValues } = response.data;
            setDrilldownData({
                categories: drilldownCategories,
                values: drilldownValues
            });
        } catch (error) {
            console.error("Error fetching drilldown data:", error);
        }
    };

    const options = {
        chart: {
            events: {
                dataPointSelection: handlePieSliceClick
            }
        },
        // labels: chartData.categories,
        labels: categories || [],
        // plotOptions: {
           
        // },
        // dataLabels: {
        //     enabled: true,
        //     formatter: function (val, opts) {
        //         return val.toFixed(2) + "%";
        //     },
        //     style: {
        //         fontSize: '12px',

        //     }
        // },
        // grid: {

        // }


    };
    let aggregationLabel = '';
    switch (aggregation) {
      case 'sum':
        aggregationLabel = 'Sum';
        break;
      case 'minimum':
        aggregationLabel = 'Minimum';
        break;
      case 'maximum':
        aggregationLabel = 'Maximum';
        break;
      case 'average':
        aggregationLabel = 'Average';
        break;
      case 'count':
        aggregationLabel = 'Count';
        break;
      default:
        aggregationLabel = '';
    }
  
    const series = values || [];

    // const series = chartData.values;

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ResizableBox width={500} height={250} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                        <Chart
                            options={options}
                            series={series}
                            type="pie"
                            width="70%"
                            height="300"
                        />
                    </ResizableBox>
                    {drilldownData && (
                        <div className="drilldown-chart">
                            <ResizableBox width={500} height={250} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
                                <Chart
                                    options={{
                                        ...options,
                                        labels: drilldownData.categories
                                    }}
                                    series={drilldownData.values}
                                    type="pie"
                                    width="70%"
                                    height="300"
                                />
                            </ResizableBox>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DrillPieChart;
