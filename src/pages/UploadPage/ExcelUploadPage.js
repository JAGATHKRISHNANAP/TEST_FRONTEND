// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadExcel } from '../../features/excelFileSlice/excelFileSlice';
// import CssBaseline from '@mui/material/CssBaseline';
// import SaveIcon from '@mui/icons-material/Save';
// import LoadingButton from '@mui/lab/LoadingButton';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// import { Button, TextField, Typography, Grid, Snackbar, Alert, Table, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogActions,TableRow, TableCell,Select, MenuItem } from '@mui/material';
// import * as XLSX from 'xlsx';
// import { fetchTableNamesAPI } from '../../utils/api';
// import { PieChart } from '@mui/x-charts/PieChart';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });
// const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB limit
// const ExcelUpload = () => {
//   const dispatch = useDispatch();
//   const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.excelFile);
//   const [user_id, setUser_Id] = React.useState(localStorage.getItem('user_id'));
//   const [totalRows, setTotalRows] = React.useState(0);
//   const [totalColumns, setTotalColumns] = React.useState(0);
//   const [excelData, setExcelData] = React.useState([]);
//   const [sheetNames, setSheetNames] = React.useState([]);
//   const [selectedSheet, setSelectedSheet] = React.useState('');
//   const [snackbarOpen, setSnackbarOpen] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
//   const [confirmationOpen, setConfirmationOpen] = React.useState(false);
//   const [confirmationChoice, setConfirmationChoice] = React.useState(null);
//   const company_database = localStorage.getItem('company_name');
//   const databaseName = localStorage.getItem('company_name');
//   React.useEffect(() => {
//     if (uploadError) {
//       setSnackbarMessage(uploadError);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     } else if (uploadSuccess) {
//       setSnackbarMessage('File uploaded successfully...');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     }
//   }, [uploadError, uploadSuccess]);

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     // Validate file size
//     if (selectedFile.size > MAX_FILE_SIZE) {
//       alert(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
//       return;
//     }
//     if (selectedFile) {
//       if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//         dispatch(setFile(selectedFile));
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           const arrayBuffer = event.target.result;
//           const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
//           setSheetNames(workbook.SheetNames);
//         };
//         reader.readAsArrayBuffer(selectedFile); // Use readAsArrayBuffer
//       } else {
//         dispatch(setFile(null));
//         alert('Please upload a valid Excel file');
//       }
//     }
//   };

//   const handleSheetSelection = (sheetName) => {
//     setSelectedSheet(sheetName);
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const arrayBuffer = event.target.result;
//       const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
//       const sheet = workbook.Sheets[sheetName];
//       const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
//       const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
//       setTotalColumns(headers.length);
//       setExcelData([headers, ...data.slice(1, 6)]); // Include headers in the displayed data
//       dispatch(setColumnHeadings(headers.map((header) => header.toLowerCase().replace(/\s+/g, '_'))));
//       setTotalRows(data.length - 1);
//     };
  
//     if (file) {
//       reader.readAsArrayBuffer(file); // Ensure file is read as ArrayBuffer
//     } else {
//         dispatch(setFile(null));
//       alert('Invalid file type. Please upload an Excel file (.xlsx or .xls).');


//     }
//   };
  

//   const handleConfirmationChoice = (choice) => {
//     setConfirmationChoice(choice);
//     setConfirmationOpen(false);

