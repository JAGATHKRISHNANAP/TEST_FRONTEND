import React from 'react';
import Draggable from 'react-draggable';

const ChartContainer = ({ position, handleDragStop, handleContextMenu, children }) => {
  return (
    <Draggable onStop={handleDragStop} position={position}>
      <div
        className="chart-container"
        style={{ width: "auto", height: "auto", position: "relative" }}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default ChartContainer;
