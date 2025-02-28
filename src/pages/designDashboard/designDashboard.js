import React,{useEffect} from "react";

import {  Grid} from "@mui/material";
import DesignDashboard from '../../components/viewChart/displayChart';
import HomePage from '../HomePage';
import {useNavigate} from "react-router";

function LoadDataPage() {
  const navigate = useNavigate(); // Initialize useNavigate
     
       useEffect(() => {
           const disableBackButton = () => {
               navigate("/"); // Redirect to the login page
           };
     
           window.history.pushState(null, "", window.location.href);
           window.addEventListener("popstate", disableBackButton);
     
           return () => {
               window.removeEventListener("popstate", disableBackButton);
           };
       }, [navigate]); // Add navigate to the dependency array
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

