// // import React, { useEffect, useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import FormControl from "@mui/material/FormControl";
// // import InputLabel from "@mui/material/InputLabel";
// // import NativeSelect from "@mui/material/NativeSelect";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import Checkbox from "@mui/material/Checkbox";
// // import ListItemText from "@mui/material/ListItemText";
// // import { setCheckedOptions } from "../../features/Dashboard-Slice/chartSlice";
// // import { uploadAudioFile, fetchFilterOptionsAPI } from '../../utils/api';
// // function CustomFilter() {
// //     const dispatch = useDispatch();
// //     const xAxis = useSelector(state => state.chart.xAxis);
// //     const yAxis = useSelector(state => state.chart.yAxis);
// //     const [filterOptions, setFilterOptions] = useState([]);
// //     const [selectedFilters, setSelectedFilters] = useState([]);

// //     // Fetch available filter options dynamically
// //     useEffect(() => {
// //         if (xAxis || yAxis) {
// //             fetchFilterOptionsAPI(xAxis, yAxis).then((response) => {
// //                 setFilterOptions(response.data);
// //             }).catch((error) => {
// //                 console.error("Error fetching filter options:", error);
// //             });
// //         }
// //     }, [xAxis, yAxis]);

// //     // Handle filter selection
// //     const handleFilterChange = (option) => {
// //         const newSelectedFilters = selectedFilters.includes(option)
// //             ? selectedFilters.filter(item => item !== option)
// //             : [...selectedFilters, option];

// //         setSelectedFilters(newSelectedFilters);
// //         dispatch(setCheckedOptions(newSelectedFilters));  // Dispatch selected filters to Redux
// //     };

// //     return (
// //         <div>
// //             <FormControl style={{ width: "200px", margin: "10px" }}>
// //                 <InputLabel>Filter By</InputLabel>
// //                 <NativeSelect>
// //                     {filterOptions.map((option, index) => (
// //                         <option key={index} value={option}>
// //                             {option}
// //                         </option>
// //                     ))}
// //                 </NativeSelect>
// //             </FormControl>

// //             {/* Display Filter Options as Checkboxes */}
// //             <List>
// //                 {filterOptions.map((option) => (
// //                     <ListItem key={option} button onClick={() => handleFilterChange(option)}>
// //                         <Checkbox checked={selectedFilters.includes(option)} />
// //                         <ListItemText primary={option} />
// //                     </ListItem>
// //                 ))}
// //             </List>
// //         </div>
// //     );
// // }

// // export default CustomFilter;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import NativeSelect from "@mui/material/NativeSelect";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Checkbox from "@mui/material/Checkbox";
// import ListItemText from "@mui/material/ListItemText";
// import { setCheckedOptions } from "../../features/Dashboard-Slice/chartSlice";
// import { fetchFilterOptionsAPI } from "../../utils/api";

// function CustomFilter() {
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);

//     const [filterOptions, setFilterOptions] = useState([]);
//     const [selectedFilters, setSelectedFilters] = useState([]);
//     const [selectedFilter, setSelectedFilter] = useState("");

//     // Fetch available filter options dynamically
//     useEffect(() => {
//         if (xAxis || yAxis) {
//             fetchFilterOptionsAPI(xAxis, yAxis)
//                 .then((response) => {
//                     console.log("Filter options fetched:", response.data);
//                     setFilterOptions(response.data || []); // Ensure data is an array
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching filter options:", error);
//                 });
//         }
//     }, [xAxis, yAxis]);

//     // Handle selection from NativeSelect dropdown
//     const handleFilterSelect = (event) => {
//         setSelectedFilter(event.target.value);
//     };

//     // Handle checkbox selection
//     const handleFilterChange = (option) => {
//         setSelectedFilters((prev) => {
//             const newSelectedFilters = prev.includes(option)
//                 ? prev.filter((item) => item !== option)
//                 : [...prev, option];

//             dispatch(setCheckedOptions(newSelectedFilters)); // Dispatch selected filters to Redux
//             return newSelectedFilters;
//         });
//     };

//     return (
//         <div>
//             {/* Dropdown to select a filter */}
//             <FormControl style={{ width: "200px", margin: "10px" }}>
//                 <InputLabel>Filter By</InputLabel>
//                 <NativeSelect value={selectedFilter} onChange={handleFilterSelect}>
//                     <option value="">Select</option>
//                     {filterOptions.map((option, index) => (
//                         <option key={index} value={option}>
//                             {option}
//                         </option>
//                     ))}
//                 </NativeSelect>
//             </FormControl>

//             {/* Display Filter Options as Checkboxes */}
//             <List>
//                 {filterOptions.map((option) => (
//                     <ListItem key={option} button onClick={() => handleFilterChange(option)}>
//                         <Checkbox checked={selectedFilters.includes(option)} />
//                         <ListItemText primary={option} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// }

// export default CustomFilter;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import NativeSelect from "@mui/material/NativeSelect";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Checkbox from "@mui/material/Checkbox";
// import ListItemText from "@mui/material/ListItemText";
// import { setCheckedOptions } from "../../features/Dashboard-Slice/chartSlice";
// import { fetchFilterOptionsAPI } from "../../utils/api";

// function CustomFilter() {
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);

