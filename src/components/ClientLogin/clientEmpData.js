import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, uploadCsv } from '../../features/csvFile/csvFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Container } from '@mui/material';

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

const ClientEmpData = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName } = useSelector((state) => state.csvFile);

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
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        border: '1px solid #4287f5',
        borderRadius: '10px',
        backgroundColor: '#ffffff'
      }}>
        <div className="excel-upload-container">
            {/* <h2>CSV uploag page</h2> */}
          <h2 className="excel-upload-heading">Upload Employee  File Here </h2>
          <form onSubmit={handleSubmit} className="excel-upload-form">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
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
            </Box>
            {uploadError && <p className="excel-upload-error">{uploadError}</p>}
            {uploadSuccess && <p className="excel-upload-success">File uploaded successfully...</p>}
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ClientEmpData;