import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadCsv } from '../../features/csvFile/csvFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { fetchTableNamesAPI,checkIfTableInUse } from '../../utils/api';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Grid, Snackbar, Alert, Table, TableHead, TableBody, TableRow, TableCell,Select, MenuItem, FormControl  } from '@mui/material';
import * as Papa from 'papaparse';
import { PieChart } from '@mui/x-charts/PieChart';

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

const CsvUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.csvFile);
  const [totalRows, setTotalRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const company_database = localStorage.getItem('company_name');
  const databaseName = localStorage.getItem('company_name');
  const [user_id, setUser_Id] = React.useState(localStorage.getItem('user_id'));
  // const [primaryKeyNeeded, setPrimaryKeyNeeded] = useState(false);


  useEffect(() => {
    if (uploadError) {
      const message = typeof uploadError === "object" ? uploadError.message || JSON.stringify(uploadError) : uploadError;
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (uploadSuccess) {
      const message = typeof uploadSuccess === "object" ? uploadSuccess.message || JSON.stringify(uploadSuccess) : "File uploaded successfully...";
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [uploadError, uploadSuccess]);
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv') {
        dispatch(setFile(selectedFile));
        Papa.parse(selectedFile, {
          header: true,
          complete: (results) => {
            let data = results.data;
            const headers = Object.keys(data[0]);
  
            // Check if a primary key exists
            let primaryKeyColumnIndex = null;
            for (let i = 0; i < headers.length; i++) {
              const uniqueValues = new Set(data.map((row) => row[headers[i]]));
              if (uniqueValues.size === data.length) {
                primaryKeyColumnIndex = i;
                break;
              }
            }
  
            if (primaryKeyColumnIndex === null) {
              // Add 'id' column as primary key
              const newColumnName = 'id';
              data = data.map((row, index) => ({ [newColumnName]: index + 1, ...row }));
              headers.unshift(newColumnName);  // Add 'id' as the first column
            }
  
            setCsvData(data.slice(0, 5)); // Display only the first 5 rows
            setTotalColumns(headers.length);
            setTotalRows(data.length);
            dispatch(setColumnHeadings(headers));
            dispatch(setPrimaryKeyColumn(primaryKeyColumnIndex === null ? 0 : primaryKeyColumnIndex));
          },
        });
      } else {
        dispatch(setFile(null));
        setSnackbarMessage('Please upload a valid Excel file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      }
    }
  };
  
  const handlePrimaryKeyChange = (event) => {
    dispatch(setPrimaryKeyColumn(event.target.value));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    alert('Please upload a file.');
    return;
  }

  // Ensure the primary key column exists
  if (primaryKeyColumn === null || !columnHeadings[primaryKeyColumn]) {
    alert('Please select a primary key column or ensure it is added automatically.');
    return;
  }
  const currentTableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');
  const existingTableNames = await fetchTableNamesAPI(databaseName);
  if (existingTableNames.includes(currentTableName)) {
    // Fetch columns from the existing table
    const response = await fetch(
      `http://localhost:5000/api/table-columns/${currentTableName}?companyName=${company_database}` // Replace with your backend endpoint
    );
    const existingColumns = await response.json(); // Assumes the API returns an array of column names
    console.log("existingColumns", existingColumns);
    const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());
    const isTableInUse = await checkIfTableInUse(currentTableName);

    if (isTableInUse) {
      const userChoice = window.confirm(
        `The table "${currentTableName}" is being used for chart creation. Do you want to update it?`
      );
      if (!userChoice) {
        alert('Table update canceled.');
        return;
      }
    } else {
      const userChoice = window.confirm(`The table "${currentTableName}" already exists. Do you want to update it?`);
      if (!userChoice) {
        alert('Table creation skipped.');
        return;
      }
    }
    const mismatchedColumns = uploadedColumns.filter(
      (col) => !existingColumns.includes(col)
    );
    const missingColumns = existingColumns.filter(
      (col) => !uploadedColumns.includes(col)
    );

    if (mismatchedColumns.length > 0) {
      alert(
        `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(", ")}.`
      );
      return; // Stop the upload if there's a mismatch
    }

    if (missingColumns.length > 0) {
      alert(
        `Missing columns! The following columns are required but not found in the uploaded file: ${missingColumns.join(", ")}. Please update the file and upload again.`
      );
      return; // Stop the upload if there are missing columns
    }

    // Proceed with the upload after the checks pass
    dispatch(
      uploadCsv({
        user_id,
        file,
        primaryKeyColumnName: columnHeadings[primaryKeyColumn],
        company_database,
      })
    );
  } else {
    // Handle case where table does not exist yet
    alert(`The table "${currentTableName}" does not exist in the database. Creating a new table...`);
    // Proceed with creating the table
    dispatch(
      uploadCsv({
        user_id,
        file,
        primaryKeyColumnName: columnHeadings[primaryKeyColumn],
        company_database,
      })
    );
  }
};


  

  return (
    <React.Fragment>
      <CssBaseline />
      <form onSubmit={handleSubmit} className="csv-upload-form">
        {/* <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
         */}
 <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px' }}>
 <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
            <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Choose File
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>

              <TextField
                label="File Name"
                value={file ? file.name : ''}
                InputProps={{ readOnly: true }}
                variant="filled"
                size="small"
              />

              <LoadingButton
                disabled={!file || uploading}
                color="secondary"
                onClick={handleSubmit}
                loading={uploading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </LoadingButton>
            </Grid>
          {columnHeadings.length > 0 && (
            <Grid item xs={12} md={4} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
              <Typography>Select Primary Key Column:</Typography>
              <FormControl variant="outlined" fullWidth>
                <Select
                  value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
                  onChange={handlePrimaryKeyChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    -- Select a Column --
                  </MenuItem>
                  {columnHeadings.map((header, index) => (
                    <MenuItem key={index} value={index}>
                      {header}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

        {/* Display First 5 Rows in Table Format */}
        {csvData.length > 0 && (
           <Grid item xs={12} style={{ margin: '40px', backgroundColor: '#ffffff', justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
             <Table>
              <TableHead>
                <TableRow>
                  {columnHeadings.map((heading, index) => (
                    <TableCell key={index}>{heading}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columnHeadings.map((heading, colIndex) => (
                      <TableCell key={colIndex}>{row[heading]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </React.Fragment>
  );
};

export default CsvUpload;