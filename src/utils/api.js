import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL= 'http://localhost:5000'
// const API_URL='http://43.204.149.125:5000'

export const uploadExcelFile = async (user_id,file, primaryKeyColumnName,company_database,selectedSheet) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('file', file);
  formData.append('primaryKeyColumnName', primaryKeyColumnName);
  formData.append('company_database', company_database);
  formData.append('selectedSheets', JSON.stringify(selectedSheet)); 

  
  const response = await axios.post(`${API_URL}/uploadexcel`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log("response data",response.data)
  
  return response.data;
};


export const uploadCsvApi = async (file) => {

  const formData = new FormData();
  formData.append('file', file);

  // Get company_database from localStorage and append to formData
  const company_database = localStorage.getItem('company_name');
  formData.append('company_database', company_database);

  return axios.post(`${API_URL}/uploadcsv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const AiMLchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ai_ml_chartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};



export const uploadAudioApi = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/upload_audio_file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.transcription;
};



export const generateChartData = async (selectedTable, xAxis, yAxis, aggregate, chartType, filterOptions, databaseName) => {
  const xAxisColumns = xAxis.join(', ');
  const filterOptionsString = filterOptions.join(', ');

  try {
    const response = await axios.post(`${API_URL}/edit_plot_chart`, {
      selectedTable,
      xAxis: xAxisColumns,
      yAxis,
      aggregate,
      chartType,
      filterOptions: filterOptionsString,
      databaseName,
    });
    return response.data;
  } catch (error) {
    console.error('Error in generateChartData API:', error);
    throw error;
  }
};


export const sendCategoryToBackend = async (category, xAxis, yAxis, tableName, aggregation) => {
  try {
    const response = await axios.post(`${API_URL}/your-backend-endpoint`, {
      category,
      xAxis,
      yAxis,
      tableName,
      aggregation,
    });
    return response.data;
  } catch (error) {
    console.error('Error in sendCategoryToBackend API:', error);
    throw error;
  }
};


export const generateDualAxisChartApi = async ({
  selectedTable,
  xAxis,
  yAxis,
  barColor,
  aggregate,
  chartType,
  checkedOptions,
}) => {
  const xAxisColumns = xAxis.join(', ');
  const databaseName = localStorage.getItem('company_name');

  const response = await axios.post(`${API_URL}/plot_dual_axis_chart`, {
    selectedTable,
    xAxis: xAxisColumns,
    yAxis,
    barColor,
    aggregate,
    chartType,
    filterOptions: checkedOptions.join(', '),
    databaseName,
  });

  return response.data;
};


export const saveDataToDatabase = async ({
  user_id,company_name,selectedTable,  databaseName,  xAxis,  yAxis,  aggregate,  chartType,  barColor,  chart_heading,  dashboardBarColor,  checkedOptions,  saveName,
}) => {
  const response = await axios.post(`${API_URL}/save_data`, {
    user_id,company_name,selectedTable,    databaseName,    xAxis,    yAxis,    aggregate,    chartType,    chartColor: barColor,    chart_heading: chart_heading,    drillDownChartColor: dashboardBarColor,    filterOptions: checkedOptions.join(', '),    saveName,
  });
  return response.data;
};



// export const yourBackendEndpointApi = async (clickedCategory, xAxis, yAxis, selectedTable, aggregate) => {
//   try {
//     const response = await axios.post(`${API_URL}/your-backend-endpoint`, {
//       category: clickedCategory,
//       xAxis: xAxis,
//       yAxis: yAxis,
//       tableName: selectedTable,
//       aggregation: aggregate
//     });
//     return response.data; // Return the response data to handle it in the component
//   } catch (error) {
//     console.error('Error sending category to backend:', error);
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// };


export const fetchHierarchialDrilldownDataAPI = async ({
  clickedCategory,
  xAxis,
  yAxis,
  selectedTable,
  aggregate,
  databaseName,
  currentLevel,
}) => {
  try {
    const response = await axios.post(`${API_URL}/Hierarchial-backend-endpoint`, {
      category: clickedCategory,
      xAxis: xAxis,
      yAxis: yAxis,
      tableName: selectedTable,
      aggregation: aggregate,
      databaseName: databaseName,
      currentLevel: currentLevel,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error sending category to backend:', error);
    throw error; // Rethrow the error for handling
  }
};



export const fetchPredictionDataAPI = async ({ xAxis, yAxis, timePeriod, number }) => {
  try {
      const response = await axios.post(`${API_URL}/api/predictions`, {
          xAxis: xAxis,
          yAxis: yAxis,
          timePeriod: timePeriod,
          number: number,
      });
      return response.data; // Return the response data to the calling function
  } catch (error) {
      console.error("Error fetching prediction data:", error);
      throw error; // Rethrow the error for handling in the calling function
  }
};

export const fetchFilterOptionsAPI = async (databaseName, selectedTable, columnName,xAxis) => {
  console.log('Fetching filter options for:', databaseName, selectedTable, columnName);
  try {
    const response = await axios.get(`${API_URL}/plot_chart/${selectedTable}/${columnName}`, {
      params: { databaseName,xAxis }
    });
    const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
    return options; // Return options for handling in the calling function
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


export const sendChartDetails = async (data, position) => {
  try {
    const response = await axios.post(`${API_URL}/api/send-chart-details`, {
      chart_id: data[0],
      tableName: data[1],
      x_axis: data[2],
      y_axis: data[3],
      aggregate: data[4],
      chart_type: data[5],
      chart_heading: data[7],
      filter_options: data[9],
      databaseName: data[10],
      position, // Send position to backend
    });

    return response.data;
  } catch (error) {
    console.error('Error sending chart details to backend:', error);
    throw error;
  }
};

export const plot_chart = async (data) => {
  const response = await axios.post(`${API_URL}/plot_chart`, data);
  return response.data;
};


export const submitCalculationData = async (data, setReloadColumns) => {
  const response = await axios.post(`${API_URL}/api/calculation`, data);
  console.log('Calculation data submitted:', response.data);
  setReloadColumns(prevState => !prevState); // Toggle the state to trigger reload
  return response.data;
};


export const signUp = async (userDetails) => {
  const response = await fetch(`${API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  });
  return response.json();
};


