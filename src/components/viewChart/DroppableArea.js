// // // import React, { useRef } from 'react';
// // // import { useDrop } from 'react-dnd';

// // // const DroppableArea = ({ onDrop, children }) => {
// // //   const droppableAreaRef = useRef(null); // Reference to the drop area

// // //   const [{ isOver }, drop] = useDrop(() => ({
// // //     accept: 'chart',
// // //     drop: (item) => onDrop(item.chartName),
// // //     collect: (monitor) => ({
// // //       isOver: monitor.isOver(),
// // //     }),
// // //   }));

// // //   return (
// // //     <div
// // //       ref={(node) => {
// // //         droppableAreaRef.current = node; // Set ref
// // //         drop(node); // Attach the drop functionality to the area
// // //       }}
// // //       style={{
// // //         position: 'relative',
// // //         backgroundColor: 'white',
// // //         padding: '10px',
// // //         border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
// // //         minHeight: '86vh',
// // //         display: 'flex',
// // //         flexWrap: 'wrap',
// // //         gap: '10px',
// // //         overflow: 'auto', // Set overflow to 'auto' to allow scrolling if the content exceeds the container
// // //         borderRadius: '10px',
// // //         maxHeight: '100%', // Set maximum height to container bounds
// // //         width: '100%',
// // //       }}
// // //     >
// // //       {React.Children.map(children, child =>
// // //         React.cloneElement(child, { droppableAreaRef })
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DroppableArea;








// // // import React, { useRef, useEffect } from 'react';
// // // import { useDrop } from 'react-dnd';

// // // const DroppableArea = ({ onDrop, children }) => {
// // //   const droppableAreaRef = useRef(null); // Reference to the drop area

// // //   const [{ isOver }, drop] = useDrop(() => ({
// // //     accept: 'chart',
// // //     drop: (item) => onDrop(item.chartName),
// // //     collect: (monitor) => ({
// // //       isOver: monitor.isOver(),
// // //     }),
// // //   }));

// // //   useEffect(() => {
// // //     if (droppableAreaRef.current) {
// // //       // Safely access the DOM after the component has been mounted
// // //       const rect = droppableAreaRef.current.getBoundingClientRect();
// // //       console.log('Droppable Area Position:', rect);
// // //     }
// // //   }, [droppableAreaRef.current]); 

// // //   return (
// // //     <div
// // //       ref={(node) => {
// // //         if (node) {  // Ensure node is valid
// // //           droppableAreaRef.current = node; // Set ref
// // //           drop(node); // Attach the drop functionality to the area
// // //         }
// // //       }}
// // //       style={{
// // //         position: 'relative',
// // //         backgroundColor: 'white',
// // //         padding: '10px',
// // //         border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
// // //         minHeight: '86vh',
// // //         display: 'flex',
// // //         flexWrap: 'wrap',
// // //         gap: '10px',
// // //         overflow: 'auto', // Set overflow to 'auto' to allow scrolling if the content exceeds the container
// // //         borderRadius: '10px',
// // //         maxHeight: '100%', // Set maximum height to container bounds
// // //         width: '100%',
// // //       }}
// // //     >
// // //       {React.Children.map(children, child =>
// // //         React.cloneElement(child, { droppableAreaRef })
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DroppableArea;

// // import React, { useRef, useEffect } from 'react';
// // import { useDrop } from 'react-dnd';

// // const DroppableArea = ({ onDrop, children }) => {
// //   const droppableAreaRef = useRef(null); // Reference to the drop area

// //   const [{ isOver }, drop] = useDrop(() => ({
// //     accept: 'chart',
// //     drop: (item) => onDrop(item.chartName),
// //     collect: (monitor) => ({
// //       isOver: monitor.isOver(),
// //     }),
// //   }));

// //   // Log the droppable area position on mount
// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       const rect = droppableAreaRef.current.getBoundingClientRect();
// //       console.log('Droppable Area Position:', rect);
// //     }
// //   }, []);

// //   // Log positions of rendered charts inside the droppable area
// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       // Query all children with the 'chart-container' class
// //       const chartElements = droppableAreaRef.current.querySelectorAll('.chart-container');
// //       chartElements.forEach((chartEl, index) => {
// //         const chartRect = chartEl.getBoundingClientRect();
// //         console.log(`Chart ${index + 1} Position:`, chartRect);
// //       });
// //     }
// //   }, [children]); // Depend on children so it re-runs when charts update

