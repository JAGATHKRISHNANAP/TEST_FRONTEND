// import { Button } from '@mui/material';
// import React from 'react';
// import { useDrag } from 'react-dnd';



// const DraggableChartButton = ({ chartName, disabled }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'chart',
//     item: { chartName },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: !disabled, // Disable dragging if button is disabled
//   }), [disabled]);

//   return (
//     <Button
//       sx={{ margin: "2px", width: "100px", color: "white" }}
//       className="x-axis-column"
//       ref={drag}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//       disabled={disabled}
//     >
//       {chartName}
//     </Button>
//   );
// };

// export default DraggableChartButton;






// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { useDrag } from 'react-dnd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { deleteChart, isChartInDashboard } from '../../utils/api'; // Ensure API functions are correctly imported

// const DraggableChartButton = ({ chartName, disabled, onRemove }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'chart',
//     item: { chartName },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: !disabled,
//   }), [disabled]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [chartInUse, setChartInUse] = useState(false);

//   const [dummyState, setDummyState] = useState(false);

//   // Check if the chart is in use when the component mounts
//   useEffect(() => {
//     const checkChartUsage = async () => {
//       try {
//         const { isInDashboard } = await isChartInDashboard(chartName);
//         console.log('Chart In Use:', chartName, isInDashboard); // Debug API response
//         setChartInUse(isInDashboard);
//       } catch (error) {
//         console.error('Error checking chart usage:', error);
//       }
//     };

//     checkChartUsage();
//   }, [chartName]);

//   const handleRightClick = (event) => {
//     event.preventDefault();
//     setAnchorEl({ top: event.clientY, left: event.clientX });
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenDialog = () => {
//     if (chartInUse) {
//       console.log('Chart is in use. Cannot delete:', chartName); // Debug chart usage
//       alert('This chart is in use and cannot be deleted.');
//       handleCloseMenu();
//     } else {
//       setOpenDialog(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   // const handleRemoveChart = async () => {
//   //   try {
//   //     await deleteChart(chartName); // Call the API to delete the chart
//   //     onRemove(chartName); // Trigger the parent callback to update UI
//   //     handleCloseDialog();
//   //   } catch (error) {
//   //     console.error('Error removing chart:', error);
//   //   }
//   // };

// const handleRemoveChart = async () => {
//   try {
//     await deleteChart(chartName);
//     onRemove(chartName);
//     setOpenDialog(false);
//     setDummyState((prev) => !prev); // Force re-render
//   } catch (error) {
//     console.error('Error removing chart:', error);
//   }
// };

//   return (
//     <div style={{ display: 'inline-flex', alignItems: 'center', margin: '4px' }} ref={drag}>
//       <Button
//         sx={{
//           margin: '4px',
//           minWidth: '90px',
//           color: 'white',
//           backgroundColor: 'primary.main',
//           justifyContent: 'center',
//           maxHeight: '28px',
//           fontSize: '12px',
//           textOverflow: 'ellipsis',
//           padding: '6px',
//           position: 'relative',
//           display: 'inline-flex',
//           borderRadius: '4px',
//           '&:hover': {
//             backgroundColor: 'primary.dark',
//           },
//         }}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//         disabled={disabled} // Disable button based on the disabled prop
//         onContextMenu={handleRightClick}
//       >
//         {chartName}
//       </Button>
//       <Menu
//         anchorReference="anchorPosition"
//         anchorPosition={anchorEl ? { top: anchorEl.top, left: anchorEl.left } : undefined}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         sx={{
//           '& .MuiPaper-root': {
//             boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
//           },
//         }}
//       >
//         <MenuItem
//           onClick={handleOpenDialog}
//           sx={{
//             fontSize: '14px',
//             fontWeight: '600',
//             color: chartInUse ? 'gray' : 'black',  // Only change text color to gray when disabled
//             padding: '10px 20px',
//             display: 'flex',
//             alignItems: 'center',
//             '&:hover': {
//               backgroundColor: '#f5f5f5',
//             },
//           }}
//           // The "disabled" property here is removed, but we manage clickability through the color change
//         >
//           <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> Delete Chart
//         </MenuItem>
//         <MenuItem
//           onClick={handleCloseMenu}
//           sx={{
//             fontSize: '14px',
//             fontWeight: '600',
//             color: 'light black',
//             padding: '10px 20px',
//             display: 'flex',
//             alignItems: 'center',
//             '&:hover': {
//               backgroundColor: '#f5f5f5',
//             },
//           }}
//         >
//           <CancelIcon sx={{ marginRight: 1, color: 'grey' }} /> Cancel
//         </MenuItem>
//       </Menu>

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>

//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete the chart "{chartName}"? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleRemoveChart} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DraggableChartButton;


import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDrag } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteChart, isChartInDashboard } from '../../utils/api'; // Ensure API functions are correctly imported