export const fetchUserdata = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/signUP_username`);
    return response.data;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    throw error;
  }
};


export const signIn = async (email, password,company) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      company: company,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};



export const fetchTotalRows = createAsyncThunk('chart/fetchTotalRows', async (user_id) => {
  const response = await axios.get(`${API_URL}/total_rows`,
    {params:{user_id:user_id},});
  return response.data;
});

export const fetchDashboardTotalRows = createAsyncThunk('chart/fetchDashboardTotalRows', async (user_id) => {
  const response = await axios.get(`${API_URL}/saved_dashboard_total_rows`,{params:{user_id:user_id},});
  return response.data;
});


export const fetchChartData = createAsyncThunk('chart/fetchChartData', async (chartName) => {
  const response = await axios.get(`${API_URL}/chart_data/${chartName}`);
  return response.data;
});

export const fetchSingleChartData = async (chartName) => {
  try {
    const response = await axios.get(`${API_URL}/chart_data/${chartName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for Chart ${chartName}:`, error);
    throw new Error(`Failed to fetch data for Chart ${chartName}`);
  }
};


export const sendTestChartData = async (text_y_xis, text_y_database,text_y_table, text_y_aggregate) => {
  try {
    const response = await axios.post(`${API_URL}/api/singlevalue_text_chart`, {
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};


export const sendChartData = async (chart_id,text_y_xis, text_y_database,text_y_table, text_y_aggregate) => {
  try {
    const response = await axios.post(`${API_URL}/api/text_chart`, {
      chart_id,
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};


export const sendClickedCategory = async (category,charts,x_axis) => {
  try {
    const response = await axios.post(`${API_URL}/api/handle-clicked-category`, {
      category,
      charts,// Initialize the charts array
      x_axis
    });
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error sending clicked category to backend:', error);
    throw error;  // Rethrow the error for handling in the calling component
  }
};


export const saveAllCharts = async (user_id,chartData,dashboardfilterXaxis,selectedCategory,fileName,company_name) => {
  try {
    await axios.post(`${API_URL}/save_all_chart_details`, {
      user_id: user_id,
      charts: chartData,  // Sending chartData directly to the backend
      dashboardfilterXaxis,
      selectedCategory,
      fileName,
      company_name

    });
    alert('All chart details saved successfully!');
  } catch (error) {
    console.error('Error saving chart details:', error);
    alert('Failed to save chart details. Please try again later.');
  }
};



export const fetchDashboardData = createAsyncThunk('chart/fetchDashboardData', async (dashboard_names) => {
  const response = await axios.get(`${API_URL}/Dashboard_data/${dashboard_names}`);
  console.log("response",response.data)
  return response.data;
});


export const userSignUp = async (registerType,userDetails) => {
  try {
    // Sending a POST request to the Flask backend
    const response = await axios.post(`${API_URL}/api/usersignup`, {registerType,userDetails});
    return response.data; // Return the response from the server
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};



export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/companies`);
    console.log("response",response.data)
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error; // Rethrow the error to be handled in the component
  }
};

