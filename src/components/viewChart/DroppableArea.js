// import React, { useRef } from 'react';
// import { useDrop } from 'react-dnd';
// import { Rnd } from 'react-rnd';
// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null); // Reference to the drop area

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'chart',
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node; // Set ref
//         drop(node); // Attach the drop functionality to the area
//       }}
//       style={{
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '10px',
//         border: isOver ? '2px solid #007bff' : '2px solid #ccc',  // Blue border on hover
//         minHeight: '82vh',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//         overflow: 'auto', // Set overflow to 'auto' to allow scrolling if the content exceeds the container
//         borderRadius: '10px',
//         maxHeight: '100%', // Set maximum height to container bounds
//         width: '100%',
//       }}
//     >
//       {React.Children.map(children, child =>
//         React.cloneElement(child, { droppableAreaRef })
//       )}
//     </div>
//   );
// };

// export default DroppableArea;


// import React, { useRef } from 'react';
// import { useDrop } from 'react-dnd';

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null); // Reference to the drop area

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'chart',
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   const processedChildren = React.Children.map(children, (child) =>
//     React.cloneElement(child, { droppableAreaRef })
//   );

//   console.log("Processed Children:", processedChildren); // Console log the processed children

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node; // Set ref
//         drop(node); // Attach the drop functionality to the area
//       }}
//       style={{
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '10px',
//         border: isOver ? '2px solid #007bff' : '2px solid #ccc', // Blue border on hover
//         minHeight: '82vh',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//         overflow: 'auto', // Set overflow to 'auto' to allow scrolling if the content exceeds the container
//         borderRadius: '10px',
//         maxHeight: '100%', // Set maximum height to container bounds
//         width: '100%',
//       }}
//     >
//       {processedChildren}
//     </div>
//   );
// };

// export default DroppableArea;





// import React, { useRef, useState } from 'react';
// import { useDrop } from 'react-dnd';
// import { Rnd } from 'react-rnd';

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'chart',
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   const checkCollision = (x, y, width, height) => {
//     return positions.some((pos) => {
//       return !(
//         x + width < pos.x || 
//         x > pos.x + pos.width || 
//         y + height < pos.y || 
//         y > pos.y + pos.height
//       );
//     });
//   };

//   const handleDragStop = (index, d) => {
//     let newX = d.x;
//     let newY = d.y;

//     const width = positions[index].width;
//     const height = positions[index].height;

//     if (checkCollision(newX, newY, width, height)) {
//       return; // Prevent movement if collision detected
//     }

//     const newPositions = [...positions];
//     newPositions[index] = { ...newPositions[index], x: newX, y: newY };
//     setPositions(newPositions);
//   };

//   const handleResizeStop = (index, e, direction, ref, delta, position) => {
//     let newWidth = ref.offsetWidth;
//     let newHeight = ref.offsetHeight;

//     if (checkCollision(position.x, position.y, newWidth, newHeight)) {
//       return; // Prevent resize if collision detected
//     }

//     const newPositions = [...positions];
//     newPositions[index] = {
//       ...newPositions[index],
//       width: newWidth,
//       height: newHeight,
//       x: position.x,
//       y: position.y,
//     };
//     setPositions(newPositions);
//   };

//   const processedChildren = React.Children.map(children, (child, index) => (
//     <Rnd
//       key={index}
//       default={{
//         x: positions[index]?.x || 10 * index, // Spread out initial positions
//         y: positions[index]?.y || 10 * index,
//         width: 300,
//         height: 200,
//       }}
//       bounds="parent"
//       onDragStop={(e, d) => handleDragStop(index, d)}
//       onResizeStop={(e, direction, ref, delta, position) =>
//         handleResizeStop(index, e, direction, ref, delta, position)
//       }
//       minWidth={200}
//       minHeight={150}
//     >
//       {child}
//     </Rnd>
//   ));

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '10px',
//         border: isOver ? '2px solid #007bff' : '2px solid #ccc',
//         minHeight: '82vh',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//         overflow: 'auto',
//         borderRadius: '10px',
//         maxHeight: '100%',
//         width: '100%',
//       }}
//     >
//       {processedChildren}
//     </div>
//   );
// };

// export default DroppableArea;



// import React, { useRef, useState } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   // Check for overlapping charts
//   const checkCollision = (x, y, width, height, ignoreIndex = -1) => {
//     return positions.some((pos, index) => {
//       if (index === ignoreIndex) return false;
//       return (
//         x < pos.x + pos.width &&
//         x + width > pos.x &&
//         y < pos.y + pos.height &&
//         y + height > pos.y
//       );
//     });
//   };

//   // Handle dragging stop
//   const handleDragStop = (index, d) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = { x: d.x, y: d.y, width: 300, height: 200 };
//       setPositions(newPositions);
//       return;
//     }

//     let newX = d.x;
//     let newY = d.y;
//     const { width, height } = positions[index];

//     if (checkCollision(newX, newY, width, height, index)) {
//       return;
//     }

//     const newPositions = [...positions];
//     newPositions[index] = { ...newPositions[index], x: newX, y: newY };
//     setPositions(newPositions);
//   };

//   // Handle resize stop
//   const handleResizeStop = (index, e, direction, ref, delta, position) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = {
//         x: position.x,
//         y: position.y,
//         width: ref.offsetWidth,
//         height: ref.offsetHeight,
//       };
//       setPositions(newPositions);
//       return;
//     }

//     let newWidth = ref.offsetWidth;
//     let newHeight = ref.offsetHeight;

//     if (checkCollision(position.x, position.y, newWidth, newHeight, index)) {
//       return;
//     }

//     const newPositions = [...positions];
//     newPositions[index] = {
//       ...newPositions[index],
//       width: newWidth,
//       height: newHeight,
//       x: position.x,
//       y: position.y,
//     };
//     setPositions(newPositions);
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "white",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => (
//         <Rnd
//           key={index}
//           size={{
//             width: positions[index]?.width || 300,
//             height: positions[index]?.height || 200,
//           }}
//           position={{
//             x: positions[index]?.x || index * 320, // Default position
//             y: positions[index]?.y || 50,
//           }}
//           onDragStop={(e, d) => handleDragStop(index, d)}
//           onResizeStop={(e, direction, ref, delta, position) =>
//             handleResizeStop(index, e, direction, ref, delta, position)
//           }
//           bounds="parent"
//         >
//           {React.cloneElement(child)}
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// export default DroppableArea;





// import React, { useRef, useState } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   // Check for overlapping charts
//   const checkCollision = (x, y, width, height, ignoreIndex = -1) => {
//     return positions.some((pos, index) => {
//       if (index === ignoreIndex) return false;
//       return (
//         x < pos.x + pos.width &&
//         x + width > pos.x &&
//         y < pos.y + pos.height &&
//         y + height > pos.y
//       );
//     });
//   };

//   // Handle dragging stop
//   const handleDragStop = (index, d) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = { x: d.x, y: d.y, width: 300, height: 200 };
//       setPositions(newPositions);
//       return;
//     }

//     let newX = d.x;
//     let newY = d.y;
//     const { width, height } = positions[index];

//     if (checkCollision(newX, newY, width, height, index)) {
//       return;
//     }

//     const newPositions = [...positions];
//     newPositions[index] = { ...newPositions[index], x: newX, y: newY };
//     setPositions(newPositions);
//   };

//   // Handle resize stop
//   const handleResizeStop = (index, e, direction, ref, delta, position) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = {
//         x: position.x,
//         y: position.y,
//         width: ref.offsetWidth,
//         height: ref.offsetHeight,
//       };
//       setPositions(newPositions);
//       return;
//     }

//     let newWidth = ref.offsetWidth;
//     let newHeight = ref.offsetHeight;

//     if (checkCollision(position.x, position.y, newWidth, newHeight, index)) {
//       return;
//     }

//     const newPositions = [...positions];
//     newPositions[index] = {
//       ...newPositions[index],
//       width: newWidth,
//       height: newHeight,
//       x: position.x,
//       y: position.y,
//     };
//     setPositions(newPositions);
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "white",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => (
//         <Rnd
//           key={index}
//           size={{
//             width: positions[index]?.width || 300,
//             height: positions[index]?.height || 200,
//           }}
//           position={{
//             x: positions[index]?.x || index * 320, // Default position
//             y: positions[index]?.y || 50,
//           }}
//           onDragStop={(e, d) => handleDragStop(index, d)}
//           onResizeStop={(e, direction, ref, delta, position) =>
//             handleResizeStop(index, e, direction, ref, delta, position)
//           }
//           bounds="parent"
//         >
//           <div
//             style={{
//               border: "2px solid #007bff",
//               borderRadius: "8px",
//               padding: "5px",
//               backgroundColor: "#f8f9fa",
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {React.cloneElement(child)}
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// export default DroppableArea;

























// import React, { useRef, useState } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   // Check for overlapping charts
//   const checkCollision = (x, y, width, height, ignoreIndex = -1) => {
//     return positions.some((pos, index) => {
//       if (index === ignoreIndex) return false;
//       return (
//         x < pos.x + pos.width &&
//         x + width > pos.x &&
//         y < pos.y + pos.height &&
//         y + height > pos.y
//       );
//     });
//   };

//   // Handle dragging stop
//   const handleDragStop = (index, d) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = { x: d.x, y: d.y, width: 300, height: 400 };
//       setPositions(newPositions);
//       return;
//     }

//     let newX = d.x;
//     let newY = d.y;
//     const { width, height } = positions[index];

//     if (checkCollision(newX, newY, width, height, index)) {
//       return;
//     }

//     // const newPositions = [...positions];
//     // newPositions[index] = { ...newPositions[index], x: newX, y: newY };
//     // setPositions(newPositions);

//     const newPositions = [...positions];
//     newPositions[index] = newPositions[index] || { x: 0, y: 0, width: 300, height: 400 };
//     newPositions[index] = { ...newPositions[index], x: d.x, y: d.y };
//     setPositions(newPositions);

//   };

//   // Handle resize stop
//   const handleResizeStop = (index, e, direction, ref, delta, position) => {
//     if (!positions[index]) {
//       const newPositions = [...positions];
//       newPositions[index] = {
//         x: position.x,
//         y: position.y,
//         width: ref.offsetWidth,
//         height: ref.offsetHeight,
//       };
//       setPositions(newPositions);
//       return;
//     }

//     let newWidth = ref.offsetWidth;
//     let newHeight = ref.offsetHeight;

//     if (checkCollision(position.x, position.y, newWidth, newHeight, index)) {
//       return;
//     }

//     // const newPositions = [...positions];
//     // newPositions[index] = {
//     //   ...newPositions[index],
//     //   width: newWidth,
//     //   height: newHeight,
//     //   x: position.x,
//     //   y: position.y,
//     // };
//     // setPositions(newPositions);


//     const newPositions = [...positions];
//     newPositions[index] = newPositions[index] || { x: position.x, y: position.y, width: 350, height: 400 };
//     newPositions[index] = {
//       ...newPositions[index],
//       width: ref.offsetWidth,
//       height: ref.offsetHeight,
//       x: position.x,
//       y: position.y,
//     };
//     setPositions(newPositions);

//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "white",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => (
//         <Rnd
//           key={index}
//           size={{
//             width: positions[index]?.width || 350,
//             height: positions[index]?.height || 400,
//           }}
//           position={{
//             x: positions[index]?.x || index * 320, // Default position
//             y: positions[index]?.y || 50,
//           }}
//           onDragStop={(e, d) => handleDragStop(index, d)}
//           onResizeStop={(e, direction, ref, delta, position) =>
//             handleResizeStop(index, e, direction, ref, delta, position)
//           }
//           enableResizing={{
//             top: true,
//             right: true,
//             bottom: true,
//             left: true,
//             topRight: true,
//             bottomRight: true,
//             bottomLeft: true,
//             topLeft: true,
//           }}
//           bounds="parent"
//           style={{
//             border: "1px solid black",
//             backgroundColor: "#f8f9fa",
//             padding: "5px",
//             borderRadius: "8px",
//           }}
//         >
//           {React.cloneElement(child)}
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// export default DroppableArea;



// import React, { useRef, useState } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);

// console.log("position:--------------------------------",positions);
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   // Default settings for chart size and gap
//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 5;

//   // Function to calculate initial positions dynamically
//   const getInitialPosition = (index) => {
//     if (droppableAreaRef.current) {
//       const containerWidth = droppableAreaRef.current.clientWidth;
//       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//       const row = Math.floor(index / chartsPerRow);
//       const col = index % chartsPerRow;

//       return { x: col * (chartWidth + gap) + 5, y: row * (chartHeight + gap) + 5 };
//     }
//     return { x: index * (chartWidth + gap), y: 5 };
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const initialPos = getInitialPosition(index);

//         return (
//           <Rnd
//             key={index}
//             size={{
//               width: positions[index]?.width || chartWidth,
//               height: positions[index]?.height || chartHeight,
//             }}
//             position={{
//               x: positions[index]?.x ?? initialPos.x,
//               y: positions[index]?.y ?? initialPos.y,
//             }}
//             onDragStop={(e, d) => {
//               const newPositions = [...positions];
//               newPositions[index] = { x: d.x, y: d.y, width: chartWidth, height: chartHeight };
//               setPositions(newPositions);
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               const newPositions = [...positions];
//               newPositions[index] = {
//                 x: position.x,
//                 y: position.y,
//                 width: ref.offsetWidth,
//                 height: ref.offsetHeight,
//               };
//               setPositions(newPositions);
//             }}
//             enableResizing={{
//               top: true,
//               right: true,
//               bottom: true,
//               left: true,
//               topRight: true,
//               bottomRight: true,
//               bottomLeft: true,
//               topLeft: true,
//             }}
//             bounds="parent"
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;




// import React, { useRef, useState } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const positionsRef = useRef([]); // Use ref to avoid re-renders
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 5;

//   const getInitialPosition = (index) => {
//     if (droppableAreaRef.current) {
//       const containerWidth = droppableAreaRef.current.clientWidth;
//       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));
//       const row = Math.floor(index / chartsPerRow);
//       const col = index % chartsPerRow;
//       return { x: col * (chartWidth + gap) + 5, y: row * (chartHeight + gap) + 5, zIndex: 1 };
//     }
//     return { x: index * (chartWidth + gap), y: 5, zIndex: 1 };
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const initialPos = getInitialPosition(index);
        
//         return (
//           <Rnd
//             key={index}
//             size={{
//               width: positions[index]?.width || chartWidth,
//               height: positions[index]?.height || chartHeight,
//             }}
//             position={{
//               x: positionsRef.current[index]?.x ?? initialPos.x,
//               y: positionsRef.current[index]?.y ?? initialPos.y,
//             }}
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: positions[index]?.zIndex || initialPos.zIndex,
//             }}
//             bounds="parent"
//             enableResizing={{
//               top: true,
//               right: true,
//               bottom: true,
//               left: true,
//               topRight: true,
//               bottomRight: true,
//               bottomLeft: true,
//               topLeft: true,
//             }}
//             onDragStart={() => {
//               // Increase z-index on drag
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   zIndex: highestZIndex + 1,
//                 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDrag={(e, d) => {
//               // Use ref instead of state for smooth dragging
//               positionsRef.current[index] = {
//                 ...positionsRef.current[index],
//                 x: d.x,
//                 y: d.y,
//               };
//             }}
//             onDragStop={(e, d) => {
//               // Update state only when drag stops
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: d.x,
//                   y: d.y,
//                   width: chartWidth,
//                   height: chartHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;

















































// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const positionsRef = useRef([]); // Reference for chart positions
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 5;

//   // Function to calculate initial positions (Avoid Overlapping)
//   const calculateInitialPositions = () => {
//     if (!droppableAreaRef.current) return [];

//     const containerWidth = droppableAreaRef.current.clientWidth;
//     const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//     return children.map((_, index) => {
//       const row = Math.floor(index / chartsPerRow);
//       const col = index % chartsPerRow;
//       return {
//         x: col * (chartWidth + gap) + 5,
//         y: row * (chartHeight + gap) + 5,
//         width: chartWidth,
//         height: chartHeight,
//         zIndex: 1,
//       };
//     });
//   };

//   // Effect to initialize positions on mount
//   useEffect(() => {
//     const initialPositions = calculateInitialPositions();
//     setPositions(initialPositions);
//     positionsRef.current = initialPositions;
//   }, [children]);

//   // Function to handle dragging over another chart (Shift Right)
//   const shiftCharts = (draggedIndex, newX, newY) => {
//     const updatedPositions = [...positionsRef.current];

//     updatedPositions.forEach((pos, index) => {
//       if (
//         index !== draggedIndex &&
//         newX < pos.x + chartWidth &&
//         newX + chartWidth > pos.x &&
//         newY < pos.y + chartHeight &&
//         newY + chartHeight > pos.y
//       ) {
//         updatedPositions[index] = {
//           ...pos,
//           x: pos.x + chartWidth + gap, // Move to the right
//         };
//       }
//     });

//     setPositions(updatedPositions);
//     positionsRef.current = updatedPositions;
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const position = positions[index] || { x: 0, y: 0, width: chartWidth, height: chartHeight };

//         return (
//           <Rnd
//             key={index}
//             size={{ width: position.width, height: position.height }}
//             position={{ x: position.x, y: position.y }}
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: position.zIndex,
//             }}
//             bounds="parent"
//             enableResizing={{
//               top: true,
//               right: true,
//               bottom: true,
//               left: true,
//               topRight: true,
//               bottomRight: true,
//               bottomLeft: true,
//               topLeft: true,
//             }}
//             onDragStart={() => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   zIndex: highestZIndex + 1,
//                 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDrag={(e, d) => {
//               positionsRef.current[index] = {
//                 ...positionsRef.current[index],
//                 x: d.x,
//                 y: d.y,
//               };
//               shiftCharts(index, d.x, d.y); // Shift overlapping charts
//             }}
//             onDragStop={(e, d) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: d.x,
//                   y: d.y,
//                   width: chartWidth,
//                   height: chartHeight,
//                 };
//                 return newPositions;
//               });
//               positionsRef.current[index] = {
//                 ...positionsRef.current[index],
//                 x: d.x,
//                 y: d.y,
//               };
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;

























// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const positionsRef = useRef([]);
//   const dragPositionRef = useRef({ x: 0, y: 0 });
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 5;

//   // Function to calculate initial positions (Avoid Overlapping)
//   const calculateInitialPositions = () => {
//     if (!droppableAreaRef.current) return [];
//     const containerWidth = droppableAreaRef.current.clientWidth;
//     const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//     return children.map((_, index) => {
//       const row = Math.floor(index / chartsPerRow);
//       const col = index % chartsPerRow;
//       return {
//         x: col * (chartWidth + gap) + 5,
//         y: row * (chartHeight + gap) + 5,
//         width: chartWidth,
//         height: chartHeight,
//         zIndex: 1,
//       };
//     });
//   };

//   // // Effect to initialize positions on mount
//   // useEffect(() => {
//   //   const initialPositions = calculateInitialPositions();
//   //   setPositions(initialPositions);
//   //   positionsRef.current = initialPositions;
//   // }, [children]);

//   useEffect(() => {
//     if (!children.length) return;
  
//     setPositions((prevPositions) => {
//       const existingCharts = prevPositions.length;
//       if (existingCharts >= children.length) return prevPositions; // Preserve existing positions
  
//       const newPositions = [...prevPositions];
//       const containerWidth = droppableAreaRef.current.clientWidth;
//       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));
  
//       for (let i = existingCharts; i < children.length; i++) {
//         const row = Math.floor(i / chartsPerRow);
//         const col = i % chartsPerRow;
//         newPositions.push({
//           x: col * (chartWidth + gap) + 5,
//           y: row * (chartHeight + gap) + 5,
//           width: chartWidth,
//           height: chartHeight,
//           zIndex: 1,
//         });
//       }
//       return newPositions;
//     });
//   }, [children]);
  

//   // Shift overlapping charts
//   const shiftCharts = (draggedIndex, newX, newY) => {
//     const updatedPositions = [...positionsRef.current];

//     updatedPositions.forEach((pos, index) => {
//       if (
//         index !== draggedIndex &&
//         newX < pos.x + chartWidth &&
//         newX + chartWidth > pos.x &&
//         newY < pos.y + chartHeight &&
//         newY + chartHeight > pos.y
//       ) {
//         updatedPositions[index] = {
//           ...pos,
//           x: pos.x + chartWidth + gap,
//         };
//       }
//     });

//     positionsRef.current = updatedPositions;
//   };

//   // Optimize onDrag using requestAnimationFrame
//   const handleDrag = (index, d) => {
//     dragPositionRef.current = { x: d.x, y: d.y };
//     requestAnimationFrame(() => {
//       positionsRef.current[index] = {
//         ...positionsRef.current[index],
//         x: d.x,
//         y: d.y,
//       };
//       shiftCharts(index, d.x, d.y);
//     });
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         maxHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const position = positions[index] || {
//           x: 0,
//           y: 0,
//           width: chartWidth,
//           height: chartHeight,
//         };

//         return (
//           <Rnd
//             key={index}
//             size={{ width: position.width, height: position.height }}
//             position={{ x: position.x, y: position.y }}
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: position.zIndex,
//             }}
//             bounds="parent"
//             enableResizing={{
//               top: true,
//               right: true,
//               bottom: true,
//               left: true,
//               topRight: true,
//               bottomRight: true,
//               bottomLeft: true,
//               topLeft: true,
//             }}
//             onDragStart={() => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   zIndex: highestZIndex + 1,
//                 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDrag={(e, d) => handleDrag(index, d)}
//             onDragStop={(e, d) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: d.x,
//                   y: d.y,
//                 };
//                 return newPositions;
//               });
//               positionsRef.current[index] = {
//                 ...positionsRef.current[index],
//                 x: d.x,
//                 y: d.y,
//               };
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;




// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({ isOver: monitor.isOver() }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 10;
//   console.log("position:--------------------------------",positions); 
//   useEffect(() => {
//     if (!children.length) return;
//     setPositions((prevPositions) => {
//       const existingCharts = prevPositions.length;
//       if (existingCharts >= children.length) return prevPositions;

//       const newPositions = [...prevPositions];
//       const containerWidth = droppableAreaRef.current.clientWidth;
//       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//       for (let i = existingCharts; i < children.length; i++) {
//         const row = Math.floor(i / chartsPerRow);
//         const col = i % chartsPerRow;
//         newPositions.push({
//           x: col * (chartWidth + gap) + 5,
//           y: row * (chartHeight + gap) + 5,
//           width: chartWidth,
//           height: chartHeight,
//           zIndex: 1,
//         });
//       }
//       return newPositions;
//     });
//   }, [children]);

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const position = positions[index] || { x: 0, y: 0, width: chartWidth, height: chartHeight };

//         return (
//           <Rnd
//             key={index}
//             size={{ width: position.width, height: position.height }}
//             position={{ x: position.x, y: position.y }}
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: position.zIndex,
//             }}
//             bounds="parent"
//             enableResizing
//             onDragStart={() => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = { ...newPositions[index], zIndex: highestZIndex + 1 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDragStop={(e, d) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = { ...newPositions[index], x: d.x, y: d.y };
//                 return newPositions;
//               });
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
 
// };

// export default DroppableArea;
















// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({ isOver: monitor.isOver() }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 10;

//   // Function to check if the new position overlaps with any existing chart
//   const checkOverlap = (newX, newY) => {
//     return positions.some(
//       (pos) =>
//         newX < pos.x + chartWidth + gap &&
//         newX + chartWidth + gap > pos.x &&
//         newY < pos.y + chartHeight + gap &&
//         newY + chartHeight + gap > pos.y
//     );
//   };

//   // Function to find the next available position
//   const getNextAvailablePosition = () => {
//     if (!droppableAreaRef.current) return { x: 5, y: 5 };

//     const containerWidth = droppableAreaRef.current.clientWidth;
//     const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//     for (let i = 0; ; i++) {
//       const row = Math.floor(i / chartsPerRow);
//       const col = i % chartsPerRow;
//       const newX = col * (chartWidth + gap) + 5;
//       const newY = row * (chartHeight + gap) + 5;

//       if (!checkOverlap(newX, newY)) {
//         return { x: newX, y: newY };
//       }
//     }
//   };

//   useEffect(() => {
//     if (!children.length) return;
//     setPositions((prevPositions) => {
//       if (prevPositions.length >= children.length) return prevPositions;

//       const newPositions = [...prevPositions];

//       for (let i = prevPositions.length; i < children.length; i++) {
//         const { x, y } = getNextAvailablePosition();
//         newPositions.push({
//           x,
//           y,
//           width: chartWidth,
//           height: chartHeight,
//           zIndex: 1,
//         });
//       }
//       return newPositions;
//     });
//   }, [children]);

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const position = positions[index] || { x: 0, y: 0, width: chartWidth, height: chartHeight };

//         return (
//           <Rnd
//             key={index}
//             size={{ width: position.width, height: position.height }}
//             position={{ x: position.x, y: position.y }}
//             style={{
//               border: "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: position.zIndex,
//             }}
//             bounds="parent"
//             enableResizing
//             onDragStart={() => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = { ...newPositions[index], zIndex: highestZIndex + 1 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDragStop={(e, d) => {
//               if (!checkOverlap(d.x, d.y)) {
//                 setPositions((prev) => {
//                   const newPositions = [...prev];
//                   newPositions[index] = { ...newPositions[index], x: d.x, y: d.y };
//                   return newPositions;
//                 });
//               }
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;



// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";

// const DroppableArea = ({ onDrop, children }) => {
//   const droppableAreaRef = useRef(null);
//   const [positions, setPositions] = useState([]);
//   const [highestZIndex, setHighestZIndex] = useState(1);
//   const [draggingIndex, setDraggingIndex] = useState(null);
//   const [currentDragPosition, setCurrentDragPosition] = useState({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   });

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "chart",
//     drop: (item) => onDrop(item.chartName),
//     collect: (monitor) => ({ isOver: monitor.isOver() }),
//   }));

//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 10;

//   const checkOverlap = (newX, newY) => {
//     return positions.some(
//       (pos) =>
//         newX < pos.x + chartWidth + gap &&
//         newX + chartWidth + gap > pos.x &&
//         newY < pos.y + chartHeight + gap &&
//         newY + chartHeight + gap > pos.y
//     );
//   };

//   const getNextAvailablePosition = () => {
//     if (!droppableAreaRef.current) return { x: 5, y: 5 };

//     const containerWidth = droppableAreaRef.current.clientWidth;
//     const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//     for (let i = 0; ; i++) {
//       const row = Math.floor(i / chartsPerRow);
//       const col = i % chartsPerRow;
//       const newX = col * (chartWidth + gap) + 5;
//       const newY = row * (chartHeight + gap) + 5;

//       if (!checkOverlap(newX, newY)) {
//         return { x: newX, y: newY };
//       }
//     }
//   };

//   useEffect(() => {
//     if (!children.length) return;
//     setPositions((prevPositions) => {
//       if (prevPositions.length >= children.length) return prevPositions;

//       const newPositions = [...prevPositions];

//       for (let i = prevPositions.length; i < children.length; i++) {
//         const { x, y } = getNextAvailablePosition();
//         newPositions.push({
//           x,
//           y,
//           width: chartWidth,
//           height: chartHeight,
//           zIndex: 1,
//         });
//       }
//       return newPositions;
//     });
//   }, [children]);

//   const checkAdjacency = (chartPos, draggedPos) => {
//     const gapSize = gap;

//     // Check right-left adjacency
//     if (
//       Math.abs(draggedPos.x - (chartPos.x + chartPos.width + gapSize)) < 1 &&
//       draggedPos.y < chartPos.y + chartPos.height &&
//       draggedPos.y + draggedPos.height > chartPos.y
//     ) {
//       return true;
//     }

//     // Check left-right adjacency
//     if (
//       Math.abs(chartPos.x - (draggedPos.x + draggedPos.width + gapSize)) < 1 &&
//       draggedPos.y < chartPos.y + chartPos.height &&
//       draggedPos.y + draggedPos.height > chartPos.y
//     ) {
//       return true;
//     }

//     // Check bottom-top adjacency
//     if (
//       Math.abs(draggedPos.y - (chartPos.y + chartPos.height + gapSize)) < 1 &&
//       draggedPos.x < chartPos.x + chartPos.width &&
//       draggedPos.x + draggedPos.width > chartPos.x
//     ) {
//       return true;
//     }

//     // Check top-bottom adjacency
//     if (
//       Math.abs(chartPos.y - (draggedPos.y + draggedPos.height + gapSize)) < 1 &&
//       draggedPos.x < chartPos.x + chartPos.width &&
//       draggedPos.x + draggedPos.width > chartPos.x
//     ) {
//       return true;
//     }

//     return false;
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//         drop(node);
//       }}
//       style={{
//         position: "relative",
//         backgroundColor: "yellow",
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         width: "100%",
//       }}
//     >
//       {React.Children.map(children, (child, index) => {
//         const position = positions[index] || {
//           x: 0,
//           y: 0,
//           width: chartWidth,
//           height: chartHeight,
//         };

//         let isAdjacent = false;
//         if (draggingIndex !== null && index !== draggingIndex) {
//           isAdjacent = checkAdjacency(position, currentDragPosition);
//         }

//         return (
//           <Rnd
//             key={index}
//             size={{ width: position.width, height: position.height }}
//             position={{ x: position.x, y: position.y }}
//             style={{
//               border: isAdjacent
//                 ? "2px solid #007bff"
//                 : "1px solid black",
//               backgroundColor: "#f8f9fa",
//               padding: "5px",
//               borderRadius: "8px",
//               zIndex: position.zIndex,
//             }}
//             bounds="parent"
//             enableResizing
//             onDragStart={() => {
//               setDraggingIndex(index);
//               setCurrentDragPosition({
//                 x: position.x,
//                 y: position.y,
//                 width: position.width,
//                 height: position.height,
//               });
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   zIndex: highestZIndex + 1,
//                 };
//                 return newPositions;
//               });
//               setHighestZIndex((prev) => prev + 1);
//             }}
//             onDrag={(e, data) => {
//               setCurrentDragPosition((prev) => ({
//                 ...prev,
//                 x: data.x,
//                 y: data.y,
//               }));
//             }}
//             onDragStop={(e, d) => {
//               setDraggingIndex(null);
//               if (!checkOverlap(d.x, d.y)) {
//                 setPositions((prev) => {
//                   const newPositions = [...prev];
//                   newPositions[index] = {
//                     ...newPositions[index],
//                     x: d.x,
//                     y: d.y,
//                   };
//                   return newPositions;
//                 });
//               }
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setPositions((prev) => {
//                 const newPositions = [...prev];
//                 newPositions[index] = {
//                   ...newPositions[index],
//                   x: position.x,
//                   y: position.y,
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                   chartName: item.chartName,
//                 };
//                 return newPositions;
//               });
//             }}
//           >
//             {React.cloneElement(child)}
//           </Rnd>
//         );
//       })}
//     </div>
//   );
// };

// export default DroppableArea;


















import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";
import {  setChartPositions,
  updateChartPosition,
  addChartPosition,
  removeChartPosition,} from "../../features/viewDashboardSlice/dashboardpossitionslice";

const DroppableArea = ({ onDrop, children }) => {
  const droppableAreaRef = useRef(null);
  const dispatch = useDispatch(); 
  const [positions, setPositions] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [currentDragPosition, setCurrentDragPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleRemovePosition = (chartName) => {
    setPositions((prevPositions) =>
      prevPositions.filter((_, index) => children[index].props.data.chartName !== chartName)
    );
    dispatch(removeChartPosition(chartName));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "chart",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && droppableAreaRef.current) {
        const dropX = offset.x - droppableAreaRef.current.getBoundingClientRect().left;
        const dropY = offset.y - droppableAreaRef.current.getBoundingClientRect().top;
        const { x, y } = checkOverlap(dropX, dropY) ? getNextAvailablePosition() : { x: dropX, y: dropY };
        const newPosition = {
          x,
          y,
          width: chartWidth,
          height: chartHeight,
          chartName: item?.chartName, // Ensure chartName is properly accessed
        };
        setPositions((prevPositions) => [
          ...prevPositions,
          { x, y, width: chartWidth, height: chartHeight, zIndex: highestZIndex + 1,chartName: item.chartName },
        ]);
        dispatch(addChartPosition(newPosition));
  
        setHighestZIndex((prev) => prev + 1);
      }
      onDrop(item.chartName);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));
  
  const chartWidth = 350;
  const chartHeight = 400;
  const gap = 10;
console.log("positions",positions)  
  const checkOverlap = (newX, newY) => {
    return positions.some(
      (pos) =>
        newX < pos.x + chartWidth + gap &&
        newX + chartWidth + gap > pos.x &&
        newY < pos.y + chartHeight + gap &&
        newY + chartHeight + gap > pos.y
    );
  };

  const getNextAvailablePosition = () => {
    if (!droppableAreaRef.current) return { x: 5, y: 5 };

    const containerWidth = droppableAreaRef.current.clientWidth;
    const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

    for (let i = 0; ; i++) {
      const row = Math.floor(i / chartsPerRow);
      const col = i % chartsPerRow;
      const newX = col * (chartWidth + gap) + 5;
      const newY = row * (chartHeight + gap) + 5;

      if (!checkOverlap(newX, newY)) {
        return { x: newX, y: newY };
      }
    }
  };

  useEffect(() => {
    if (!children.length) return;
    setPositions((prevPositions) => {
      if (prevPositions.length >= children.length) return prevPositions;

      const newPositions = [...prevPositions];

      for (let i = prevPositions.length; i < children.length; i++) {
        const { x, y } = getNextAvailablePosition();
        newPositions.push({
          x,
          y,
          width: chartWidth,
          height: chartHeight,
          // zIndex: 1,
        });
      }
      dispatch(setChartPositions(newPositions));
      return newPositions;
    });

  }, [children,dispatch]);

  const checkAdjacency = (chartPos, draggedPos) => {
    const gapSize = gap;

    // Check right-left adjacency
    if (
      Math.abs(draggedPos.x - (chartPos.x + chartPos.width + gapSize)) < 1 &&
      draggedPos.y < chartPos.y + chartPos.height &&
      draggedPos.y + draggedPos.height > chartPos.y
    ) {
      return true;
    }

    // Check left-right adjacency
    if (
      Math.abs(chartPos.x - (draggedPos.x + draggedPos.width + gapSize)) < 1 &&
      draggedPos.y < chartPos.y + chartPos.height &&
      draggedPos.y + draggedPos.height > chartPos.y
    ) {
      return true;
    }

    // Check bottom-top adjacency
    if (
      Math.abs(draggedPos.y - (chartPos.y + chartPos.height + gapSize)) < 1 &&
      draggedPos.x < chartPos.x + chartPos.width &&
      draggedPos.x + draggedPos.width > chartPos.x
    ) {
      return true;
    }

    // Check top-bottom adjacency
    if (
      Math.abs(chartPos.y - (draggedPos.y + draggedPos.height + gapSize)) < 1 &&
      draggedPos.x < chartPos.x + chartPos.width &&
      draggedPos.x + draggedPos.width > chartPos.x
    ) {
      return true;
    }

    return false;
  };

  return (
    <div
      ref={(node) => {
        droppableAreaRef.current = node;
        drop(node);
      }}
      style={{
        position: "relative",
        backgroundColor: "white",
        padding: "10px",
        border: isOver ? "2px solid #007bff" : "2px solid #ccc",
        minHeight: "82vh",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        overflow: "auto",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      {React.Children.map(children, (child, index) => {
        const position = positions[index] || {
          x: 0,
          y: 0,
          width: chartWidth,
          height: chartHeight,
        };

        let isAdjacent = false;
        if (draggingIndex !== null && index !== draggingIndex) {
          isAdjacent = checkAdjacency(position, currentDragPosition);
        }

        return (
          <Rnd
            key={index}
            size={{ width: position.width, height: position.height }}
            position={{ x: position.x, y: position.y }}
            style={{
              border: isAdjacent
                ? "2px solid #007bff"
                : "1px solid black",
              backgroundColor: "#f8f9fa",
              padding: "5px",
              borderRadius: "8px",
              zIndex: position.zIndex,
            }}
            bounds="parent"
            enableResizing
            onDragStart={() => {
              setDraggingIndex(index);
              setCurrentDragPosition({
                x: position.x,
                y: position.y,
                width: position.width,
                height: position.height,
              });

              const updatedPosition = {
                ...position,
                zIndex: highestZIndex + 1,
              };

              setPositions((prev) => {
                const newPositions = [...prev];
                newPositions[index] = updatedPosition;
                return newPositions;
              });
              dispatch(
                updateChartPosition({
                  index,
                  ...updatedPosition,
                })
              );
              setHighestZIndex((prev) => prev + 1);
            }}
            onDrag={(e, data) => {
              setCurrentDragPosition((prev) => ({
                ...prev,
                x: data.x,
                y: data.y,
              }));
            }}

            // onDragStop={(e, d) => {
            //   console.log("onDragStop", d);
            //   setDraggingIndex(null);
              
            //   // Allow slight adjustments but prevent complete overlap
            //   const tolerance = 5;
            
            //   const isOverlapping = positions.some((pos, i) => {
            //     if (i === index) return false; // Ignore self
            
            //     return (
            //       Math.abs(d.x - pos.x) < chartWidth - tolerance && // Ensure no horizontal overlap
            //       Math.abs(d.y - pos.y) < chartHeight - tolerance   // Ensure no vertical overlap
            //     );
            //   });
  
            //   if (!isOverlapping) {
            //     const updatedPosition = {
            //       x: d.x,
            //       y: d.y,
            //       width: chartWidth,
            //       height: chartHeight,
            //       chartName: positions[index]?.chartName || "Unknown Chart",
            //     };
              
            //     setPositions((prev) => {
            //       const newPositions = [...prev];
            //       newPositions[index] = updatedPosition;
            //       return newPositions;
            //     });
              
            //     dispatch(updateChartPosition({ index, ...updatedPosition }));
            //   }
              
            // }}
            // onResizeStop={(e, direction, ref, delta, position) => {
            //   const updatedPosition = {
            //     x: position.x,
            //     y: position.y,
            //     width: ref.offsetWidth,
            //     height: ref.offsetHeight,
            //     chartName: positions[index]?.chartName || "Unknown Chart"
            //   };
            
            //   setPositions((prev) => {
            //     const newPositions = [...prev];
            //     newPositions[index] = { ...newPositions[index], ...updatedPosition };
            //     return newPositions;
            //   });
            
            //   dispatch(updateChartPosition({ index, ...updatedPosition }));
            
            
            
            // }}
            
            onDragStop={(e, d) => {
              console.log("onDragStop", d);
              setDraggingIndex(null);
            
              // Get current width and height from state
              const currentWidth = positions[index]?.width || chartWidth;
              const currentHeight = positions[index]?.height || chartHeight;
            
              // Allow slight adjustments but prevent complete overlap
              const tolerance = 5;
            
              const isOverlapping = positions.some((pos, i) => {
                if (i === index) return false; // Ignore self
            
                return (
                  Math.abs(d.x - pos.x) < currentWidth - tolerance && // Ensure no horizontal overlap
                  Math.abs(d.y - pos.y) < currentHeight - tolerance   // Ensure no vertical overlap
                );
              });
            
              if (!isOverlapping) {
                const updatedPosition = {
                  x: d.x,
                  y: d.y,
                  width: currentWidth,  // Use current width
                  height: currentHeight, // Use current height
                  chartName: positions[index]?.chartName || "Unknown Chart",
                };
            
                setPositions((prev) => {
                  const newPositions = [...prev];
                  newPositions[index] = updatedPosition;
                  return newPositions;
                });
            
                dispatch(updateChartPosition({ index, ...updatedPosition }));
              }
            }}
            
            
            onResizeStop={(e, direction, ref, delta, position) => {
              const updatedPosition = {
                x: position.x,
                y: position.y,
                width: ref.offsetWidth,  // Store resized width
                height: ref.offsetHeight, // Store resized height
                chartName: positions[index]?.chartName || "Unknown Chart"
              };
            
              setPositions((prev) => {
                const newPositions = [...prev];
                newPositions[index] = updatedPosition;
                return newPositions;
              });
            
              dispatch(updateChartPosition({ index, ...updatedPosition }));
            }}
            
            
          >
            {React.cloneElement(child,{ onRemovePosition: handleRemovePosition })}
          </Rnd>
        );
      })}
    </div>
  );
};

export default DroppableArea;

