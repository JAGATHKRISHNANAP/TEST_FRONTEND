import React,{useEffect} from "react";

import {  Grid} from "@mui/material";
import DesignChart from '../../components/dashbord-Elements/Dashboard';
import HomePage from '../HomePage';


function LoadDataPage() {
    
useEffect(() => {
  // Prevent navigating back
  const disableBackButton = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", disableBackButton);

  return () => {
    window.removeEventListener("popstate", disableBackButton);
  };
}, []);
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

