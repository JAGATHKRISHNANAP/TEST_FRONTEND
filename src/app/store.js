import { configureStore } from '@reduxjs/toolkit';
import csvFileReducer from '../features/csvFile/csvFileSlice';
import  excelFileReducer  from '../features/excelFileSlice/excelFileSlice';
import audioFileReducer from '../features/audioFile/audioFileSlice';



import loadCsvFileReducer from '../features/csvFile/LoadCsvFileSlice';
import loadExcelFileReducer from '../features/excelFileSlice/LoadExcelFileSlice';
import loadJsonFileReducer from '../features/jsonFileSlice/LoasJsonFileSlice';

import chartReducer from '../features/Dashboard-Slice/chartSlice';

import dual_axis_chartReducer from '../features/Dashboard-Slice/dualAxisSlice';

import tableReducer from '../features/Dashboard-Slice/dashboardtableSlice';
import chartTypeReducer from '../features/Dashboard-Slice/chartTypeSlice';

import colorReducer from '../features/Charts/colorSlice';
// import barColorReducer from '../features/Charts/barColorSlice';

// import totalRowsReducer from '../features/EditChart/totalRowsSlice';
import chartDataReducer from '../features/EditChart/EditChartSlice';
import viewChartSliceReducer from '../features/ViewChartSlice/viewChartSlice';
import viewDashboardSliceReducer from '../features/viewDashboardSlice/viewDashboardSlice';

import databaseReducer from '../features/load/databaseSlice';

import clickedCatagoryReducer from '../features/drillDownChartSlice/drillDownChartSlice';

import toolTipReducer from '../features/ToolTip/toolTipSlice';
import calculationReducer from '../features/calculation-Slice/calculation-Slice';
import  signupReducer  from '../features/signUp/signUpSlice';
// import fetchedChartDataReducer from '../features/fetchChartDataForView/fetchChartDataSlice';

import loginReducer from '../features/login/loginSlice';
import aichartReducer from '../features/aiCharts/aiChartSlice'; 
import ChartPossitionReducer from '../features/viewDashboardSlice/dashboardpossitionslice';


const store = configureStore({
  reducer: {

    login: loginReducer,



    csvFile: csvFileReducer,
    excelFile: excelFileReducer,
    
    audioFile: audioFileReducer,

    loadCsv: loadCsvFileReducer,
    loadExcel: loadExcelFileReducer,
    jsonFile: loadJsonFileReducer,



    dashboard: tableReducer,
    chart: chartReducer,
    dual_axis_chart: dual_axis_chartReducer,


    chartType: chartTypeReducer,
    chartColor: colorReducer,
    // barColor: barColorReducer,

    // totalRows: totalRowsReducer,
    chartdata: chartDataReducer,
    viewcharts: viewChartSliceReducer,
    viewdashboard: viewDashboardSliceReducer,

    
    database: databaseReducer,

    drillDownChart: clickedCatagoryReducer,


    toolTip: toolTipReducer,

    calculation: calculationReducer,
    signup: signupReducer,

    // fetchedChartData: fetchedChartDataReducer,
    aicharts: aichartReducer,

    viewchartspostion: ChartPossitionReducer,
  },
});

export default store;








// import { configureStore } from '@reduxjs/toolkit';
// import aichartReducer from '../features/aiCharts/aiChartSlice'; 


// const store = configureStore({
//   reducer: {
//     // fetchedChartData: fetchedChartDataReducer,
//     aicharts: aichartReducer,
//   },
// });

// export default store;
