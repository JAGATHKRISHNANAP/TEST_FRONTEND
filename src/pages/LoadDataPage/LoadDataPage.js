// import React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Button, Box, Container } from '@mui/material';
// import excel from '../../image/excel.png';
// import csv from '../../image/csv.png';
// import { useDispatch } from 'react-redux';
// import { setDatabaseName } from '../../features/load/databaseSlice';
// import { useLocation, useNavigate } from 'react-router-dom';
// const LoadData = () => {
// //   const [showLoadPage, setShowLoadPage] = useState(null);


//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const location = useLocation();  
//   const handleButtonClick = (dbName) => {
//     dispatch(setDatabaseName(dbName));
//     if (dbName === 'excel_database') {
//       navigate('/Load_excel_data');
//     } else if (dbName === 'csv_database') {
//       navigate('/Load_csv_data');
//     }
//   };
  
//   const isActiveRoute = (route) => {
//     return location.pathname === route;  // Check if the current path matches the route
//   };
  

//   return (
//     <React.Fragment>
//       <CssBaseline />
//         <Container sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '85vh',
//           border: '1px solid #4287f5',
//           borderRadius: '30px',
//           backgroundColor: '#ffffff'
//         }}>
//           <div className="excel-upload-container">
//             {/* <h2 className="excel-upload-heading">select to load Data Here</h2> */}
//             <form className="excel-upload-form">
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
//                 <Button variant="contained" component="label" sx={{ gap: '50px', margin: '3px' }}>
//                   <img src={excel} style={{ width: '80px', height: '80px' }} onClick={() => handleButtonClick('excel_database')}  sx={{ backgroundColor: isActiveRoute('/Create_Dashboard') ? '#c5c5c9' : 'inherit' }}></img>
//                 </Button>
//                 <Button variant="contained" component="label" sx={{ gap: '50px', margin: '3px' }}>
//                   <img src={csv} style={{ width: '80px', height: '80px' }} onClick={() => handleButtonClick('csv_database')} sx={{ backgroundColor: isActiveRoute('/Create_Dashboard') ? '#c5c5c9' : 'inherit' }}></img>
//                 </Button>
//               </Box>
//             </form>
//           </div>
//         </Container>
//     </React.Fragment>
//   );
// };
// export default LoadData;

import React from "react";

import {  Grid} from "@mui/material";
import LoadExcelFile from '../../components/load/LoadExcelFile';
import HomePage from '../HomePage';


function LoadDataPage() {
  return (
    <div className="App">
        <HomePage/>
          <Grid item xs={12} md={10}>
            <LoadExcelFile />
          </Grid>
    </div>
  );
}

export default LoadDataPage;



