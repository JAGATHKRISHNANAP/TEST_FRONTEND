
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { saveChartDetail } from '../../features/ViewChartSlice/chartSlice';

const DroppableArea = ({ onDrop, children, chartData }) => {
  const droppableAreaRef = useRef(null);
  const dispatch = useDispatch();

  // Ref to store previous chart positions so we only dispatch if there's a change.
  const prevChartPositionsRef = useRef({});

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chart',
    drop: (item) => onDrop(item.chartName),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Log the droppable area position on mount (optional)
  useEffect(() => {
    if (droppableAreaRef.current) {
      const rect = droppableAreaRef.current.getBoundingClientRect();
      console.log('Droppable Area Position:', rect);
    }
  }, []);

  // Create a debounced function to update chart details.
  // Instead of querying elements with the ".chart-container" class,
  // we now query any element with the "data-chartname" attribute.
  const updateChartDetails = useRef(
    debounce(() => {
      if (droppableAreaRef.current) {
        // Query for all elements that have a data-chartname attribute.
        const chartElements = droppableAreaRef.current.querySelectorAll('[data-chartname]');
        chartElements.forEach((chartEl) => {
          const chartName = chartEl.getAttribute('data-chartname');
          if (chartName) {
            const rect = chartEl.getBoundingClientRect();
            const newPosition = { x: rect.x, y: rect.y };
            const prevPosition = prevChartPositionsRef.current[chartName];

            // Only dispatch if the new position is different from the previous position.
            if (!prevPosition || prevPosition.x !== newPosition.x || prevPosition.y !== newPosition.y) {
              prevChartPositionsRef.current[chartName] = newPosition;
              const chartDetail = {
                chartName,
                domPosition: newPosition,
              };
              dispatch(saveChartDetail(chartDetail));
              console.log(`Chart: ${chartName}, Position: { x: ${rect.x}, y: ${rect.y} }`);
              console.log(`new position'} }`);
            }
          }
        });
      }
    }, 300)
  ).current;

  // Use an effect to update chart details whenever chartData changes.
  useEffect(() => {
    updateChartDetails();
    return () => {
      updateChartDetails.cancel();
    };
  }, [chartData, dispatch, updateChartDetails]);

  const handleDrop = (event, chartName) => {
    event.preventDefault();
    const dropX = event.clientX;
    const dropY = event.clientY;
    onDrop(chartName, { x: dropX, y: dropY });
  };

   return (
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
//         minHeight: '84vh',
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
    minHeight: '84vh',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0px', // Remove the extra gap
    justifyContent: 'flex-start', // Align items properly
    alignItems: 'flex-start',
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


// import React, { useRef, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import { useDispatch } from 'react-redux';
// import debounce from 'lodash.debounce';
// import { saveChartDetail } from '../../features/ViewChartSlice/chartSlice';

// const DroppableArea = ({ onDrop, children, chartData }) => {
//   const droppableAreaRef = useRef(null);
//   const dispatch = useDispatch();
//   const prevChartPositionsRef = useRef({});

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'chart',
//     drop: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       if (droppableAreaRef.current) {
//         const areaRect = droppableAreaRef.current.getBoundingClientRect();
//         const newPosition = { x: offset.x - areaRect.left, y: offset.y - areaRect.top };
//         onDrop(item.chartName, newPosition);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   useEffect(() => {
//     if (droppableAreaRef.current) {
//       console.log('Droppable Area Position:', droppableAreaRef.current.getBoundingClientRect());
//     }
//   }, []);

//   const updateChartDetails = useRef(
//     debounce(() => {
//       if (droppableAreaRef.current) {
//         const chartElements = droppableAreaRef.current.querySelectorAll('[data-chartname]');
//         chartElements.forEach((chartEl) => {
//           const chartName = chartEl.getAttribute('data-chartname');
//           if (chartName) {
//             const rect = chartEl.getBoundingClientRect();
//             const newPosition = { x: rect.left, y: rect.top };
//             const prevPosition = prevChartPositionsRef.current[chartName];

//             if (!prevPosition || prevPosition.x !== newPosition.x || prevPosition.y !== newPosition.y) {
//               prevChartPositionsRef.current[chartName] = newPosition;
//               dispatch(saveChartDetail({ chartName, domPosition: newPosition }));
//               console.log(`Updated Chart Position: ${chartName} - X: ${rect.left}, Y: ${rect.top}`);
//             }
//           }
//         });
//       }
//     }, 300)
//   ).current;

//   useEffect(() => {
//     updateChartDetails();
//     return () => {
//       updateChartDetails.cancel();
//     };
//   }, [chartData, updateChartDetails]);

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
//         border: isOver ? '20px solid #007bff' : '20px solid #ccc',
//         minHeight: '84vh',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
//         gap: '10px',
//         overflow: 'auto',
//         borderRadius: '20px',
//         width: '100%',
//       }}
//     >
//       {React.Children.map(children, (child) => React.cloneElement(child, { droppableAreaRef }))}
//     </div>
//   );
// };

// export default DroppableArea;
