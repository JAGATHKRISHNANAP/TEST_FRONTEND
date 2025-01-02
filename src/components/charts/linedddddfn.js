
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import "./tooltip.css"; // Import the CSS for the tooltip
import ContectMenu from "./contextMenu";
import CustomToolTip from "./customToolTip";
import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { sendCategoryToBackend, fetchPredictionDataAPI } from '../../utils/api';
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

    const [plotData, setPlotData] = useState({ categories, values });
    const [barClicked, setBarClicked] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [timePeriod, setTimePeriod] = useState("");
    const [number, setNumber] = useState("");

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

    const isDateCategory = (category) => {
        const datePattern1 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // YYYY-MM-DD HH:MM:SS
        const datePattern2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // MM/DD/YYYY
        return datePattern1.test(category) || datePattern2.test(category);
    };
    const areCategoriesDates = categories.some(isDateCategory);
    console.log("areCategoriesDates", areCategoriesDates);

        useEffect(() => {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

    const handlePredictData = async () => {
        try {
            const predictionData = await fetchPredictionDataAPI({
                xAxis,
                yAxis,
                timePeriod,
                number,
            });

            setPlotData({
                categories: predictionData.map((item) => item.category),
                values: predictionData.map((item) => item.value),
            });

            handleCloseModal();
        } catch (error) {
            console.error("Failed to fetch prediction data:", error);
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);
    const handleNumberChange = (event) => setNumber(event.target.value);

    const handleSortAscending = () => {
        const sortedData = plotData.categories.map((category, index) => ({
            category,
            value: plotData.values[index]
        }));

        sortedData.sort((a, b) => a.value - b.value);

        setPlotData({
            categories: sortedData.map(item => item.category),
            values: sortedData.map(item => item.value)
        });
    };

    const handleSortDescending = () => {
        const sortedData = plotData.categories.map((category, index) => ({
            category,
            value: plotData.values[index]
        }));

        sortedData.sort((a, b) => b.value - a.value);

        setPlotData({
            categories: sortedData.map(item => item.category),
            values: sortedData.map(item => item.value)
        });
    };

    const options = {
        chart: {
            events: {
                dataPointSelection: handleClicked
            },
            toolbar: {
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
                            title: 'Sort Ascending',
                            click: handleSortAscending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
                            title: 'Sort Descending',
                            click: handleSortDescending
                        }
                    ],
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: true,
                    reset: true,
                }
            }
        },
        xaxis: {
            categories: plotData.categories || [],
            title: { text: `${xAxis}` },
            labels: { style: { fontSize: '12px', colors: ['#000'] } }
        },
        yaxis: {
            title: { text: `${yAxis}` },
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
            custom: ({ series, seriesIndex, dataPointIndex }) => {
                const category = plotData.categories[dataPointIndex];
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
        colors: [lineColor]
    };

    const series = [{
        name: aggregation || 'Series',
        data: plotData.values || []
    }];

    return (
        <div>
            <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
            <div className="chart-title">{customHeadings}</div>
                <Chart options={options} series={series} type="line" width="100%" height="100%" />
            </ResizableBox>

                                     {areCategoriesDates && (
                                    <Button variant="contained" onClick={handleOpenModal}>
                                        Predict Data
                                    </Button>
                                )}
 <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Time Period</InputLabel>
                        <Select value={timePeriod} onChange={handleTimePeriodChange}>
                            <MenuItem value="years">Years</MenuItem>
                            <MenuItem value="months">Months</MenuItem>
                            <MenuItem value="days">Days</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Enter Number"
                        value={number}
                        onChange={handleNumberChange}
                        type="number"
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" onClick={handlePredictData} fullWidth>
                        Submit
                    </Button>
                </Box>
            </Modal>
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
        </div>
    );
};

export default LineChart;





// import React, { useEffect, useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import "./tooltip.css"; // Import the CSS for the tooltip
// import ContectMenu from "./contextMenu";
// import CustomToolTip from "./customToolTip";
// import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import { sendCategoryToBackend, fetchPredictionDataAPI } from '../../utils/api';
// import Draggable from "react-draggable";

// const LineChart = ({ categories, values, aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);

//     const [plotData, setPlotData] = useState({ categories, values });
//     const [barClicked, setBarClicked] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [timePeriod, setTimePeriod] = useState("");
//     const [number, setNumber] = useState("");

//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate
//             );
//             setPlotData(data);
//             setBarClicked(true);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const handleShowPopup = () => {
//         setPopupVisible(true);
//         setContextMenuVisible(false);
//     };

//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     const handlePredictData = async () => {
//         try {
//             const predictionData = await fetchPredictionDataAPI({
//                 xAxis,
//                 yAxis,
//                 timePeriod,
//                 number,
//             });

//             setPlotData({
//                 categories: predictionData.map((item) => item.category),
//                 values: predictionData.map((item) => item.value),
//             });

//             handleCloseModal();
//         } catch (error) {
//             console.error("Failed to fetch prediction data:", error);
//         }
//     };

//     const handleOpenModal = () => setModalOpen(true);
//     const handleCloseModal = () => setModalOpen(false);

//     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);
//     const handleNumberChange = (event) => setNumber(event.target.value);

//     const handleSortAscending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => a.value - b.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const handleSortDescending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => b.value - a.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked
//             },
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
//                             title: 'Sort Ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
//                             title: 'Sort Descending',
//                             click: handleSortDescending
//                         }
//                     ],
//                     download: true,
//                     pan: true,
//                     reset: true,
//                 }
//             }
//         },
//         xaxis: {
//             categories: plotData.categories || [],
//             title: { text: `${xAxis}` },
//             labels: { style: { fontSize: '12px', colors: ['#000'] } }
//         },
//         yaxis: {
//             title: { text: `${yAxis}` },
//             labels: {
//                 style: { fontSize: '12px', colors: ['#000'] },
//                 formatter: (value) => {
//                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
//                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
//                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
//                     return value;
//                 }
//             }
//         },
//         tooltip: {
//             custom: ({ series, seriesIndex, dataPointIndex }) => {
//                 const category = plotData.categories[dataPointIndex];
//                 const value = series[seriesIndex][dataPointIndex];
//                 return `
//                     <div style="background: white; padding: 10px; border-radius: 4px;">
//                         <strong>Category:</strong> ${category}<br />
//                         <strong>Value:</strong> ${value}
//                     </div>
//                 `;
//             }
//         },
//         colors: [lineColor]
//     };

//     const series = [{
//         name: aggregation || 'Series',
//         data: plotData.values || []
//     }];

//     return (
//         <div>
//             <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
//                 <Chart options={options} series={series} type="line" width="100%" height="100%" />
//             </ResizableBox>

//             <Button variant="contained" onClick={handleOpenModal}>Predict Data</Button>

//             <Modal open={modalOpen} onClose={handleCloseModal}>
//                 <Box sx={{ p: 4 }}>
//                     <FormControl fullWidth>
//                         <InputLabel>Time Period</InputLabel>
//                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
//                             <MenuItem value="years">Years</MenuItem>
//                             <MenuItem value="months">Months</MenuItem>
//                             <MenuItem value="days">Days</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField fullWidth label="Enter Number" value={number} onChange={handleNumberChange} type="number" />
//                     <Button variant="contained" onClick={handlePredictData}>Submit</Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default LineChart;