//     const [filterOptions, setFilterOptions] = useState([]);
//     const [selectedFilters, setSelectedFilters] = useState([]);
//     const [selectedFilter, setSelectedFilter] = useState("");
//     const databaseName = localStorage.getItem('company_name');
//     const selectedUser = localStorage.getItem('selectedUser');
//     const selectedTable = localStorage.getItem('selectedTable');
//     // Fetch available filter options dynamically
//     useEffect(() => {
//         if (xAxis || yAxis) {
//           const fetchFilterOptions = async (columnName) => {
//                  try {
//                      const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName, selectedUser);
//                      dispatch(setFilterOptions(options));
//                      dispatch(setCheckedOptions(options));
//                  } catch (error) {
//                      console.error('Failed to fetch filter options:', error);
//                  }
//              };
         
//                 .then((response) => {
//                     console.log("Filter options fetched:", response.data); // ✅ Debugging log
//                     if (Array.isArray(response.data) && response.data.length > 0) {
//                         setFilterOptions(response.data);
//                     } else {
//                         console.warn("No filter options available.");
//                         setFilterOptions([]); // Ensure it's an empty array if no data
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching filter options:", error);
//                     setFilterOptions([]); // Handle errors gracefully
//                 });
//         }
//     }, [xAxis, yAxis]);

//     // Handle selection from NativeSelect dropdown
//     const handleFilterSelect = (event) => {
//         setSelectedFilter(event.target.value);
//     };

//     // Handle checkbox selection
//     const handleFilterChange = (option) => {
//         setSelectedFilters((prev) => {
//             const newSelectedFilters = prev.includes(option)
//                 ? prev.filter((item) => item !== option)
//                 : [...prev, option];

//             dispatch(setCheckedOptions(newSelectedFilters)); // Dispatch selected filters to Redux
//             return newSelectedFilters;
//         });
//     };

//     return (
//         <div>
//             {/* Dropdown to select a filter */}
//             <FormControl style={{ width: "200px", margin: "10px" }}>
//                 <InputLabel>Filter By</InputLabel>
//                 <NativeSelect value={selectedFilter} onChange={handleFilterSelect}>
//                     <option value="">Select</option>
//                     {filterOptions.map((option, index) => (
//                         <option key={index} value={option}>
//                             {option}
//                         </option>
//                     ))}
//                 </NativeSelect>
//             </FormControl>

//             {/* Display Filter Options as Checkboxes */}
//             {filterOptions.length > 0 ? (
//                 <List>
//                     {filterOptions.map((option) => (
//                         <ListItem key={option} button onClick={() => handleFilterChange(option)}>
//                             <Checkbox checked={selectedFilters.includes(option)} />
//                             <ListItemText primary={option} />
//                         </ListItem>
//                     ))}
//                 </List>
//             ) : (
//                 <p>No filter options available.</p> // Show message if no filters are available
//             )}
//         </div>
//     );
// }

// export default CustomFilter;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { setCheckedOptions } from "../../features/Dashboard-Slice/chartSlice";
import { fetchFilterOptionsAPI } from "../../utils/api";

function CustomFilter() {
    const dispatch = useDispatch();
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);

    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    const databaseName = localStorage.getItem("company_name");
    const selectedUser = localStorage.getItem("selectedUser");
    const selectedTable = localStorage.getItem("selectedTable");

    useEffect(() => {
      if (xAxis || yAxis) {
          const fetchFilterOptions = async (columnName) => {
              try {
                  const response = await fetchFilterOptionsAPI(
                      databaseName,
                      selectedTable,
                      columnName,
                      selectedUser
                  );
  
                  console.log("API Response:", response); // Log full API response
                   // Check if data is an array
                  // if (Array.isArray(response.data)) {
                  //   setFilterOptions(response.data);
                  //   dispatch(setCheckedOptions(response.data));
                    console.log("Filter Data:", response);
                // } else {
                    // console.warn("Unexpected API response format:", response.data);
                // }
                
                  if (Array.isArray(response) && response.length > 0) {
                      setFilterOptions(response);
                      dispatch(setCheckedOptions(response));
                  } else {
                      console.warn("No filter options available.");
                      setFilterOptions([]);
                  }
              } catch (error) {
                  console.error("Error fetching filter options:", error);
                  setFilterOptions([]);
              }
          };
  
          fetchFilterOptions(xAxis); // Pass xAxis as columnName
      }
  }, [xAxis, yAxis, databaseName, selectedTable, selectedUser, dispatch]);
  

    // Handle selection from NativeSelect dropdown
    const handleFilterSelect = (event) => {
        setSelectedFilter(event.target.value);
    };

    // Handle checkbox selection
    const handleFilterChange = (option) => {
        setSelectedFilters((prev) => {
            const newSelectedFilters = prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option];

            dispatch(setCheckedOptions(newSelectedFilters)); // Dispatch selected filters to Redux
            return newSelectedFilters;
        });
    };

    return (
        <div>
            {/* Dropdown to select a filter */}
            <FormControl style={{ width: "200px", margin: "10px" }}>
                <InputLabel>Filter By</InputLabel>
                <NativeSelect value={selectedFilter} onChange={handleFilterSelect}>
                    <option value="">Select</option>
                    {filterOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>

            {/* Display Filter Options as Checkboxes */}
            {filterOptions.length > 0 ? (
                <List>
                    {filterOptions.map((option) => (
                        <ListItem key={option} button onClick={() => handleFilterChange(option)}>
                            <Checkbox checked={selectedFilters.includes(option)} />
                            <ListItemText primary={option} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <p>No filter options available.</p> // Show message if no filters are available
            )}
        </div>
    );
}

export default CustomFilter;
