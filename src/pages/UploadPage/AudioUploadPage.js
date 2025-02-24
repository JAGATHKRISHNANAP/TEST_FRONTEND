
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, uploadAudio, resetUploadState } from '../../features/audioFile/audioFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Container, IconButton, Grid } from '@mui/material';
import HomePage from '../HomePage';
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

const AudioUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, transcription } = useSelector((state) => state.audioFile);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/')) {
        dispatch(setFile(selectedFile));
        dispatch(resetUploadState()); // Reset the upload state when a new file is selected
        setIsPlaying(false);
      } else {
        dispatch(setFile(null));
        alert('Please select an audio file.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadAudio(file));
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        border: '1px solid #4287f5',
        borderRadius: '10px',
        backgroundColor: '#ffffff'
      }}>
        <div className="audio-upload-container">
          <h2 className="audio-upload-heading">Upload Audio File Here</h2> */}


          <form onSubmit={handleSubmit} className="audio-upload-form">
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}> */}
            <Grid container item xs={12} md={12} style={{ backgroundColor: '#dcdfe8', height: '10vh', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',marginTop:'80px' }}>
         <HomePage/>
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
              {file && (
                <IconButton onClick={handlePlayPause} color="primary">
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              )}
            {/* </Box> */}
            </Grid>
            </Grid>
            <Grid item xs={12} md={2} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {file && (
              <audio ref={audioRef} src={URL.createObjectURL(file)} onEnded={() => setIsPlaying(false)} controls />
            )}
            </Grid>
            </Grid>
            {uploadError && <p className="audio-upload-error">{uploadError}</p>}
           
            {uploadSuccess && (
              <Grid item xs={12} style={{ margin: '40px' ,backgroundColor: '#ffffff', height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' 
              }}>
              <div>
                <p className="audio-upload-success">File uploaded successfully...</p>
                <p className="audio-transcription">{transcription}</p>
              </div>
             </Grid>
            )}
          </form>
        {/* </div> */}
      {/* </Container> */}
    </React.Fragment>
  );
};

export default AudioUpload;


