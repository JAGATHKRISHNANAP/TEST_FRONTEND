// SingleValueChart.jsx
import React from 'react';
import { ResizableBox } from 'react-resizable';

const SingleValueChart = ({ width, heading, result, fetchedData, handleResize, minWidth, minHeight }) => {
  return (
    <ResizableBox
      width={width}
      height={200} // Set a default height
      minConstraints={[minWidth, minHeight]} // Use props for min constraints
      // maxConstraints={[400, 600]} // You can add max constraints if needed
      onResize={handleResize}
    >
      <div style={{ 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', // Center content vertically
        width: '100%' // Ensure it takes full ResizableBox width
      }}>
        <h4 style={{ fontSize: `${width / 20}px`,  overflowWrap: 'break-word' }}>{heading?.replace(/"/g, '')}</h4> {/* Added optional chaining and overflow wrap */}
        <div>
          <h2 style={{ fontSize: `${width / 15}px`, overflowWrap: 'break-word' }}> {/* Adjusted font size and added overflow wrap */}
            {fetchedData ? result : 'Loading data...'}
          </h2>
        </div>
      </div>
    </ResizableBox>
  );
};

export default SingleValueChart;