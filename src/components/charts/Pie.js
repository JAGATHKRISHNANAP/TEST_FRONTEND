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
  // const toolTipOptions = useSelector((state) => state.toolTip);
  const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
  const [plotData, setPlotData] = useState({});
  const [barClicked, setBarClicked] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
  const contextMenuRef = useRef(null);

  // const handleClicked = async (event, chartContext, config) => {
  //   const clickedCategoryIndex = config.dataPointIndex;
  //   const clickedCategory = categories[clickedCategoryIndex];
  //   dispatch(setClickedCategory(clickedCategory));
  //   try {
  //       // Make an HTTP request to your backend
  //       const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
  //           category: clickedCategory,
  //           xAxis: xAxis,
  //           yAxis: yAxis,
  //           tableName: selectedTable,
  //           aggregation: aggregate
  //       });

  //       setPlotData(response.data);
  //       setBarClicked(true);
  //   } catch (error) {
  //       console.error('Error sending category to backend:', error);
  //   }
  // };
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

      // const handleClicked = async (event, chartContext, config) => {
      //     const clickedCategoryIndex = config.dataPointIndex;
      //     const clickedCategory = categories[clickedCategoryIndex];
      //     dispatch(setClickedCategory(clickedCategory));
      
      //     try {
      //         // Call the API function
      //         const responseData = await yourBackendEndpointApi(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
      
      //         setPlotData(responseData); // Update the state with the response
      //         setBarClicked(true);
      //     } catch (error) {
      //         console.error('Failed to send category data:', error);
      //     }
      // };


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
      events: {
        dataPointSelection: handleClicked
      },
      id: "basic-pie"
    },
    labels: categories || [],
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
  console.log("aggregration", aggregationLabel);

  const series = values || [];

  return (
    <div className="app">
      <div className="row">
        <div className="pie-chart">
          {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
          <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
            <div className="chart-title">{customHeadings}</div> {/* Added custom heading */}
            <Chart
              options={options}
              series={series}
              type="pie"
              width="100%"
              height="100%"
            />
          </ResizableBox>
        </div>
        <div className="color-picker">
          {/* Additional content */}
        </div>
      </div>
      {contextMenuVisible && (
        <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
      )}
      {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
      {barClicked && <DrillPieChart
          categories={plotData.categories}
          values={plotData.values}
          aggregation={plotData.aggregation}
          xAxis={xAxis}
          yAxis={yAxis}
          selectedTable={selectedTable}
        />}
    </div>
  );
}

export default Pie;
