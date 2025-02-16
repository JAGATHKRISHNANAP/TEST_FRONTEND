// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
// // import List from '@mui/material/List';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import Checkbox from "@mui/material/Checkbox";

// // function FilterOptionsDropdown() {
// //     const dispatch = useDispatch();
// //     const { filterOptions, checkedOptions, selectAllChecked } = useSelector(state => state.chart);

// //     const handleSelectAllChange = (event) => {
// //         const isChecked = event.target.checked;
// //         dispatch(setSelectAllChecked(isChecked));
// //         dispatch(setCheckedOptions(isChecked ? [...filterOptions] : []));
// //     };

// //     const handleCheckboxChange = (option) => {
// //         let updatedOptions;
// //         if (checkedOptions.includes(option)) {
// //             updatedOptions = checkedOptions.filter(item => item !== option);
// //         } else {
// //             updatedOptions = [...checkedOptions, option];
// //         }
// //         dispatch(setCheckedOptions(updatedOptions));
// //         dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
// //     };

// //     return (
// //         <div className="filter-dropdown">
// //             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
// //                 <label>
// //                     <ListItemButton sx={{ height: "35px" }}>
// //                         <ListItemIcon>
// //                             <Checkbox style={{ marginLeft: '10px' }}
// //                                 checked={selectAllChecked}
// //                                 onChange={handleSelectAllChange}
// //                             />
// //                         </ListItemIcon>
// //                         Select All
// //                     </ListItemButton>
// //                 </label>
// //             </List>
// //             {Array.isArray(filterOptions) && filterOptions.map((option, index) => (
// //                 <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
// //                     <label>
// //                         <ListItemButton sx={{ height: "35px" }}>
// //                             <ListItemIcon>
// //                                 <Checkbox style={{ marginLeft: '10px' }}
// //                                     type="checkbox"
// //                                     value={option}
// //                                     checked={checkedOptions.includes(option)}
// //                                     onChange={() => handleCheckboxChange(option)}
// //                                 />
// //                             </ListItemIcon>
// //                             {option}
// //                         </ListItemButton>
// //                     </label>
// //                 </List>
// //             ))}
// //         </div>
// //     );
// // }

// // export default FilterOptionsDropdown;

// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
// // import List from '@mui/material/List';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import Checkbox from "@mui/material/Checkbox";

// // function FilterOptionsDropdown({ column }) {
// //     const dispatch = useDispatch();
// //     const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
// //     const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
// //     const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

// //     const handleSelectAllChange = (event) => {
// //         const isChecked = event.target.checked;
// //         dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
// //         dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? [...filterOptions] : [] }));
// //     };

// //     const handleCheckboxChange = (option) => {
// //         let updatedOptions;
// //         if (checkedOptions.includes(option)) {
// //             updatedOptions = checkedOptions.filter(item => item !== option);
// //         } else {
// //             updatedOptions = [...checkedOptions, option];
// //         }
// //         dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
// //         dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
// //     };

// //     return (
// //         <div className="filter-dropdown" style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", zIndex: 1000, padding: "5px", top: "30px", left: "0" }}>
// //             <List sx={{ width: "200px", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
// //                 <label>
// //                     <ListItemButton sx={{ height: "35px" }}>
// //                         <ListItemIcon>
// //                             <Checkbox style={{ marginLeft: '10px' }}
// //                                 checked={selectAllChecked}
// //                                 onChange={handleSelectAllChange}
// //                             />
// //                         </ListItemIcon>
// //                         Select All
// //                     </ListItemButton>
// //                 </label>
// //             </List>
// //             {filterOptions.map((option, index) => (
// //                 <List sx={{ width: "200px", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
// //                     <label>
// //                         <ListItemButton sx={{ height: "35px" }}>
// //                             <ListItemIcon>
// //                                 <Checkbox style={{ marginLeft: '10px' }}
// //                                     type="checkbox"
// //                                     value={option}
// //                                     checked={checkedOptions.includes(option)}
// //                                     onChange={() => handleCheckboxChange(option)}
// //                                 />
// //                             </ListItemIcon>
// //                             {option}
// //                         </ListItemButton>
// //                     </label>
// //                 </List>
// //             ))}
// //         </div>
// //     );
// // }

// // export default FilterOptionsDropdown;

// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
// // import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button } from '@mui/material';