// //   return (
// //     <div
// //       ref={(node) => {
// //         if (node) {  // Ensure node is valid
// //           droppableAreaRef.current = node; // Set ref
// //           drop(node); // Attach the drop functionality to the area
// //         }
// //       }}
// //       style={{
// //         position: 'relative',
// //         backgroundColor: 'white',
// //         padding: '10px',
// //         border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
// //         minHeight: '86vh',
// //         display: 'flex',
// //         flexWrap: 'wrap',
// //         gap: '10px',
// //         overflow: 'auto',
// //         borderRadius: '10px',
// //         maxHeight: '100%',
// //         width: '100%',
// //       }}
// //     >
// //       {React.Children.map(children, child =>
// //         React.cloneElement(child, { droppableAreaRef })
// //       )}
// //     </div>
// //   );
// // };

// // export default DroppableArea;
// // import React, { useRef, useEffect } from 'react';
// // import { useDrop } from 'react-dnd';

// // const DroppableArea = ({ onDrop, children }) => {
// //   const droppableAreaRef = useRef(null); // Reference to the drop area

// //   const [{ isOver }, drop] = useDrop(() => ({
// //     accept: 'chart',
// //     drop: (item) => onDrop(item.chartName),
// //     collect: (monitor) => ({
// //       isOver: monitor.isOver(),
// //     }),
// //   }));

// //   // Log the droppable area's own position on mount
// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       const rect = droppableAreaRef.current.getBoundingClientRect();
// //       console.log('Droppable Area Position:', rect);
// //     }
// //   }, []);

// //   // Log details of each rendered chart within the droppable area
// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       // Query all elements with the "chart-container" class inside the droppable area
// //       const chartElements = droppableAreaRef.current.querySelectorAll('.chart-container');
// //       chartElements.forEach((chartEl, index) => {
// //         const rect = chartEl.getBoundingClientRect();
// //         console.log(`Chart ${index + 1} details:`, {
// //           position: { x: rect.x, y: rect.y },
// //           size: { width: rect.width, height: rect.height },
// //           // You can also log more details if needed
// //         });
// //       });
// //     }
// //   }, [children]); // Re-run this effect whenever the children change (e.g., when charts are added/removed)

// //   return (
// //     <div
// //       ref={(node) => {
// //         if (node) {
// //           droppableAreaRef.current = node; // Set the ref
// //           drop(node); // Attach the drop functionality
// //         }
// //       }}
// //       style={{
// //         position: 'relative',
// //         backgroundColor: 'white',
// //         padding: '10px',
// //         border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
// //         minHeight: '86vh',
// //         display: 'flex',
// //         flexWrap: 'wrap',
// //         gap: '10px',
// //         overflow: 'auto',
// //         borderRadius: '10px',
// //         maxHeight: '100%',
// //         width: '100%',
// //       }}
// //     >
// //       {React.Children.map(children, child =>
// //         React.cloneElement(child, { droppableAreaRef })
// //       )}
// //     </div>
// //   );
// // };

// // export default DroppableArea;

// // // DroppableArea.js
// // import React, { useRef, useEffect } from 'react';
// // import { useDrop } from 'react-dnd';

// // const DroppableArea = ({ onDrop, children, chartData }) => {
// //   const droppableAreaRef = useRef(null);

// //   const [{ isOver }, drop] = useDrop(() => ({
// //     accept: 'chart',
// //     drop: (item) => onDrop(item.chartName),
// //     collect: (monitor) => ({
// //       isOver: monitor.isOver(),
// //     }),
// //   }));

// //   // Log the droppable area position on mount (optional)
// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       const rect = droppableAreaRef.current.getBoundingClientRect();
// //       console.log('Droppable Area Position:', rect);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (droppableAreaRef.current) {
// //       // Query all chart containers inside the droppable area.
// //       const chartElements = droppableAreaRef.current.querySelectorAll('.chart-container');
// //       chartElements.forEach((chartEl) => {
// //         const rect = chartEl.getBoundingClientRect();
// //         // Get the chart name from the data attribute.
// //         const chartName = chartEl.getAttribute('data-chartname');
// //         // Only process if chartName exists.
// //         if (!chartName) return;
        
// //         // Find the chart details from chartData.
// //         const details = chartData.find(chart => chart.chartName === chartName);
// //         if (!details) {
// //           console.log(`No details found for chart "${chartName}".`);
// //           return;
// //         }
        
// //         console.log(`Chart Details for "${chartName}":`, {
// //           ...details,
// //           domPosition: {
// //             x: rect.x,
// //             y: rect.y,
// //             width: rect.width,
// //             height: rect.height
// //           }
// //         });
// //       });
// //     }
// //   }, [chartData]);
// //   const handleDrop = (event, chartName) => {
// //     event.preventDefault();
    
// //     // Get the drop position relative to the droppable area
// //     const dropX = event.clientX;
// //     const dropY = event.clientY;
  
