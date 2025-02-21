// // import axios from "axios";
// // import React, { useEffect, useState, useRef } from "react";
// // import Chart from "react-apexcharts";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import DrillPieChart from "../drillDown/drillDownPieChart";
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
// // import "./tooltip.css"; // Import the CSS for the tooltip

// // const Pie = (props) => {
// //   useEffect(() => {
// //     console.log("Received categories:", props.categories);
// //     console.log("Received values:", props.values);
// //   }, [props.categories, props.values]);

// //   const { categories, values, aggregation } = props;

// //   const dispatch = useDispatch();
// //   const xAxis = useSelector((state) => state.chart.xAxis);
// //   const yAxis = useSelector((state) => state.chart.yAxis);
// //   const aggregate = useSelector((state) => state.chart.aggregate);
// //   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //   const toolTipOptions = useSelector((state) => state.toolTip);
// //   const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
// //   const [plotData, setPlotData] = useState({});
// //   const [barClicked, setBarClicked] = useState(false);
// //   const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //   const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //   const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
// //   const contextMenuRef = useRef(null);
// //   const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

// //   const handleClicked = async (event, chartContext, config) => {
// //     const clickedCategoryIndex = config.dataPointIndex;
// //     const clickedCategory = categories[clickedCategoryIndex];
// //     dispatch(setClickedCategory(clickedCategory));
// //     try {
// //         // Make an HTTP request to your backend
// //         const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
// //             category: clickedCategory,
// //             xAxis: xAxis,
// //             yAxis: yAxis,
// //             tableName: selectedTable,
// //             aggregation: aggregate
// //         });

// //         setPlotData(response.data);
// //         setBarClicked(true);
// //     } catch (error) {
// //         console.error('Error sending category to backend:', error);
// //     }
// //   };

// //   const handleContextMenu = (event) => {
// //     event.preventDefault();
// //     setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //     setContextMenuVisible(true);
// //   };

// //   const handleClickOutside = (event) => {
// //     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //         setContextMenuVisible(false);
// //     }
// //   };

// //   const handleShowPopup = () => {
// //     setPopupVisible(true);
// //     setContextMenuVisible(false); // Hide context menu when showing popup
// //   };

// //   const handleClosePopup = () => {
// //     setPopupVisible(false);
// //   };

// //   useEffect(() => {
// //     document.addEventListener('click', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('click', handleClickOutside);
// //     };
// //   }, []);

// //   const options = {
// //     chart: {
// //       events: {
// //         dataPointSelection: handleClicked
// //       },
// //       id: "basic-pie"
      
// //     },
// //     labels: categories || [],
// //     Legend:false
// //   };

// //   let aggregationLabel = '';
// //   switch (aggregation) {
// //     case 'sum':
// //       aggregationLabel = 'Sum';
// //       break;
// //     case 'minimum':
// //       aggregationLabel = 'Minimum';
// //       break;
// //     case 'maximum':
// //       aggregationLabel = 'Maximum';
// //       break;
// //     case 'average':
// //       aggregationLabel = 'Average';
// //       break;
// //     case 'count':
// //       aggregationLabel = 'Count';
// //       break;
// //     default:
// //       aggregationLabel = '';
// //   }
// //   console.log("aggregration", aggregationLabel);

// //   const series = values || [];

// //   return (
// //     <div className="app">
// //       <div className="row">
// //         <div className="pie-chart">
// //           {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
// //           <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
// //           <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
// //           <Chart
// //               options={options}
// //               series={series}
// //               type="pie"
// //               width="100%"
// //               height="100%"
// //             />
// //           </ResizableBox>
// //         </div>
// //         <div className="color-picker">
// //           {/* Additional content */}
// //         </div>
// //       </div>
// //       {contextMenuVisible && (
// //         <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //       )}
// //       {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// //       {barClicked && <DrillPieChart
// //           categories={plotData.categories}
// //           values={plotData.values}
// //           aggregation={plotData.aggregation}
// //           xAxis={xAxis}
// //           yAxis={yAxis}
// //           selectedTable={selectedTable}
// //         />}
// //     </div>
// //   );
// // }

// // export default Pie;


import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import DrillPieChart from "../drillDown/drillDownPieChart";
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
import "./tooltip.css"; // Import the CSS for the tooltip
import { sendCategoryToBackend} from '../../utils/api';
import Draggable from "react-draggable";

// const Pie = (props) => {
//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   const { categories, values, aggregation } = props;

//   const dispatch = useDispatch();
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const aggregate = useSelector((state) => state.chart.aggregate);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   // const toolTipOptions = useSelector((state) => state.toolTip);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
//   const [plotData, setPlotData] = useState({});
//   const [barClicked, setBarClicked] = useState(false);
//   const [contextMenuVisible, setContextMenuVisible] = useState(false);
//   const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//   const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

//   const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
//   const contextMenuRef = useRef(null);

