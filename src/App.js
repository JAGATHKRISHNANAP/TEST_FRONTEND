import React from 'react'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
      <HomePage/>
    </div>
  )
}


// PUSH DATE 17-12-2024
export default App

// import React, { useState, useRef } from "react";

// const shapes = [
//   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue" } },
//   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green" } },
//   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%" } },
//   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple" } },
// ];

// const ShapeContainer = ({ shape, x, y, index, onDragEnd }) => {
//   return (
//     <div
//       draggable
//       onDragEnd={(event) => onDragEnd(event, index)}
//       style={{
//         position: "absolute",
//         left: x,
//         top: y,
//         transform: "translate(-50%, -50%)",
//         cursor: "move",
//         ...shape.style,
//       }}
//     />
//   );
// };

// const ShapeDropZone = () => {
//   const [droppedShapes, setDroppedShapes] = useState([]);
//   const dropZoneRef = useRef(null);
//   const gridSize = 20; // Grid cell size in pixels

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const shapeId = event.dataTransfer.getData("shape");
//     const shape = shapes.find((s) => s.id === shapeId);
    
//     if (shape && dropZoneRef.current) {
//       const rect = dropZoneRef.current.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;
      
//       // Snap to grid
//       const snappedX = Math.round(x / gridSize) * gridSize;
//       const snappedY = Math.round(y / gridSize) * gridSize;

//       setDroppedShapes((prevShapes) => [...prevShapes, { ...shape, x: snappedX, y: snappedY }]);
//     }
//   };

//   const handleDrag = (event, index) => {
//     event.preventDefault();
//     if (!dropZoneRef.current) return;
    
//     const rect = dropZoneRef.current.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
    
//     // Snap to grid
//     const snappedX = Math.round(x / gridSize) * gridSize;
//     const snappedY = Math.round(y / gridSize) * gridSize;

//     setDroppedShapes((prevShapes) => {
//       const newShapes = [...prevShapes];
//       newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
//       return newShapes;
//     });
//   };

//   return (
//     <div
//       ref={dropZoneRef}
//       onDragOver={(event) => event.preventDefault()}
//       onDrop={handleDrop}
//       style={{ 
//         width: "100%", 
//         height: "300px", 
//         border: "2px dashed gray", 
//         position: "relative",
//         backgroundImage: `linear-gradient(to right, lightgray 1px, transparent 1px),
//                           linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
//         backgroundSize: `${gridSize}px ${gridSize}px`
//       }}
//     >
//       {droppedShapes.map((shape, index) => (
//         <ShapeContainer key={index} shape={shape} x={shape.x} y={shape.y} index={index} onDragEnd={handleDrag} />
//       ))}
//     </div>
//   );
// };

// const Footer = () => {
//   const handleDragStart = (event, shapeId) => {
//     event.dataTransfer.setData("shape", shapeId);
//   };

//   return (
//     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
//       {shapes.map((shape) => (
//         <div
//           key={shape.id}
//           draggable
//           onDragStart={(event) => handleDragStart(event, shape.id)}
//           style={{ 
//             width: "50px", 
//             height: "50px", 
//             display: "flex", 
//             justifyContent: "center", 
//             alignItems: "center", 
//             cursor: "grab",
//             border: "1px solid black",
//             background: "white",
//             fontSize: "12px",
//             textAlign: "center"
//           }}
//         >
//           {shape.label}
//         </div>
//       ))}
//     </footer>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes (Snap to Grid)</h2>
//       <ShapeDropZone />
//       <Footer />
//     </div>
//   );
// };

// export default App;


// import React, { useState, useRef } from "react";

// const shapes = [
//   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue" } },
//   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green" } },
//   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%" } },
//   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple" } },
// ];

