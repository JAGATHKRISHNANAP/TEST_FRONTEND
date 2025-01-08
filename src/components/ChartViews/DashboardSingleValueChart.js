import { Card, CardHeader, CircularProgress } from '@mui/material';
import React from 'react';

const DashboardSingleValueChart = ({ chartHeading, totalXAxis }) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        {/* <h3>{chartHeading.replace(/"/g, '')}</h3>
        <p>{totalXAxis}</p> */}

        <Card
      variant="outlined"
      style={{
        margin: '5px',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <CardHeader
        title={
          <h4 style={{ fontSize: 12, margin: 0 }}>
            {chartHeading.replace(/"/g, '')}
          </h4>
        }
        style={{ textAlign: 'center', padding: '8px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
          <h2 style={{ fontSize: 23, margin: '0', textAlign: 'center', fontWeight: 'bold' }}>
            {totalXAxis}
              {/* <CircularProgress 
                size={20} 
                style={{ color: 'primary', margin: '10px' }} 
              /> */}
          </h2>
      </div>
    </Card>
      </div>
    </div>
  );
};

export default DashboardSingleValueChart;
