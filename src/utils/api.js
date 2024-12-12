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
  user_id,company_name,selectedTable,  databaseName,  xAxis,  yAxis,  aggregate,  chartType,  barColor,  chart_heading,  dashboardBarColor,  checkedOptions,  saveName,
}) => {
  const response = await axios.post(`${API_URL}/save_data`, {
    user_id,company_name,selectedTable,    databaseName,    xAxis,    yAxis,    aggregate,    chartType,    chartColor: barColor,    chart_heading: chart_heading,    drillDownChartColor: dashboardBarColor,    filterOptions: checkedOptions.join(', '),    saveName,
  });
  return response.data;
};


export const plot_chart = async (data) => {
  const response = await axios.post('http://localhost:5000/plot_chart', data);
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


export const fetchTotalRows = createAsyncThunk('chart/fetchTotalRows', async () => {
  const response = await axios.get(`${API_URL}/total_rows`);
  return response.data;
});

export const fetchChartData = createAsyncThunk('chart/fetchChartData', async (chartName) => {
  const response = await axios.get(`${API_URL}/chart_data/${chartName}`);
  return response.data;
});


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


export const fetchDashboardTotalRows = createAsyncThunk('chart/fetchDashboardTotalRows', async () => {
  const response = await axios.get(`${API_URL}/saved_dashboard_total_rows`);
  return response.data;
});

export const fetchDashboardData = createAsyncThunk('chart/fetchDashboardData', async (dashboard_names) => {
  const response = await axios.get(`http://localhost:5000/Dashboard_data/${dashboard_names}`);
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
    const response = await axios.get('http://localhost:5000/table_names', {
      params: { databaseName },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw error; // Rethrow to handle in the caller
  }
};


export const fetchColumnsAPI = async (tableName, databaseName) => {
  try {
    const response = await axios.get(`http://localhost:5000/column_names/${tableName}`, {
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
    const response = await axios.post('http://localhost:5000/join-tables', payload);
    return response.data;
  } catch (error) {
    console.error('Error performing join:', error);
    throw error; // Rethrow to handle errors in the caller
  }
};
