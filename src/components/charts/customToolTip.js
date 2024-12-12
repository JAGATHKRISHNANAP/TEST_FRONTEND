import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice'; // Adjust the import path as necessary
import Columns from '../dashbord-Elements/columns';
import "./tooltip.css";

const CustomToolTip = ({ onClose }) => {
    const dispatch = useDispatch();
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [formState, setFormState] = useState(toolTipOptions);
    const [customHeading, setCustomHeading] = useState(toolTipOptions.customHeading || '');

    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        if (name === 'customHeading') {
            setCustomHeading(value);
        } else {
            setFormState({
                ...formState,
                [name]: checked
            });
        }
    };

    const handleSubmit = () => {
        dispatch(setToolTipOptions({ ...formState, customHeading }));
        onClose();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");
        setCustomHeading((prev) => prev + (prev ? ' ' : '') + columnName);
    };

    return (
        <div>
            <div style={{
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                zIndex: 1000
            }} onClick={onClose} />
            <div style={{
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'white', 
                padding: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                zIndex: 2000,
                width: '700px', // Adjust width if needed
                borderRadius: '8px', // Rounded corners
                // position: 'relative',
                maxHeight: '80vh', // Added to restrict the height
                overflowY: 'auto' // Added to make it scrollable
            }}>
                <button 
                    onClick={onClose} 
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>
                <div>
                    <div><h2>Custom box</h2></div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>                     
                            <div className="column">
                                <Columns />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div>
                                <p>Select the fields for tooltip</p>
                                <FormControlLabel 
                                    label="Heading" 
                                    control={
                                        <Checkbox 
                                            name="heading" 
                                            checked={formState.heading} 
                                            onChange={handleChange} 
                                        />
                                    } 
                                />
                                <FormControlLabel 
                                    label="Category Name" 
                                    control={
                                        <Checkbox 
                                            name="categoryName" 
                                            checked={formState.categoryName} 
                                            onChange={handleChange} 
                                        />
                                    } 
                                />
                                <FormControlLabel 
                                    label="Value" 
                                    control={
                                        <Checkbox 
                                            name="value" 
                                            checked={formState.value} 
                                            onChange={handleChange} 
                                        />
                                    } 
                                />
                            </div>
                            <TextField 
                                label="Custom Heading" 
                                name="customHeading" 
                                value={customHeading} 
                                onChange={handleChange} 
                                fullWidth 
                                margin="normal" 
                                onDragOver={handleDragOver} 
                                onDrop={handleDrop} // Handle drop event
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ marginTop: '20px' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomToolTip;