// const ShapeContainer = ({ shape, x, y, index, onDragEnd }) => {
//   return (
//     <div
//       draggable
//       onDragEnd={(event) => onDragEnd(event, index)}
//       style={{
//         position: "absolute",
//         left: x,
//         top: y,
//         transform: "translate(-50%, -50%)",
//         cursor: "move",
//         border: "1px solid black", // Border for the container
//         padding: "5px",
//         background: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div style={shape.style} />
//     </div>
//   );
// };

// const ShapeDropZone = () => {
//   const [droppedShapes, setDroppedShapes] = useState([]);
//   const dropZoneRef = useRef(null);
//   const gridSize = 20; // Grid cell size in pixels

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const shapeId = event.dataTransfer.getData("shape");
//     const shape = shapes.find((s) => s.id === shapeId);
    
//     if (shape && dropZoneRef.current) {
//       const rect = dropZoneRef.current.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;
      
//       // Snap to grid
//       const snappedX = Math.round(x / gridSize) * gridSize;
//       const snappedY = Math.round(y / gridSize) * gridSize;

//       setDroppedShapes((prevShapes) => [...prevShapes, { ...shape, x: snappedX, y: snappedY }]);
//     }
//   };

//   // const handleDrag = (event, index) => {
//   //   event.preventDefault();
//   //   if (!dropZoneRef.current) return;
    
//   //   const rect = dropZoneRef.current.getBoundingClientRect();
//   //   const x = event.clientX - rect.left;
//   //   const y = event.clientY - rect.top;
    
//   //   // Snap to grid
//   //   const snappedX = Math.round(x / gridSize) * gridSize;
//   //   const snappedY = Math.round(y / gridSize) * gridSize;

//   //   setDroppedShapes((prevShapes) => {
//   //     const newShapes = [...prevShapes];
//   //     newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
//   //     return newShapes;
//   //   });
//   // };

//   const handleDrag = (event, index) => {
//     event.preventDefault();
//     if (!dropZoneRef.current) return;
  
//     const rect = dropZoneRef.current.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;
  
//     // Snap to grid
//     let snappedX = Math.round(x / gridSize) * gridSize;
//     let snappedY = Math.round(y / gridSize) * gridSize;
  
//     setDroppedShapes((prevShapes) => {
//       let newShapes = [...prevShapes];
//       let occupiedIndex = newShapes.findIndex((s, i) => s.x === snappedX && s.y === snappedY && i !== index);
  
//       if (occupiedIndex !== -1) {
//         // Find next available position
//         let shiftX = snappedX;
//         while (newShapes.some(s => s.x === shiftX && s.y === snappedY)) {
//           shiftX += gridSize; // Move right
//         }
  
//         // Shift all affected shapes right
//         for (let i = newShapes.length - 1; i >= 0; i--) {
//           if (newShapes[i].x >= snappedX && newShapes[i].y === snappedY) {
//             newShapes[i] = { ...newShapes[i], x: newShapes[i].x + gridSize };
//           }
//         }
//       }
  
//       // Move dragged shape to snapped position
//       newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
//       return newShapes;
//     });
//   };
  
//   return (
//     <div
//       ref={dropZoneRef}
//       onDragOver={(event) => event.preventDefault()}
//       onDrop={handleDrop}
//       style={{ 
//         width: "100%", 
//         height: "300px", 
//         border: "2px dashed gray", 
//         position: "relative",
//         backgroundImage: `linear-gradient(to right, lightgray 1px, transparent 1px),
//                           linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
//         backgroundSize: `${gridSize}px ${gridSize}px`
//       }}
//     >
//       {droppedShapes.map((shape, index) => (
//         <ShapeContainer key={index} shape={shape} x={shape.x} y={shape.y} index={index} onDragEnd={handleDrag} />
//       ))}
//     </div>
//   );
// };

// const Footer = () => {
//   const handleDragStart = (event, shapeId) => {
//     event.dataTransfer.setData("shape", shapeId);
//   };

