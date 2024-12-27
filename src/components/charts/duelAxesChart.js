import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import axios from 'axios';
import DrillBarChart from '../drillDown/drillDownBarChart';
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip';
import { sendCategoryToBackend} from '../../utils/api';
import Draggable from 'react-draggable';

const DuelAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
    const dispatch = useDispatch();
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [plotData, setPlotData] = useState({});
    const [barClicked, setBarClicked] = useState(false);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const contextMenuRef = useRef(null);


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
        setContextMenuVisible(false);
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
            type: 'line',  // Setting type to 'line' for dual-axis chart
            height: 350,
            events: {
                dataPointSelection: handleClicked
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                }
            }
        },
        yaxis: [
            {
                title: {
                    text: yAxis[0] || 'Series 1'
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
            {
                opposite: true,
                title: {
                    text: yAxis[1] || 'Series 2'
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
            }
        ],
        plotOptions: {
            bar: {
                distributed: false,
                dataLabels: {
                    hideOverflowingLabels: false
                }
            }
        },
        title: {
            text: `${aggregate} of ${xAxis} vs ${yAxis.join(' and ')}`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#263238'
            },
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#f1f3fa'
        },

        tooltip: {
            shared: true, // Enable shared tooltip for multiple series
            intersect: false, // Ensure tooltips display for all series on the same x-axis
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                // `w` contains the entire chart object and the categories array
                const category = w.globals.categoryLabels[dataPointIndex];
                const series1Value = series[0][dataPointIndex];
                const series2Value = series[1][dataPointIndex];
        
                return `
                    <div style="padding: 10px; font-size: 12px; font-weight: bold; color: #000;background:rgb(255, 255, 255); border-radius: 5px;text-align: left;">
                        <div>X-Axis: <span style="color: #008FFB;">${category}</span></div>
                        <div>${yAxis[0] || 'Series 1'}: <span style="color:rgb(33, 123, 197);">${series1Value.toLocaleString()}</span></div>
                        <div>${yAxis[1] || 'Series 2'}: <span style="color:rgb(228, 21, 21);">${series2Value.toLocaleString()}</span></div>
                    </div>
                `;
            }
        }
        
        
    };

    const series = [
        {
            name: yAxis[0] || 'Series 1',
            type: 'bar',
            data: series1,
            // color: '#008FFB'
        },
        {
            name: yAxis[1] || 'Series 2',
            type: 'line',
            data: series2,
            color: '#00E356'
        }
    ];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
               
               
                {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}> */}
                <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
                <div className="color-picker-container">
                </div>
            </div>
            {contextMenuVisible && (
                <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
            )}
                          {popupVisible && (
        <Draggable>
          <div>
            <CustomToolTip onClose={handleClosePopup} />
          </div>
        </Draggable>
      )}
            {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
             */}
            {/* {barClicked && <DrillBarChart
                categories={plotData.categories}
                values={plotData.values}
                aggregation={plotData.aggregation}
                xAxis={xAxis}
                yAxis={yAxis}
                selectedTable={selectedTable}
            />} */}
        </div>
    );
};

export default DuelAxisChart;
