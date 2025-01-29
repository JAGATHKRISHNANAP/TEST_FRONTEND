import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop, children }) => {
  const droppableAreaRef = useRef(null); // Reference to the drop area

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chart',
    drop: (item) => onDrop(item.chartName),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        droppableAreaRef.current = node; // Set ref
        drop(node); // Attach the drop functionality to the area
      }}
      style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '10px',
        border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
        minHeight: '86vh',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        overflow: 'auto', // Set overflow to 'auto' to allow scrolling if the content exceeds the container
        borderRadius: '10px',
        maxHeight: '100%', // Set maximum height to container bounds
        width: '100%',
      }}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { droppableAreaRef })
      )}
    </div>
  );
};

export default DroppableArea;