//   return (
//     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
//       {shapes.map((shape) => (
//         <div
//           key={shape.id}
//           draggable
//           onDragStart={(event) => handleDragStart(event, shape.id)}
//           style={{ 
//             width: "60px", 
//             height: "60px", 
//             display: "flex", 
//             justifyContent: "center", 
//             alignItems: "center", 
//             cursor: "grab",
//             border: "1px solid black",
//             background: "white",
//             fontSize: "12px",
//             textAlign: "center"
//           }}
//         >
//           {shape.label}
//         </div>
//       ))}
//     </footer>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes (Snap to Grid)</h2>
//       <ShapeDropZone />
//       <Footer />
//     </div>
//   );
// };

// export default App;




// import React, { useState, useRef } from "react";

// const shapes = [
//   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue" } },
//   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green" } },
//   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%" } },
//   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple" } },
// ];

// const ShapeContainer = ({ shape, x, y, index, onDragStart, onDragEnd }) => {
//   return (
//     <div
//       draggable
//       onDragStart={(event) => onDragStart(event, index)}
//       onDragEnd={(event) => onDragEnd(event, index)}
//       style={{
//         position: "absolute",
//         left: x,
//         top: y,
//         transform: "translate(-50%, -50%)",
//         cursor: "grab",
//         border: "1px solid black",
//         padding: "5px",
//         background: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div style={shape.style} />
//     </div>
//   );
// };

// const ShapeDropZone = () => {
//   const [droppedShapes, setDroppedShapes] = useState([]);
//   const dropZoneRef = useRef(null);
//   const gridSize = 10; // Grid cell size in pixels

//   const findNearestEmptySpot = (newShapes, startX, startY, maxWidth, maxHeight) => {
//     let dx = 0, dy = 0;

//     while (newShapes.some((s) => s.x === startX + dx && s.y === startY + dy)) {
//       dx += gridSize;
//       if (startX + dx > maxWidth) {
//         dx = 0;
//         dy += gridSize;
//       }
//       if (startY + dy > maxHeight) {
//         return { x: startX, y: startY };
//       }
//     }

//     return { x: startX + dx, y: startY + dy };
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const shapeId = event.dataTransfer.getData("shape");
//     const shape = shapes.find((s) => s.id === shapeId);

//     if (shape && dropZoneRef.current) {
//       const rect = dropZoneRef.current.getBoundingClientRect();
//       let x = event.clientX - rect.left;
//       let y = event.clientY - rect.top;

//       // Snap to grid
//       let snappedX = Math.round(x / gridSize) * gridSize;
//       let snappedY = Math.round(y / gridSize) * gridSize;

//       // Ensure shape stays within the grid
//       snappedX = Math.max(0, Math.min(snappedX, rect.width - gridSize));
//       snappedY = Math.max(0, Math.min(snappedY, rect.height - gridSize));

//       setDroppedShapes((prevShapes) => {
//         let newShapes = [...prevShapes];

//         // Check if occupied
//         if (newShapes.some((s) => s.x === snappedX && s.y === snappedY)) {
//           const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
//           snappedX = newX;
//           snappedY = newY;
//         }

//         return [...newShapes, { ...shape, x: snappedX, y: snappedY }];
//       });
//     }
//   };

//   const handleDragStart = (event, index) => {
//     event.dataTransfer.setData("draggedIndex", index);
//   };

//   const handleDragEnd = (event, index) => {
//     event.preventDefault();
//     if (!dropZoneRef.current) return;

//     const rect = dropZoneRef.current.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;

//     // Snap to grid
//     let snappedX = Math.round(x / gridSize) * gridSize;
//     let snappedY = Math.round(y / gridSize) * gridSize;

//     // Ensure shape stays within the grid
//     snappedX = Math.max(0, Math.min(snappedX, rect.width - gridSize));
//     snappedY = Math.max(0, Math.min(snappedY, rect.height - gridSize));