const DraggableChartButton = ({ chartName, disabled, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'chart',
    item: { chartName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled,
  }), [disabled]);

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartInUse, setChartInUse] = useState(false);

  // Check if the chart is in use when the component mounts
  useEffect(() => {
    const checkChartUsage = async () => {
      try {
        const { isInDashboard } = await isChartInDashboard(chartName);
        console.log('Chart In Use:', chartName, isInDashboard); // Debug API response
        setChartInUse(isInDashboard);
      } catch (error) {
        console.error('Error checking chart usage:', error);
      }
    };

    checkChartUsage();
  }, [chartName]);

  const handleRightClick = (event) => {
    event.preventDefault();
    setAnchorEl({ top: event.clientY, left: event.clientX });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    if (chartInUse) {
      console.log('Chart is in use. Cannot delete:', chartName); // Debug chart usage
      alert('This chart is in use and cannot be deleted.');
      handleCloseMenu();
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRemoveChart = async () => {
    try {
      await deleteChart(chartName); // Call the API to delete the chart
      onRemove(chartName); // Trigger the parent callback to update UI
      handleCloseDialog();
    } catch (error) {
      console.error('Error removing chart:', error);
    }
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', margin: '4px' }} ref={drag}>
      <Button
        sx={{
          margin: '4px',
          minWidth: '90px',
          color: 'white',
          backgroundColor: 'primary.main',
          justifyContent: 'center',
          maxHeight: '28px',
          fontSize: '12px',
          textOverflow: 'ellipsis',
          padding: '6px',
          position: 'relative',
          display: 'inline-flex',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        disabled={disabled} // Disable button based on the disabled prop
        onContextMenu={handleRightClick}
      >
        {chartName}
      </Button>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={anchorEl ? { top: anchorEl.top, left: anchorEl.left } : undefined}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <MenuItem
          onClick={handleOpenDialog}
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: chartInUse ? 'gray' : 'black',  // Only change text color to gray when disabled
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          // The "disabled" property here is removed, but we manage clickability through the color change
        >
          <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> Delete Chart
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'light black',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <CancelIcon sx={{ marginRight: 1, color: 'grey' }} /> Cancel
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the chart "{chartName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveChart} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DraggableChartButton;


// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { useDrag } from 'react-dnd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { deleteChart, isChartInDashboard } from '../../utils/api'; // Ensure API functions are correctly imported

// const DraggableChartButton = ({ chartName, disabled, onRemove }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'chart',
//     item: { chartName },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: !disabled,
//   }), [disabled]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [chartInUse, setChartInUse] = useState(false);

//   // Check if the chart is in use when the component mounts
//   useEffect(() => {
//     const checkChartUsage = async () => {
//       try {
//         const { isInDashboard } = await isChartInDashboard(chartName);
//         console.log('Chart In Use:', chartName, isInDashboard); // Debug API response
//         setChartInUse(isInDashboard);
//       } catch (error) {
//         console.error('Error checking chart usage:', error);
//       }
//     };

//     checkChartUsage();
//   }, [chartName]);

//   const handleRightClick = (event) => {
//     event.preventDefault();
//     setAnchorEl({ top: event.clientY, left: event.clientX });
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenDialog = () => {
//     if (chartInUse) {
//       console.log('Chart is in use. Cannot delete:', chartName); // Debug chart usage
//       alert('This chart is in use and cannot be deleted.');
//       handleCloseMenu();
//     } else {
//       setOpenDialog(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleRemoveChart = async () => {
//     try {
//       await deleteChart(chartName); // Call the API to delete the chart
//       onRemove(chartName); // Trigger the parent callback to update UI
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error removing chart:', error);
//     }
//   };

//   return (
//     <div style={{ display: 'inline-flex', alignItems: 'center', margin: '4px' }} ref={drag}>
//       <Button
//         sx={{
//           margin: '4px',
//           minWidth: '90px',
//           color: 'white',
//           backgroundColor: 'primary.main',
//           justifyContent: 'center',
//           maxHeight: '28px',
//           fontSize: '12px',
//           textOverflow: 'ellipsis',
//           padding: '6px',
//           position: 'relative',
//           display: 'inline-flex',
//           borderRadius: '4px',
//           '&:hover': {
//             backgroundColor: 'primary.dark',
//           },
//         }}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//         disabled={disabled} // Disable button based on the disabled prop
//         onContextMenu={handleRightClick}
//       >
//         {chartName}
//       </Button>
//       <Menu
//         anchorReference="anchorPosition"
//         anchorPosition={anchorEl ? { top: anchorEl.top, left: anchorEl.left } : undefined}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         sx={{
//           '& .MuiPaper-root': {
//             boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
//           },
//         }}
//       >
//         <MenuItem
//           onClick={handleOpenDialog}
//           sx={{
//             fontSize: '14px',
//             fontWeight: '600',
//             color: chartInUse ? 'gray' : 'black', // Only change text color to gray when disabled
//             padding: '10px 20px',
//             display: 'flex',
//             alignItems: 'center',
//             '&:hover': {
//               backgroundColor: '#f5f5f5',
//             },
//           }}
//         >
//           <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> Delete Chart
//         </MenuItem>
//         <MenuItem
//           onClick={handleCloseMenu}
//           sx={{
//             fontSize: '14px',
//             fontWeight: '600',
//             color: 'light black',
//             padding: '10px 20px',
//             display: 'flex',
//             alignItems: 'center',
//             '&:hover': {
//               backgroundColor: '#f5f5f5',
//             },
//           }}
//         >
//           <CancelIcon sx={{ marginRight: 1, color: 'grey' }} /> Cancel
//         </MenuItem>
//       </Menu>

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete the chart "{chartName}"? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleRemoveChart} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DraggableChartButton;
