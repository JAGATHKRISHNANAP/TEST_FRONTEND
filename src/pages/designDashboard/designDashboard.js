import React from "react";

import {  Grid} from "@mui/material";
import DesignDashboard from '../../components/viewChart/displayChart';
import HomePage from '../HomePage';


function LoadDataPage() {
  return (
    <div className="App">
        <HomePage/>
          <Grid item xs={12} md={10}>
            <DesignDashboard />
          </Grid>
    </div>
  );
}

export default LoadDataPage;

