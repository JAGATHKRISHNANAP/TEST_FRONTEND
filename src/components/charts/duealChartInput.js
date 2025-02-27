
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
//   // const fetchFilterOptions = async (columnName) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:5000/plot_chart/${selectedTable}/${columnName}`, {
//   //       params: { databaseName }
//   //     });
//   //     const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
//   //     dispatch(setFilterOptions(options));
//   //     dispatch(setCheckedOptions(options));
//   //     dispatch(setShowFilterDropdown(false));
//   //     dispatch(setSelectAllChecked(true));
//   //   } catch (error) {
//   //     console.error('Error fetching filter options:', error);
//   //   }
//   // };
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       const options = await fetchFilterOptionsAPI(selectedTable, columnName, databaseName);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       dispatch(setShowFilterDropdown(false));
//       dispatch(setSelectAllChecked(true));
//     } catch (error) {
//       console.error('Error fetching filter options:', error);
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
//       dispatch(setShowFilterDropdown(true));
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




// //   const handleDrop = (event, target) => {
// //     event.preventDefault();
// //     const columnName = event.dataTransfer.getData("columnName");

// //     // Disable the filter dropdown
// //     setShowFilterDropdown(false);

// //     if (target === "x-axis") {
// //         if (!xAxis.includes(columnName)) {
// //             dispatch(setXAxis([...xAxis, columnName]));
// //             fetchFilterOptions(columnName); // Fetch filter options for the dropped column
            
// //         }
// //     } else if (target === "y-axis") {
// //         if (!yAxis.includes(columnName)) {
// //             dispatch(setYAxis([...yAxis, columnName]));
// //             // fetchFilterOptions(columnName); // Fetch filter options for the dropped column
// //         }
// //     }
// // };
// const handleDrop = (event, target) => {
//   event.preventDefault();
//   const columnName = event.dataTransfer.getData("columnName");

//   // Disable the filter dropdown
//   setShowFilterDropdown(false);

//   if (target === "x-axis") {
//     if (!xAxis.includes(columnName)) {
//       // Remove the column from y-axis if it exists there
//       const updatedYAxis = yAxis.filter((value) => value !== columnName);
//       dispatch(setYAxis(updatedYAxis));

//       // Add the column to x-axis
//       dispatch(setXAxis([...xAxis, columnName]));

//       // Fetch filter options for the dropped column
//       fetchFilterOptions(columnName);
//     }
//   } else if (target === "y-axis") {
//     if (!yAxis.includes(columnName)) {
//       // Remove the column from x-axis if it exists there
//       const updatedXAxis = xAxis.filter((value) => value !== columnName);
//       dispatch(setXAxis(updatedXAxis));

//       // Add the column to y-axis
//       dispatch(setYAxis([...yAxis, columnName]));

//       // Fetch filter options for the dropped column (if needed)
//       // fetchFilterOptions(columnName);
//     }
//   }
// };

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
//                   {/* <h1>dueal axis</h1> */}
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
//   <div className="filter-dropdown">
//     <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//       <label>
//         <ListItemButton sx={{ height: "35px" }}>
//           <ListItemIcon>
//             <Checkbox
//               style={{ marginLeft: '10px' }}
//               checked={selectAllChecked}
//               onChange={handleSelectAllChange}
//             />
//           </ListItemIcon>
//           Select All
//         </ListItemButton>
//       </label>
//     </List>
//     {filterOptions.map((option, index) => (
//       <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//         <label>
//           <ListItemButton sx={{ height: "35px" }}>
//             <ListItemIcon>
//               <Checkbox
//                 style={{ marginLeft: '10px' }}
//                 type="checkbox"
//                 value={option}
//                 checked={checkedOptions.includes(option)}
//                 onChange={() => handleCheckboxChange(option)}
//               />
//             </ListItemIcon>
//             {option}
//           </ListItemButton>
//         </label>
//       </List>
//     ))}
//   </div>
// )}

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
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "915px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
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
//             <audio controls src={audioUrl} style={{ marginLeft: '30px' }}>
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
//   // const fetchFilterOptions = async (columnName) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:5000/plot_chart/${selectedTable}/${columnName}`, {
//   //       params: { databaseName }
//   //     });
//   //     const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
//   //     dispatch(setFilterOptions(options));
//   //     dispatch(setCheckedOptions(options));
//   //     dispatch(setShowFilterDropdown(false));
//   //     dispatch(setSelectAllChecked(true));
//   //   } catch (error) {
//   //     console.error('Error fetching filter options:', error);
//   //   }
//   // };
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       const options = await fetchFilterOptionsAPI(selectedTable, columnName, databaseName);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       dispatch(setShowFilterDropdown(false));
//       dispatch(setSelectAllChecked(true));
//     } catch (error) {
//       console.error('Error fetching filter options:', error);
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
//       dispatch(setShowFilterDropdown(true));
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




