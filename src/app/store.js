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
import chartDataReducer from '../features/EditChart/EditChartSlice';
import viewChartSliceReducer from '../features/ViewChartSlice/viewChartSlice';
import viewDashboardSliceReducer from '../features/viewDashboardSlice/viewDashboardSlice';
import databaseReducer from '../features/load/databaseSlice';
import clickedCatagoryReducer from '../features/drillDownChartSlice/drillDownChartSlice';
import toolTipReducer from '../features/ToolTip/toolTipSlice';
import calculationReducer from '../features/calculation-Slice/calculation-Slice';
import  signupReducer  from '../features/signUp/signUpSlice';
import loginReducer from '../features/login/loginSlice';
import aichartReducer from '../features/aiCharts/aiChartSlice'; 

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
    chartdata: chartDataReducer,
    viewcharts: viewChartSliceReducer,
    viewdashboard: viewDashboardSliceReducer,
    database: databaseReducer,
    drillDownChart: clickedCatagoryReducer,
    toolTip: toolTipReducer,
    calculation: calculationReducer,
    signup: signupReducer,
    aicharts: aichartReducer,
  },
});

export default store;