//       const handleClicked = async (event, chartContext, config) => {
//           const clickedCategoryIndex = config.dataPointIndex;
//           const clickedCategory = categories[clickedCategoryIndex];
//           dispatch(setClickedCategory(clickedCategory));
//           try {
//             const data = await sendCategoryToBackend(
//               clickedCategory,
//               xAxis,
//               yAxis,
//               selectedTable,
//               aggregate
//             );
//             setPlotData(data);
//             setBarClicked(true);
//           } catch (error) {
//             console.error('Error handling click event:', error);
//           }
//         };


//   const handleContextMenu = (event) => {
//     event.preventDefault();
//     setContextMenuPosition({ x: event.pageX, y: event.pageY });
//     setContextMenuVisible(true);
//   };

//   const handleClickOutside = (event) => {
//     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//         setContextMenuVisible(false);
//     }
//   };

//   const handleShowPopup = () => {
//     setPopupVisible(true);
//     setContextMenuVisible(false); // Hide context menu when showing popup
//   };

//   const handleClosePopup = () => {
//     setPopupVisible(false);
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const options = {
//     chart: {
//       events: {
//         dataPointSelection: handleClicked
//       },
//       id: "basic-pie"
//     },
//     labels: categories || [],
//   };

//   let aggregationLabel = '';
//   switch (aggregation) {
//     case 'sum':
//       aggregationLabel = 'Sum';
//       break;
//     case 'minimum':
//       aggregationLabel = 'Minimum';
//       break;
//     case 'maximum':
//       aggregationLabel = 'Maximum';
//       break;
//     case 'average':
//       aggregationLabel = 'Average';
//       break;
//     case 'count':
//       aggregationLabel = 'Count';
//       break;
//     default:
//       aggregationLabel = '';
//   }
//   console.log("aggregration", aggregationLabel);

//   const series = values || [];

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="pie-chart">
//           {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
//           <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
//           <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//              <Chart
//               options={options}
//               series={series}
//               type="pie"
//               width="100%"
//               height="80%"
//             />
//           </ResizableBox>
//         </div>
//         <div className="color-picker">
//           {/* Additional content */}
//         </div>
//       </div>
//       {contextMenuVisible && (
//         <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//       )}
//       {/* {popupVisible && <CustomToolTip onClose={handleClosePopup} />} */}
//       {/* {barClicked && <DrillPieChart
//           categories={plotData.categories}
//           values={plotData.values}
//           aggregation={plotData.aggregation}
//           xAxis={xAxis}
//           yAxis={yAxis}
//           selectedTable={selectedTable}
//         />} */}
//               {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable>
//       )}
//     </div>
//   );
// }

// export default Pie;

const Pie = (props) => {
  useEffect(() => {
    console.log("Received categories:", props.categories);
    console.log("Received values:", props.values);
  }, [props.categories, props.values]);

  const { categories, values, aggregation } = props;

  const dispatch = useDispatch();
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);
  const [plotData, setPlotData] = useState({});
  const [barClicked, setBarClicked] = useState(false);
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
 const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
const [legendPosition, setLegendPosition] = useState("right");
    const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
    const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

    // Function to toggle legend position
    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = ["top", "bottom", "left", "right", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            return positions[newIndex];
        });
    };
    useEffect(() => {
      if (categories && Array.isArray(categories)) {
        setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
      } else {
        setPieColors([]); // Set an empty array to prevent errors
      }
    }, [categories, values]);
    
    useEffect(() => {
        setChartKey((prev) => prev + 1); // Update chart key to force re-render
    }, [legendPosition]);
    const defaultColors = [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ];
    const [pieColors, setPieColors] = useState(
      (categories || []).map((_, i) => defaultColors[i % defaultColors.length])
    );
  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
    setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
 
  }, [categories, values]);

  const handleSortAscending = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value);
    setSortedCategories(sortedData.map((item) => item.category));
    setSortedValues(sortedData.map((item) => item.value));
  };

  const handleSortDescending = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value);
    setSortedCategories(sortedData.map((item) => item.category));
    setSortedValues(sortedData.map((item) => item.value));
  };

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
};
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
      console.error("Error handling click event:", error);
    }
  };
  const handleColorChange = (index, newColor) => {
    setPieColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;
      return updatedColors;
    });
  };

  // Legend click event to open color picker
  const chartEvents = {
    legendClick: function (chartContext, seriesIndex, config) {
      setSelectedLegendIndex(seriesIndex);
      return false; // Prevent default toggle behavior
    },
  };
  const options = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          customIcons: [
            {
                icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
                index: 1, // Start with the first position in the toolbar
                title: 'Sort Ascending',
                class: 'custom-sort-ascending',
                click: handleSortAscending
            },
            {
                icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
                index: 2, // Position right after the previous custom icon
                title: 'Sort Descending',
                class: 'custom-sort-descending',
                click: handleSortDescending
            },
            {
                // Top 10: Using an upward double arrow symbol
                icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
                index: 3,
                title: 'Show Top 10',
                class: 'custom-top-10',
                click: handleTop10,
            },
            {
                // Bottom 10: Using a downward double arrow symbol
                icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
                index: 4,
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
        {
          icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
          index: 6,
          title: "Toggle Legend Position",
          class: "custom-legend-toggle",
          click: toggleLegendPosition,
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
        offsetX: 0,
        offsetY: 0,
      },
      events: chartEvents,

    },
    colors: pieColors,
    legend: {
      show: true,
      position: legendPosition === "hide" ? "bottom" : legendPosition,
    },
    labels: sortedCategories || [],
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

  console.log('aggregation', aggregationLabel);

  const series = sortedValues || [];

  return (
    <div className="app">
      <div className="row">
        <div className="pie-chart">
          <ResizableBox
            width={800}
            height={550}
            minConstraints={[500, 200]}
            maxConstraints={[800, 550]}
          >
            <div className="chart-title">
              <h3 style={{ color: headingColor }}>{customHeadings}</h3>
            </div>
            <Chart
             key={chartKey}
              options={options}
              series={series}
              type="pie"
              width="100%"
              height="80%"
            />
          </ResizableBox>
          {selectedLegendIndex !== null && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span>
                Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
              </span>
              <input
                type="color"
                value={pieColors[selectedLegendIndex]}
                onChange={(e) =>
                  handleColorChange(selectedLegendIndex, e.target.value)
                }
                onBlur={() => setSelectedLegendIndex(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pie;

// // const Pie = (props) => {
// //   const { categories, values, aggregation } = props;
// //   const dispatch = useDispatch();
// //   const xAxis = useSelector((state) => state.chart.xAxis);
// //   const yAxis = useSelector((state) => state.chart.yAxis);
// //   const aggregate = useSelector((state) => state.chart.aggregate);
// //   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //   const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //   const headingColor = useSelector((state) => state.toolTip.headingColor);

// //   const [plotData, setPlotData] = useState({});
// //   const [barClicked, setBarClicked] = useState(false);
// //   const [sortedCategories, setSortedCategories] = useState(categories);
// //   const [sortedValues, setSortedValues] = useState(values);
// //   const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
// //   const [legendPosition, setLegendPosition] = useState("right");
// //   const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes

// //   // NEW: State for pie slice colors.
// //   // Initialize default colors (cycle through these if there are more categories)
// //   const defaultColors = [
// //     "#008FFB",
// //     "#00E396",
// //     "#FEB019",
// //     "#FF4560",
// //     "#775DD0",
// //     "#546E7A",
// //     "#26a69a",
// //     "#D10CE8",
// //   ];
// //   const [pieColors, setPieColors] = useState(
// //     categories.map((_, i) => defaultColors[i % defaultColors.length])
// //   );

// //   // NEW: Track which legend item (pie slice) is being edited.
// //   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

// //   // Log received props for debugging
// //   useEffect(() => {
// //     console.log("Received categories:", props.categories);
// //     console.log("Received values:", props.values);
// //   }, [props.categories, props.values]);

// //   // Update sorted data when categories or values change
// //   useEffect(() => {
// //     setSortedCategories(categories);
// //     setSortedValues(values);
// //     // Also reset the pieColors to the defaults if needed:
// //     setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
// //   }, [categories, values]);

// //   // Toolbar functions for sorting and filtering (as in your original code)
// //   const handleSortAscending = () => {
// //     const sortedData = sortedValues.map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => a.value - b.value);
// //     setSortedCategories(sortedData.map((item) => item.category));
// //     setSortedValues(sortedData.map((item) => item.value));
// //   };

// //   const handleSortDescending = () => {
// //     const sortedData = sortedValues.map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => b.value - a.value);
// //     setSortedCategories(sortedData.map((item) => item.category));
// //     setSortedValues(sortedData.map((item) => item.value));
// //   };

// //   const handleTop10 = () => {
// //     const sortedData = sortedValues.map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => b.value - a.value); // Sort descending
// //     const top10 = sortedData.slice(0, 10);
// //     setSortedCategories(top10.map((item) => item.category));
// //     setSortedValues(top10.map((item) => item.value));
// //     setIsFiltered(true);
// //   };

// //   const handleBottom10 = () => {
// //     const sortedData = sortedValues.map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => a.value - b.value); // Sort ascending
// //     const bottom10 = sortedData.slice(0, 10);
// //     setSortedCategories(bottom10.map((item) => item.category));
// //     setSortedValues(bottom10.map((item) => item.value));
// //     setIsFiltered(true);
// //   };

// //   // Function when a bar (pie slice) is clicked
// //   const handleClicked = async (event, chartContext, config) => {
// //     const clickedCategoryIndex = config.dataPointIndex;
// //     const clickedCategory = categories[clickedCategoryIndex];
// //     dispatch(setClickedCategory(clickedCategory));
// //     try {
// //       const data = await sendCategoryToBackend(
// //         clickedCategory,
// //         xAxis,
// //         yAxis,
// //         selectedTable,
// //         aggregate
// //       );
// //       setPlotData(data);
// //       setBarClicked(true);
// //     } catch (error) {
// //       console.error("Error handling click event:", error);
// //     }
// //   };

// //   // Function to toggle legend position (for your toolbar)
// //   const toggleLegendPosition = () => {
// //     setLegendPosition((prev) => {
// //       const positions = ["top", "bottom", "left", "right", "hide"];
// //       const newIndex = (positions.indexOf(prev) + 1) % positions.length;
// //       return positions[newIndex];
// //     });
// //   };

// //   useEffect(() => {
// //     setChartKey((prev) => prev + 1);
// //   }, [legendPosition]);

// //   // Handle color changes from the custom legend
// //   const handleColorChange = (index, newColor) => {
// //     setPieColors((prevColors) => {
// //       const updatedColors = [...prevColors];
// //       updatedColors[index] = newColor;
// //       return updatedColors;
// //     });
// //   };

// //   // Chart options – note the new `colors` property
// //   const options = {
// //     chart: {
// //       toolbar: {
// //         show: true,
// //         tools: {
// //           customIcons: [
// //             {
// //               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
// //               index: 1,
// //               title: "Sort Ascending",
// //               class: "custom-sort-ascending",
// //               click: handleSortAscending,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
// //               index: 2,
// //               title: "Sort Descending",
// //               class: "custom-sort-descending",
// //               click: handleSortDescending,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
// //               index: 3,
// //               title: "Show Top 10",
// //               class: "custom-top-10",
// //               click: handleTop10,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
// //               index: 4,
// //               title: "Show Bottom 10",
// //               class: "custom-bottom-10",
// //               click: handleBottom10,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
// //               index: 5,
// //               title: "Reset Chart",
// //               class: "custom-reset",
// //               click: () => {
// //                 setSortedCategories(categories);
// //                 setSortedValues(values);
// //                 setIsFiltered(false);
// //               },
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
// //               index: 6,
// //               title: "Toggle Legend Position",
// //               class: "custom-legend-toggle",
// //               click: toggleLegendPosition,
// //             },
// //           ],
// //           download: true,
// //           selection: true,
// //           zoom: false,
// //           zoomin: false,
// //           zoomout: false,
// //           pan: true,
// //           reset: true,
// //         },
// //         offsetX: 0,
// //         offsetY: 0,
// //       },
// //     },
// //     // Pass in our custom colors here:
// //     colors: pieColors,
// //     // If you want to use your custom legend, you can hide the built-in one:
// //     legend: {
// //       show: false,
// //       position: legendPosition === "hide" ? "right" : legendPosition,
// //     },
// //     labels: sortedCategories || [],
// //   };

// //   // Series for the pie chart
// //   const series = sortedValues || [];

// //   // (Optional) Build a label for aggregation if needed
// //   let aggregationLabel = "";
// //   switch (aggregation) {
// //     case "sum":
// //       aggregationLabel = "Sum";
// //       break;
// //     case "minimum":
// //       aggregationLabel = "Minimum";
// //       break;
// //     case "maximum":
// //       aggregationLabel = "Maximum";
// //       break;
// //     case "average":
// //       aggregationLabel = "Average";
// //       break;
// //     case "count":
// //       aggregationLabel = "Count";
// //       break;
// //     default:
// //       aggregationLabel = "";
// //   }
// //   console.log("aggregation", aggregationLabel);

// //   return (
// //     <div className="app">
// //       <div className="row">
// //         <div className="pie-chart">
// //           <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
// //             <div className="chart-title">
// //               <h3 style={{ color: headingColor }}>{customHeadings}</h3>
// //             </div>
// //             <Chart
// //               key={chartKey}
// //               options={options}
// //               series={series}
// //               type="pie"
// //               width="100%"
// //               height="80%"
// //               // (Optionally add an onClick event to the chart if needed)
// //             />{/* CUSTOM LEGEND */}
// //             <div className="custom-legend" style={{ marginTop: "10px" }}>
// //               {sortedCategories.map((category, index) => (
// //                 <div
// //                   key={index}
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     marginBottom: "5px",
// //                     cursor: "pointer",
// //                   }}
// //                   onClick={() => setSelectedLegendIndex(index)}
// //                 >
// //                   {/* Color swatch */}
// //                   <div
// //                     style={{
// //                       width: "20px",
// //                       height: "20px",
// //                       backgroundColor: pieColors[index],
// //                       border: "1px solid #000",
// //                     }}
// //                   />
// //                   <span style={{ marginLeft: "10px" }}>{category}</span>
// //                   {/* If this legend item is selected, show a color picker */}
// //                   {selectedLegendIndex === index && (
// //                     <input
// //                       type="color"
// //                       value={pieColors[index]}
// //                       onChange={(e) => handleColorChange(index, e.target.value)}
// //                       onBlur={() => setSelectedLegendIndex(null)}
// //                       style={{ marginLeft: "10px" }}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </ResizableBox>

          
// //         </div>
// //         <div className="color-picker"></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Pie;

// const Pie = (props) => {
//   const { categories, values, aggregation } = props;
//   const dispatch = useDispatch();
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const aggregate = useSelector((state) => state.chart.aggregate);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading);
//   const headingColor = useSelector((state) => state.toolTip.headingColor);

//   const [plotData, setPlotData] = useState({});
//   const [barClicked, setBarClicked] = useState(false);
//   const [sortedCategories, setSortedCategories] = useState(categories);
//   const [sortedValues, setSortedValues] = useState(values);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [legendPosition, setLegendPosition] = useState("right");
//   const [chartKey, setChartKey] = useState(0);

//   // State for pie slice colors
//   const defaultColors = [
//     "#008FFB",
//     "#00E396",
//     "#FEB019",
//     "#FF4560",
//     "#775DD0",
//     "#546E7A",
//     "#26a69a",
//     "#D10CE8",
//   ];
//   const [pieColors, setPieColors] = useState(
//     categories.map((_, i) => defaultColors[i % defaultColors.length])
//   );

//   // Track which legend item is being edited
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

//   // Log received props for debugging
//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   // Update sorted data and reset colors when categories/values change
//   useEffect(() => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
//   }, [categories, values]);

//   const handleSortAscending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleSortDescending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleTop10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const top10 = sortedData.slice(0, 10);
//     setSortedCategories(top10.map((item) => item.category));
//     setSortedValues(top10.map((item) => item.value));
//     setIsFiltered(true);
//   };

//   const handleBottom10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const bottom10 = sortedData.slice(0, 10);
//     setSortedCategories(bottom10.map((item) => item.category));
//     setSortedValues(bottom10.map((item) => item.value));
//     setIsFiltered(true);
//   };

//   const handleClicked = async (event, chartContext, config) => {
//     const clickedCategoryIndex = config.dataPointIndex;
//     const clickedCategory = categories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//       const data = await sendCategoryToBackend(
//         clickedCategory,
//         xAxis,
//         yAxis,
//         selectedTable,
//         aggregate
//       );
//       setPlotData(data);
//       setBarClicked(true);
//     } catch (error) {
//       console.error("Error handling click event:", error);
//     }
//   };

//   const toggleLegendPosition = () => {
//     setLegendPosition((prev) => {
//       const positions = ["top", "bottom", "left", "right", "hide"];
//       const newIndex = (positions.indexOf(prev) + 1) % positions.length;
//       return positions[newIndex];
//     });
//   };

//   useEffect(() => {
//     setChartKey((prev) => prev + 1);
//   }, [legendPosition]);

//   const handleColorChange = (index, newColor) => {
//     setPieColors((prevColors) => {
//       const updatedColors = [...prevColors];
//       updatedColors[index] = newColor;
//       return updatedColors;
//     });
//   };

//   const options = {
//     chart: {
//       toolbar: {
//         show: true,
//         tools: {
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//               index: 1,
//               title: "Sort Ascending",
//               class: "custom-sort-ascending",
//               click: handleSortAscending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//               index: 2,
//               title: "Sort Descending",
//               class: "custom-sort-descending",
//               click: handleSortDescending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//               index: 3,
//               title: "Show Top 10",
//               class: "custom-top-10",
//               click: handleTop10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//               index: 4,
//               title: "Show Bottom 10",
//               class: "custom-bottom-10",
//               click: handleBottom10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//               index: 5,
//               title: "Reset Chart",
//               class: "custom-reset",
//               click: () => {
//                 setSortedCategories(categories);
//                 setSortedValues(values);
//                 setIsFiltered(false);
//               },
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//           download: true,
//           selection: true,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: true,
//           reset: true,
//         },
//         offsetX: 0,
//         offsetY: 0,
//       },
//     },
//     colors: pieColors,
//     legend: {
//       show: false, // Hide built-in legend to use custom legend
//       position: legendPosition === "hide" ? "right" : legendPosition,
//     },
//     labels: sortedCategories || [],
//   };

//   const series = sortedValues || [];

//   let aggregationLabel = "";
//   switch (aggregation) {
//     case "sum":
//       aggregationLabel = "Sum";
//       break;
//     case "minimum":
//       aggregationLabel = "Minimum";
//       break;
//     case "maximum":
//       aggregationLabel = "Maximum";
//       break;
//     case "average":
//       aggregationLabel = "Average";
//       break;
//     case "count":
//       aggregationLabel = "Count";
//       break;
//     default:
//       aggregationLabel = "";
//   }
//   console.log("aggregation", aggregationLabel);
//   const legendComponent = legendPosition !== "hide" && (
//     <div
//       className="custom-legend"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexWrap: "wrap",
//         margin: "10px 0",
//       }}
//     >
//       {sortedCategories.map((category, index) => (
//         <div
//           key={index}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginRight: "15px",
//             cursor: "pointer",
//           }}
//           onClick={() => setSelectedLegendIndex(index)}
//         >
//           <div
//             style={{
//               width: "20px",
//               height: "20px",
//               backgroundColor: pieColors[index],
//               border: "1px solid #000",
//             }}
//           />
//           <span style={{ marginLeft: "10px" }}>{category}</span>
//           {selectedLegendIndex === index && (
//             <input
//               type="color"
//               value={pieColors[index]}
//               onChange={(e) => handleColorChange(index, e.target.value)}
//               onBlur={() => setSelectedLegendIndex(null)}
//               style={{ marginLeft: "10px" }}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
//   return (
//     <div className="app">
//       <div className="row">
//         <div className="pie-chart">
//           <ResizableBox
//             width={800}
//             height={550}
//             minConstraints={[500, 200]}
//             maxConstraints={[800, 550]}
//           >
//             <div className="chart-title">
//               <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//             </div>
//             <Chart
//               key={chartKey}
//               options={options}
//               series={series}
//               type="pie"
//               width="100%"
//               height="80%"
//             />
//             {/* CUSTOM LEGEND - displayed horizontally at the bottom */}
//             <div
//               className="custom-legend"
//               style={{
//                 marginTop: "10px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//               }}
//             >
//               {sortedCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginRight: "15px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setSelectedLegendIndex(index)}
//                 >
//                   {/* Color swatch */}
//                   <div
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       backgroundColor: pieColors[index],
//                       border: "1px solid #000",
//                     }}
//                   />
//                   <span style={{ marginLeft: "10px" }}>{category}</span>
//                   {selectedLegendIndex === index && (
//                     <input
//                       type="color"
//                       value={pieColors[index]}
//                       onChange={(e) => handleColorChange(index, e.target.value)}
//                       onBlur={() => setSelectedLegendIndex(null)}
//                       style={{ marginLeft: "10px" }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </ResizableBox>
//         </div>
//         <div className="color-picker"></div>
//       </div>
//     </div>
//   );
// };

// export default Pie;

// const Pie = (props) => {
//   const { categories, values, aggregation } = props;
//   const dispatch = useDispatch();
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const aggregate = useSelector((state) => state.chart.aggregate);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading);
//   const headingColor = useSelector((state) => state.toolTip.headingColor);

//   const [plotData, setPlotData] = useState({});
//   const [barClicked, setBarClicked] = useState(false);
//   const [sortedCategories, setSortedCategories] = useState(categories);
//   const [sortedValues, setSortedValues] = useState(values);
//   const [isFiltered, setIsFiltered] = useState(false);
//   // legendPosition: allowed values "top", "bottom", "left", "right", "hide"
//   const [legendPosition, setLegendPosition] = useState("right");
//   const [chartKey, setChartKey] = useState(0);

//   // State for pie slice colors
//   const defaultColors = [
//     "#008FFB",
//     "#00E396",
//     "#FEB019",
//     "#FF4560",
//     "#775DD0",
//     "#546E7A",
//     "#26a69a",
//     "#D10CE8",
//   ];
//   const [pieColors, setPieColors] = useState(
//     categories.map((_, i) => defaultColors[i % defaultColors.length])
//   );

//   // Track which legend item is being edited
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   // Update sorted data and reset colors when categories/values change
//   useEffect(() => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
//   }, [categories, values]);

//   const handleSortAscending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleSortDescending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleTop10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const top10 = sortedData.slice(0, 10);
//     setSortedCategories(top10.map((item) => item.category));
//     setSortedValues(top10.map((item) => item.value));
//     setIsFiltered(true);
//   };

//   const handleBottom10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const bottom10 = sortedData.slice(0, 10);
//     setSortedCategories(bottom10.map((item) => item.category));
//     setSortedValues(bottom10.map((item) => item.value));
//     setIsFiltered(true);
//   };

//   const handleClicked = async (event, chartContext, config) => {
//     const clickedCategoryIndex = config.dataPointIndex;
//     const clickedCategory = categories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//       const data = await sendCategoryToBackend(
//         clickedCategory,
//         xAxis,
//         yAxis,
//         selectedTable,
//         aggregate
//       );
//       setPlotData(data);
//       setBarClicked(true);
//     } catch (error) {
//       console.error("Error handling click event:", error);
//     }
//   };

//   // Toggle legend position using the existing function
//   const toggleLegendPosition = () => {
//     setLegendPosition((prev) => {
//       const positions = ["top", "bottom", "left", "right", "hide"];
//       const newIndex = (positions.indexOf(prev) + 1) % positions.length;
//       return positions[newIndex];
//     });
//   };

//   useEffect(() => {
//     setChartKey((prev) => prev + 1);
//   }, [legendPosition]);

//   const handleColorChange = (index, newColor) => {
//     setPieColors((prevColors) => {
//       const updatedColors = [...prevColors];
//       updatedColors[index] = newColor;
//       return updatedColors;
//     });
//   };

//   const options = {
//     chart: {
//       toolbar: {
//         show: true,
//         tools: {
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//               index: 1,
//               title: "Sort Ascending",
//               class: "custom-sort-ascending",
//               click: handleSortAscending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//               index: 2,
//               title: "Sort Descending",
//               class: "custom-sort-descending",
//               click: handleSortDescending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//               index: 3,
//               title: "Show Top 10",
//               class: "custom-top-10",
//               click: handleTop10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//               index: 4,
//               title: "Show Bottom 10",
//               class: "custom-bottom-10",
//               click: handleBottom10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//               index: 5,
//               title: "Reset Chart",
//               class: "custom-reset",
//               click: () => {
//                 setSortedCategories(categories);
//                 setSortedValues(values);
//                 setIsFiltered(false);
//               },
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//           download: true,
//           selection: true,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: true,
//           reset: true,
//         },
//         offsetX: 0,
//         offsetY: 0,
//       },
//     },
//     colors: pieColors,
//     legend: {
//       show: true, // We use a custom legend below
//       position: legendPosition === "hide" ? "right" : legendPosition,
//     },
//     labels: sortedCategories || [],
//   };

//   const series = sortedValues || [];

//   let aggregationLabel = "";
//   switch (aggregation) {
//     case "sum":
//       aggregationLabel = "Sum";
//       break;
//     case "minimum":
//       aggregationLabel = "Minimum";
//       break;
//     case "maximum":
//       aggregationLabel = "Maximum";
//       break;
//     case "average":
//       aggregationLabel = "Average";
//       break;
//     case "count":
//       aggregationLabel = "Count";
//       break;
//     default:
//       aggregationLabel = "";
//   }
//   console.log("aggregation", aggregationLabel);

//   // Custom legend rendered as an unordered list (<ul>)
//   const legendComponent = legendPosition !== "hide" && (
//     <ul
//       className="custom-legend-list"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         listStyle: "none",
//         padding: 0,
//         margin: "10px 0",
//       }}
//     >
//       {sortedCategories.map((category, index) => (
//         <li
//           key={index}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginRight: "15px",
//             cursor: "pointer",
//           }}
//           onClick={() => setSelectedLegendIndex(index)}
//         >
//           <span
//             style={{
//               width: "20px",
//               height: "20px",
//               backgroundColor: pieColors[index],
//               border: "1px solid #000",
//               display: "inline-block",
//             }}
//           />
//           <span style={{ marginLeft: "10px" }}>{category}</span>
//           {selectedLegendIndex === index && (
//             <input
//               type="color"
//               value={pieColors[index]}
//               onChange={(e) => handleColorChange(index, e.target.value)}
//               onBlur={() => setSelectedLegendIndex(null)}
//               style={{ marginLeft: "10px" }}
//             />
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <div className="app">
//       <div className="row">
//         {/* Render legend based on its position */}
//         {legendPosition === "top" && legendComponent}
//         {(legendPosition === "left" || legendPosition === "right") ? (
//           <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
//             {legendPosition === "left" && legendComponent}
//             <div className="pie-chart">
//               <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                 <div className="chart-title">
//                   <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//                 </div>
//                 <Chart key={chartKey} options={options} series={series} type="pie" width="100%" height="80%" />
//               </ResizableBox>
//             </div>
//             {legendPosition === "right" && legendComponent}
//           </div>
//         ) : (
//           <>
//             {legendPosition !== "top" && legendPosition !== "bottom" && (
//               <div className="pie-chart">
//                 <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                   <div className="chart-title">
//                     <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//                   </div>
//                   <Chart key={chartKey} options={options} series={series} type="pie" width="100%" height="80%" />
//                 </ResizableBox>
//               </div>
//             )}
//             {(legendPosition === "bottom" || legendPosition === "default") && (
//               <div className="pie-chart">
//                 <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                   <div className="chart-title">
//                     <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//                   </div>
//                   <Chart key={chartKey} options={options} series={series} type="pie" width="100%" height="80%" />
//                 </ResizableBox>
//               </div>
//             )}
//           </>
//         )}
//         {legendPosition === "bottom" && legendComponent}
//       </div>
//     </div>
//   );
// };

// export default Pie;

// const Pie = (props) => {
//   const { categories = [], values = [], aggregation } = props;
//   const dispatch = useDispatch();
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const aggregate = useSelector((state) => state.chart.aggregate);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading);
//   const headingColor = useSelector((state) => state.toolTip.headingColor);

//   const [sortedCategories, setSortedCategories] = useState(categories);
//   const [sortedValues, setSortedValues] = useState(values);
//   // legendPosition can be "top", "bottom", "left", "right", or "hide"
//   const [legendPosition, setLegendPosition] = useState("bottom");
//   const [chartKey, setChartKey] = useState(0);

//   // Default colors for the pie slices
//   const defaultColors = [
//     "#008FFB",
//     "#00E396",
//     "#FEB019",
//     "#FF4560",
//     "#775DD0",
//     "#546E7A",
//     "#26a69a",
//     "#D10CE8",
//   ];
//   const [pieColors, setPieColors] = useState(
//     categories.map((_, i) => defaultColors[i % defaultColors.length])
//   );

//   // This state stores the index of the legend item for which the color picker should be shown.
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

//   // Log received props for debugging
//   useEffect(() => {
//     console.log("Received categories:", props.categories);
//     console.log("Received values:", props.values);
//   }, [props.categories, props.values]);

//   // When categories or values change, update state and reset colors.
//   useEffect(() => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     setPieColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
//   }, [categories, values]);

//   // Sorting and filtering functions...
//   const handleSortAscending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleSortDescending = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map((item) => item.category));
//     setSortedValues(sortedData.map((item) => item.value));
//   };

//   const handleTop10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const top10 = sortedData.slice(0, 10);
//     setSortedCategories(top10.map((item) => item.category));
//     setSortedValues(top10.map((item) => item.value));
//   };

//   const handleBottom10 = () => {
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const bottom10 = sortedData.slice(0, 10);
//     setSortedCategories(bottom10.map((item) => item.category));
//     setSortedValues(bottom10.map((item) => item.value));
//   };

//   const handleClicked = async (event, chartContext, config) => {
//     const clickedCategoryIndex = config.dataPointIndex;
//     const clickedCategory = categories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//       const data = await sendCategoryToBackend(
//         clickedCategory,
//         xAxis,
//         yAxis,
//         selectedTable,
//         aggregate
//       );
//       // Update additional state if needed
//     } catch (error) {
//       console.error("Error handling click event:", error);
//     }
//   };

//   // Toggle legend position
//   const toggleLegendPosition = () => {
//     setLegendPosition((prev) => {
//       const positions = ["top", "bottom", "left", "right", "hide"];
//       const newIndex = (positions.indexOf(prev) + 1) % positions.length;
//       return positions[newIndex];
//     });
//   };

//   // Update chartKey when legendPosition changes to force re-render.
//   useEffect(() => {
//     setChartKey((prev) => prev + 1);
//   }, [legendPosition]);

//   // Function to update the color of a pie slice.
//   const handleColorChange = (index, newColor) => {
//     setPieColors((prevColors) => {
//       const updatedColors = [...prevColors];
//       updatedColors[index] = newColor;
//       return updatedColors;
//     });
//   };

//   // Use a regular function for the legendClick event.
//   const chartEvents = {
//     legendClick: function(chartContext, seriesIndex, config) {
//       // Open the color picker for the clicked legend item.
//       setSelectedLegendIndex(seriesIndex);
//       // Prevent the default toggle behavior.
//       return false;
//     }
//   };

//   const options = {
//     chart: {
//       toolbar: {
//         show: true,
//         tools: {
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//           download: true,
//           selection: true,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: true,
//           reset: true,
//         },
//         offsetX: 0,
//         offsetY: 0,
//       },
//       events: chartEvents,
//     },
//     colors: pieColors,
//     legend: {
//       show: true,
//       position: legendPosition === "hide" ? "bottom" : legendPosition,
//     },
//     labels: sortedCategories || [],
//   };

//   const series = sortedValues || [];

//   let aggregationLabel = "";
//   switch (aggregation) {
//     case "sum":
//       aggregationLabel = "Sum";
//       break;
//     case "minimum":
//       aggregationLabel = "Minimum";
//       break;
//     case "maximum":
//       aggregationLabel = "Maximum";
//       break;
//     case "average":
//       aggregationLabel = "Average";
//       break;
//     case "count":
//       aggregationLabel = "Count";
//       break;
//     default:
//       aggregationLabel = "";
//   }
//   console.log("aggregation", aggregationLabel);

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="pie-chart">
//           <ResizableBox
//             width={800}
//             height={550}
//             minConstraints={[500, 200]}
//             maxConstraints={[800, 550]}
//           >
//             <div className="chart-title">
//               <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//             </div>
//             <Chart
//               key={chartKey}
//               options={options}
//               series={series}
//               type="pie"
//               width="100%"
//               height="80%"
//             />
//           </ResizableBox>
//           {/* If a legend item was clicked, render a color picker below the chart */}
//           {selectedLegendIndex !== null && (
//             <div style={{ textAlign: "center", marginTop: "10px" }}>
//               <span>
//                 Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
//               </span>
//               <input
//                 type="color"
//                 value={pieColors[selectedLegendIndex]}
//                 onChange={(e) =>
//                   handleColorChange(selectedLegendIndex, e.target.value)
//                 }
//                 onBlur={() => setSelectedLegendIndex(null)}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pie;