// //   const handleDrop = (event, target) => {
// //     event.preventDefault();
// //     const columnName = event.dataTransfer.getData("columnName");

// //     // Disable the filter dropdown
// //     setShowFilterDropdown(false);

// //     if (target === "x-axis") {
// //         if (!xAxis.includes(columnName)) {
// //             dispatch(setXAxis([...xAxis, columnName]));
// //             fetchFilterOptions(columnName); // Fetch filter options for the dropped column
            
// //         }
// //     } else if (target === "y-axis") {
// //         if (!yAxis.includes(columnName)) {
// //             dispatch(setYAxis([...yAxis, columnName]));
// //             // fetchFilterOptions(columnName); // Fetch filter options for the dropped column
// //         }
// //     }
// // };
// const handleDrop = (event, target) => {
//   event.preventDefault();
//   const columnName = event.dataTransfer.getData("columnName");

//   // Disable the filter dropdown
//   setShowFilterDropdown(false);

//   if (target === "x-axis") {
//     if (!xAxis.includes(columnName)) {
//       // Remove the column from y-axis if it exists there
//       const updatedYAxis = yAxis.filter((value) => value !== columnName);
//       dispatch(setYAxis(updatedYAxis));

//       // Add the column to x-axis
//       dispatch(setXAxis([...xAxis, columnName]));

//       // Fetch filter options for the dropped column
//       fetchFilterOptions(columnName);
//     }
//   } else if (target === "y-axis") {
//     if (!yAxis.includes(columnName)) {
//       // Remove the column from x-axis if it exists there
//       const updatedXAxis = xAxis.filter((value) => value !== columnName);
//       dispatch(setXAxis(updatedXAxis));

//       // Add the column to y-axis
//       dispatch(setYAxis([...yAxis, columnName]));

//       // Fetch filter options for the dropped column (if needed)
//       // fetchFilterOptions(columnName);
//     }
//   }
// };

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
//                   {/* <h1>dueal axis</h1> */}
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
//   <div className="filter-dropdown">
//     <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//       <label>
//         <ListItemButton sx={{ height: "35px" }}>
//           <ListItemIcon>
//             <Checkbox
//               style={{ marginLeft: '10px' }}
//               checked={selectAllChecked}
//               onChange={handleSelectAllChange}
//             />
//           </ListItemIcon>
//           Select All
//         </ListItemButton>
//       </label>
//     </List>
//     {filterOptions.map((option, index) => (
//       <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//         <label>
//           <ListItemButton sx={{ height: "35px" }}>
//             <ListItemIcon>
//               <Checkbox
//                 style={{ marginLeft: '10px' }}
//                 type="checkbox"
//                 value={option}
//                 checked={checkedOptions.includes(option)}
//                 onChange={() => handleCheckboxChange(option)}
//               />
//             </ListItemIcon>
//             {option}
//           </ListItemButton>
//         </label>
//       </List>
//     ))}
//   </div>
// )}

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
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "915px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
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
//             <audio controls src={audioUrl} style={{ marginLeft: '30px' }}>
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
// import { fetchFilterOptionsAPI } from '../../utils/api';
// // import { Mic, StopCircleRounded } from '@mui/icons-material';
// // import { uploadAudioFile,fetchFilterOptionsAPI } from '../../utils/api'; // Import the API function


// function DuealChartInput() {
//   // const [isRecording, setIsRecording] = useState(false);
//   // const [audioUrl, setAudioUrl] = useState(null);
//   // const mediaRecorderRef = useRef(null);
//   // const audioChunksRef = useRef([]);
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

//   // const fetchFilterOptions = async (columnName) => {
//   //   try {
//   //     const options = await fetchFilterOptionsAPI( databaseName,selectedTable, columnName);
//   //     dispatch(setFilterOptions(options));
//   //     dispatch(setCheckedOptions(options));
//   //     dispatch(setShowFilterDropdown(true));
//   //     dispatch(setSelectAllChecked(true));      // Reset "Select All" checkbox
//   //   } catch (error) {
//   //     console.error('Failed to fetch filter options:', error);
//   //   }
//   // };
//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       // Automatically fetch filter options for the last added column
//       const lastAddedColumn = xAxis[xAxis.length - 1];
//       fetchFilterOptions(lastAddedColumn);
//     }
//   }, [xAxis]);
  
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       console.log('fetchFilterOptions------------:', columnName);
//       const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       // Do not show the dropdown here, it will only be triggered on filter icon click
//     } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//     }
//   };
  
