import React, { useState, useEffect } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {ItemTypes} from './DraggableTable';
// Adjust the path accordingly
const DropZone = ({ droppedTables, setDroppedTables, setConnections }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const tableSpacing = 350;
  const topPadding = 25;
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TABLE,
    drop: (item) => {
      const fixedPositionX = 50;
      const fixedPositionY = 50;

      setDroppedTables((prev) => {
        const updatedTables = [...prev];
        const newTable = {
          name: item.name,
          x: updatedTables.length === 0 ? fixedPositionX : updatedTables[updatedTables.length - 1].x + tableSpacing,
          y: updatedTables.length === 0 ? fixedPositionY : updatedTables[updatedTables.length - 1].y,
        };
        updatedTables.push(newTable);

        if (updatedTables.length === 2) {
          setConnections([[0, 1]]);
        }

        return updatedTables;
      });
    },
  }));

  const handleRemoveTable = (index) => {
    setDroppedTables((prev) => prev.filter((_, idx) => idx < index));
    setConnections((connections) => connections.filter(([start, end]) => start !== index && end !== index));
    handleClose();
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedTable(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTable(null);
  };

  return (
    <Box
      className="dropzone"
      ref={drop}
      sx={{
        height: '330px',
        width: '99.5%',
        position: 'relative',
        backgroundColor: 'white',
        padding: `${topPadding}px 2px 2px 2px`,
      }}
    >
      {droppedTables.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            color: 'gray',
            fontSize: '18px',
            lineHeight: '400px',
          }}
        >
          Drag table here
        </Box>
      )}

      {droppedTables.length > 1 && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {droppedTables.map((_, index) => {
            if (index === droppedTables.length - 1) return null;
            const startTable = droppedTables[index];
            const endTable = droppedTables[index + 1];
            const startX = startTable.x + 125;
            const startY = startTable.y + 25;
            const endX = endTable.x + 125;
            const endY = endTable.y + 25;

            return (
              <line
                key={index}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="black"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>
      )}

      {droppedTables.map((table, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: table.x,
            top: table.y,
            padding: '12px',
            width: '250px',
            height: '50px',
            backgroundColor: 'lightblue',
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          <div>{table.name}</div>
          <IconButton
            onClick={(event) => handleClick(event, index)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            size="small"
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={selectedTable === index} onClose={handleClose}>
            <MenuItem onClick={() => handleRemoveTable(index)}>Remove</MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};

export default DropZone;