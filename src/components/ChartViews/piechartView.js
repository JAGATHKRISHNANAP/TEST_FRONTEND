

import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import {updateSelectedCategory,updateChartData,setChartStatus} from '../../features/ViewChartSlice/viewChartSlice';
import "../charts/tooltip.css"; // Import the CSS for the tooltip
import { sendClickedCategory } from "../../utils/api";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Pie = (props) => {
  const { categories, values: stringValues, aggregation ,x_axis} = props;
  const values = stringValues.map(value => parseFloat(value));
  const dispatch = useDispatch();
  const [showResetButton, setShowResetButton] = useState(false);
  const customHeadings = useSelector((state) => state.toolTip.customHeading); // Added customHeadings selector
  const charts = useSelector((state) => state.viewcharts.charts);
  const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality
  const handleClicked = async (event, chartContext, config) => {
    // if (!isFilterActive) return;
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = categories[clickedCategoryIndex];
    try {
      // Trigger the API call to send the clicked category
      const response = await sendClickedCategory(clickedCategory,charts,x_axis);
      console.log("chart_data_list:", response.chart_data_list)
      response.chart_data_list.forEach((chartData) => {
          const { chart_id, data } = chartData;
          dispatch(updateChartData({
            chart_id,
            categories: data.categories,
            values: data.values,
            series1:data.series1,
            series2:data.series2,
          }));
        });
  } catch (error) {
      console.error(`Failed to send category ${clickedCategory}:`, error);
  }

    dispatch(updateSelectedCategory(clickedCategory));
   
  };
 
  

  const handleReset = () => {
    // Reset the selected category and hide the reset button
    dispatch(updateSelectedCategory(null));
    dispatch(setChartStatus(false));
    setShowResetButton(false);
};

  const handleFilterToggle = () => {
    setIsFilterActive(prevState => !prevState); // Toggle the filter state
};



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
          <ResizableBox  style={{ paddingTop: '35px' }} width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} >
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
      </div>


    </div>
  );
}

export default Pie;