//   const handleFilterIconClick = (columnName) => {
//     // Toggle the dropdown visibility
//     if (showFilterDropdown) {
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       // Ensure the filter options are already fetched
//       const optionsForColumn = filterOptions; // Assume filterOptions are already fetched
//       if (optionsForColumn.length === 0) {
//         fetchFilterOptions(columnName).then(() => {
//           dispatch(setShowFilterDropdown(true));
//         });
//       } else {
//         dispatch(setShowFilterDropdown(true));
//       }
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


//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
//   // const handleFilterIconClick = (columnName) => {
//   //   if (showFilterDropdown) {
//   //     dispatch(setShowFilterDropdown(false)); // Hide the dropdown if it's already shown
//   //   } else {
//   //     dispatch(setShowFilterDropdown(true)); // Show the dropdown
//   //   }
//   // };

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


//   // const startRecording = () => {
//   //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   //     navigator.mediaDevices.getUserMedia({ audio: true })
//   //       .then(stream => {
//   //         mediaRecorderRef.current = new MediaRecorder(stream);
//   //         audioChunksRef.current = [];

//   //         mediaRecorderRef.current.ondataavailable = (event) => {
//   //           console.log('Data available:', event.data);
//   //           audioChunksRef.current.push(event.data);
//   //         };

//   //         mediaRecorderRef.current.onstop = () => {
//   //           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//   //           console.log('Audio Blob:', audioBlob);
//   //           if (audioBlob.size === 0) {
//   //             console.error('Audio Blob is empty!');
//   //             return;
//   //           }
//   //           const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
//   //           const formData = new FormData();
//   //           formData.append('audio', audioFile);
//   //           formData.append('tableName', selectedTable);
//   //           formData.append('databaseName', databaseName);

//   //           uploadAudioFile(formData)
//   //             .then(response => {
//   //               console.log('Audio uploaded successfully:', response.data);
//   //             })
//   //             .catch(error => {
//   //               console.error('Error uploading audio:', error);
//   //             });
//   //         };

//   //         mediaRecorderRef.current.start();
//   //         setIsRecording(true);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error accessing microphone:', error);
//   //       });
//   //   }
//   // };

//   // const stopRecording = () => {
//   //   if (mediaRecorderRef.current) {
//   //     mediaRecorderRef.current.stop();
//   //     setIsRecording(false);
//   //   }
//   // };
  
//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName);
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
//   React.useEffect(() => {
//     if (
//       xAxis.length > 0 &&
//       yAxis.length > 0 &&
//       aggregate &&
//       chartType &&
//       checkedOptions.length > 0
//     ) {
//       dispatch(
//         generateChart({
//           selectedTable,
//           xAxis,
//           yAxis,
//           barColor,
//           aggregate,
//           chartType,
//           checkedOptions,
//         })
//       );
//     }
//   }, [xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch, selectedTable, barColor]);
  


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
//   <div className="filter-dropdown">
//     <List
//       sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//     >
//       <label>
//         <ListItemButton sx={{ height: "35px" }}>
//           <ListItemIcon>
//             <Checkbox
//               style={{ marginLeft: '10px' }}
//               checked={selectAllChecked}
//               onChange={handleSelectAllChange}
//             />
//           </ListItemIcon>
//           Select All
//         </ListItemButton>
//       </label>
//     </List>
//     {filterOptions.map((option, index) => (
//       <List
//         sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//         key={index}
//       >
//         <label>
//           <ListItemButton sx={{ height: "35px" }}>
//             <ListItemIcon>
//               <Checkbox
//                 style={{ marginLeft: '10px' }}
//                 type="checkbox"
//                 value={option}
//                 checked={checkedOptions.includes(option)}
//                 onChange={() => handleCheckboxChange(option)}
//               />
//             </ListItemIcon>
//             {option}
//           </ListItemButton>
//         </label>
//       </List>
//     ))}
//   </div>
// )}
                      
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
//           {/* <button
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
//           )} */}
//         </div>
//                   </div>

//                 </div>
//     </div>
//   );
// }

// export default DuealChartInput;


// clened above code is below 




// import React from 'react';
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
// import { fetchFilterOptionsAPI } from '../../utils/api';

// function DuealChartInput() {
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
//   // React.useEffect(() => {
//   //   if (xAxis && yAxis && aggregate && chartType) {
//   //     dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//   //   }
//   // }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);


  
//   // React.useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     if (xAxis && yAxis && aggregate && chartType) {
//   //       dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//   //     }
//   //   }, 3000); // 3 seconds interval
  
