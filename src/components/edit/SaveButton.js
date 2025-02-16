import React from 'react';
import { Button } from '@mui/material'; // Import Button

const SaveButton = ({ saveDataToDatabase }) => (
  <div className='btn-container' style={{marginTop: '10px'}}> {/* Added margin top and container*/}
    <Button variant="contained" className="save-button" onClick={saveDataToDatabase}>
      Save Chart
    </Button>
  </div>
);

export default SaveButton;