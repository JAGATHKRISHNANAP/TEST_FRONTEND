

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadJson } from '../../features/jsonFileSlice/jsonFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Grid, Snackbar, Alert, Select, MenuItem, FormGroup, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchTableNamesAPI } from '../../utils/api';

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


   const flattenObject = (obj, prefix = '') => {
    let result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Recursively flatten the nested object
          Object.assign(result, flattenObject(obj[key], newKey));
        } else {
          result[newKey] = obj[key];
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
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
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
            // If JSON is already an array, use it directly
            json = json;
          } else if (typeof json === 'object') {
            // If JSON is an object, convert it into an array with the object as its single element
            json = [json];
          } else {
            throw new Error('Invalid JSON format. Expected an array or an object.');
          }
  
          // Flatten each row of JSON data
          const flattenedData = json.map(row => flattenObject(row)); // Flatten each row if needed
  
          // If no primary key exists, create one
          if (!flattenedData[0].hasOwnProperty('id')) {
            flattenedData.forEach((row, index) => {
              row.id = index + 1; // Add a unique ID to each row
            });
          }
  
          setJsonData(flattenedData.slice(0, flattenedData.length )); // Exclude the last row
          setTotalRows(flattenedData.length);
          setTotalColumns(Object.keys(flattenedData[0] || {}).length);
          dispatch(setColumnHeadings(Object.keys(flattenedData[0] || {})));
        } catch (error) {
          alert('Error parsing JSON file. Please upload a valid JSON file.');
        }
      };
      reader.readAsText(selectedFile);
    } else {
      dispatch(setFile(null));
      alert('Please upload a valid JSON file.');
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
          const userConfirmed = window.confirm(`The table "${tableName}" already exists. Do you want to update it?`);
          if (userConfirmed) {
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
        <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px'}}>
          <Grid item xs={12} md={9} style={{ backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
            <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
 
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Choose File
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>

              <TextField label="File Name" value={fileName} InputProps={{ readOnly: true }} variant="filled" size="small" />

              <LoadingButton disabled={!file || uploading} color="secondary" onClick={handleSubmit} loading={uploading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                {uploading ? 'Uploading...' : 'Upload'}
              </LoadingButton>
            </Grid>

            <FormGroup>
              {jsonData.length > 0 && (
                <Grid item>
                  <Typography>Select a Primary Key Column:</Typography>
                  <Select
                    value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
                    onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
                    displayEmpty
                    fullWidth
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
                </Grid>
              )}
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <PieChart series={[{ data: [{ id: 0, value: totalColumns }, { id: 1, value: totalRows }] }]} width={200} height={200} />
            </div>
          </Grid>
        </Grid>
        
      {jsonData.length > 0 && (
                  <Grid item xs={12} style={{ margin: '40px' ,backgroundColor: '#ffffff', justifyContent: 'center',display:'flex', alignItems: 'center', borderRadius: '10px' 
                  }}>
<Table>
  <TableHead>
    <TableRow>
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
