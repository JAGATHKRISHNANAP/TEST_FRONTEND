

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import DrillLineChart from "../drillDown/drillDownLineChart";
import "./tooltip.css"; // Import the CSS for the tooltip
import ContectMenu from "./contextMenu";
import CustomToolTip from "./customToolTip";
import { sendCategoryToBackend} from '../../utils/api';
import Draggable from "react-draggable";

const LineChart = ({ categories, values, aggregation }) => {

    const dispatch = useDispatch();
    const lineColor = useSelector((state) => state.chartColor.chartColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const [plotData, setPlotData] = useState({});
    const [barClicked, setBarClicked] = useState(false);
    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
    //  const xFontSize = useSelector((state) => state.toolTip.fontSizeX);
    //              const yFontSize= useSelector((state) => state.toolTip.fontSizeY);
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
        const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
    const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor= useSelector((state) => state.toolTip.valueColor);
    const contextMenuRef = useRef(null);
    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

        const handleClicked = async (event, chartContext, config) => {
            const clickedCategoryIndex = config.dataPointIndex;
            const clickedCategory = categories[clickedCategoryIndex];
            dispatch(setClickedCategory(clickedCategory));
            try {
              const data = await sendCategoryToBackend(
                clickedCategory,
                xAxis,
                yAxis,
                selectedTable,
                aggregate
              );
              setPlotData(data);
              setBarClicked(true);
            } catch (error) {
              console.error('Error handling click event:', error);
            }
          };
 useEffect(() => {
             setSortedCategories(categories);
             setSortedValues(values);
         }, [categories, values]);
     
const handleTop10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
        category: sortedCategories[index],
        value
    }));
    sortedData.sort((a, b) => b.value - a.value); // Sort descending
    const top10 = sortedData.slice(0, 10); // Get top 10
    setSortedCategories(top10.map(item => item.category));
    setSortedValues(top10.map(item => item.value));

setIsFiltered(true); // Mark as filtered
};

const handleBottom10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
        category: sortedCategories[index],
        value
    }));
    sortedData.sort((a, b) => a.value - b.value); // Sort ascending
    const bottom10 = sortedData.slice(0, 10); // Get bottom 10
    setSortedCategories(bottom10.map(item => item.category));
    setSortedValues(bottom10.map(item => item.value));
    setIsFiltered(true); // Mark as filtered
}
    const handleSortAscending = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => a.value - b.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleSortDescending = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => b.value - a.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const options = {
        // chart: {
        //     id: "basic-line",
        //     events: {
        //         dataPointSelection: handleClicked
        //     },
        // },
        chart: {
            
            events: {
                dataPointSelection: handleClicked
            },
             
            toolbar: {
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
                            index: 1, // Start with the first position in the toolbar
                            title: 'Sort Ascending',
                            class: 'custom-sort-ascending',
                            click: handleSortAscending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
                            index: 2, // Position right after the previous custom icon
                            title: 'Sort Descending',
                            class: 'custom-sort-descending',
                            click: handleSortDescending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#28a745;font-size:20px;">⬆️</button>',
                            index: 3, // Top 10
                            title: 'Show Top 10',
                            class: 'custom-top-10',
                            click: handleTop10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#dc3545;font-size:20px;">⬇️</button>',
                            index: 4, // Bottom 10
                            title: 'Show Bottom 10',
                            class: 'custom-bottom-10',
                            click: handleBottom10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
                            index: 5, // Reset
                            title: 'Reset Chart',
                            class: 'custom-reset',
                            click: () => {
                                setSortedCategories(categories); // Reset categories
                                setSortedValues(values);         // Reset values
                                setIsFiltered(false);            // Clear filter state
                            },
                        },
                        ],
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: true,
                    reset: true,
                },
                offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
                offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
            }
        },
        xaxis: {
            title: {
                text: `${xAxis}`,
              },
            categories:setSortedCategories || [], // Make sure this array has the correct category names
            labels: {
                show: true,
                style: {
                    fontSize: `${xFontSize}px`, // Use Redux state for font size
                fontWeight: 400,
                colors: categoryColor,
                fontFamily: fontStyle,
                }
            }
        },
        yaxis: {
            title: {
                text: `${yAxis}`,
              },
            labels: {
                style: {
                    fontSize: `${yFontSize}px`, // Use Redux state for font size
                fontWeight: 400,
                colors: [valueColor], // Use Redux state for label color
                fontFamily: fontStyle,
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
        tooltip: {
            enabled: true,
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
                const value = series[seriesIndex][dataPointIndex];
                const currentAggregation = aggregation || 'Aggregation';
                const currentXAxis = xAxis[0] || 'X-Axis';
                const currentYAxis = yAxis || 'Y-Axis';
    
                return `
                    <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                        ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
                        <div>
                            ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
                            ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
                        </div>
                    </div>
                `;
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
        data: sortedValues || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="line-chart">
                
                     <ResizableBox
                       width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
                       height='100px'
                       minConstraints={[600, 300]} // Minimum width and height
                       maxConstraints={[800, 500]} // Maximum width and height
                       resizeHandles={['e', 'w']} // Allow horizontal resizing
                       className="resizable-chart"
                     > <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
                     <Chart options={options}series={series} type="scatter" height={500} />
                     
                       {/* <Chart options={options} series={[{ data: sortedValues }]} type="bar" height={500} /> */}
                     </ResizableBox>
                </div>
            </div>
            
        </div>
    );
};

export default LineChart;
