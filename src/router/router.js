import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExcelUpload from '../pages/UploadPage/ExcelUploadPage';
import CsvUpload from '../pages/UploadPage/CsvUploadPage';
import AudioFile from '../pages/UploadPage/AudioUploadPage';
import LoadData from '../pages/LoadDataPage/LoadDataPage';
import EditDashboard from '../pages/EditChartPage/EditChartPage';
import Charts from '../components/viewChart/displayChart';
import LoadExcelFile from '../components/load/LoadExcelFile';

import Chartsview from '../components/viewChart/chartsView';

import LoadCsvFile from '../components/load/LoadCsvFile';
// import Dashboard from '../components/dashbord-Elements/Dashboard';
import LoginPage from '../pages/loginPage/login';  
import SignIn from '../pages/loginPage/signup';
import HomePage from '../pages/HomePage';
import DashboardView from '../pages/DashboardPage/viewDashboardPage';
// import ClientEmpData from '../components/ClientLogin/clientEmpData';
import ClientLoginHome from '../pages/clientLoginHome/clientLoginHome';
import IndexHomePage from '../pages/indexhomepage';

import JsonUpload from '../pages/UploadPage/JsonUploadPage';
import CustomDataSource from '../pages/UploadPage/customDataSource';

import User_input from '../components/user/user_input';

const AppRouter = () => {
  return (
    <Routes>
      {/* Upload Page Routes */}
      <Route path="/excel_upload" element={<ExcelUpload />} />
      <Route path="/csv_upload" element={<CsvUpload />} />
      <Route path="/audio_upload" element={<AudioFile />} />
      <Route path="/json_upload" element={<JsonUpload />} />
      <Route path="/custom_data_source" element={<CustomDataSource />} />




      {/* <Route path="/load_data" element={<LoadData />} /> */}
      <Route path="/edit_chart" element={<EditDashboard />} />
      <Route path="/create_dashboard" element={<Charts />} />

      <Route path="/Charts_view" element={<Chartsview />} />
      <Route path="/dashboard_view" element={<DashboardView />} />

      {/* Load Data Routes */}
      {/* <Route path="/load_excel_data" element={<LoadExcelFile />} />
      <Route path="/load_csv_data" element={<LoadCsvFile />} /> */}

      <Route path="/load_data" element={<LoadExcelFile />} />
      {/* <Route path="/create_dashboard" element={<Charts />} /> */}

      {/* homepage Routes */}
      <Route path="/home" element={<IndexHomePage />} />
      <Route path="/employeehome" element={<HomePage />} />




      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signClient" element={<SignIn />} />
      <Route path="/clientEmpData" element={<ClientLoginHome />} />

     



      {/* =====================GAYATHRI======================= */}
      <Route path="/user_input" element={<User_input/>} />  

    </Routes>
  );
};

export default AppRouter;
















// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import ReactDOM from 'react-dom/client';
// import { createBrowserRouter,RouterProvider } from 'react-router-dom';

// import ExcelUpload from '../pages/UploadPage/ExcelUploadPage';
// import CsvUpload from '../pages/UploadPage/CsvUploadPage';
// import AudioFile from '../pages/UploadPage/AudioUploadPage';
// import EditDashboard from '../pages/EditChartPage/EditChartPage';
// import Charts from '../components/viewChart/displayChart';
// import LoadExcelFile from '../components/load/LoadExcelFile';
// import Chartsview from '../components/viewChart/chartsView';
// import LoginPage from '../pages/loginPage/login';  
// import SignIn from '../pages/loginPage/signup';
// import HomePage from '../pages/HomePage';
// import DashboardView from '../pages/DashboardPage/viewDashboardPage';
// import ClientLoginHome from '../pages/clientLoginHome/clientLoginHome';
// import IndexHomePage from '../pages/indexhomepage';
// import JsonUpload from '../pages/UploadPage/JsonUploadPage';
// import CustomDataSource from '../pages/UploadPage/customDataSource';
// import User_input from '../components/user/user_input';

// // const AppRouter = () => {
// //   return (
// //     <Routes>
// //       {/* Upload Page Routes */}
// //       <Route path="/excel_upload" element={<ExcelUpload />} />
// //       <Route path="/csv_upload" element={<CsvUpload />} />
// //       <Route path="/audio_upload" element={<AudioFile />} />
// //       <Route path="/json_upload" element={<JsonUpload />} />
// //       <Route path="/custom_data_source" element={<CustomDataSource />} />




// //       {/* <Route path="/load_data" element={<LoadData />} /> */}
// //       <Route path="/edit_chart" element={<EditDashboard />} />
// //       <Route path="/create_dashboard" element={<Charts />} />

// //       <Route path="/Charts_view" element={<Chartsview />} />
// //       <Route path="/dashboard_view" element={<DashboardView />} />

// //       {/* Load Data Routes */}
// //       {/* <Route path="/load_excel_data" element={<LoadExcelFile />} />
// //       <Route path="/load_csv_data" element={<LoadCsvFile />} /> */}

// //       <Route path="/load_data" element={<LoadExcelFile />} />
// //       {/* <Route path="/create_dashboard" element={<Charts />} /> */}

// //       {/* homepage Routes */}
// //       <Route path="/home" element={<IndexHomePage />} />
// //       <Route path="/employeehome" element={<HomePage />} />




// //       {/* Authentication Routes */}
// //       <Route path="/login" element={<LoginPage />} />
// //       <Route path="/signClient" element={<SignIn />} />
// //       <Route path="/clientEmpData" element={<ClientLoginHome />} />

     



// //       {/* =====================GAYATHRI======================= */}
// //       <Route path="/user_input" element={<User_input/>} />  

// //     </Routes>
// //   );
// // };

// // export default AppRouter;

// const AppRouter = createBrowserRouter([
//   {
//     path: '/excel_upload',
//     element: <ExcelUpload />
//   },
//   {
//     path: '/csv_upload',
//     element: <CsvUpload />
//   },
//   {
//     path: '/audio_upload',
//     element: <AudioFile />
//   },
//   {
//     path: '/json_upload',
//     element: <JsonUpload />
//   },
//   {
//     path: '/custom_data_source',
//     element: <CustomDataSource />

//   },
//   {
//     path: '/edit_chart',
//     element: <EditDashboard />
//   },
//   {
//     path: '/create_dashboard',
//     element: <Charts />
//   },
//   {
//     path: '/Charts_view',
//     element: <Chartsview />
//   },
//   {
//     path: '/dashboard_view',  
//     element: <DashboardView />
//   },
//   {
//     path: '/load_data',
//     element: <LoadExcelFile />
//   },
//   {
//     path: '/home',
//     element: <IndexHomePage />

//   },
//   {
//     path: '/employeehome',
//     element: <HomePage />

//   },
//   {
//     path: '/signClient',
//     element: <SignIn />
//   },

//   {
//     path: '/clientEmpData',
//     element: <ClientLoginHome />
//   },
//   {
//     path: '/user_input',
//     element: <User_input />
//   },
//   {
//     path: '/login',
//     element: <LoginPage />
//   },
// ]);