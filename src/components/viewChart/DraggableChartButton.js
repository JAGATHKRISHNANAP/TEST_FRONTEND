

import { Button } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableChartButton = ({ chartName, disabled }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'chart',
    item: { chartName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled, // Disable dragging if button is disabled
  }), [disabled]);

  return (
    <Button
      sx={{ margin: "2px", width: "100px", color: "white" }}
      className="x-axis-column"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      disabled={disabled}
    >
      {chartName}
    </Button>
  );
};

export default DraggableChartButton;


