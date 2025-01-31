// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import DrillPieChart from "../drillDown/drillDownPieChart";
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip'; // Import the CustomToolTip component
// import "./tooltip.css"; // Import the CSS for the tooltip

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
//   const toolTipOptions = useSelector((state) => state.toolTip);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
//   const [plotData, setPlotData] = useState({});
//   const [barClicked, setBarClicked] = useState(false);
//   const [contextMenuVisible, setContextMenuVisible] = useState(false);
//   const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//   const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
//   const contextMenuRef = useRef(null);
//   const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

//   const handleClicked = async (event, chartContext, config) => {
//     const clickedCategoryIndex = config.dataPointIndex;
//     const clickedCategory = categories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//         // Make an HTTP request to your backend
//         const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
//             category: clickedCategory,
//             xAxis: xAxis,
//             yAxis: yAxis,
//             tableName: selectedTable,
//             aggregation: aggregate
//         });

//         setPlotData(response.data);
//         setBarClicked(true);
//     } catch (error) {
//         console.error('Error sending category to backend:', error);
//     }
//   };

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
//     Legend:false
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
//           <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
//           <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//           <Chart
//               options={options}
//               series={series}
//               type="pie"
//               width="100%"
//               height="100%"
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
//       {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
//       {barClicked && <DrillPieChart
//           categories={plotData.categories}
//           values={plotData.values}
//           aggregation={plotData.aggregation}
//           xAxis={xAxis}
//           yAxis={yAxis}
//           selectedTable={selectedTable}
//         />}
//     </div>
//   );
// }

// export default Pie;


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

  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
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

  const options = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
              index: 1,
              title: 'Sort Ascending',
              class: 'custom-sort-ascending',
              click: handleSortAscending,
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
              index: 2,
              title: 'Sort Descending',
              class: 'custom-sort-descending',
              click: handleSortDescending,
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
        offsetX: 0,
        offsetY: 0,
      },
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
              options={options}
              series={series}
              type="pie"
              width="100%"
              height="80%"
            />
          </ResizableBox>
        </div>
        <div className="color-picker">{/* Additional content */}</div>
      </div>
    </div>
  );
};

export default Pie;
