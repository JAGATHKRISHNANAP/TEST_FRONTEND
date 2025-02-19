import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userSignUp, fetchCompanies, fetchRoles,fetchReportingIds } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Container, Card, TextField, Button, Snackbar,Link,
  Alert, Typography, Grid, CssBaseline
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/CloudUpload';
import EditUserDetails from './EditUserDetails';
import UploadUserInput from './UploadUserInput';

const defaultTheme = createTheme();

export default function SignUp() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = location.state || {};
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showManualForm, setShowManualForm] = useState(true);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [componentKey, setComponentKey] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [selected, setSelected] = useState(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [employees, setEmployees] = useState([]);
  const [reportingIds, setReportingIds] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    roleId: '',
    company: '',
    userName: '',
    email: '',
    password: '',
    retypePassword: '',
    categories: [],
    reportingId: '',
  });
  

  useEffect(() => {
    const storedCompanyName = location.state?.companyName || sessionStorage.getItem('user_name');
    
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    } else {
      console.error('Company name is not available in session storage or location state.');
    }
  }, [location.state]);
  useEffect(() => {
    const storedCompanyName = localStorage.getItem('user_name');
    setIsLoggedIn(!!sessionStorage.getItem('session_id'));
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, []);

  useEffect(() => {
    if (company) {
      setFormData((prevData) => ({ ...prevData, company }));
    }
  }, [company]);

  useEffect(() => {
    const loadCompanies = async (companyName) => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    const loadReportingIds = async () => {
      try {
        // Fetch reporting IDs from the API or static data
        const data = await fetchReportingIds(); // Assuming this function is available
        setReportingIds(data);
      } catch (error) {
        console.error('Error fetching reporting IDs:', error);
      }
    };
  
    loadReportingIds();
    loadCompanies();
    loadRoles();
  }, []);
  // const fetchReportingIds = async () => {
  //   const storedCompanyName = localStorage.getItem('user_name');
  //   const response = await fetch(`http://localhost:5000/api/employees?company=${storedCompanyName}`);
  //   const data = await response.json();
  //   console.log(data); // Confirm structure
  //   return data.map(item => ({ id: item.employee_id, name: item.employee_name }));
  // };
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddCategory = () => {
    if (categoryInput.trim() !== '') {
      setFormData({
        ...formData,
        categories: [...formData.categories, categoryInput.trim()],
      });
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1);
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userDetails = {
      employeeName: formData.employeeName,
      roleId: formData.roleId,
      company: companyName,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      retypePassword: formData.retypePassword,
      categories: formData.categories,
      reportingId: formData.reportingId, // Include Reporting ID
    };
  
    if (!userDetails.employeeName || userDetails.employeeName.trim().length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage('Employee name must be at least 3 characters long.');
      setOpen(true);
      return;
    }
  
    if (!validateEmail(userDetails.email)) {
      setEmailError(true);
      setEmailErrorMessage('Invalid email format');
      setOpen(true);
      return;
    }
  
    if (userDetails.password !== userDetails.retypePassword) {
      setPasswordError(true);
      setPasswordErrorMessage('Passwords do not match');
      setOpen(true);
      return;
    }
  
    try {
      const response = await userSignUp('manual', userDetails);
      if (response.message === 'User and categories created successfully') {
        setOpen(true);
        setPasswordError(false);
        setPasswordErrorMessage('User registered successfully!');
  
        // Reset form data
        setFormData({
          employeeName: '',
          roleId: '',
          company: '',
          userName: '',
          email: '',
          password: '',
          retypePassword: '',
          categories: [],
          reportingId:''
        });
  
        setCategoryInput(''); // Clear category input field
        setComponentKey((prevKey) => prevKey + 1); // Change the key to reload the component
      } else {
        setPasswordError(true);
        setPasswordErrorMessage(response.message || 'Unknown error occurred');
        setOpen(true);
      }
    } catch (error) {
      // Print backend error message
      console.error("Backend Error:", error.message);
      setPasswordError(true);
      setPasswordErrorMessage(error.message);
      setOpen(true);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            bgcolor: 'white',
            minHeight: '20px',
            maxWidth: '700 px',
            mt: 5,
            '@media (min-width: 600px)': { minHeight: '25px' },
            // position: 'fixed',  
          }}
        >
          <Link
  onClick={() => {
    setSelected('edit');
    setShowUpload(false);
    setShowManualForm(false);
    setShowEditDetails(true);
  }}
  sx={{
    bgcolor: selected === 'edit' ? 'lightgray' : 'inherit',
    '&:hover': { bgcolor: 'lightgray', color: 'black' },
    margin: 1,
    fontSize: 12,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    textDecoration: 'none', // Remove default underline
  }}
>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <EditIcon style={{ marginRight: '4px' }} />
  Edit
</div>
</Link>

<Link
  onClick={() => {
    setSelected('upload');
    setShowUpload(true);
    setShowManualForm(false);
    setShowEditDetails(false);
  }}
  sx={{
    bgcolor: selected === 'upload' ? 'lightgray' : 'inherit',
    '&:hover': { bgcolor: 'lightgray', color: 'black' },
    margin: 1,
    fontSize: 12,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    textDecoration: 'none', // Remove default underline
  }}
>

  <div style={{ display: 'flex', alignItems: 'center' }}>
  <UploadIcon style={{ marginRight: '4px' }} />
  Upload
</div>
</Link>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {!showEditDetails ? (
          <Container component="main" maxWidth="xs">
            <Card variant="outlined" sx={{ padding: 4, boxShadow: 3 }}>
              {showManualForm ? (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <Typography component="h1" variant="h5" textAlign="center">
                    {companyName}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="Employee Name"
                        required
                        fullWidth
                        label="Employee Name"
                        value={formData.employeeName}
                        onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        name="Role Id"
                        required
                        fullWidth
                        label="Role Id"
                        value={formData.roleId}
                        onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                        SelectProps={{ native: true }}
                      >
                        <option value=""></option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="User Name"
                        required
                        fullWidth
                        label="User Name"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        label="Reporting Employee"
                        fullWidth
                        value={formData.reportingId}
                        onChange={(e) => setFormData({ ...formData, reportingId: e.target.value })}
                        SelectProps={{ native: true }}
                      >
                        <option value=""></option>
                        {reportingIds.map((reportingId) => (
                          <option key={reportingId.id} value={reportingId.id}>
                            {reportingId.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Password"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Confirm Password"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={formData.retypePassword}
                        onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                  <TextField
                    label="Add Category"
                    fullWidth
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  />
                  <Button variant="contained" onClick={handleAddCategory} sx={{ mt: 1, mb: 1 }}>
                    Add Category
                  </Button>
                  <Box>
                    {formData.categories.map((category, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography>{category}</Typography>
                        <Button color="error" onClick={() => handleRemoveCategory(index)}>
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" type="submit">
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : showUpload ? (
                <UploadUserInput />
              ) : null}
            </Card>
          </Container>
        ) : (
          <EditUserDetails />
        )}
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={passwordError ? 'error' : 'success'}>
          {passwordError ? passwordErrorMessage : 'User created successfully!'}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