//     setDroppedShapes((prevShapes) => {
//       let newShapes = [...prevShapes];

//       // Check if occupied
//       if (newShapes.some((s, i) => s.x === snappedX && s.y === snappedY && i !== index)) {
//         const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
//         snappedX = newX;
//         snappedY = newY;
//       }

//       newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
//       return newShapes;
//     });
//   };

//   return (
//     <div
//       ref={dropZoneRef}
//       onDragOver={(event) => event.preventDefault()}
//       onDrop={handleDrop}
//       style={{
//         width: "100%",
//         height: "600px",
//         border: "2px dashed gray",
//         position: "relative",
//         backgroundImage: `linear-gradient(to right, lightgray 1px, transparent 1px),
//                           linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
//         backgroundSize: `${gridSize}px ${gridSize}px`,
//       }}
//     >
//       {droppedShapes.map((shape, index) => (
//         <ShapeContainer
//           key={index}
//           shape={shape}
//           x={shape.x}
//           y={shape.y}
//           index={index}
//           onDragStart={handleDragStart}
//           onDragEnd={handleDragEnd}
//         />
//       ))}
//     </div>
//   );
// };

// const Footer = () => {
//   const handleDragStart = (event, shapeId) => {
//     event.dataTransfer.setData("shape", shapeId);
//   };

//   return (
//     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
//       {shapes.map((shape) => (
//         <div
//           key={shape.id}
//           draggable
//           onDragStart={(event) => handleDragStart(event, shape.id)}
//           style={{
//             width: "60px",
//             height: "60px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "grab",
//             border: "1px solid black",
//             background: "white",
//             fontSize: "12px",
//             textAlign: "center",
//           }}
//         >
//           {shape.label}
//         </div>
//       ))}
//     </footer>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes (Snap to Grid)</h2>
//       <ShapeDropZone />
//       <Footer />
//     </div>
//   );
// };

// export default App;

// // import React, { useState, useRef } from "react";

// // const shapes = [
// //   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue" } },
// //   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green" } },
// //   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%" } },
// //   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple" } },
// // ];

// // const ShapeContainer = ({ shape, x, y, index, onDragStart, onDragEnd }) => {
// //   return (
// //     <div
// //       draggable
// //       onDragStart={(event) => onDragStart(event, index)}
// //       onDragEnd={(event) => onDragEnd(event, index)}
// //       style={{
// //         position: "absolute",
// //         left: x,
// //         top: y,
// //         transform: "translate(-50%, -50%)",
// //         cursor: "grab",
// //         border: "1px solid black",
// //         padding: "5px",
// //         background: "white",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //       }}
// //     >
// //       <div style={shape.style} />
// //     </div>
// //   );
// // };

// // const ShapeDropZone = () => {
// //   const [droppedShapes, setDroppedShapes] = useState([]);
// //   const dropZoneRef = useRef(null);
// //   const gridSize = 20; // Grid cell size in pixels

// //   const findNearestEmptySpot = (newShapes, startX, startY, maxWidth, maxHeight) => {
// //     let dx = 0, dy = 0;

// //     while (newShapes.some((s) => s.x === startX + dx && s.y === startY + dy)) {
// //       dx += gridSize;
// //       if (startX + dx > maxWidth) {
// //         dx = 0;
// //         dy += gridSize;
// //       }
// //       if (startY + dy > maxHeight) {
// //         return { x: startX, y: startY };
// //       }
// //     }

// //     return { x: startX + dx, y: startY + dy };
// //   };
// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const shapeId = event.dataTransfer.getData("shape");
// //     const shape = shapes.find((s) => s.id === shapeId);
  
// //     if (shape && dropZoneRef.current) {
// //       const rect = dropZoneRef.current.getBoundingClientRect();
// //       let x = event.clientX - rect.left;
// //       let y = event.clientY - rect.top;
  
