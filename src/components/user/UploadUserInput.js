import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography, Box } from '@mui/material';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { userSignUp} from '../../utils/api';

export default function UploadUserInput({ onUploadSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [registerType,setRegisterType]=useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setRegisterType("File_Upload");
  
    const fileReader = new FileReader();
  
    if (file.name.endsWith('.csv')) {
      // CSV Parsing
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data;
          const userDetails  = [];
  
          if (data.length > 0) {
            data.forEach((row) => {
              userDetails .push({ ...row }); // Each row is already an object
            });
            console.log("CSV Parsed Data as Array of Key-Value Pairs:", userDetails );
          }
  
          setParsedData(userDetails ); // Store the array in state if needed
        },
        error: (err) => {
          setError('Error parsing CSV file');
          console.error(err);
          setSnackbarType('error');
          setSnackbarOpen(true);
        }
        
      });
    } else if (file.name.endsWith('.xlsx')) {
      // Excel Parsing
      fileReader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
        const userDetails  = [];
  
        if (sheetData.length > 0) {
          const headers = sheetData[0]; 
          const rows = sheetData.slice(1); 
  
          rows.forEach((row) => {
            const rowObject = {};
            headers.forEach((header, colIndex) => {
              rowObject[header] = row[colIndex]; 
            });
            userDetails .push(rowObject); 
          });
  
          console.log("Excel Parsed Data as Array of Key-Value Pairs:", userDetails );
        }
  
        setParsedData(userDetails ); 
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      setError('Unsupported file format');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (parsedData && registerType) {
      try {
        const response = await userSignUp(registerType, parsedData);
        
        if (response.data && response.data.message) {
          setSuccessMessage('Data uploaded successfully!');
          setError(''); 
          setSnackbarType('success');
          setSnackbarOpen(true);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error uploading data';
        setError(errorMessage);
        setSuccessMessage(''); 
        setSnackbarType('error');
        setSnackbarOpen(true);
      }
    } else {
      setError('No data available to upload');
      setSuccessMessage(''); 
      setSnackbarType('error');
      setSnackbarOpen(true); 
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">Upload your file</Typography>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2 }}
        >
          Choose File
        </Button>
      </label>
      {selectedFile && <Typography>File: {selectedFile.name}</Typography>}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}
    </Box>
  );
}