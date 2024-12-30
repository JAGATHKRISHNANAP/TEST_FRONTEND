// import React from 'react';
// import { useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import Checkbox from "@mui/material/Checkbox";
// import '../Style.css';
// import {setXAxis, setYAxis, setAggregate,setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,generateChart
// } from '../../features/Dashboard-Slice/chartSlice';
// import axios from 'axios';
// import { Mic, StopCircleRounded } from '@mui/icons-material';
// import { uploadAudioFile,fetchFilterOptionsAPI } from '../../utils/api'; // Import the API function


// function DuealChartInput() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const dispatch = useDispatch();
//   const {
//     xAxis, yAxis,aggregate,
//     filterOptions, checkedOptions, showFilterDropdown, selectAllChecked} = useSelector(state => state.chart);

//   const chartType=useSelector(state=>state.chartType.type);
//   const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const barColor = useSelector((state) => state.chartColor.chartColor);
//   // const databaseName = useSelector((state) => state.database.databaseName);
//   const databaseName = localStorage.getItem('company_name');  
//   const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
//   const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
//   console.log('excelCheckedPaths:', excelCheckedPaths);
//   console.log('csvCheckedPaths:', csvCheckedPaths);
//   const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
//   const selectedTable=selectedTablearray.join(',')
//   React.useEffect(() => {
//     if (xAxis && yAxis && aggregate && chartType) {
//       dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//     }
//   }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);

//   const fetchFilterOptions = async (columnName) => {
//     try {
//       const options = await fetchFilterOptionsAPI( databaseName,selectedTable, columnName);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       dispatch(setShowFilterDropdown(true));
//       dispatch(setSelectAllChecked(true));      // Reset "Select All" checkbox
//     } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//     }
//   };

//   const handleSelectAllChange = (event) => {
//     const isChecked = event.target.checked;
//     dispatch(setSelectAllChecked(isChecked));
//     if (isChecked) {
//       dispatch(setCheckedOptions([...filterOptions]));
//     } else {
//       dispatch(setCheckedOptions([]));
//     }
//   };

//   const handleFilterIconClick = (columnName) => {
//     if (showFilterDropdown) {
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       fetchFilterOptions(columnName);
//     }
//   };

//   const handleCheckboxChange = (option) => {
//     let updatedOptions;
//     if (checkedOptions.includes(option)) {
//       updatedOptions = checkedOptions.filter(item => item !== option);
//     } else {
//       updatedOptions = [...checkedOptions, option];
//     }
//     dispatch(setCheckedOptions(updatedOptions));
//     dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
//   };
//   const removeColumnFromYAxis = (columnNameToRemove) => {
//     const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setYAxis(updatedYAxis));
//   };


//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event, target) => {
//     event.preventDefault();
//     const columnName = event.dataTransfer.getData("columnName");
//     if (target === "x-axis") {
//       if (!xAxis.includes(columnName)) {
//         dispatch(setXAxis([...xAxis, columnName]));
//       }
//     } else if (target === "y-axis") {
//       if (!yAxis.includes(columnName)) {
//         dispatch(setYAxis([...yAxis, columnName]));
//       }
//     }
//   };


//   const removeColumnFromXAxis = (columnNameToRemove) => {
//     const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setXAxis(updatedXAxis));
//     dispatch(setShowFilterDropdown(false));
//   };
//   const startRecording = () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//           mediaRecorderRef.current = new MediaRecorder(stream);
//           audioChunksRef.current = [];

//           mediaRecorderRef.current.ondataavailable = (event) => {
//             console.log('Data available:', event.data);
//             audioChunksRef.current.push(event.data);
//           };

//           mediaRecorderRef.current.onstop = () => {
//             const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//             console.log('Audio Blob:', audioBlob);
//             if (audioBlob.size === 0) {
//               console.error('Audio Blob is empty!');
//               return;
//             }
//             const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
//             const formData = new FormData();
//             formData.append('audio', audioFile);
//             formData.append('tableName', selectedTable);
//             formData.append('databaseName', databaseName);

//             uploadAudioFile(formData)
//               .then(response => {
//                 console.log('Audio uploaded successfully:', response.data);
//               })
//               .catch(error => {
//                 console.error('Error uploading audio:', error);
//               });
//           };

//           mediaRecorderRef.current.start();
//           setIsRecording(true);
//         })
//         .catch(error => {
//           console.error('Error accessing microphone:', error);
//         });
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };
  
