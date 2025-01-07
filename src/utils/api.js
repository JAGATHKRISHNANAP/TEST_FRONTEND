import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL='http://localhost:5000'

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
  
  return response.data;
};
export const saveDataToDatabase = async ({
  user_id,company_name,selectedUser,selectedTable,  databaseName,  xAxis,  yAxis,  aggregate,  chartType,  barColor,  chart_heading,  dashboardBarColor,  checkedOptions,  saveName,
}) => {


  const response = await axios.post(`${API_URL}/save_data`, {
    user_id,company_name,selectedUser,selectedTable,    databaseName,    xAxis,    yAxis,    aggregate,    chartType,    chartColor: barColor,    chart_heading: chart_heading,    drillDownChartColor: dashboardBarColor,    filterOptions: checkedOptions.join(', '),    saveName,
  });
  return response.data;
};


export const plot_chart = async (data) => {
  const response = await axios.post('http://localhost:5000/plot_chart', data);
  console.log("response",response.data)
  return response.data;
  
};


export const submitCalculationData = async (data, setReloadColumns) => {
  const response = await axios.post('http://localhost:5000/api/calculation', data);
  console.log('Calculation data submitted:', response.data);
  setReloadColumns(prevState => !prevState); // Toggle the state to trigger reload
  return response.data;
};


export const signUp = async (userDetails) => {
  const response = await fetch('http://localhost:5000/api/signup', {
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
    const response = await axios.get('http://localhost:5000/api/signUP_username');
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
  
const company=localStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/total_rows`,
    {params:{user_id:user_id,company},});
  return response.data;
});

export const fetchChartData = createAsyncThunk('chart/fetchChartData', async (chartName) => {
  const response = await axios.get(`${API_URL}/chart_data/${chartName}`);
  return response.data;
});


export const sendTestChartData = async (text_y_xis, text_y_database,text_y_table, text_y_aggregate,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/singlevalue_text_chart`, {
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database,
      selectedUser
      
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};


export const sendChartData = async (chart_id,text_y_xis, text_y_database,text_y_table, text_y_aggregate,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/text_chart`, {
      chart_id,
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database,
      selectedUser
      
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


export const fetchDashboardTotalRows = createAsyncThunk('chart/fetchDashboardTotalRows', async (user_id) => {
  const company=localStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/saved_dashboard_total_rows`,
    {params: { user_id: user_id ,company},});
  return response.data;
});

export const fetchDashboardData = createAsyncThunk('chart/fetchDashboardData', async (dashboard_names) => {
  const response = await axios.get(`http://localhost:5000/Dashboard_data/${dashboard_names}`);
  console.log("response",response.data)
  return response.data;
});


export const userSignUp = async (registerType,userDetails,company) => {
  try {
    // Sending a POST request to the Flask backend
    company =localStorage.getItem("user_name")
    const response = await axios.post(`${API_URL}/api/usersignup`, {registerType,userDetails,company});
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
    const response = await axios.get('http://localhost:5000/api/table_names', {

      params: { databaseName },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw error; // Rethrow to handle in the caller
  }
};
// const connectionType = localStorage.getItem('connectionType');
  
export const fetchColumnsAPI = async (tableName, databaseName,connectionType) => {
  try {
    const response = await axios.get(`http://localhost:5000/column_names/${tableName}`, {
      params: { databaseName,connectionType },
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
    const response = await axios.post('http://localhost:5000/join-tables', payload);
    return response.data;
  } catch (error) {
    console.error('Error performing join:', error);
    throw error; // Rethrow to handle errors in the caller
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
    const response = await axios.delete(`http://localhost:5000/api/charts/${chartName}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting chart "${chartName}":`, error);
    throw error;
  }
};

// export const isChartInDashboard = async (chartName) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/is-chart-in-dashboard?chart_name=${chartName}`);
//     const data = await response.json();
//     console.log('API Response for chart:', chartName, data); // Debug the API response
//     return data;
//   } catch (error) {
//     console.error('Error checking chart usage:', error);
//     return { isInDashboard: false };
//   }
// };

// export const checkIfTableInUse = async (selectedSheet) => {
//   const response = await fetch(`http://localhost:5000/api/checkTableUsage?tableName=${selectedSheet}`);
//   const data = await response.json();
//   return data.isInUse; 
// };
// export const fetchReportingIds = async () => {
//   try {
//     const companyName = localStorage.getItem('user_name');
//     const response = await fetch(`http://localhost:5000/api/employees?company=${companyName}`);
//     const data = await response.json();
//     return data.map(item => ({ id: item.employee_id, name: item.employee_name }));
//   } catch (error) {
//     console.error('Error fetching reporting IDs:', error);
//     throw new Error('Failed to fetch reporting IDs');
//   }
// };

// export const fetchTableDetailsAPI = async (databaseName, selectedTable) => {
//   const response = await fetch(`http://localhost:5000/api/fetchTableDetails?databaseName=${databaseName}&selectedTable=${selectedTable}`);
//   const data = await response.json();
//   return data;
// };


export const isChartInDashboard = async (chartName) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/is-chart-in-dashboard`, {
      params: { chart_name: chartName }
    });
    console.log('API Response for chart:', chartName, response.data); // Debug the API response
    return response.data;
  } catch (error) {
    console.error('Error checking chart usage:', error);
    return { isInDashboard: false };
  }
};

export const checkIfTableInUse = async (selectedSheet) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/checkTableUsage`, {
      params: { tableName: selectedSheet }
    });
    return response.data.isInUse;
  } catch (error) {
    console.error('Error checking table usage:', error);
    throw new Error('Failed to check table usage');
  }
};

export const fetchReportingIds = async () => {
  try {
    const companyName = localStorage.getItem('user_name');
    const response = await axios.get(`http://localhost:5000/api/employees`, {
      params: { company: companyName }
    });
    return response.data.map(item => ({ id: item.employee_id, name: item.employee_name }));
  } catch (error) {
    console.error('Error fetching reporting IDs:', error);
    throw new Error('Failed to fetch reporting IDs');
  }
};

export const fetchTableDetailsAPI = async (databaseName, selectedTable) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/fetchTableDetails`, {
      params: { databaseName, selectedTable }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table details:', error);
    throw new Error('Failed to fetch table details');
  }
};
// utils/api.js

export const fetchTableNamesFromExternalDB = async (databaseName,selectedUser) => {
  const response = await fetch(`${API_URL}/external-db/tables?databaseName=${databaseName}&user=${selectedUser}`);
  if (!response.ok) {
    throw new Error('Failed to fetch table names');
  }
  return await response.json();
};

export const fetchTableDetailsFromExternalDB = async (selectedTable,databaseName, selectedUser) => {
  const response = await fetch(`${API_URL}/external-db/tables/${selectedTable}?databaseName=${databaseName}&user=${selectedUser}`);
  if (!response.ok) {
    throw new Error('Failed to fetch table details');
  }
  return await response.json();
};

// export const fetchUsers = async (databaseName) => {
//   try {
//     console.log("Fetching users for database:", databaseName);
//     const response = await axios.get(`${API_URL}/api/users`, {
//     params: { databaseName }, // Check this

//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };


// export const fetchUsers = async (databaseName) => {
//   const response = await fetch(`${API_URL}/api/users`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch table names');
//   }
//   return await response.json();
// };

export const fetchUsers = async (databaseName) => {
  try {
    console.log("Fetching users for database:", databaseName);
    const response = await axios.get(`${API_URL}/api/dbusers`, {
      params: { databaseName },
    });
    console.log("Fetched users:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
