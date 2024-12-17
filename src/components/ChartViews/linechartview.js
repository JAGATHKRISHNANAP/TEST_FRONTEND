import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import DrillLineChart from "../drillDown/drillDownLineChart";
import "../charts/tooltip.css"; // Import the CSS for the tooltip
import ContectMenu from "../charts/contextMenu";
import CustomToolTip from "../charts/customToolTip";
import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

const LineChart = ({ categories, values, aggregation,  x_axis, y_axis, otherChartCategories = []  }) => {
    const dispatch = useDispatch();
    const lineColor = useSelector((state) => state.chartColor.chartColor);
    // const xAxis = useSelector((state) => state.chart.xAxis);
    // const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const [plotData, setPlotData] = useState({});
    const [barClicked, setBarClicked] = useState(false);

    console.log("xAxis",x_axis);
    console.log("yAxis",y_axis); 
    console.log("categories",categories);
    console.log("values",values);
    console.log("aggregation",aggregation);


    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const [timePeriod, setTimePeriod] = useState(""); // State for dropdown value
    const [number, setNumber] = useState(""); // State for number input

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
                xAxis: x_axis,
                yAxis: y_axis,
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

    // New function to handle predictions
    const handlePredictData = async () => {
        // Call backend to fetch prediction data with selected time period and number
        try {
            const response = await axios.post("http://localhost:5000/api/predictions", {
                xAxis: x_axis, // replace with actual value
                yAxis: y_axis, // replace with actual value
                timePeriod: timePeriod,
                number: number,
            });
            const predictionData = response.data;

            // Update plot data with predictions
            setPlotData({
                categories: predictionData.map((item) => item.category),
                values: predictionData.map((item) => item.value),
            });
            // setBarClicked(true);
            handleCloseModal(); // Close modal after prediction
        } catch (error) {
            console.error("Error fetching prediction data:", error);
        }
    };
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // Handle dropdown change
    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    // Handle input change
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };


    const options = {
        chart: {
            id: "basic-line",
            events: {
                dataPointSelection: handleClicked
            },
            toolbar: {
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:15px;cursor:pointer;">⚡</button>',
                            // icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;"><span class="material-icons">show_chart</span> Predict</button>',

                            // icon: <OnlinePredictionIcon style={{ color: '#007bff', fontSize: '14px' }} />,
                            index: 1, // Start with the first position in the toolbar
                            title: 'Pridect Data',
                            class: 'custom-sort-ascending',
                            click: handleOpenModal,
                        
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
            categories: plotData.categories || categories || [], // Display predicted or original categories
            title: {
                text: `${x_axis}`,
              },
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    colors: ['#000']
                }
                // show:false,
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
        data: plotData.values || values || [] // Use predicted or original values
    }];

    return (
        <div className="app">
            <div className="row">
                <div className="line-chart">
                    <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
                    <div className="chart-title">{customHeadings}</div>
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

            {/* Button to trigger prediction */}
            {/* <Button variant="contained"  onClick={handleOpenModal}>Predict Data</Button> */}
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
            {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
            {barClicked && <DrillLineChart
                categories={plotData.categories}
                values={plotData.values}
                aggregation={plotData.aggregation}
                xAxis={x_axis}
                yAxis={y_axis}
                selectedTable={selectedTable}
            />}
        </div>
    );
};

export default LineChart;