// //       // Snap to grid
// //       let snappedX = Math.round(x / gridSize) * gridSize;
// //       let snappedY = Math.round(y / gridSize) * gridSize;
  
// //       // Ensure shape stays within the grid
// //       snappedX = Math.max(0, Math.min(snappedX, rect.width - gridSize));
// //       snappedY = Math.max(0, Math.min(snappedY, rect.height - gridSize));
  
// //       setDroppedShapes((prevShapes) => {
// //         let newShapes = [...prevShapes];
  
// //         // Check if occupied
// //         if (newShapes.some((s) => s.x === snappedX && s.y === snappedY)) {
// //           const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
// //           snappedX = newX;
// //           snappedY = newY;
// //         }
  
// //         return [...newShapes, { ...shape, x: snappedX, y: snappedY }];
// //       });
// //     }
// //   };
  
// //   const handleDragEnd = (event, index) => {
// //     event.preventDefault();
// //     if (!dropZoneRef.current) return;
  
// //     const rect = dropZoneRef.current.getBoundingClientRect();
// //     let x = event.clientX - rect.left;
// //     let y = event.clientY - rect.top;
  
// //     // Snap to grid
// //     let snappedX = Math.round(x / gridSize) * gridSize;
// //     let snappedY = Math.round(y / gridSize) * gridSize;
  
// //     // Ensure shape stays within the grid
// //     snappedX = Math.max(0, Math.min(snappedX, rect.width - gridSize));
// //     snappedY = Math.max(0, Math.min(snappedY, rect.height - gridSize));
  
// //     setDroppedShapes((prevShapes) => {
// //       let newShapes = [...prevShapes];
  
// //       // Check if occupied
// //       if (newShapes.some((s, i) => s.x === snappedX && s.y === snappedY && i !== index)) {
// //         const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
// //         snappedX = newX;
// //         snappedY = newY;
// //       }
  
// //       newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
// //       return newShapes;
// //     });
// //   };
  
// //   // const handleDrop = (event) => {
// //   //   event.preventDefault();
// //   //   const shapeId = event.dataTransfer.getData("shape");
// //   //   const shape = shapes.find((s) => s.id === shapeId);

// //   //   if (shape && dropZoneRef.current) {
// //   //     const rect = dropZoneRef.current.getBoundingClientRect();
// //   //     let x = event.clientX - rect.left;
// //   //     let y = event.clientY - rect.top;

// //   //     let snappedX = Math.round(x / gridSize) * gridSize;
// //   //     let snappedY = Math.round(y / gridSize) * gridSize;

// //   //     setDroppedShapes((prevShapes) => {
// //   //       let newShapes = [...prevShapes];

// //   //       if (newShapes.some((s) => s.x === snappedX && s.y === snappedY)) {
// //   //         const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
// //   //         snappedX = newX;
// //   //         snappedY = newY;
// //   //       }

// //   //       return [...newShapes, { ...shape, x: snappedX, y: snappedY }];
// //   //     });
// //   //   }
// //   // };

// //   const handleDragStart = (event, index) => {
// //     event.dataTransfer.setData("draggedIndex", index);
// //   };

// //   // const handleDragEnd = (event, index) => {
// //   //   event.preventDefault();
// //   //   if (!dropZoneRef.current) return;

// //   //   const rect = dropZoneRef.current.getBoundingClientRect();
// //   //   let x = event.clientX - rect.left;
// //   //   let y = event.clientY - rect.top;

// //   //   let snappedX = Math.round(x / gridSize) * gridSize;
// //   //   let snappedY = Math.round(y / gridSize) * gridSize;

// //   //   setDroppedShapes((prevShapes) => {
// //   //     let newShapes = [...prevShapes];

// //   //     if (newShapes.some((s, i) => s.x === snappedX && s.y === snappedY && i !== index)) {
// //   //       const { x: newX, y: newY } = findNearestEmptySpot(newShapes, snappedX, snappedY, rect.width, rect.height);
// //   //       snappedX = newX;
// //   //       snappedY = newY;
// //   //     }

