import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import ViewDashboardSidebar from "../../components/dashboardViewCharts/ViewDashboardSidebar";
import DashboardDroppableArea from "../../components/dashboardViewCharts/dashboardDroppableArea";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DashboardView() {
  const [chartData, setChartData] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState([]);
  console.log("1-----", checkedOptions);

  if (chartData && chartData[10] && Array.isArray(chartData[10])) {
    setCheckedOptions(chartData[10]);
  }

  useEffect(() => {
    console.log("checkedOptions:", checkedOptions);
  }, [checkedOptions]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} md={12} style={{marginTop:'80px'}}>
            <DashboardDroppableArea />
          </Grid>
        </Grid>
      </Box>
  <Grid container sx={{
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    bgcolor: 'white',
    p: 1,
    maxHeight: '50px',
    marginBottom: '5px',
  }}justifyContent="center">
    <ViewDashboardSidebar />
  </Grid>
    </div>
  );
}

export default DashboardView;