//   //   // Cleanup function to clear the interval when the component unmounts or dependencies change
//   //   return () => clearInterval(interval);
//   // }, [selectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);
  

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       // Automatically fetch filter options for the last added column
//       const lastAddedColumn = xAxis[xAxis.length - 1];
//       fetchFilterOptions(lastAddedColumn);
//     }
//   }, [xAxis]);
  
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       console.log('fetchFilterOptions------------:', columnName);
//       const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName,xAxis);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       // Do not show the dropdown here, it will only be triggered on filter icon click
//     } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//     }
//   };
  
//   const handleFilterIconClick = (columnName) => {
//     // Toggle the dropdown visibility
//     if (showFilterDropdown) {
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       // Ensure the filter options are already fetched
//       const optionsForColumn = filterOptions; // Assume filterOptions are already fetched
//       if (optionsForColumn.length === 0) {
//         fetchFilterOptions(columnName).then(() => {
//           dispatch(setShowFilterDropdown(true));
//         });
//       } else {
//         dispatch(setShowFilterDropdown(true));
//       }
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


//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
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
//     console.log("chart type.............................................",chartType)
//     const columnName = event.dataTransfer.getData("columnName");
  
//     const singleColumnChartTypes = ["bar", "pie", "scatter", "line", "area", "polarArea"]; // List of chart types that allow only one column on the X-axis
  
//     if (target === "x-axis") {
//       if (singleColumnChartTypes.includes(chartType)) {
//         // Replace the existing column for specified chart types
//         dispatch(setXAxis([columnName]));
//       } else {
//         // Allow multiple columns for other chart types
//         if (!xAxis.includes(columnName)) {
//           dispatch(setXAxis([...xAxis, columnName]));
//         }
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

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName);
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
//   React.useEffect(() => {
//     if (
//       xAxis.length > 0 &&
//       yAxis.length > 0 &&
//       aggregate &&
//       chartType &&
//       checkedOptions.length > 0
//     ) {
//       dispatch(
//         generateChart({
//           selectedTable,
//           xAxis,
//           yAxis,
//           barColor,
//           aggregate,
//           chartType,
//           checkedOptions,
//         })
//       );
//     }
//   }, [xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch, selectedTable, barColor]);
  


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
//   <div className="filter-dropdown">
//     <List
//       sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//     >
//       <label>
//         <ListItemButton sx={{ height: "35px" }}>
//           <ListItemIcon>
//             <Checkbox
//               style={{ marginLeft: '10px' }}
//               checked={selectAllChecked}
//               onChange={handleSelectAllChange}
//             />
//           </ListItemIcon>
//           Select All
//         </ListItemButton>
//       </label>
//     </List>
//     {filterOptions.map((option, index) => (
//       <List
//         sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//         key={index}
//       >
//         <label>
//           <ListItemButton sx={{ height: "35px" }}>
//             <ListItemIcon>
//               <Checkbox
//                 style={{ marginLeft: '10px' }}
//                 type="checkbox"
//                 value={option}
//                 checked={checkedOptions.includes(option)}
//                 onChange={() => handleCheckboxChange(option)}
//               />
//             </ListItemIcon>
//             {option}
//           </ListItemButton>
//         </label>
//       </List>
//     ))}
//   </div>
// )}
                      
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
//                         {/* <option value="variance">Variance</option> */}
//                       </NativeSelect>
//                     </FormControl>

//                   </div>
                    
//                   </div>
                  

//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                   <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
//                   <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {yAxis.map((column, index) => (
//                           <div key={index} className="y-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
//                           </div>
//                         ))}
                        
//                   </div>
                  
//                    </div>
//                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
//         </div>
//                   </div>

//                 </div>
//     </div>
//   );
// }

// export default DuealChartInput;
















































































// import React from 'react';
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
// import { fetchFilterOptionsAPI } from '../../utils/api';

// function DuealChartInput() {
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
//   // React.useEffect(() => {
//   //   if (xAxis && yAxis && aggregate && chartType) {
//   //     dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//   //   }
//   // }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);


  
//   // React.useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     if (xAxis && yAxis && aggregate && chartType) {
//   //       dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//   //     }
//   //   }, 3000); // 3 seconds interval
  
//   //   // Cleanup function to clear the interval when the component unmounts or dependencies change
//   //   return () => clearInterval(interval);
//   // }, [selectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);
  

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       // Automatically fetch filter options for the last added column
//       const lastAddedColumn = xAxis[xAxis.length - 1];
//       fetchFilterOptions(lastAddedColumn);
//     }
//   }, [xAxis]);
  
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       console.log('fetchFilterOptions------------:', columnName);
//       const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName,xAxis);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       // Do not show the dropdown here, it will only be triggered on filter icon click
//     } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//     }
//   };
  