// //   //     newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
// //   //     return newShapes;
// //   //   });
// //   // };

// //   return (
// //     <div
// //       ref={dropZoneRef}
// //       onDragOver={(event) => event.preventDefault()}
// //       onDrop={handleDrop}
// //       style={{
// //         width: "100%",
// //         height: "300px",
// //         border: "2px dashed gray",
// //         position: "relative",
// //         backgroundImage: `linear-gradient(to right, lightgray 1px, transparent 1px),
// //                           linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
// //         backgroundSize: `${gridSize}px ${gridSize}px`,
// //       }}
// //     >
// //       {droppedShapes.map((shape, index) => (
// //         <ShapeContainer
// //           key={index}
// //           shape={shape}
// //           x={shape.x}
// //           y={shape.y}
// //           index={index}
// //           onDragStart={handleDragStart}
// //           onDragEnd={handleDragEnd}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const Footer = () => {
// //   const handleDragStart = (event, shapeId) => {
// //     event.dataTransfer.setData("shape", shapeId);
// //   };

// //   return (
// //     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
// //       {shapes.map((shape) => (
// //         <div
// //           key={shape.id}
// //           draggable
// //           onDragStart={(event) => handleDragStart(event, shape.id)}
// //           style={{
// //             width: "60px",
// //             height: "60px",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             cursor: "grab",
// //             border: "1px solid black",
// //             background: "white",
// //             fontSize: "12px",
// //             textAlign: "center",
// //           }}
// //         >
// //           {shape.label}
// //         </div>
// //       ))}
// //     </footer>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <div>
// //       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes (Snap to Grid)</h2>
// //       <ShapeDropZone />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;




// // import React, { useState, useRef } from "react";

// // const shapes = [
// //   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue", position: "absolute" } },
// //   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green", position: "absolute" } },
// //   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%", position: "absolute" } },
// //   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple", position: "absolute" } },
// // ];

// // const ShapeDropZone = () => {
// //   const [droppedShapes, setDroppedShapes] = useState([]);
// //   const dropZoneRef = useRef(null);
// //   const gridSize = 20; // Grid cell size in pixels

// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const shapeId = event.dataTransfer.getData("shape");
// //     const shape = shapes.find((s) => s.id === shapeId);
    
// //     if (shape && dropZoneRef.current) {
// //       const rect = dropZoneRef.current.getBoundingClientRect();
// //       const x = event.clientX - rect.left;
// //       const y = event.clientY - rect.top;
      
// //       // Snap to grid
// //       const snappedX = Math.round(x / gridSize) * gridSize;
// //       const snappedY = Math.round(y / gridSize) * gridSize;

// //       setDroppedShapes((prevShapes) => [
// //         ...prevShapes,
// //         { ...shape, x: snappedX, y: snappedY }
// //       ]);
// //     }
// //   };

// //   const handleDrag = (event, index) => {
// //     event.preventDefault();
// //     if (!dropZoneRef.current) return;
    
// //     const rect = dropZoneRef.current.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;
    
// //     // Snap to grid
// //     const snappedX = Math.round(x / gridSize) * gridSize;
// //     const snappedY = Math.round(y / gridSize) * gridSize;

// //     setDroppedShapes((prevShapes) => {
// //       const newShapes = [...prevShapes];
// //       newShapes[index] = { ...newShapes[index], x: snappedX, y: snappedY };
// //       return newShapes;
// //     });
// //   };