export const fetchRoles= async () => {
  try {
    const response = await axios.get(`${API_URL}/api/roles`);
    console.log("response",response.data)
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error; // Rethrow the error to be handled in the component
  }
};

export const fetchHelloData = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetchglobeldataframe`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};



export const AichartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/aichartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

export const BoxPlotchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/boxplotchartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};


export const fetchUserDetails = async (companyName, page, limit) => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      params: {
        companyName,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch user details');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/fetch_categories`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching categories');
  }
};

export const updateUserDetails = async (username, companyName, roleId, categoryName) => {
  console.log("Updating user:", { username, companyName, roleId, categoryName }); // Log the payload

  try {
    const response = await axios.post(`${API_URL}/api/update_user_details`, {
      username,
      companyName,
      roleId,
      categoryName
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update user details");
    throw error.response ? error.response.data : new Error('Failed to update user details');
  }
};


export const uploadAudioFile = (formData) => {
  return axios.post(`${API_URL}/nlp_upload_audio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const fetchTableNamesAPI = async (databaseName) => {
  try {
    const response = await axios.get(`${API_URL}/table_names`, {
      params: { databaseName },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw error; // Rethrow to handle in the caller
  }
};

export const fetchColumnNames = async (checkedPaths, databaseName) => {
  try {
    const response = await fetch(`${API_URL}/column_names/${checkedPaths}?databaseName=${databaseName}`);
    const data = await response.json();
    if (
      data &&
      data.numeric_columns &&
      Array.isArray(data.numeric_columns) &&
      data.text_columns &&
      Array.isArray(data.text_columns)
    ) {
      return data;
    } else {
      console.error('Invalid data structure:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching column information:', error);
    throw error; // Rethrow error for handling in the calling code
  }
};





export const fetchColumnsAPI = async (tableName, databaseName) => {
  try {
    const response = await axios.get(`${API_URL}/column_names/${tableName}`, {
      params: { databaseName },
    });
    return {
      numeric_columns: response.data.numeric_columns || [],
      text_columns: response.data.text_columns || [],
    };
  } catch (error) {
    console.error(`Error fetching columns for table ${tableName}:`, error);
    throw error; // Rethrow to handle in the caller
  }
};


export const performJoinOperation = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/join-tables`, payload);
    return response.data;
  } catch (error) {
    console.error('Error performing join:', error);
    throw error; // Rethrow to handle errors in the caller
  }
};


export const fetchEmployesName = async (companyName) => {
  try {
    const response = await fetch(`${API_URL}/api/employees?company=${companyName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Check the data structure
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const deletedashboard = (chartName) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-chart`, { data: { chart_name: chartName } });
    dispatch({ type: "DELETE_CHART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "DELETE_CHART_FAILURE", error });
  }
};

export const deleteChart = async (chartName) => {
  try {
    const response = await axios.delete(`${API_URL}/api/charts/${chartName}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting chart "${chartName}":`, error);
    throw error;
  }
};

export const isChartInDashboard = async (chartName) => {
  try {
    const response = await fetch(`${API_URL}/api/is-chart-in-dashboard?chart_name=${chartName}`);
    const data = await response.json();
    console.log('API Response for chart:', chartName, data); // Debug the API response
    return data;
  } catch (error) {
    console.error('Error checking chart usage:', error);
    return { isInDashboard: false };
  }
};

export const checkIfTableInUse = async (selectedSheet) => {
  const response = await fetch(`${API_URL}/api/checkTableUsage?tableName=${selectedSheet}`);
  const data = await response.json();
  return data.isInUse; 
};
export const fetchReportingIds = async () => {
  try {
    const companyName = localStorage.getItem('user_name');
    const response = await fetch(`${API_URL}/api/employees?company=${companyName}`);
    const data = await response.json();
    return data.map(item => ({ id: item.employee_id, name: item.employee_name }));
  } catch (error) {
    console.error('Error fetching reporting IDs:', error);
    throw new Error('Failed to fetch reporting IDs');
  }
};