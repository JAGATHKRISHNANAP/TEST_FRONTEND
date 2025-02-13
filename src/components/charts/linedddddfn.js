import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import "./tooltip.css";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { fetchPredictionDataAPI } from "../../utils/api";
import PredictedLineChart from "./predictionLineChart"; // Import the new component

const LineChart = ({ categories = [], values = [], aggregation }) => {
  const dispatch = useDispatch();
  const lineColor = useSelector((state) => state.chartColor.chartColor);
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);

  const [forecastData, setForecastData] = useState({ categories: [], values: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("");
  const [number, setNumber] = useState("");

  const handlePredictData = async () => {
    try {
      const predictionData = await fetchPredictionDataAPI({
        xAxis,
        yAxis,
        timePeriod,
        number,
      });

      setForecastData({
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

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Parent Line Chart */}
      <div style={{ flex: 1 }}>
        <ResizableBox
          width={800}
          height={550}
          minConstraints={[300, 300]}
          maxConstraints={[800, 550]}
        >
          <div className="chart-title">{customHeadings}</div>
          <Chart
            options={{
              chart: {
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    const clickedCategoryIndex = config.dataPointIndex;
                    const clickedCategory = categories[clickedCategoryIndex];
                    dispatch(setClickedCategory(clickedCategory));
                  },
                },
              },
              xaxis: { categories, title: { text: `${xAxis}` } },
              yaxis: { title: { text: `${yAxis}` } },
              colors: [lineColor],
            }}
            series={[{ name: aggregation || "Series", data: values || [] }]}
            type="line"
            width="100%"
            height="100%"
          />
        </ResizableBox>
        <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
          Predict Data
        </Button>
      </div>

      {/* Prediction Line Chart */}
      {forecastData.categories.length > 0 && (
        <div style={{ flex: 1 }}>
          <PredictedLineChart
            forecastData={forecastData}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </div>
      )}

      {/* Modal for Prediction Inputs */}
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
            <Select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <MenuItem value="years">Years</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="days">Days</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handlePredictData} fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LineChart;









    



























