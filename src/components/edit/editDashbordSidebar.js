// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// // import { fetchTotalRows, fetchChartData } from "../../features/EditChart/EditChartSlice";
// import { fetchTotalRows, fetchChartData } from '../../utils/api';
// import { Box, Button } from "@mui/material";
// import "../Style.css";

// function EditDashbordSidebar() {
//   const dispatch = useDispatch();
//   const [chartNamesArray, setChartNamesArray] = useState([]);

//   useEffect(() => {
//     console.log("Fetching total rows");
//     dispatch(fetchTotalRows())
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           setChartNamesArray(response.chart_names);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//       });
//   }, [dispatch]);

//   const handleChartButtonClick = (chartNumber, chartName) => {
//     console.log("Clicked chart name:", chartName);
//     dispatch(fetchChartData(chartName));
//   };

//   console.log("chartNamesArray:", chartNamesArray);
//   return (
//     <div className="App">
//       <Box
//         sx={{
//           display: "flex",
//           overflowX: "auto", // Enables horizontal scroll
//           whiteSpace: "nowrap", // Prevents buttons from wrapping to the next line
//           maxWidth: "100vw", // Prevents buttons from wrapping to the next line

//           // backgroundColor: "#3f51b5",
//         }}
//       >

//         {chartNamesArray.map((name, index) => (
//           <Button
//   sx={{
//     fontSize: "12px",
//     // marginTop: "2px",
//     marginLeft: "2px",
//     marginRight: "2px",
//     width: "90px",
//     height: "30px",
//     color: "white",
//     overflow: "hidden", // Ensure overflow content is hidden
//     whiteSpace: "nowrap", // Prevent text from wrapping
//     textOverflow: "ellipsis", // Show ellipsis for overflowing text
//     display: "block",
//     position: "relative", // For the scrolling effect
//     flexShrink: 0, // Prevent shrinking
//     '&:hover span': { // Activate scrolling on hover
//       animation: 'scroll 10s linear infinite' // Animation when hovered
//     }
//   }}
//   className="x-axis-column"
//   key={index + 1}
//   onClick={() => handleChartButtonClick(index + 1, name)}
// >
//   <span>{name}</span> {/* Wrap the name in a span to apply animation */}
// </Button>

//         ))}
//         <div> </div>
//       </Box>
//     </div>
//   );
// }

// export default EditDashbordSidebar;



import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { fetchTotalRows, fetchChartData } from "../../features/EditChart/EditChartSlice";
import { fetchTotalRows, fetchChartData } from '../../utils/api';
import { Box, Button } from "@mui/material";
import "../Style.css";

function EditDashbordSidebar() {
  const dispatch = useDispatch();
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [user_id, setUserId] = React.useState(sessionStorage.getItem('user_id'));
  const [lastClickedButton, setLastClickedButton] = useState(null); // State to track the last clicked button

  // useEffect(() => {
  //   console.log("Fetching total rows");
  //   dispatch(fetchTotalRows())
  //     .unwrap()
  //     .then((response) => {
  //       if (response && response.chart_names) {
  //         setChartNamesArray(response.chart_names);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching total rows:", err);
  //     });
  // }, [dispatch]);
  useEffect(() => {
    console.log("Fetching total rows");
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          // Check if chart_names is an array or an object
          if (Array.isArray(response.chart_names)) {
            setChartNamesArray(response.chart_names);
          } else if (typeof response.chart_names === 'object') {
            // Extract array from object
            const chartNames = Object.values(response.chart_names).flat(); // Flatten array if necessary
            setChartNamesArray(chartNames);
          } else {
            console.error("Unexpected format for chart_names:", response.chart_names);
            setChartNamesArray([]);  // Set to empty array if the format is unexpected
          }
        } else {
          console.error("chart_names is not present in the response:", response);
          setChartNamesArray([]);  // Set to empty array if chart_names is missing
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);  // Set to empty array in case of API error
      });
  }, [dispatch, user_id]);
  const handleChartButtonClick = (chartNumber, chartName) => {
    console.log("Clicked chart name:", chartName);
    setLastClickedButton(chartName);
    dispatch(fetchChartData(chartName));
  };

  console.log("chartNamesArray:", chartNamesArray);
  return (
    <div className="App">
      <Box
        sx={{
   position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',   justifyContent: "flex-start", // Center content horizontally
  //  alignItems: "center", // Center content vertically
   boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center',borderTop:` 2px solid grey` , paddingLeft: "10px"
 }}
      >

        {chartNamesArray.map((name, index) => (
          <Button
          sx={{
            margin: '4px',
            minWidth: '90px',
            color: 'black',
            background:'white',
            backgroundColor: 'white',
            justifyContent: 'center',
            maxHeight: '28px',
            fontSize: '12px',
            textOverflow: 'ellipsis',
            whiteSpace: "nowrap",
            padding: '6px',
            position: 'relative',
            display: 'inline-flex',
            borderRadius: '4px',
            textTransform: 'none',
            border: '2px solid #D3D3D3', 
            '&:hover': {
              backgroundColor: '#A0A0A0',
              transform: 'scale(1.05)', // Slight zoom effect for hover
            },
  }}
  className="x-axis-column"
  key={index + 1}
  onClick={() => handleChartButtonClick(index + 1, name)}
  disabled={lastClickedButton === name}
>
  <span>{name}</span> {/* Wrap the name in a span to apply animation */}
</Button>

        ))}
        <div> </div>
      </Box>
    </div>
  );
}

export default EditDashbordSidebar