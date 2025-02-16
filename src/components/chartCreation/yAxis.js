import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { setYAxis, setXAxis } from '../../features/Dashboard-Slice/chartSlice';

function YAxisInput({ yAxis, MAX_ROW, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
    const dispatch = useDispatch();
    const { xAxis } = useSelector(state => state.chart);

    const removeColumnFromYAxis = (columnNameToRemove) => {
        const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
        dispatch(setYAxis(updatedYAxis));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (event, columnName) => {
        event.dataTransfer.setData("columnName", columnName);
        event.dataTransfer.setData("origin", "y-axis");
    };

    const handleDrop = (event, target) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");
        const origin = event.dataTransfer.getData("origin");

        if (target === "y-axis") {
            if (yAxis.length >= MAX_ROW) {
                setErrorMessage("Error: Cannot drop more than 2 Row on the Y-axis.");
                setOpenSnackbar(true);
                return;
            }
            if (origin === "x-axis") {
                dispatch(setXAxis(xAxis.filter((col) => col !== columnName)));
                dispatch(setYAxis([...yAxis, columnName]));
            } else if (!yAxis.includes(columnName)) {
                dispatch(setXAxis(xAxis.filter((col) => col !== columnName)));
                dispatch(setYAxis([...yAxis, columnName]));
            }
        }
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
      <label htmlFor="y-axis-input" style={{ margin: '15px 30px 0px 0px' }}>Rows:  </label>
      <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
      <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
            {yAxis.map((column, index) => (
              <div key={index} className="y-axis-column" draggable
              onDragStart={(event) => handleDragStart(event, column)}
              style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px" }}>
                <span>{column}</span>
                <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
              </div>
            ))}
            
      </div>
      
       
            </div>
        </div>
    );
}

export default YAxisInput;