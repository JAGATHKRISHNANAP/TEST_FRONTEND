

import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadJson } from '../../features/jsonFileSlice/jsonFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Grid, Snackbar, Alert, Select, MenuItem, FormGroup, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchTableNamesAPI ,fetchTableColumnsAPI,checkIfTableInUse} from '../../utils/api';
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

const JsonUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.jsonFile);
  const [jsonData, setJsonData] = React.useState([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalColumns, setTotalColumns] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const company_database = localStorage.getItem('company_name');

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
    if (uploadError) {
      setSnackbarMessage(uploadError);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (uploadSuccess) {
      setSnackbarMessage('File uploaded successfully...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [uploadError, uploadSuccess]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  //  const flattenObject = (obj, prefix = '') => {
  //   let result = {};
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const newKey = prefix ? `${prefix}.${key}` : key;
  //       if (typeof obj[key] === 'object' && obj[key] !== null) {
  //         // Recursively flatten the nested object
  //         Object.assign(result, flattenObject(obj[key], newKey));
  //       } else {
  //         result[newKey] = obj[key];
  //       }
  //     }
  //   }
  //   return result;
  // };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (!selectedFile) return;
  
  //   // Validate file size
  //   if (selectedFile.size > MAX_FILE_SIZE) {
  //     alert(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
  //     return;
  //   }
  
  //   if (selectedFile.type === 'application/json') {
  //     dispatch(setFile(selectedFile));
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       try {
  //         let json = JSON.parse(event.target.result);
  
  //         // Check if the JSON is a list, if not, convert it to an array
  //         if (Array.isArray(json)) {
  //           // If JSON is already an array, use it directly
  //           json = json;
  //         } else if (typeof json === 'object') {
  //           // If JSON is an object, convert it into an array with the object as its single element
  //           json = [json];
  //         } else {
  //           throw new Error('Invalid JSON format. Expected an array or an object.');
  //         }
  
  //         // Flatten each row of JSON data
  //         const flattenedData = json.map(row => flattenObject(row)); // Flatten each row if needed
  
  //         // If no primary key exists, create one
  //         if (!flattenedData[0].hasOwnProperty('id')) {
  //           flattenedData.forEach((row, index) => {
  //             row.id = index + 1; // Add a unique ID to each row
  //           });
  //         }
  
  //         setJsonData(flattenedData.slice(0, flattenedData.length )); // Exclude the last row
  //         setTotalRows(flattenedData.length);
  //         setTotalColumns(Object.keys(flattenedData[0] || {}).length);
  //         dispatch(setColumnHeadings(Object.keys(flattenedData[0] || {})));
  //       } catch (error) {
  //         alert('Error parsing JSON file. Please upload a valid JSON file.');
  //       }
  //     };
  //     reader.readAsText(selectedFile);
  //   } else {
  //     dispatch(setFile(null));
  //     alert('Please upload a valid JSON file.');
  //   }
  // };
  
  
  const flattenObject = (obj) => {
    let result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Recursively flatten the nested object without creating a new key
          Object.assign(result, flattenObject(obj[key]));
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };
  
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setSnackbarMessage(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (selectedFile.type === 'application/json') {
      dispatch(setFile(selectedFile));
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          let json = JSON.parse(event.target.result);

          // Check if the JSON is a list, if not, convert it to an array
          if (Array.isArray(json)) {
            json = json;
          } else if (typeof json === 'object') {
            json = [json];
          } else {
            throw new Error('Invalid JSON format. Expected an array or an object.');
          }

          // Flatten each row of JSON data
          const flattenedData = json.map(row => flattenObject(row));

          // If no primary key exists, create one
          if (!flattenedData[0].hasOwnProperty('id')) {
            flattenedData.forEach((row, index) => {
              row.id = index + 1; // Add a unique ID to each row
            });
          }

          setJsonData(flattenedData.slice(0, 5)); // Preview first 5 rows
          console.log(flattenedData);

          setTotalRows(flattenedData.length);
          setTotalColumns(Object.keys(flattenedData[0] || {}).length);
          dispatch(setColumnHeadings(Object.keys(flattenedData[0] || {})));
        } catch (error) {
          setSnackbarMessage('Error parsing JSON file. Please upload a valid JSON file.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      dispatch(setFile(null));
      setSnackbarMessage('Please upload a valid JSON file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      // Ensure the data has a primary key column
      if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
        const existingTableNames = await fetchTableNamesAPI(company_database);
        const tableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');
        
        if (existingTableNames.includes(tableName)) {
// Check if table exists
if (existingTableNames.includes(tableName)) {
  const isTableInUse = await checkIfTableInUse(tableName);

  if (isTableInUse) {
    const userChoice = window.confirm(
      `The table "${tableName}" is being used for chart creation. Do you want to update it?`
    );
    if (!userChoice) {
      alert("Table update canceled.");
      return;
    }
  } else {
    const userChoice = window.confirm(`The table "${tableName}" already exists. Do you want to update it?`);
    if (!userChoice) {
      alert("Table creation skipped.");
      return;
    }
  }

  // Fetch existing columns and compare with uploaded columns
  const existingColumns = await fetchTableColumnsAPI(tableName, company_database);
  const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());

  // Check for column mismatches or missing columns
  const mismatchedColumns = uploadedColumns.filter((col) => !existingColumns.includes(col));
  const missingColumns = existingColumns.filter((col) => !uploadedColumns.includes(col));

  if (mismatchedColumns.length > 0) {
    alert(
      `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${tableName}": ${mismatchedColumns.join(", ")}.`
    );
    return;
  }

  if (missingColumns.length > 0) {
    alert(
      `Missing columns! The following columns are required but not found in the uploaded file: ${missingColumns.join(", ")}. Please update the file and upload again.`
    );
    return;
  }


            dispatch(uploadJson({ file, primaryKeyColumnName: columnHeadings[primaryKeyColumn], company_database }));
          } else {
            alert('Table update canceled.');
          }
        } else {
          dispatch(uploadJson({ file, primaryKeyColumnName: columnHeadings[primaryKeyColumn], company_database }));
        }
      } else {
        // If primary key column is not selected, create a default 'id' column with values
        const updatedFile = addDefaultPrimaryKey(file);
        dispatch(uploadJson({ file: updatedFile, primaryKeyColumnName: 'id', company_database }));
      }
    } else {
      alert('Please upload a file.');
    }
  };

  // Helper function to add an 'id' column to the data
  const addDefaultPrimaryKey = (file) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const data = JSON.parse(event.target.result);

      // Add an 'id' column with unique values
      data.forEach((item, index) => {
        item.id = index + 1; // Assign a unique id starting from 1
      });

      // Return updated file data with 'id' column
      const updatedFile = new Blob([JSON.stringify(data)], { type: 'application/json' });

      // After adding the id column, re-dispatch the action with updated data
      dispatch(uploadJson({ file: updatedFile, primaryKeyColumnName: 'id', company_database }));
    };

    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <form onSubmit={handleSubmit} className="json-upload-form">
      <Grid container item xs={12} md={12} style={{height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px'}}>
        <HomePage/>
         <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
           <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '11px' }}>
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
              {/* <LoadingButton disabled={!file || uploading} color="secondary" onClick={handleSubmit} loading={uploading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                {uploading ? 'Uploading...' : 'Upload'}
              </LoadingButton>
            </Grid> */}
            <LoadingButton
              disabled={!file || uploading}
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

            {/* <FormGroup> */}
              
              {jsonData.length > 0 && (
              //   <Grid item>
              //     <Typography>Select a Primary Key Column:</Typography>
              //     <Select
              //       value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
              //       onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
              //       displayEmpty
              //       fullWidth
              //     >
              //       <MenuItem value="" disabled>
              //         -- Select a Column --
              //       </MenuItem>
              //       {columnHeadings.map((header, index) => (
              //         <MenuItem key={index} value={index}>
              //           {header}
              //         </MenuItem>
              //       ))}
              //     </Select>
              //   </Grid>
              // )}
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
        label={columnHeadings[selected]}
          color="primary"
          sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
      );
    }}
  >
    <MenuItem value="" disabled>
      -- Select a Column --
    </MenuItem>
    {columnHeadings?.map((header, index) => (
      <MenuItem key={index} value={index}>
        {header}
      </MenuItem>
    ))}
  </Select>
</Grid>
)}
            {/* </FormGroup> */}
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
          
          {/* <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <PieChart series={[{ data: [{ id: 0, value: totalColumns }, { id: 1, value: totalRows }] }]} width={200} height={200} />
            </div>
          </Grid> */}
        </Grid>
        
      {jsonData.length > 0 && (
      <Grid item xs={12} style={{ margin: '40px', backgroundColor: '#ffffff',  justifyContent: 'center', display: 'flex', alignItems: 'center', borderRadius: '10px',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',overflowX: 'auto' }}
          > <Table style={{ border: '1px solid #ddd', width: '100%', borderRadius: '10px' }}>
                      <TableHead>
                         <TableRow style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              {Object.keys(jsonData[0]).map((key, idx) => (
                <TableCell
                  key={idx}
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: '#f4f4f4',
                  }}
                >
                  {key.replace(/_/g, ' ').toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex} style={{ textAlign: 'center' }}>
                    {value}
                  </TableCell>
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

export default JsonUpload;
