import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, uploadCsv } from '../../features/csvFile/csvFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button, TextField,Grid, Box, Container } from '@mui/material';

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
  const { file, uploading, uploadSuccess, uploadError, fileName } = useSelector((state) => state.csvFile);

  // const company_database=localStorage.getItem('company_database');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv') {
        dispatch(setFile(selectedFile));
      } else {
        dispatch(setFile(null));
        alert('Please select a CSV file.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadCsv(file));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

          <form onSubmit={handleSubmit} className="excel-upload-form">
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}> */}
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
                value={fileName}
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
              
            {uploadError && <p className="excel-upload-error">{uploadError}</p>}
            {uploadSuccess && <p className="excel-upload-success">File uploaded successfully...</p>}
          
          </Grid>
        {/* </div> */}
      {/* </Container> */}
      </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
};

export default CsvUpload;