//   return (
//     <div className="App">
//                 <div className="dash-right-side-container">
//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                     <label htmlFor="x-axis-input">X-axis: </label>
//                     <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                       <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {xAxis.map((column, index) => (
//                           <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{cursor: "pointer"}}>
//                               <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                           </div>
//                         ))}
//                       </div>
//                       {showFilterDropdown && (
//                         <div className="filter-dropdown">
//                           <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//                             <label>
//                               <ListItemButton sx={{ height: "35px" }}>
//                                 <ListItemIcon>
//                                   <Checkbox style={{ marginLeft: '10px' }}
//                                     checked={selectAllChecked}
//                                     onChange={handleSelectAllChange}
//                                   />
//                                 </ListItemIcon>
//                                 Select All
//                               </ListItemButton>
//                             </label>
//                           </List>
//                           {filterOptions.map((option, index) => (
//                             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//                               <label>
//                                 <ListItemButton sx={{ height: "35px" }}>
//                                   <ListItemIcon>
//                                     <Checkbox style={{ marginLeft: '10px' }}
//                                       type="checkbox"
//                                       value={option}
//                                       checked={checkedOptions.includes(option)}
//                                       onChange={() => handleCheckboxChange(option)}
//                                     />
//                                   </ListItemIcon>
//                                   {option}
//                                 </ListItemButton>
//                               </label>
//                             </List>
//                           ))}
//                         </div>
//                       )}
                      
//                     </div>
                    
//                   <div className="input-fields">
//                   {/* <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}> */}
//                     <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
//                       <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
//                       <NativeSelect
//                         style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
//                         inputProps={{
//                           name: 'age',
//                           id: 'uncontrolled-native',
//                         }}
//                       >
//                         <option value="sum">Sum</option>
//                         <option value="average">Average</option>
//                         <option value="count">Count</option>
//                         <option value="minimum">Minimum</option>
//                         <option value="maximum">Maximum</option>
//                         <option value="variance">Variance</option>
//                       </NativeSelect>
//                     </FormControl>

//                   </div>
                    
//                   </div>
                  

//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                   <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
//                   <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {yAxis.map((column, index) => (
//                           <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
//                           </div>
//                         ))}
                        
//                   </div>
                  
//                    </div>
//                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
//           <button
//             onClick={isRecording ? stopRecording : startRecording}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               border: 'none',
//               background: 'transparent',
//               cursor: 'pointer',
//             }}
//           >
//             {isRecording ? <StopCircleRounded /> : <Mic />}
//             <span style={{ marginLeft: '8px' }}>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
//           </button>
//           {audioUrl && (
//             <audio controls src={audioUrl} style={{ marginLeft: '20px' }}>
//               Your browser does not support the audio element.
//             </audio>
//           )}
//         </div>
//                   </div>

//                 </div>
//     </div>
//   );
// }

// export default DuealChartInput;



import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import Checkbox from "@mui/material/Checkbox";
import '../Style.css';
import {setXAxis, setYAxis, setAggregate,setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,generateChart
} from '../../features/Dashboard-Slice/chartSlice';
import axios from 'axios';
import { Mic, StopCircleRounded } from '@mui/icons-material';
import { uploadAudioFile,fetchFilterOptionsAPI } from '../../utils/api'; // Import the API function


function DuealChartInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const dispatch = useDispatch();
  const {
    xAxis, yAxis,aggregate,
    filterOptions, checkedOptions, showFilterDropdown, selectAllChecked} = useSelector(state => state.chart);

  const chartType=useSelector(state=>state.chartType.type);
  const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const barColor = useSelector((state) => state.chartColor.chartColor);
  // const databaseName = useSelector((state) => state.database.databaseName);
  const databaseName = localStorage.getItem('company_name');  
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  console.log('excelCheckedPaths:', excelCheckedPaths);
  console.log('csvCheckedPaths:', csvCheckedPaths);
  const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
  const selectedTable=selectedTablearray.join(',')
  React.useEffect(() => {
    if (xAxis && yAxis && aggregate && chartType) {
      dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
    }
  }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);
  // const fetchFilterOptions = async (columnName) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/plot_chart/${selectedTable}/${columnName}`, {
  //       params: { databaseName }
  //     });
  //     const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
  //     dispatch(setFilterOptions(options));
  //     dispatch(setCheckedOptions(options));
  //     dispatch(setShowFilterDropdown(false));
  //     dispatch(setSelectAllChecked(true));
  //   } catch (error) {
  //     console.error('Error fetching filter options:', error);
  //   }
  // };
  const fetchFilterOptions = async (columnName) => {
    try {
      const options = await fetchFilterOptionsAPI(selectedTable, columnName, databaseName);
      dispatch(setFilterOptions(options));
      dispatch(setCheckedOptions(options));
      dispatch(setShowFilterDropdown(false));
      dispatch(setSelectAllChecked(true));
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(setSelectAllChecked(isChecked));
    if (isChecked) {
      dispatch(setCheckedOptions([...filterOptions]));
    } else {
      dispatch(setCheckedOptions([]));
    }
  };

  const handleFilterIconClick = (columnName) => {
    if (showFilterDropdown) {
      dispatch(setShowFilterDropdown(false));
    } else {
      dispatch(setShowFilterDropdown(true));
    }
  };

  const handleCheckboxChange = (option) => {
    let updatedOptions;
    if (checkedOptions.includes(option)) {
      updatedOptions = checkedOptions.filter(item => item !== option);
    } else {
      updatedOptions = [...checkedOptions, option];
    }
    dispatch(setCheckedOptions(updatedOptions));
    dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
  };
  const removeColumnFromYAxis = (columnNameToRemove) => {
    const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
    dispatch(setYAxis(updatedYAxis));
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };




//   const handleDrop = (event, target) => {
//     event.preventDefault();
//     const columnName = event.dataTransfer.getData("columnName");

//     // Disable the filter dropdown
//     setShowFilterDropdown(false);

//     if (target === "x-axis") {
//         if (!xAxis.includes(columnName)) {
//             dispatch(setXAxis([...xAxis, columnName]));
//             fetchFilterOptions(columnName); // Fetch filter options for the dropped column
            
//         }
//     } else if (target === "y-axis") {
//         if (!yAxis.includes(columnName)) {
//             dispatch(setYAxis([...yAxis, columnName]));
//             // fetchFilterOptions(columnName); // Fetch filter options for the dropped column
//         }
//     }
// };
const handleDrop = (event, target) => {
  event.preventDefault();
  const columnName = event.dataTransfer.getData("columnName");

  // Disable the filter dropdown
  setShowFilterDropdown(false);

  if (target === "x-axis") {
    if (!xAxis.includes(columnName)) {
      // Remove the column from y-axis if it exists there
      const updatedYAxis = yAxis.filter((value) => value !== columnName);
      dispatch(setYAxis(updatedYAxis));

      // Add the column to x-axis
      dispatch(setXAxis([...xAxis, columnName]));

      // Fetch filter options for the dropped column
      fetchFilterOptions(columnName);
    }
  } else if (target === "y-axis") {
    if (!yAxis.includes(columnName)) {
      // Remove the column from x-axis if it exists there
      const updatedXAxis = xAxis.filter((value) => value !== columnName);
      dispatch(setXAxis(updatedXAxis));

      // Add the column to y-axis
      dispatch(setYAxis([...yAxis, columnName]));

      // Fetch filter options for the dropped column (if needed)
      // fetchFilterOptions(columnName);
    }
  }
};

  const removeColumnFromXAxis = (columnNameToRemove) => {
    const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
    dispatch(setXAxis(updatedXAxis));
    dispatch(setShowFilterDropdown(false));
  };
  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          audioChunksRef.current = [];

          mediaRecorderRef.current.ondataavailable = (event) => {
            console.log('Data available:', event.data);
            audioChunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            console.log('Audio Blob:', audioBlob);
            if (audioBlob.size === 0) {
              console.error('Audio Blob is empty!');
              return;
            }
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioFile);
            formData.append('tableName', selectedTable);
            formData.append('databaseName', databaseName);

            uploadAudioFile(formData)
              .then(response => {
                console.log('Audio uploaded successfully:', response.data);
              })
              .catch(error => {
                console.error('Error uploading audio:', error);
              });
          };

          mediaRecorderRef.current.start();
          setIsRecording(true);
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  return (
    <div className="App">
                <div className="dash-right-side-container">
                  {/* <h1>dueal axis</h1> */}
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <label htmlFor="x-axis-input">X-axis: </label>
                    <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
                      <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {xAxis.map((column, index) => (
                          <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{cursor: "pointer"}}>
                              <FilterListIcon />
                            </span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
                          </div>
                        ))}
                      </div>
                     
                      {showFilterDropdown && (
  <div className="filter-dropdown">
    <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
      <label>
        <ListItemButton sx={{ height: "35px" }}>
          <ListItemIcon>
            <Checkbox
              style={{ marginLeft: '10px' }}
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
          </ListItemIcon>
          Select All
        </ListItemButton>
      </label>
    </List>
    {filterOptions.map((option, index) => (
      <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
        <label>
          <ListItemButton sx={{ height: "35px" }}>
            <ListItemIcon>
              <Checkbox
                style={{ marginLeft: '10px' }}
                type="checkbox"
                value={option}
                checked={checkedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
            </ListItemIcon>
            {option}
          </ListItemButton>
        </label>
      </List>
    ))}
  </div>
)}

                    </div>
                    
                  <div className="input-fields">
                  {/* <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}> */}
                    <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
                      <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
                      <NativeSelect
                        style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value="sum">Sum</option>
                        <option value="average">Average</option>
                        <option value="count">Count</option>
                        <option value="minimum">Minimum</option>
                        <option value="maximum">Maximum</option>
                        <option value="variance">Variance</option>
                      </NativeSelect>
                    </FormControl>

                  </div>
                    
                  </div>
                  

                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                  <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
                  <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "915px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
                  <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {yAxis.map((column, index) => (
                          <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
                          </div>
                        ))}
                        
                  </div>
                  
                   </div>
                   <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {isRecording ? <StopCircleRounded /> : <Mic />}
            <span style={{ marginLeft: '8px' }}>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
          </button>
          {audioUrl && (
            <audio controls src={audioUrl} style={{ marginLeft: '30px' }}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
                  </div>

                </div>
    </div>
  );
}

export default DuealChartInput;