//   const handleFilterIconClick = (columnName) => {
//     // Toggle the dropdown visibility
//     if (showFilterDropdown) {
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       // Ensure the filter options are already fetched
//       const optionsForColumn = filterOptions; // Assume filterOptions are already fetched
//       if (optionsForColumn.length === 0) {
//         fetchFilterOptions(columnName).then(() => {
//           dispatch(setShowFilterDropdown(true));
//         });
//       } else {
//         dispatch(setShowFilterDropdown(true));
//       }
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


//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
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
//     console.log("chart type.............................................",chartType)
//     const columnName = event.dataTransfer.getData("columnName");
  
//     const singleColumnChartTypes = ["bar", "pie", "scatter", "line", "area", "polarArea"]; // List of chart types that allow only one column on the X-axis
  
//     if (target === "x-axis") {
//       if (singleColumnChartTypes.includes(chartType)) {
//         // Replace the existing column for specified chart types
//         dispatch(setXAxis([columnName]));
//       } else {
//         // Allow multiple columns for other chart types
//         if (!xAxis.includes(columnName)) {
//           dispatch(setXAxis([...xAxis, columnName]));
//         }
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

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName);
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
//   React.useEffect(() => {
//     if (
//       xAxis.length > 0 &&
//       yAxis.length > 0 &&
//       aggregate &&
//       chartType &&
//       checkedOptions.length > 0
//     ) {
//       dispatch(
//         generateChart({
//           selectedTable,
//           xAxis,
//           yAxis,
//           barColor,
//           aggregate,
//           chartType,
//           checkedOptions,
//         })
//       );
//     }
//   }, [xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch, selectedTable, barColor]);
  


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
//   <div className="filter-dropdown">
//     <List
//       sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//     >
//       <label>
//         <ListItemButton sx={{ height: "35px" }}>
//           <ListItemIcon>
//             <Checkbox
//               style={{ marginLeft: '10px' }}
//               checked={selectAllChecked}
//               onChange={handleSelectAllChange}
//             />
//           </ListItemIcon>
//           Select All
//         </ListItemButton>
//       </label>
//     </List>
//     {filterOptions.map((option, index) => (
//       <List
//         sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
//         key={index}
//       >
//         <label>
//           <ListItemButton sx={{ height: "35px" }}>
//             <ListItemIcon>
//               <Checkbox
//                 style={{ marginLeft: '10px' }}
//                 type="checkbox"
//                 value={option}
//                 checked={checkedOptions.includes(option)}
//                 onChange={() => handleCheckboxChange(option)}
//               />
//             </ListItemIcon>
//             {option}
//           </ListItemButton>
//         </label>
//       </List>
//     ))}
//   </div>
// )}
                      
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
//                         {/* <option value="variance">Variance</option> */}
//                       </NativeSelect>
//                     </FormControl>

//                   </div>
                    
//                   </div>
                  

//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                   <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
//                   <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {yAxis.map((column, index) => (
//                           <div key={index} className="y-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
//                           </div>
//                         ))}
                        
//                   </div>
                  
//                    </div>
//                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
//         </div>
//                   </div>

//                 </div>
//     </div>
//   );
// }

// export default DuealChartInput;






















// // GAYATHRI CODE..

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
  
//   // const SelectedTable = localStorage.getItem('SelectedTable'); 
//   React.useEffect(() => {
//     if (xAxis && yAxis && aggregate && chartType) {
      
//       dispatch(generateChart({ SelectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//     }
//   }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);

//   // const fetchFilterOptions = async (columnName) => {
//   //   try {
//   //     console.log("SelectedTable",SelectedTable)
//   //     const selectedUser = localStorage.getItem('selectedUser'); // Get connection type from localStorage
//   //     const response = await axios.get(`http://localhost:5000/plot_chart/${SelectedTable}/${columnName}`, {
//   //       params: { databaseName,selectedUser }
//   //     });
//   //     const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
//   //     dispatch(setFilterOptions(options));
//   //     dispatch(setCheckedOptions(options));
//   //     dispatch(setShowFilterDropdown(false));
//   //     dispatch(setSelectAllChecked(true));

//   //     localStorage.setItem('filterOptions', JSON.stringify(options));
//   //   } catch (error) {
//   //     console.error('Error fetching filter options:', error);
//   //   }
//   // };
//   const fetchFilterOptions = async (columnName) => {
//     try {
//       console.log('fetchFilterOptions------------:', columnName);
//       const selectedUser = localStorage.getItem('selectedUser');
//       const options = await fetchFilterOptionsAPI(databaseName, SelectedTable, columnName,selectedUser);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       // Do not show the dropdown here, it will only be triggered on filter icon click
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

