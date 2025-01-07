import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box } from '@mui/material';
export const ItemTypes = { // Export ItemTypes
    TABLE: 'table',
  };
// const ItemTypes = {
//   TABLE: 'table',
// };

const DraggableTable = ({ tableName }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TABLE,
    item: { name: tableName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        fontsize: "10",
        padding: '10px',
        margin: '10px',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        borderRadius: '5px',
        textAlign: 'justify-center',
      }}
    >
      {tableName}
    </Box>
  );
};

export default DraggableTable;