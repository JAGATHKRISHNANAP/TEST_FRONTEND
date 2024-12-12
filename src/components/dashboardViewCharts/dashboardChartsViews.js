import React from 'react'
// import {fetchDashboardData } from '../../utils/api';
import { Box, Grid } from '@mui/material';
// import DroppableArea from '../viewChart/DroppableArea';

function dashboardChartsViews() {

    // console.log("fetchDashboardData",fetchDashboardData)
    
    
  return (
    <div>
      {/* <h1>Dashboard Display</h1> */}
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} wrap="wrap">
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '100%', bgcolor: 'white', p: 2, borderRadius: 1 }}>
                {/* {renderedDraggableButtons} */}
                {/* <Grid item xs={12} md={10}> */}

                <h6>charts</h6>

            {/* </Grid> */}
              </Box>
            </Grid>
            
          </Grid>
        </Box>
    </div>
  )
}

export default dashboardChartsViews;