//   // const handleFilterIconClick = (columnName) => {
//   //   if (showFilterDropdown) {
//   //     dispatch(setShowFilterDropdown(false));
//   //   } else {
//   //     fetchFilterOptions(columnName);
//   //   }
//   // };

//   const handleFilterIconClick = async (columnName) => {
//     if (showFilterDropdown) {
//       // Close the dropdown if it's already open
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       // Fetch filter options for the selected column and open the dropdown
//       await fetchFilterOptions(columnName); // Ensure correct column name is passed
//       dispatch(setShowFilterDropdown(true));
//     }
//   };
  

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
    
//   // const handleCheckboxChange = (option) => {
//   //   let updatedOptions;
//   //   if (checkedOptions.includes(option)) {
//   //     updatedOptions = checkedOptions.filter(item => item !== option);
//   //   } else {
//   //     updatedOptions = [...checkedOptions, option];
//   //   }
//   //   dispatch(setCheckedOptions(updatedOptions));
//   //   dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
//   // };
//   const handleCheckboxChange = (option) => {
//     let updatedOptions;

//     // Update the options based on the checkbox state
//     if (checkedOptions.includes(option)) {
//         updatedOptions = checkedOptions.filter(item => item !== option);
//     } else {
//         updatedOptions = [...checkedOptions, option];
//     }

//     // Dispatch the updated options to Redux
//     dispatch(setCheckedOptions(updatedOptions));
//     dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));

//     // Save the updated options to local storage
//     localStorage.setItem('checkedOptions', JSON.stringify(updatedOptions));
// };

//   const removeColumnFromYAxis = (columnNameToRemove) => {
//     const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setYAxis(updatedYAxis));
//   };


//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   // const handleDrop = (event, target) => {
//   //   event.preventDefault();
//   //   const columnName = event.dataTransfer.getData("columnName");
//   //   if (target === "x-axis") {
//   //     if (!xAxis.includes(columnName)) {
//   //       dispatch(setXAxis([...xAxis, columnName]));
//   //     }
//   //   } else if (target === "y-axis") {
//   //     if (!yAxis.includes(columnName)) {
//   //       dispatch(setYAxis([...yAxis, columnName]));
//   //     }
//   //   }
//   // };

//   const handleDrop = (event, target) => {
//     event.preventDefault();
//     const columnName = event.dataTransfer.getData("columnName");
//     const singleColumnChartTypes = ["bar", "pie", "scatter", "line", "area", "polarArea"]; // List of chart types that allow only one column on the X-axis
  
//     // Disable the filter dropdown
//     setShowFilterDropdown(false);

//     if (target === "x-axis") {
//         // if (!xAxis.includes(columnName)) {
//         //     dispatch(setXAxis([...xAxis, columnName]));
//         //     fetchFilterOptions(columnName); // Fetch filter options for the dropped column
            
//         // }
//         if (singleColumnChartTypes.includes(chartType)) {
//           // Replace the existing column for specified chart types
//           dispatch(setXAxis([columnName]));
//         } else {
//           // Allow multiple columns for other chart types
//           if (!xAxis.includes(columnName)) {
//             dispatch(setXAxis([...xAxis, columnName]));
//             fetchFilterOptions(columnName); // Fetch filter options for the dropped column
//           }
//         }
//     } else if (target === "y-axis") {
//         if (!yAxis.includes(columnName)) {
//             dispatch(setYAxis([...yAxis, columnName]));
//             // fetchFilterOptions(columnName); // Fetch filter options for the dropped column
//         }
//     }
// };

//   const removeColumnFromXAxis = (columnNameToRemove) => {
//     const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setXAxis(updatedXAxis));
//     dispatch(setShowFilterDropdown(false));
//   };
//   // const startRecording = () => {
//   //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   //     navigator.mediaDevices.getUserMedia({ audio: true })
//   //       .then((stream) => {
//   //         mediaRecorderRef.current = new MediaRecorder(stream);
//   //         audioChunksRef.current = [];

//   //         mediaRecorderRef.current.ondataavailable = (event) => {
//   //           audioChunksRef.current.push(event.data);
//   //         };

//   //         mediaRecorderRef.current.onstop = async () => {
//   //           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//   //           const audioUrl = URL.createObjectURL(audioBlob);
//   //           setAudioUrl(audioUrl);

//   //           try {
//   //             // Upload the audio file to the backend
//   //             const response = await uploadAudioFile(audioBlob);
//   //             console.log('Audio uploaded successfully:', response);
//   //           } catch (error) {
//   //             console.error('Error uploading audio:', error);
//   //           }
//   //         };

//   //         mediaRecorderRef.current.start();
//   //         setIsRecording(true);
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error accessing microphone:', error);
//   //       });
//   //   }
//   // };

