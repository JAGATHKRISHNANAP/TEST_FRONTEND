import React, { useState, useEffect } from "react";
import EditDashbordSidebar from "../../components/edit/editDashbordSidebar";
import { Box, Grid, Paper, styled } from "@mui/material";
import DashboardCharts from "../../components/dashbord-Elements/dashbord-chartComponent";
import InputFields from "../../components/edit/InputFields";
import DashboardFilter from'../../components/dashbord-Elements/dashboardFilter';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Fix the sidebar at the bottom of the screen and make it horizontal
const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(1),
  maxHeight: '50px',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1000,  // to make sure it stays on top
}));

function EditDashboard() {
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
      {/* <Box sx={{ flexGrow: 1, minHeight: '100vh', paddingBottom: '80px' }}>  */}
        {/* Padding bottom added to avoid overlap with fixed sidebar */}
        <Grid container spacing={2} wrap="wrap" style={{marginTop:'60px',minHeight: '100vh'}}>
          <Grid item xs={12} md={10}>
            <InputFields />
          </Grid>
          <Grid item xs={12} md={2}>
            <Item>
              <DashboardCharts />
              
            </Item>
            <div style={{ marginTop: '20px',marginRight:'5px'}}>
                
                {/* <Item> */} <DashboardFilter />
                {/* </Item> */}
              </div>
          </Grid>
        </Grid>

        {/* Sidebar placed at the bottom of the page */}
        <SidebarContainer>
          <EditDashbordSidebar />
        </SidebarContainer>
      {/* </Box> */}
    </div>
  );
}

export default EditDashboard;