// // function FilterOptionsModal({ column, open, onClose }) {
// //     const dispatch = useDispatch();
// //     const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
// //     const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
// //     const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

// //     const handleSelectAllChange = (event) => {
// //         const isChecked = event.target.checked;
// //         dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
// //         dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? [...filterOptions] : [] }));
// //     };

// //     const handleCheckboxChange = (option) => {
// //         let updatedOptions = checkedOptions.includes(option)
// //             ? checkedOptions.filter(item => item !== option)
// //             : [...checkedOptions, option];

// //         dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
// //         dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
// //     };

// //     return (
// //         <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title">
// //             <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 2 }}>
// //                 <Typography id="filter-modal-title" variant="h6">Filter Options for {column}</Typography>
// //                 <List>
// //                     <ListItemButton>
// //                         <ListItemIcon>
// //                             <Checkbox checked={selectAllChecked} onChange={handleSelectAllChange} />
// //                         </ListItemIcon>
// //                         Select All
// //                     </ListItemButton>
// //                     {filterOptions.map((option, index) => (
// //                         <ListItemButton key={index}>
// //                             <ListItemIcon>
// //                                 <Checkbox checked={checkedOptions.includes(option)} onChange={() => handleCheckboxChange(option)} />
// //                             </ListItemIcon>
// //                             {option}
// //                         </ListItemButton>
// //                     ))}
// //                 </List>
// //                 <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>Close</Button>
// //             </Box>
// //         </Modal>
// //     );
// // }

// // export default FilterOptionsModal;


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
// import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';

// function FilterOptionsModal({ column, open, onClose }) {
//     const dispatch = useDispatch();
//     const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
//     const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
//     const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

//     const handleSelectAllChange = (event) => {
//         const isChecked = event.target.checked;
//         dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
//         dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? [...filterOptions] : [] }));
//     };

//     const handleCheckboxChange = (option) => {
//         let updatedOptions = checkedOptions.includes(option)
//             ? checkedOptions.filter(item => item !== option)
//             : [...checkedOptions, option];

//         dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
//         dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
//     };

//     const handleApplyChanges = () => {
//         // Logic to apply the changes (could be dispatching another action if needed)
//         onClose();
//     };

//     return (
//         <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title">
//             <Box sx={{
//                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//                 width: 300, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 2
//             }}>
//                 <Typography id="filter-modal-title" variant="h6" sx={{ mb: 2 }}>
//                     Filter Options for {column}
//                 </Typography>
//                 <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
//                     <ListItemButton onClick={handleSelectAllChange}>
//                         <ListItemIcon>
//                             <Checkbox checked={selectAllChecked} />
//                         </ListItemIcon>
//                         Select All
//                     </ListItemButton>
//                     {filterOptions.map((option, index) => (
//                         <ListItemButton key={index} onClick={() => handleCheckboxChange(option)}>
//                             <ListItemIcon>
//                                 <Checkbox checked={checkedOptions.includes(option)} />
//                             </ListItemIcon>
//                             {option}
//                         </ListItemButton>
//                     ))}
//                 </List>
//                 <Divider sx={{ my: 2 }} />
//                 <Button variant="contained" onClick={handleApplyChanges} sx={{ mr: 1 }}>Apply</Button>
//                 <Button variant="outlined" onClick={onClose}>Close</Button>
//             </Box>
//         </Modal>
//     );
// }

// export default FilterOptionsModal;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
// import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';

// function FilterOptionsModal({ column, open, onClose }) {
//     const dispatch = useDispatch();
//     const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
//     const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
//     const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

//     // Local state to track changes
//     const [localCheckedOptions, setLocalCheckedOptions] = useState(checkedOptions);
//     const [localSelectAllChecked, setLocalSelectAllChecked] = useState(selectAllChecked);

//     useEffect(() => {
//         // Reset local state when the modal is opened or when the options change
//         setLocalCheckedOptions(checkedOptions);
//         setLocalSelectAllChecked(selectAllChecked);
//     }, [open, checkedOptions, selectAllChecked]);

//     const handleSelectAllChange = (event) => {
//         const isChecked = event.target.checked;
//         setLocalSelectAllChecked(isChecked);
//         setLocalCheckedOptions(isChecked ? [...filterOptions] : []);
//     };

