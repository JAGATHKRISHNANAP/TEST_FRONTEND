// src/components/LoadData.js
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Box, Container } from '@mui/material';
import excel from '../../image/excel.png';
import csv from '../../image/csv.png';
import LoadExcelFile from './LoadExcelFile';
import LoadCsvFile from './LoadCsvFile';
import { useDispatch } from 'react-redux';
import { setDatabaseName } from '../../features/load/databaseSlice';

import { useNavigate } from 'react-router-dom';

const LoadData = () => {
  const [showLoadPage, setShowLoadPage] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();



  const handleButtonClick = (dbName) => {
    dispatch(setDatabaseName(dbName));
    if (dbName === 'excel_database') {
      navigate('/Load_excel_data');
    } else if (dbName === 'csv_database') {
      navigate('/Load_csv_data');
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      {!showLoadPage && (
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '85vh',
          border: '1px solid #4287f5',
          borderRadius: '30px',
          backgroundColor: '#ffffff'
        }}>
          <div className="excel-upload-container">
            <form className="excel-upload-form">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
                <Button variant="contained" component="label" sx={{ gap: '50px', margin: '3px' }}>
                  <img src={excel} style={{ width: '80px', height: '80px' }} onClick={() => handleButtonClick('excel_database')} />
                </Button>
                <Button variant="contained" component="label" sx={{ gap: '50px', margin: '3px' }}>
                  <img src={csv} style={{ width: '80px', height: '80px' }} onClick={() => handleButtonClick('csv_database')} />
                </Button>
              </Box>
            </form>
          </div>
        </Container>
      )}
      {showLoadPage === 'excel' && <LoadExcelFile />}
      {showLoadPage === 'csv' && <LoadCsvFile />}
    </React.Fragment>
  );
};

export default LoadData;
