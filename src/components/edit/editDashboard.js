// import React, { useState, useEffect } from "react";
// import EditDashbordSidebar from "./editDashbordSidebar";
// import { Box, Checkbox, FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, NativeSelect, Paper, styled } from "@mui/material";
// import DashboardCharts from "../dashbord-Elements/dashbord-chartComponent";
// import InputFields from "./InputFields";
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// function EditDashboard() {
//     const [chartData, setChartData] = useState(null);
//     const [checkedOptions, setCheckedOptions] = useState([]);
//     console.log("1-----",checkedOptions)

//     if (chartData && chartData[10] && Array.isArray(chartData[10])) {
//         setCheckedOptions(chartData[10]);
//     }

//     useEffect(() => {
//         console.log("checkedOptions:", checkedOptions);
//     }, [checkedOptions]);


//     return (
//       <div className="App">
//         <Box sx={{ flexGrow: 1,marginTop:'80px' }}>
//           <Grid container spacing={2} wrap="wrap">
//             <Grid item xs={12} md={2}>
//               <Item>
    
//               <EditDashbordSidebar />
//               </Item>
    
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <InputFields/>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Item>
//                 <DashboardCharts />
//               </Item>
    
//             </Grid>
//           </Grid>
//         </Box>
//       </div>
//     );
//     }


// export default EditDashboard;


















import React, { useState, useEffect } from "react";
import EditDashbordSidebar from "./editDashbordSidebar";
import { Box, Grid, Paper, styled } from "@mui/material";
import DashboardCharts from "../dashbord-Elements/dashbord-chartComponent";
import InputFields from "./InputFields";
import DashboardFilter from "../dashbord-Elements/dashboardFilter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function EditDashboard() {
  const [chartData, setChartData] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState([]);

  // Debugging chartData and checkedOptions
  console.log("chartData:", chartData);
  console.log("checkedOptions:", checkedOptions);

  // Ensure checkedOptions gets updated when chartData[10] changes
  useEffect(() => {
    if (chartData && chartData[9] && Array.isArray(chartData[10])) {
      setCheckedOptions(chartData[9]);
    }
  }, [chartData]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, marginTop: "80px" }}>
        <Grid container spacing={2} wrap="wrap">
          {/* Sidebar */}
          <Grid item xs={12} md={2}>
            <Item>
              <EditDashbordSidebar />
            </Item>
          </Grid>

          {/* Input Fields */}
          <Grid item xs={12} md={8}>
            <InputFields />
          </Grid>

          {/* Charts and Filters */}
          <Grid item xs={12} md={2}>
            <Item>
              <DashboardCharts />
            </Item>
            
        </Grid>

         
        </Grid>
      </Box>
    </div>
  );
}

export default EditDashboard;