// //     onDrop(chartName, { x: dropX, y: dropY });
// //   };
  

// //   return (
// //     <div
// //       ref={(node) => {
// //         if (node) {
// //           droppableAreaRef.current = node;
// //           drop(node);
// //         }
// //       }}
// //       style={{
// //         position: 'relative',
// //         backgroundColor: 'white',
// //         padding: '10px',
// //         border: isOver ? '2px solid #007bff' : '2px solid #ccc',
// //         minHeight: '86vh',
// //         display: 'flex',
// //         flexWrap: 'wrap',
// //         gap: '10px',
// //         overflow: 'auto',
// //         borderRadius: '10px',
// //         maxHeight: '100%',
// //         width: '100%',
// //       }}
// //     >
// //       {React.Children.map(children, child =>
// //         React.cloneElement(child, { droppableAreaRef })
// //       )}
// //     </div>
// //   );
// // };

// // export default DroppableArea;
// import React, { useRef, useEffect } from 'react';
// import { useDrop } from 'react-dnd';

// const DroppableArea = ({ onDrop, children, chartData }) => {
//   const droppableAreaRef = useRef(null);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'chart',
//     drop: (item, monitor) => {
//       const dropRect = droppableAreaRef.current.getBoundingClientRect();
//       const clientOffset = monitor.getClientOffset();

//       const dropX = clientOffset.x - dropRect.left; // X position inside droppable area
//       const dropY = clientOffset.y - dropRect.top;  // Y position inside droppable area

//       onDrop(item.chartName, { x: dropX, y: dropY });
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   // Log droppable area position and chart details on render
//   useEffect(() => {
//     if (droppableAreaRef.current) {
//       const rect = droppableAreaRef.current.getBoundingClientRect();
//       console.log('Droppable Area Position:', rect);
//     }
//   }, []);

//   // Log chart position on changes to chartData
//   useEffect(() => {
//     if (droppableAreaRef.current && chartData) {
//       chartData.forEach((chart) => {
//         const chartEl = droppableAreaRef.current.querySelector(
//           `[data-chartname="${chart.chartName}"]`
//         );

//         if (chartEl) {
//           const rect = chartEl.getBoundingClientRect();
//           console.log(`Chart "${chart.chartName}" Position:`, {
//             x: rect.x,
//             y: rect.y,
//             width: rect.width,
//             height: rect.height,
//           });
//         }
//       });
//     }
//   }, [chartData]);

//   return (
//     <div
//       ref={(node) => {
//         if (node) {
//           droppableAreaRef.current = node;
//           drop(node);
//         }
//       }}
//       style={{
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '10px',
//         border: isOver ? '2px solid #007bff' : '2px solid #ccc',
//         minHeight: '86vh',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//         overflow: 'auto',
//         borderRadius: '10px',
//         maxHeight: '100%',
//         width: '100%',
//       }}
//     >
//       {React.Children.map(children, (child) =>
//         React.cloneElement(child, { droppableAreaRef })
//       )}
//     </div>
//   );
// };

// export default DroppableArea;

import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop, children, chartData }) => {
  const droppableAreaRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chart',
    drop: (item, monitor) => {
      const dropRect = droppableAreaRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const dropX = clientOffset.x - dropRect.left; // X position inside droppable area
      const dropY = clientOffset.y - dropRect.top;  // Y position inside droppable area

      onDrop(item.chartName, { x: dropX, y: dropY });  // Pass drop position
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Log droppable area position and chart details on render
  useEffect(() => {
    if (droppableAreaRef.current) {
      const rect = droppableAreaRef.current.getBoundingClientRect();
      console.log('Droppable Area Position:', rect);
    }
  }, []);

  // Log chart position on changes to chartData
  useEffect(() => {
    if (droppableAreaRef.current && chartData) {
      chartData.forEach((chart) => {
        const chartEl = droppableAreaRef.current.querySelector(
          `[data-chartname="${chart.chartName}"]`
        );

        if (chartEl) {
          const rect = chartEl.getBoundingClientRect();
          console.log(`Chart "${chart.chartName}" Position:`, {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          });
        }
      });
    }
  }, [chartData]);

  return (
    <div
      ref={(node) => {
        if (node) {
          droppableAreaRef.current = node;
          drop(node);
        }
      }}
      style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '10px',
        border: isOver ? '2px solid #007bff' : '2px solid #ccc',
        minHeight: '86vh',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        overflow: 'auto',
        borderRadius: '10px',
        maxHeight: '100%',
        width: '100%',
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { droppableAreaRef })
      )}
    </div>
  );
};

export default DroppableArea;
