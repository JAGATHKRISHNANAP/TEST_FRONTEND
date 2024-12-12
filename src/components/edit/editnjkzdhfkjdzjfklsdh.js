


import React, { useState, useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadUserInput from './UploadUserInput';
import EditUserDetails from './EditUserDetails';
import { userSignUp, fetchCompanies, fetchRoles } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Box,Container, Card, FormControl, FormLabel, TextField,
  Button, Snackbar, Alert, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Avatar, Typography, Divider, Grid, CssBaseline
} from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/CloudUpload';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';;

const drawerWidth = 240;
const defaultTheme = createTheme();

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { company } = location.state || {}; 
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showManualForm, setShowManualForm] = useState(true);
  const [showEditDetails, setShowEditDetails] = useState(false); // For showing EditUserDetails
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [emailError, setEmailError] = React.useState(false); // State to handle email error
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(''); // Error message state
  const [companyName, setCompanyName] = useState('');
  const [formData, setFormData] = useState({
    employeeName: '',
    roleId: '',
    company: '',
    userName: '',
    email:'',
    password: '',
    retypePassword: '',
    categories: [],
  });
  useEffect(() => {
    // Retrieve the company name from sessionStorage
    const storedCompanyName = localStorage.getItem('user_name');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, []);

  const [categoryInput, setCategoryInput] = useState('');
  useEffect(() => {
    if (company) {
      setFormData((prevData) => ({ ...prevData, company })); // Auto-fill company field
    }
  }, [company]);
  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== '') {
      setFormData({
        ...formData,
        categories: [...formData.categories, categoryInput.trim()]
      });
      setCategoryInput(''); // Reset the input
    }
  };

  // Handle removing a category
  const handleRemoveCategory = (index) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1); // Remove category at index
    setFormData({ ...formData, categories: updatedCategories });
  };
  // Handle manual form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const companyName = localStorage.getItem('user_name')
    const data = new FormData(event.currentTarget);
    const employeeName = data.get('Employee Name');
    const roleId = data.get('Role Id');
    const company = data.get('company');
    const userName = data.get('User Name');
    const email = data.get('email');
    const password = data.get('Password');
    const retypePassword = data.get('retypePassword');

    if (!employeeName || employeeName.trim().length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage('Employee name must be at least 3 characters long.');
      setOpen(true);
      return;
    }
    if (!validateEmail(email)) {
           setEmailError(true);
          setEmailErrorMessage('Invalid email format');
           setOpen(true); // Open Snackbar
           return;  // Stop form submission if email is invalid
         }
       

    if (password !== retypePassword) {
      setPasswordError(true);
      setPasswordErrorMessage('Passwords do not match');
      setOpen(true);
      return;
    }

    const userDetails = {
      employeeName,
      roleId,
      company:companyName,
      userName,
      email,
      password,
      retypePassword,
      categories: formData.categories,
    };

    try {
      const response = await userSignUp('manual', userDetails);
      if (response.message === 'User and categories created successfully') {
        setOpen(true);
        setPasswordError(false);
        setPasswordErrorMessage('User registered successfully!');
        window.location.reload();
        navigate('/indexhomepage'); 
      } else {
        setPasswordError(true);
        setPasswordErrorMessage(response.message || 'Unknown error occurred');
        setOpen(true);
      }
    } catch (error) {
      setPasswordError(true);
      setPasswordErrorMessage('Username already exists');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const loadCompanies = async () => {
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

    loadCompanies();
    loadRoles();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Drawer Component */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={true}
        >
          <Typography variant="h6" sx={{ padding: 2 }}>
            Actions
          </Typography>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                setShowUpload(false);
                setShowManualForm(false);
                setShowEditDetails(true);
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit User Details" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setShowUpload(true);
                setShowManualForm(false);
                setShowEditDetails(false);
              }}
            >
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload User Input" />
            </ListItem>
          </List>
        </Drawer>


        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginLeft: `${drawerWidth}px`,
          }}
        >
          {!showEditDetails ? (
            <Container component="main" maxWidth="xs" alignItems="center">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'linear-gradient(to right, #1976d2, #7db6ef)',
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Avatar sx={{ m: 2, bgcolor: 'primary.main' }} variant="rounded">
                  <AccountBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color={'white'}>
                  SIGN UP
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
            Company: {companyName}
          </Typography>
                {showManualForm ? (
                  
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/* Form fields */}
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="Employee Name"
                          required
                          fullWidth
                          id="Employee Name"
                          label="Employee Name"
                          value={formData.employeeName}
                          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                          autoFocus
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          select
                          name="Role Id"
                          required
                          fullWidth
                          id="RoleId"
                          label="Role Id"
                          value={formData.roleId}
                          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
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
                          id="User Name"
                          label="User Name"
                          value={formData.userName}
                          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
                          disabled={showUpload}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
                          disabled={showUpload}
                          />
                          </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="Password"
                          required
                          fullWidth
                          id="Password"
                          label="Password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
                          disabled={showUpload}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="retypePassword"
                          label="Retype Password"
                          type="password"
                          id="retypePassword"
                          value={formData.retypePassword}
                          onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                          sx={{ backgroundColor: 'white', borderRadius: 1 }}
                          disabled={showUpload}
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
                        <Button
                          variant="contained"
                          onClick={handleAddCategory}
                          sx={{ mt: 1, mb: 1 }}
                        >
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
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                      Sign Up
                    </Button>
                  </Box>
                ) : (
                  <UploadUserInput />
                )}
              </Box>
            </Container>
          ) : (
            <EditUserDetails /> // Directly render EditUserDetails component without wrapping
          )}

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={passwordError ? 'error' : 'success'} sx={{ width: '100%' }}>
              {passwordError ? passwordErrorMessage : 'User registered successfully!'}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