//   // const stopRecording = () => {
//   //   if (mediaRecorderRef.current) {
//   //     mediaRecorderRef.current.stop();
//   //     setIsRecording(false);
//   //   }
//   // };


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
//             formData.append('tableName', SelectedTable);
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
//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       // Your periodic task here (e.g., update chart data or fetch new data)
//       if (xAxis.length > 0) {
//         const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
        
//         fetchFilterOptions(columnName); // Fetch filter options for the dropped column
//       }
//     }, 1000); // This runs every 5 seconds (5000 ms)
  
//     return () => clearInterval(interval); // Cleanup the interval when the component is unmounted or dependencies change
//   }, [xAxis]); // Trigger the effect whenever xAxis changes
  

//   // const startRecording = () => {
//   //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   //     navigator.mediaDevices.getUserMedia({ audio: true })
//   //       .then(stream => {
//   //         mediaRecorderRef.current = new MediaRecorder(stream);
//   //         audioChunksRef.current = [];

//   //         mediaRecorderRef.current.ondataavailable = (event) => {
//   //           audioChunksRef.current.push(event.data);
//   //         };

//   //         mediaRecorderRef.current.onstop = () => {
//   //           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//   //           const audioUrl = URL.createObjectURL(audioBlob);
//   //           setAudioUrl(audioUrl);

//   //           // Upload audio to backend
//   //           uploadAudioFile(audioBlob, SelectedTable, databaseName)
//   //             .then(response => {
//   //               console.log('Audio uploaded successfully:', response.data);
//   //             })
//   //             .catch(error => {
//   //               console.error('Error uploading audio:', error);
//   //             });
//   //         };

//   //         mediaRecorderRef.current.start();
//   //         setIsRecording(true);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error accessing microphone:', error);
//   //       });
//   //   }
//   // };

//   // const stopRecording = () => {
//   //   if (mediaRecorderRef.current) {
//   //     mediaRecorderRef.current.stop();
//   //     setIsRecording(false);
//   //   }
//   // };

//   React.useEffect(() => {
//     if (xAxis.length > 0) {
//       const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
//       fetchFilterOptions(columnName);
//     }
//   }, [xAxis]); // Trigger whenever xAxis changes
  
//   React.useEffect(() => {
    
//     const selectedUser = localStorage.getItem('selectedUser');
//     if (
//       xAxis.length > 0 &&
//       yAxis.length > 0 &&
//       aggregate &&
//       chartType &&
//       checkedOptions.length > 0
//     ) {
//       dispatch(
//         generateChart({
//           SelectedTable,
//           xAxis,
//           yAxis,
//           barColor,
//           aggregate,
//           chartType,
//           checkedOptions,
//           selectedUser
//         })
//       );
//     }
//   }, [xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch, SelectedTable, barColor]);
  
//   return (
//     <div className="App">
//                 <div className="dash-right-side-container">
//                   {/* <h1>dueal axis</h1> */}
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
import { fetchFilterOptionsAPI } from '../../utils/api';

import { io } from "socket.io-client";