// //   return (
// //     <div
// //       ref={dropZoneRef}
// //       onDragOver={(event) => event.preventDefault()}
// //       onDrop={handleDrop}
// //       style={{ 
// //         width: "100%", 
// //         height: "300px", 
// //         border: "2px dashed gray", 
// //         position: "relative",
// //         backgroundImage: `linear-gradient(to right, lightgray 1px, transparent 1px),
// //                           linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
// //         backgroundSize: `${gridSize}px ${gridSize}px`
// //       }}
// //     >
// //       {droppedShapes.map((shape, index) => (
// //         <div
// //           key={index}
// //           draggable
// //           onDragEnd={(event) => handleDrag(event, index)}
// //           style={{ 
// //             ...shape.style, 
// //             left: shape.x, 
// //             top: shape.y, 
// //             cursor: "move",
// //             transform: `translate(-50%, -50%)` // Center shape on grid point
// //           }}
// //         ></div>
// //       ))}
// //     </div>
// //   );
// // };

// // const Footer = () => {
// //   const handleDragStart = (event, shapeId) => {
// //     event.dataTransfer.setData("shape", shapeId);
// //   };

// //   return (
// //     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
// //       {shapes.map((shape) => (
// //         <div
// //           key={shape.id}
// //           draggable
// //           onDragStart={(event) => handleDragStart(event, shape.id)}
// //           style={{ 
// //             width: "40px", 
// //             height: "40px", 
// //             background: "gray", 
// //             display: "flex", 
// //             justifyContent: "center", 
// //             alignItems: "center", 
// //             cursor: "grab" 
// //           }}
// //         >
// //           {shape.label[0]}
// //         </div>
// //       ))}
// //     </footer>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <div>
// //       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes (Snap to Grid)</h2>
// //       <ShapeDropZone />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useState } from "react";

// // const shapes = [
// //   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue", position: "absolute" } },
// //   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green", position: "absolute" } },
// //   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%", position: "absolute" } },
// //   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple", position: "absolute" } },
// // ];

// // const ShapeDropZone = () => {
// //   const [droppedShapes, setDroppedShapes] = useState([]);

// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const shapeId = event.dataTransfer.getData("shape");
// //     const shape = shapes.find((s) => s.id === shapeId);
// //     if (shape) {
// //       const offset = 100;
// //       const newX = 10 + droppedShapes.length * offset;
// //       const newY = 10;
// //       setDroppedShapes((prevShapes) => [...prevShapes, { ...shape, x: newX, y: newY }]);
// //     }
// //   };

// //   const handleDrag = (event, index) => {
// //     event.preventDefault();
// //     const x = event.clientX;
// //     const y = event.clientY;
// //     console.log(`Shape moved to X: ${x}, Y: ${y}`);
// //     setDroppedShapes((prevShapes) => {
// //       const newShapes = [...prevShapes];
// //       newShapes[index] = { ...newShapes[index], x, y };
// //       return newShapes;
// //     });
// //   };

// //   return (
// //     <div
// //       onDragOver={(event) => event.preventDefault()}
// //       onDrop={handleDrop}
// //       style={{ width: "100%", height: "300px", border: "2px dashed gray", position: "relative" }}
// //     >
// //       {droppedShapes.map((shape, index) => (
// //         <div
// //           key={index}
// //           draggable
// //           onDragEnd={(event) => handleDrag(event, index)}
// //           style={{ ...shape.style, left: shape.x, top: shape.y, cursor: "move" }}
// //         ></div>
// //       ))}
// //     </div>
// //   );
// // };

// // const Footer = () => {
// //   const handleDragStart = (event, shapeId) => {
// //     event.dataTransfer.setData("shape", shapeId);
// //   };

// //   return (
// //     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
// //       {shapes.map((shape) => (
// //         <div
// //           key={shape.id}
// //           draggable
// //           onDragStart={(event) => handleDragStart(event, shape.id)}
// //           style={{ width: "40px", height: "40px", background: "gray", display: "flex", justifyContent: "center", alignItems: "center", cursor: "grab" }}
// //         >
// //           {shape.label[0]}
// //         </div>
// //       ))}
// //     </footer>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <div>
// //       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes</h2>
// //       <ShapeDropZone />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;



// // import React, { useState, useRef } from "react";

