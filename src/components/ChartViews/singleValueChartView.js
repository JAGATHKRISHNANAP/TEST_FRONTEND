import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ResizableBox } from 'react-resizable';
import { Card, CardHeader } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const SingleValueChartView = ({ width, heading, result, fetchedData }) => {
  const location = useLocation();
  // State to track the resizable box's width and height
  const [boxDimensions, setBoxDimensions] = useState({ width: 300, height: 50 });
  const [maxConstraints, setMaxConstraints] = useState([800, 350]); // Default maxConstraints
  // Set initial maxConstraints based on the route on mount
  useEffect(() => {
    if (location.pathname === '/Charts_view') {
      setMaxConstraints([1200, 600]); // Larger constraints for Charts_view route
    } else {
      setMaxConstraints([800, 350]); // Default constraints for other routes
    }
  }, [location.pathname]);

  // Calculate font sizes dynamically
  const headingFontSize = `${Math.max(16, boxDimensions.width / 20)}px`; // Minimum font size of 16px
  const valueFontSize = `${Math.max(14, width / 10)}px`; // Adjust h2 font size dynamically

  // Handle resizing
  const handleResize = (event, { size }) => {
    setBoxDimensions({ width: size.width, height: size.height });
  };

  return (
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
          <h4 style={{ fontSize: headingFontSize, margin: 0 }}>
            {heading.replace(/"/g, '')}
          </h4>
        }
        style={{ textAlign: 'center', padding: '8px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
        <ResizableBox
          width={boxDimensions.width}
          height={boxDimensions.height}
          minConstraints={[200, 50]}
          maxConstraints={maxConstraints}
          onResize={handleResize}
          style={{
            border: '0px solid #ccc', // Solid border for clarity
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ fontSize: valueFontSize, margin: '0', textAlign: 'center', fontWeight: 'bold' }}>
            {fetchedData ? result : (
              <CircularProgress 
                size={20} 
                style={{ color: 'primary', margin: '10px' }} 
              />
            )}
          </h2>
        </ResizableBox>
      </div>
    </Card>
  );
};

export default SingleValueChartView;
