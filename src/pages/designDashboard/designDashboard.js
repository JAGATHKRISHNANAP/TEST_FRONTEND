import React,{useEffect} from "react";

import {  Grid} from "@mui/material";
import DesignDashboard from '../../components/viewChart/displayChart';
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
        <HomePage/>
          <Grid item xs={12} md={10}>
            <DesignDashboard />
          </Grid>
    </div>
  );
}

export default LoadDataPage;