function DuealChartInput() {
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
  const selectedTable=selectedTablearray.join(',');

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    if (xAxis.length > 0) {
      // Automatically fetch filter options for the last added column
      const lastAddedColumn = xAxis[xAxis.length - 1];
      fetchFilterOptions(lastAddedColumn);
    }
  }, [xAxis]);
  
  const fetchFilterOptions = async (columnName) => {
    try {
      // console.log('fetchFilterOptions------------:', columnName);
      const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName,xAxis);
      dispatch(setFilterOptions(options));
      dispatch(setCheckedOptions(options));
      // Do not show the dropdown here, it will only be triggered on filter icon click
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };
  
  const handleFilterIconClick = (columnName) => {
    // Toggle the dropdown visibility
    if (showFilterDropdown) {
      dispatch(setShowFilterDropdown(false));
    } else {
      // Ensure the filter options are already fetched
      const optionsForColumn = filterOptions; // Assume filterOptions are already fetched
      if (optionsForColumn.length === 0) {
        fetchFilterOptions(columnName).then(() => {
          dispatch(setShowFilterDropdown(true));
        });
      } else {
        dispatch(setShowFilterDropdown(true));
      }
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



  React.useEffect(() => {
    if (xAxis.length > 0) {
      const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
      fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
    }
  }, [xAxis]); // Trigger whenever xAxis changes
  
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

  const handleDrop = (event, target) => {
    event.preventDefault();
    // console.log("chart type.............................................",chartType)
    const columnName = event.dataTransfer.getData("columnName");
  
    const singleColumnChartTypes = ["bar", "pie", "scatter", "line", "area", "polarArea"]; // List of chart types that allow only one column on the X-axis
  
    if (target === "x-axis") {
      if (singleColumnChartTypes.includes(chartType)) {
        // Replace the existing column for specified chart types
        dispatch(setXAxis([columnName]));
      } else {
        // Allow multiple columns for other chart types
        if (!xAxis.includes(columnName)) {
          dispatch(setXAxis([...xAxis, columnName]));
        }
      }
    } else if (target === "y-axis") {
      if (!yAxis.includes(columnName)) {
        dispatch(setYAxis([...yAxis, columnName]));
      }
    }
  };
  
  


  const removeColumnFromXAxis = (columnNameToRemove) => {
    const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
    dispatch(setXAxis(updatedXAxis));
    dispatch(setShowFilterDropdown(false));
  };

  React.useEffect(() => {
    if (xAxis.length > 0) {
      const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
      fetchFilterOptions(columnName);
    }
  }, [xAxis]); // Trigger whenever xAxis changes
  
  // React.useEffect(() => {
  //   if (
  //     xAxis.length > 0 &&
  //     yAxis.length > 0 &&
  //     aggregate &&
  //     chartType &&
  //     checkedOptions.length > 0
  //   ) {
  //     dispatch(
  //       generateChart({
  //         selectedTable,
  //         xAxis,
  //         yAxis,
  //         barColor,
  //         aggregate,
  //         chartType,
  //         checkedOptions,
  //       })
  //     );
  //   }
  // }, [xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch, selectedTable, barColor]);
  

  React.useEffect(() => {
    if (
      selectedTable &&
      xAxis.length > 0 &&
      yAxis.length > 0 &&
      aggregate &&
      checkedOptions.length > 0 &&
      databaseName
    ) {
      const newSocket = io("http://localhost:5000", {
        query: {
          selectedTable,
          xAxis,
          yAxis,
          aggregate,
          filterOptions: checkedOptions.join(", "),
          databaseName,
          chartType,
        },
        
      });
      newSocket.on("chart_update", (data) => {
        console.log("🔥🔥🔥🔥Received chart update:", data);

        dispatch(
          generateChart({
            selectedTable,
            xAxis,
            yAxis,
            aggregate,
            chartType,
            checkedOptions,
            chartData: data.data, // Store the new data
          })
        );
      });
      

    
  
      setSocket(newSocket);
  

  
      return () => {
        newSocket.disconnect(); // Cleanup previous socket connection
      };
    }
  }, [selectedTable, xAxis, yAxis, aggregate, checkedOptions, databaseName, dispatch, chartType]);
  


  // React.useEffect(() => {
  //   if (
  //     selectedTable &&
  //     xAxis.length > 0 &&
  //     yAxis.length > 0 &&
  //     aggregate &&
  //     checkedOptions.length > 0 &&
  //     databaseName
  //   ) {
  //     const newSocket = io("http://localhost:5000"); // Connect to Flask server

  //     // Listen for updates from the backend
  //     newSocket.on("chart_update", (data) => {
  //       console.log("Received chart update:", data);

  //       dispatch(
  //         generateChart({
  //           selectedTable,
  //           xAxis,
  //           yAxis,
  //           aggregate,
  //           chartType,
  //           checkedOptions,
  //           chartData: data.data, // Store the new data
  //         })
  //       );
  //     });

  //     setSocket(newSocket);

  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [selectedTable, xAxis, yAxis, aggregate, checkedOptions, databaseName, dispatch, chartType]);



//   const newSocket = io("http://localhost:5000", {
//   query: {      selectedTable,
//     xAxis,
//     yAxis,
//     aggregate,
//     filterOptions: checkedOptions.join(', '),
//     databaseName,}
// });

  // newSocket.on("chart_update", (data) => {
  //   if (data.xaxis === xAxis && data.yaxis === yAxis) {
  //     setChartData({
  //       categories: data.categories,
  //       series: [{ name: "Pay Data", data: data.values }],
  //       xaxis: data.xaxis,
  //       yaxis: data.yaxis
  //     });
  //   }
  // });


// console.log("****************************++++++++++++++**************************",socket)

  return (
    <div className="App">
                <div className="dash-right-side-container">
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
    <List
      sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
    >
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
      <List
        sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
        key={index}
      >
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
                        {/* <option value="variance">Variance</option> */}
                      </NativeSelect>
                    </FormControl>

                  </div>
                    
                  </div>
                  

                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                  <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
                  <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
                  <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {yAxis.map((column, index) => (
                          <div key={index} className="y-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
                          </div>
                        ))}
                        
                  </div>
                  
                   </div>
                   <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        </div>
                  </div>

                </div>
    </div>
  );
}

export default DuealChartInput;


