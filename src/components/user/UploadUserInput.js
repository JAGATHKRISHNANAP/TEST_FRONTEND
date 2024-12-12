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
          const headers = sheetData[0]; // First row contains headers (column names)
          const rows = sheetData.slice(1); // Data rows
  
          rows.forEach((row) => {
            const rowObject = {};
            headers.forEach((header, colIndex) => {
              rowObject[header] = row[colIndex]; // Create key-value pairs for each row
            });
            userDetails .push(rowObject); // Add the row object to the array
          });
  
          console.log("Excel Parsed Data as Array of Key-Value Pairs:", userDetails );
        }
  
        setParsedData(userDetails ); // Store the array in state if needed
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      setError('Unsupported file format');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (parsedData && registerType) {
      try {
        
        // Send parsed data and registerType to backend using userSignUp API
        const response = await userSignUp(registerType,parsedData );
        console.log('Data successfully sent to backend:', response.data);
        setSuccessMessage('Data uploaded successfully!');
      } catch (error) {
        console.error('Error sending data to backend:', error);
        setError('Error uploading data');
      }
    } else {
      setError('No data available to upload');
    }
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