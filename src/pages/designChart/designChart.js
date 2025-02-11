import React from "react";

import {  Grid} from "@mui/material";
import DesignChart from '../../components/dashbord-Elements/Dashboard';
import HomePage from '../HomePage';


function LoadDataPage() {
    return (
      <div className="App">
        <HomePage />
        <Grid
          item
          xs={12}
          md={10}
          sx={{ marginTop: 0, paddingTop: 0 }} // Remove top margin and padding
        >
          <DesignChart />
        </Grid>
      </div>
    );
  }
  

export default LoadDataPage;

