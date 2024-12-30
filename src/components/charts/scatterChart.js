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
    const contextMenuRef = useRef(null);

    const handleClicked = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = categories[clickedCategoryIndex];
        dispatch(setClickedCategory(clickedCategory));
        try {
            // Make an HTTP request to your backend
            const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
                category: clickedCategory,
                xAxis: xAxis,
                yAxis: yAxis,
                tableName: selectedTable,
                aggregation: aggregate
            });

            setPlotData(response.data);
            setBarClicked(true);
        } catch (error) {
            console.error('Error sending category to backend:', error);
        }
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            setContextMenuVisible(false);
        }
    };

    const handleShowPopup = () => {
        setPopupVisible(true);
        setContextMenuVisible(false); // Hide context menu when showing popup
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const options = {
        chart: {
            id: "basic-line",
            events: {
                dataPointSelection: handleClicked
            },
        },
        xaxis: {
            categories: categories || [], // Make sure this array has the correct category names
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
        data: values || []
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="line-chart">
                    {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
                    <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
                    <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
                    <Chart
                            options={options}
                            series={series}
                            type="scatter"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
            </div>
            {contextMenuVisible && (
                <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
            )}
            {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
            {barClicked && <DrillLineChart
                categories={plotData.categories}
                values={plotData.values}
                aggregation={plotData.aggregation}
                xAxis={xAxis}
                yAxis={yAxis}
                selectedTable={selectedTable}
            />}
        </div>
    );
};

export default LineChart;