//     const handleCheckboxChange = (option) => {
//         let updatedOptions = localCheckedOptions.includes(option)
//             ? localCheckedOptions.filter(item => item !== option)
//             : [...localCheckedOptions, option];

//         setLocalCheckedOptions(updatedOptions);
//         setLocalSelectAllChecked(updatedOptions.length === filterOptions.length);
//     };

//     const handleApplyChanges = () => {
//         dispatch(setCheckedOptionsForColumn({ column, options: localCheckedOptions }));
//         dispatch(setSelectAllCheckedForColumn({ column, isChecked: localSelectAllChecked }));
//         onClose();
//     };

//     const handleClose = () => {
//         // Reset to the original state when closing without applying changes
//         setLocalCheckedOptions(checkedOptions);
//         setLocalSelectAllChecked(selectAllChecked);
//         onClose();
//     };

//     return (
//         <Modal open={open} onClose={handleClose} aria-labelledby="filter-modal-title">
//             <Box sx={{
//                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//                 width: 300, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 2
//             }}>
//                 <Typography id="filter-modal-title" variant="h6" sx={{ mb: 2 }}>
//                     Filter Options for {column}
//                 </Typography>
//                 <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
//                     <ListItemButton onClick={handleSelectAllChange}>
//                         <ListItemIcon>
//                             <Checkbox checked={localSelectAllChecked} />
//                         </ListItemIcon>
//                         Select All
//                     </ListItemButton>
//                     {filterOptions.map((option, index) => (
//                         <ListItemButton key={index} onClick={() => handleCheckboxChange(option)}>
//                             <ListItemIcon>
//                                 <Checkbox checked={localCheckedOptions.includes(option)} />
//                             </ListItemIcon>
//                             {option}
//                         </ListItemButton>
//                     ))}
//                 </List>
//                 <Divider sx={{ my: 2 }} />
//                 <Button variant="contained" onClick={handleApplyChanges} sx={{ mr: 1 }}>Apply</Button>
//                 <Button variant="outlined" onClick={handleClose}>Close</Button>
//             </Box>
//         </Modal>
//     );
// }

// export default FilterOptionsModal;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';

function FilterOptionsModal({ column, open, onClose }) {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
    const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
    const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

    // Local state to track changes
    const [localCheckedOptions, setLocalCheckedOptions] = useState(checkedOptions);
    const [localSelectAllChecked, setLocalSelectAllChecked] = useState(selectAllChecked);

    useEffect(() => {
        // Reset local state when the modal is opened or when the options change
        setLocalCheckedOptions(checkedOptions);
        setLocalSelectAllChecked(selectAllChecked);
    }, [open, checkedOptions, selectAllChecked]);

    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setLocalSelectAllChecked(isChecked);
        setLocalCheckedOptions(isChecked ? [...filterOptions] : []);
    };

    const handleCheckboxChange = (option) => {
        let updatedOptions = localCheckedOptions.includes(option)
            ? localCheckedOptions.filter(item => item !== option)
            : [...localCheckedOptions, option];

        setLocalCheckedOptions(updatedOptions);
        setLocalSelectAllChecked(updatedOptions.length === filterOptions.length);
    };

    const handleApplyChanges = () => {
        dispatch(setCheckedOptionsForColumn({ column, options: localCheckedOptions }));
        dispatch(setSelectAllCheckedForColumn({ column, isChecked: localSelectAllChecked }));
        onClose();
    };

    const handleClose = () => {
        // Reset to the original state when closing without applying changes
        setLocalCheckedOptions(checkedOptions);
        setLocalSelectAllChecked(selectAllChecked);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="filter-modal-title">
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 370, bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: 1
            }}>
                <Typography id="filter-modal-title" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                    Filter Options for {column}
                </Typography>
                <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
                     <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
                    
                        <ListItemIcon>
                            <Checkbox checked={localSelectAllChecked} />
                        </ListItemIcon>
                        <Typography variant="body2">Select All</Typography>
                    </ListItemButton>
                    {filterOptions.map((option, index) => (
                        <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
                            <ListItemIcon>
                                <Checkbox checked={localCheckedOptions.includes(option)} />
                            </ListItemIcon>
                            <Typography variant="body2">{option}</Typography>
                        </ListItemButton>
                    ))}
                </List>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" onClick={handleApplyChanges} sx={{ mr: 1, flex: 1 }}>Apply</Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default FilterOptionsModal;