// // const shapes = [
// //   { id: "rectangle", label: "Rectangle", style: { width: "100px", height: "50px", background: "blue" } },
// //   { id: "triangle", label: "Triangle", style: { width: "0", height: "0", borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: "100px solid green" } },
// //   { id: "circle", label: "Circle", style: { width: "80px", height: "80px", background: "red", borderRadius: "50%" } },
// //   { id: "square", label: "Square", style: { width: "80px", height: "80px", background: "purple" } },
// // ];

// // const ShapeDropZone = () => {
// //   const [droppedShapes, setDroppedShapes] = useState([]);
// //   const dragOffset = useRef({ x: 0, y: 0 });

// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const shapeId = event.dataTransfer.getData("shape");
// //     const shape = shapes.find((s) => s.id === shapeId);
// //     if (shape) {
// //       setDroppedShapes((prevShapes) => [
// //         ...prevShapes,
// //         { ...shape, order: prevShapes.length }
// //       ]);
// //     }
// //   };

// //   const handleDragStart = (event, index) => {
// //     const rect = event.target.getBoundingClientRect();
// //     dragOffset.current = {
// //       x: event.clientX - rect.left,
// //       y: event.clientY - rect.top
// //     };
// //   };

// //   const handleDragEnd = (event, index) => {
// //     const startX = 10;
// //     const cellWidth = 100;
// //     const draggedShape = droppedShapes[index];
    
// //     // Calculate intended position
// //     const intendedX = event.clientX - dragOffset.current.x;
// //     const intendedOrder = Math.floor((intendedX - startX) / cellWidth);
    
// //     // Clamp order to valid range
// //     const newOrder = Math.max(0, Math.min(droppedShapes.length - 1, intendedOrder));
    
// //     if (newOrder === draggedShape.order) return;

// //     // Create new array without dragged shape
// //     const updatedShapes = droppedShapes.filter((_, i) => i !== index);
// //     // Insert dragged shape at new position
// //     updatedShapes.splice(newOrder, 0, draggedShape);
    
// //     // Update orders for all shapes
// //     const orderedShapes = updatedShapes.map((shape, i) => ({
// //       ...shape,
// //       order: i
// //     }));

// //     setDroppedShapes(orderedShapes);
// //   };

// //   return (
// //     <div
// //       onDragOver={(e) => e.preventDefault()}
// //       onDrop={handleDrop}
// //       style={{ width: "100%", height: "300px", border: "2px dashed gray", position: "relative" }}
// //     >
// //       {droppedShapes.map((shape, index) => (
// //         <div
// //           key={index}
// //           draggable
// //           onDragStart={(e) => handleDragStart(e, index)}
// //           onDragEnd={(e) => handleDragEnd(e, index)}
// //           style={{
// //             ...shape.style,
// //             position: "absolute",
// //             left: shape.order * 100 + 10,
// //             top: "10px",
// //             cursor: "move",
// //             transform: `translate(0, 0)`
// //           }}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const Footer = () => {
// //   const handleDragStart = (event, shapeId) => {
// //     event.dataTransfer.setData("shape", shapeId);
// //   };

// //   return (
// //     <footer style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", background: "lightgray" }}>
// //       {shapes.map((shape) => (
// //         <div
// //           key={shape.id}
// //           draggable
// //           onDragStart={(e) => handleDragStart(e, shape.id)}
// //           style={{ 
// //             width: "40px", 
// //             height: "40px", 
// //             background: "gray", 
// //             display: "flex", 
// //             justifyContent: "center", 
// //             alignItems: "center", 
// //             cursor: "grab",
// //             ...shape.style
// //           }}
// //         >
// //           {shape.label[0]}
// //         </div>
// //       ))}
// //     </footer>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <div>
// //       <h2 style={{ textAlign: "center" }}>Drag and Drop Shapes</h2>
// //       <ShapeDropZone />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;