//     // If the user selects to update, proceed with the upload
//     if (choice === 'update' && file && selectedSheet) {
//       if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
//         dispatch(uploadExcel({
//           user_id,
//           file,
//           primaryKeyColumnName: columnHeadings[primaryKeyColumn],
//           company_database,
//           selectedSheet
//         }));
//       } else {
//         alert("Please select a primary key column before uploading.");
//       }
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!primaryKeyColumn && excelData.length > 1) {
//       const newHeaders = ['id', ...excelData[0]];  // Add the "id" column at the start
//       const newData = excelData.slice(1).map((row, index) => [index + 1, ...row]); // Assign unique ID starting from 1
//       setExcelData([newHeaders, ...newData]);
//       dispatch(setPrimaryKeyColumn(0));
//     }
  
//     if (file && selectedSheet) {
//       if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
//         const existingTableNames = await fetchTableNamesAPI(databaseName);
//         const currentTableName = selectedSheet.toLowerCase().replace(/\s+/g, '_');
//         if (existingTableNames.includes(currentTableName)) {
//           const userChoice = window.confirm(
//             `Table "${currentTableName}" already exists. Do you want to update it?`
//           );
//           if (!userChoice) {
//             alert("Table creation skipped.");
//             return;
//           }
//         }
//         dispatch(
//           uploadExcel({
//             user_id,
//             file,
//             primaryKeyColumnName: columnHeadings[primaryKeyColumn],
//             company_database,
//             selectedSheet,
//           })
//         );
//       } else {
//         alert("Please select a primary key column before uploading.");
//       }
//     } else {
//       alert("Please upload a file and select a sheet.");
//     }
//   };
  
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <form onSubmit={handleSubmit} className="excel-upload-form">

//          <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px'}}>
//            <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
//              <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
//   <Button component="label" variant="contained" sx={{
//       padding: '10px 18px', // Increase padding
     
//     }} startIcon={<CloudUploadIcon />}>
//     Choose File
//     <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//   </Button>

//   <TextField
//     label="File Name"
//     value={fileName}
//     InputProps={{ readOnly: true }}
//     variant="filled"
//     size="small"
//     style={{ flexGrow: 2 , minWidth: '200px'}} // Ensures consistent width
//   />

//   <LoadingButton
//     disabled={!file || !selectedSheet || uploading}
//     color="secondary"
//     loading={uploading}
//     startIcon={<SaveIcon />}
//     type="submit"
//     variant="contained"
//     sx={{
//       padding: '11px 18px', // Increase padding
//       minWidth: '120px', // Minimum button width
//     }}
//   >
//     {uploading ? 'Uploading...' : 'Upload'}
//   </LoadingButton>
// </Grid>

// {/* Reserve space for sheet dropdown */}
// <Grid
//   item
//   xs={2}
//   style={{
//     minHeight: '30px', // Fixed height to reserve space
//   }}
// >
//   {sheetNames.length > 0 && (
//     <>
//       <Typography>Select a sheet:</Typography>
//       <Select
//         value={selectedSheet}
//         onChange={(e) => handleSheetSelection(e.target.value)}
//         displayEmpty
//         fullWidth
//         variant="outlined"
//       >
//         <MenuItem value="" disabled>
//           -- Select a sheet --
//         </MenuItem>
//         {sheetNames.map((sheetName, index) => (
//           <MenuItem key={index} value={sheetName}>
//             {sheetName}
//           </MenuItem>
//         ))}
//       </Select>
//     </>
//   )}
// </Grid>


//           {excelData.length > 0 && (
//             <Grid item xs={4}>
//               <Typography>Select a Primary Key Column:</Typography>
//               <Select
//                 value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
//                 onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
//                 displayEmpty
//                 style={{ width: '' }}
//                 variant="outlined"
//               >
//                 <MenuItem value="" disabled>
//                   -- Select a Column --
//                 </MenuItem>
//                 {excelData[0].map((header, index) => (
//                   <MenuItem key={index} value={index}>
//                     {header}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           )}
// </Grid>       
//         <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//               <PieChart
//                 series={[
//                   {
//                     data: [
//                       { id: 0, value: totalColumns },
//                       { id: 1, value: totalRows },
//                     ],
//                   },
//                 ]}
//                 width={200}
//                 height={100}
//               />
//             </div>
//           </Grid>
//         </Grid>
//         {/* Display First 5 Rows in Table Format */}
//         {excelData.length > 0 && (
//           <Grid item xs={12} style={{ margin: '40px', backgroundColor: '#ffffff', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {excelData[0].map((header, index) => (
//                     <TableCell key={index}>{header}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {excelData.slice(1).map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <TableCell key={cellIndex}>{cell}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Grid>
//         )}
//       </form>

//       {/* Confirmation Dialog */}
//       <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
//         <DialogTitle>Table Already Exists</DialogTitle>
//         <DialogContent>
//           <Typography>Do you want to update the existing table or skip this upload?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleConfirmationChoice('skip')} color="primary">Skip</Button>
//           <Button onClick={() => handleConfirmationChoice('update')} color="secondary">Update</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar Message */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// };

// export default ExcelUpload;



import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadExcel } from '../../features/excelFileSlice/excelFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Grid, Snackbar, Alert, Table, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogActions,TableRow, TableCell,Select, MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { fetchTableNamesAPI ,checkIfTableInUse,fetchTableColumnsAPI} from '../../utils/api';
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgress from '@mui/material/LinearProgress';
import HomePage from '../HomePage';
import Chip from '@mui/material/Chip';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB limit
const ExcelUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.excelFile);
  const [user_id, setUser_Id] = React.useState(sessionStorage.getItem('user_id'));
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalColumns, setTotalColumns] = React.useState(0);
  const [excelData, setExcelData] = React.useState([]);
  const [sheetNames, setSheetNames] = React.useState([]);
  const [selectedSheet, setSelectedSheet] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [confirmationChoice, setConfirmationChoice] = React.useState(null);
  const company_database = localStorage.getItem('company_name');
  const databaseName = localStorage.getItem('company_name');
  const [uploadProgress, setUploadProgress] = React.useState(0); // To store upload progress

  // React.useEffect(() => {
  //   if (uploadError) {
  //     setSnackbarMessage(uploadError);
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //   } else if (uploadSuccess) {
  //     setSnackbarMessage('File uploaded successfully...');
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
  //   }
  // }, [uploadError, uploadSuccess]);
  
    useEffect(() => {
        // Prevent navigating back
        const disableBackButton = () => {
          window.history.pushState(null, "", window.location.href);
        };
      
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", disableBackButton);
      
        return () => {
          window.removeEventListener("popstate", disableBackButton);
        };
      }, []);
  React.useEffect(() => {
    if (uploadError && uploadError.status === false) {
      console.log(uploadError.status);
      setSnackbarMessage(uploadError.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (uploadSuccess) {
      setSnackbarMessage("File uploaded successfully...");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [uploadError, uploadSuccess]);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      return;
    }
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        dispatch(setFile(selectedFile));
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
          setSheetNames(workbook.SheetNames);
          
        };
        reader.readAsArrayBuffer(selectedFile); // Use readAsArrayBuffer
      } else {
        dispatch(setFile(null));
        setSnackbarMessage('Please upload a valid Excel file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      }
    }
  };
  
  const handleSheetSelection = (sheetName) => {
    setSelectedSheet(sheetName);
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const sheet = workbook.Sheets[sheetName];
      const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      setTotalColumns(headers.length);
      setExcelData([headers, ...data.slice(1, 6)]); // Include headers in the displayed data
      dispatch(setColumnHeadings(headers.map((header) => header.toLowerCase().replace(/\s+/g, '_'))));
      setTotalRows(data.length - 1);
    };
  
    if (file) {
      reader.readAsArrayBuffer(file); // Ensure file is read as ArrayBuffer
    } else {
        dispatch(setFile(null));
      alert('Invalid file type. Please upload an Excel file (.xlsx or .xls).');


    }
  };
  

  const handleConfirmationChoice = (choice) => {
    setConfirmationChoice(choice);
    setConfirmationOpen(false);

    // If the user selects to update, proceed with the upload
    if (choice === 'update' && file && selectedSheet) {
      if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
        dispatch(uploadExcel({
          user_id,
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          selectedSheet
        }));
      } else {
        alert("Please select a primary key column before uploading.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file || !selectedSheet) {
      alert("Please upload a file and select a sheet.");
      return;
    }
  
    // if (!primaryKeyColumn && excelData.length > 1) {
    //   // Automatically create a primary key column if not selected
    //   const newHeaders = ["id", ...excelData[0]]; // Add "id" column at the start
    //   const newData = excelData.slice(1).map((row, index) => [index + 1, ...row]); // Assign unique ID starting from 1
    //   setExcelData([newHeaders, ...newData]);
    //   dispatch(setPrimaryKeyColumn(0));
    // }
    if (primaryKeyColumn === null && excelData.length > 1) {
      // Check if the "id" column already exists in the headers
      if (!excelData[0].includes("id")) {
        // Automatically create a primary key column if not selected and "id" doesn't exist
        const newHeaders = ["id", ...excelData[0]]; // Add "id" column at the start
        const newData = excelData.slice(1).map((row, index) => [index + 1, ...row]); // Assign unique ID starting from 1
        setExcelData([newHeaders, ...newData]);
        dispatch(setPrimaryKeyColumn(0)); // Set the new "id" column as the primary key
      } else {
        console.log("The 'id' column already exists. Skipping creation.");
      }
    } else {
      console.log("A primary key column is already selected. Skipping creation.");
    }
    
  
    if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
      const currentTableName = selectedSheet.toLowerCase().replace(/\s+/g, "_");
  
      // Fetch existing table names
      const existingTableNames = await fetchTableNamesAPI(databaseName);
  
      if (existingTableNames.includes(currentTableName)) {
        // Fetch columns from the existing table
        // const response = await fetch(
        //   `http://localhost:5000/api/table-columns/${currentTableName}?companyName=${company_database}` // Replace with your backend endpoint
        // );
        
        const existingColumns = await fetchTableColumnsAPI(
          currentTableName,
          company_database
         );
        // const existingColumns = await response.json(); // Assumes the API returns an array of column names
        console.log("existingColumns", existingColumns);
        const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());
        const isTableInUse = await checkIfTableInUse(currentTableName);
         console.log(isTableInUse)
      //   if (isTableInUse == true) {
      //     const userChoice = window.confirm(
      //       `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
      //     );
      //     if (!userChoice) {
      //       alert("Upload skipped.");
      //       return;
      //     }
      //    } 
      //   // Check for mismatched and missing columns
      //   const mismatchedColumns = uploadedColumns.filter(
      //     (col) => !existingColumns.includes(col)
      //   );
      //   const missingColumns = existingColumns.filter(
      //     (col) => !uploadedColumns.includes(col)
      //   );
  
      //   if (mismatchedColumns.length > 0) {
      //     alert(
      //       `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(
      //         ", "
      //       )}.`
      //     );
      //   }
  
      //   if (missingColumns.length > 0) {
      //     alert(
      //       `Missing data !please rename the sheet and upload again 
      //       )}.`
      //     );
      //     return; // Stop the upload if there are missing columns
      //   }
  
      //   // Check if the table is being used for chart creation
      
      // }
  
      if (isTableInUse) {
        const userChoice = window.confirm(
          `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
        );
      
        if (!userChoice) {
          alert("Upload skipped.");
          return;
        }
      
        // Check for column mismatches and missing columns
        const mismatchedColumns = uploadedColumns.filter(
          (col) => !existingColumns.includes(col)
        );
        const missingColumns = existingColumns.filter(
          (col) => !uploadedColumns.includes(col)
        );
      
        if (mismatchedColumns.length > 0) {
          alert(
            `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(
              ", "
            )}.`
          );
          return; // Stop the upload if there's a mismatch
        }
      
        if (missingColumns.length > 0) {
          alert(
            `Missing columns detected! The following columns are required but not found in the uploaded file: ${missingColumns.join(
              ", "
            )}. Please rename the sheet and upload again.`
          );
          return; // Stop the upload if there are missing columns
        }
      
        alert(`Table "${currentTableName}" is in use, but the uploaded file matches the required structure. Proceeding with upload.`);
      }
    }
      // Proceed with the upload
      dispatch(
        uploadExcel({
          user_id,
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          selectedSheet,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage); 
          },
        })
      );
    } else {
      alert("Please select a primary key column before uploading.");
    }
  };
  
  
  
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <form onSubmit={handleSubmit} className="excel-upload-form">

//          <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px'}}>
//          <HomePage/>
//            <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
//              <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
//   <Button component="label" variant="contained" sx={{
//       padding: '10px 18px', // Increase padding
     
//     }} startIcon={<CloudUploadIcon />}>
//     Choose File
//     <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//   </Button>

//   <TextField
//     label="File Name"
//     value={fileName}
//     InputProps={{ readOnly: true }}
//     variant="filled"
//     size="small"
//     style={{ flexGrow: 2 , minWidth: '200px'}} // Ensures consistent width
//   />

//   <LoadingButton
//     disabled={!file || !selectedSheet || uploading}
//     color="secondary"
//     loading={uploading}
//     startIcon={<SaveIcon />}
//     type="submit"
//     variant="contained"
//     sx={{
//       padding: '11px 18px', // Increase padding
//       minWidth: '120px', // Minimum button width
//     }}
//   >
//     {uploading ? ' {uploadProgress}%': 'Upload'}
//     {uploading && (
//     <div>
//       <Typography variant="body2" color="textSecondary"> {uploadProgress}%
//       </Typography>
//       <LinearProgress variant="determinate" value={uploadProgress} />
//     </div>
//   )}
//   </LoadingButton>
  
// </Grid>


// {/* Reserve space for sheet dropdown */}
// <Grid
//   item
//   xs={2}
//   style={{
//     minHeight: '30px', // Fixed height to reserve space
//   }}
// >
//   {sheetNames.length > 0 && (
//     <>
//       <Typography>Select a sheet:</Typography>
//       <Select
//         value={selectedSheet}
//         onChange={(e) => handleSheetSelection(e.target.value)}
//         displayEmpty
//         fullWidth
//         variant="outlined"
//       >
//         <MenuItem value="" disabled>
//           -- Select a sheet --
//         </MenuItem>
//         {sheetNames.map((sheetName, index) => (
//           <MenuItem key={index} value={sheetName}>
//             {sheetName}
//           </MenuItem>
//         ))}
//       </Select>
//     </>
//   )}
// </Grid>


//           {excelData.length > 0 && (
//             <Grid item xs={4}>
//               <Typography>Select a Primary Key Column:</Typography>
//               <Select
//                 value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
//                 onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
//                 displayEmpty
//                 style={{ width: '' }}
//                 variant="outlined"
//               >
//                 <MenuItem value="" disabled>
//                   -- Select a Column --
//                 </MenuItem>
//                 {excelData[0].map((header, index) => (
//                   <MenuItem key={index} value={index}>
//                     {header}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           )}
// </Grid>       
//         <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//               <PieChart
//                 series={[
//                   {
//                     data: [
//                       { id: 0, value: totalColumns },
//                       { id: 1, value: totalRows },
//                     ],
//                   },
//                 ]}
//                 width={200}
//                 height={100}
//               />
//             </div>
//           </Grid>
//         </Grid>
//         {/* Display First 5 Rows in Table Format */}
//         {excelData.length > 0 && (
//           <Grid item xs={12} style={{ margin: '40px', backgroundColor: '#ffffff', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {excelData[0].map((header, index) => (
//                     <TableCell key={index}>{header}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {excelData.slice(1).map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <TableCell key={cellIndex}>{cell}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Grid>
//         )}
//       </form>

//       {/* Confirmation Dialog */}
//       <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
//         <DialogTitle>Table Already Exists</DialogTitle>
//         <DialogContent>
//           <Typography>Do you want to update the existing table or skip this upload?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleConfirmationChoice('skip')} color="primary">Skip</Button>
//           <Button onClick={() => handleConfirmationChoice('update')} color="secondary">Update</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar Message */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// };

// export default ExcelUpload;


return (
  <React.Fragment>
    <CssBaseline />
    <form onSubmit={handleSubmit} className="excel-upload-form">
       <Grid container item xs={12} md={12} style={{height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px'}}>
        <HomePage/>
         <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
           <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '180px' }}>
<Button component="label" variant="contained" sx={{
    padding: '10px 18px', // Increase padding
   
  }} startIcon={<CloudUploadIcon />}>
  Choose File
  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
</Button>

<TextField
  label="File Name"
  value={fileName}
  InputProps={{ readOnly: true }}
  variant="filled"
  size="small"
  style={{ flexGrow: 2 , minWidth: '200px'}} // Ensures consistent width
/>

<LoadingButton
  disabled={!file || !selectedSheet || uploading}
  color="secondary"
  loading={uploading}
  startIcon={<SaveIcon />}
  type="submit"
  variant="contained"
  sx={{
    padding: '11px 18px', // Increase padding
    minWidth: '120px', // Minimum button width
  }}
>
  {uploading ? 'Uploading...' : 'Upload'}
</LoadingButton>
</Grid>

{/* Reserve space for sheet dropdown */}
<Grid  item  xs={2}  style={{    minHeight: '30px' }}>
{sheetNames.length > 0 && (
<>
  {/* <Typography>Select a sheet:</Typography> */}
  <Select
    value={selectedSheet}
    onChange={(e) => handleSheetSelection(e.target.value)}
    displayEmpty
    fullWidth
    variant="outlined"
    sx={{ height: 50 }} // Adjust height here (for MUI v5)
    renderValue={(selected) => {
      if (!selected) {
        return <span>-- Select a sheet --</span>;
      }
      return (
        <Chip
          label={selected}
          color="primary"
          sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
      );
    }}
  >
    <MenuItem value="" disabled>
      -- Select a sheet --
    </MenuItem>
    {sheetNames.map((sheetName, index) => (
      <MenuItem key={index} value={sheetName}>
        {sheetName}
      </MenuItem>
    ))}
  </Select>
</>
)}



</Grid>
{excelData.length > 0 && (
<Grid item xs={4}>
  {/* <Typography>Select a Primary Key Column:</Typography> */}
  <Select
    value={primaryKeyColumn !== null && primaryKeyColumn !== undefined ? primaryKeyColumn : ''}
    onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
    displayEmpty
    fullWidth
    variant="outlined"
    sx={{ height: 50 }} // Adjust height here (for MUI v5)
    renderValue={(selected) => {
      if (selected === '' || selected === null || selected === undefined) {
        return <span>-- Select a Column --</span>;
      }
      return (
        <Chip
          label={excelData[0][selected]}
          color="primary"
          sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
      );
    }}
  >
    <MenuItem value="" disabled>
      -- Select a Column --
    </MenuItem>
    {excelData[0].map((header, index) => (
      <MenuItem key={index} value={index}>
        {header}
      </MenuItem>
    ))}
  </Select>
</Grid>
)}

</Grid>       
      <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: totalColumns },
                    { id: 1, value: totalRows },
                  ],
                },
              ]}
              width={200}
              height={100}
            />
          </div>
        </Grid>
      </Grid>
{excelData.length > 0 && (
  <Grid
    item
    xs={12}
    style={{
      margin: '40px',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto',
    }}
  >
    <Table style={{ border: '1px solid #ddd', width: '100%', borderRadius: '10px' }}>
      <TableHead>
        <TableRow style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
          {excelData[0].map((header, index) => (
            <TableCell
              key={index}
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                borderRight: '1px solid #ddd',
              }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {excelData.slice(1).map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            style={{
              borderBottom: '1px solid #ddd',
              '&:last-child': {
                borderBottom: 0,
              },
            }}
          >
            {row.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  borderRight: '1px solid #ddd',
                }}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Grid>
)}
    </form>

    {/* Confirmation Dialog */}
    <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
      <DialogTitle>Table Already Exists</DialogTitle>
      <DialogContent>
        <Typography>Do you want to update the existing table or skip this upload?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirmationChoice('skip')} color="primary">Skip</Button>
        <Button onClick={() => handleConfirmationChoice('update')} color="secondary">Update</Button>
      </DialogActions>
    </Dialog>

    {/* Snackbar Message */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1000}
      onClose={handleSnackbarClose}
    >
      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </React.Fragment>
);
};

export default ExcelUpload;
