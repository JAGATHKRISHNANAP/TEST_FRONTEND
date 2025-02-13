// import React, { useState, useEffect } from 'react';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { userSignUp, fetchCompanies, fetchRoles } from '../../utils/api';
// import { useLocation, useNavigate } from 'react-router-dom'

// import {
//   Box,Container, Card, FormControl, FormLabel, TextField,
//   Button, Snackbar, Alert, Drawer, List, ListItem, ListItemIcon,
//   ListItemText, Avatar, Typography, Divider, Grid, CssBaseline
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import UploadIcon from '@mui/icons-material/CloudUpload';

// const drawerWidth = 240;
// const defaultTheme = createTheme();

// export default function SignUp() {
//   const location = useLocation();
//   const navigate = useNavigate(); 
//   const { company } = location.state || {}; 
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//   const [open, setOpen] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [emailError, setEmailError] = React.useState(false); // State to handle email error
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState(''); // Error message state
//   const [companyName, setCompanyName] = useState('');
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     roleId: '',
//     company: '',
//     userName: '',
//     email:'',
//     password: '',
//     retypePassword: '',
//     categories: [],
//   });
//   useEffect(() => {
//     // Retrieve the company name from sessionStorage
//     const storedCompanyName = localStorage.getItem('user_name');
//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName);
//     }
//   }, []);

//   const [categoryInput, setCategoryInput] = useState('');
//   useEffect(() => {
//     if (company) {
//       setFormData((prevData) => ({ ...prevData, company })); // Auto-fill company field
//     }
//   }, [company]);
//   const validateEmail = (email) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleAddCategory = () => {
//     if (categoryInput.trim() !== '') {
//       setFormData({
//         ...formData,
//         categories: [...formData.categories, categoryInput.trim()]
//       });
//       setCategoryInput(''); // Reset the input
//     }
//   };

//   // Handle removing a category
//   const handleRemoveCategory = (index) => {
//     const updatedCategories = [...formData.categories];
//     updatedCategories.splice(index, 1); // Remove category at index
//     setFormData({ ...formData, categories: updatedCategories });
//   };
//   // Handle manual form submit
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const companyName = localStorage.getItem('user_name')
//     const data = new FormData(event.currentTarget);
//     const employeeName = data.get('Employee Name');
//     const roleId = data.get('Role Id');
//     const company = data.get('company');
//     const userName = data.get('User Name');
//     const email = data.get('email');
//     const password = data.get('Password');
//     const retypePassword = data.get('retypePassword');

//     if (!employeeName || employeeName.trim().length < 3) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Employee name must be at least 3 characters long.');
//       setOpen(true);
//       return;
//     }
//     if (!validateEmail(email)) {
//            setEmailError(true);
//           setEmailErrorMessage('Invalid email format');
//            setOpen(true); // Open Snackbar
//            return;  // Stop form submission if email is invalid
//          }
       

//     if (password !== retypePassword) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Passwords do not match');
//       setOpen(true);
//       return;
//     }

//     const userDetails = {
//       employeeName,
//       roleId,
//       company:companyName,
//       userName,
//       email,
//       password,
//       retypePassword,
//       categories: formData.categories,
//     };

//     try {
//       const response = await userSignUp('manual', userDetails);
//       if (response.message === 'User and categories created successfully') {
//         setOpen(true);
//         setPasswordError(false);
//         setPasswordErrorMessage('User registered successfully!');
//         window.location.reload();
//         navigate('/indexhomepage'); 
//       } else {
//         setPasswordError(true);
//         setPasswordErrorMessage(response.message || 'Unknown error occurred');
//         setOpen(true);
//       }
//     } catch (error) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Username already exists');
//       setOpen(true);
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   useEffect(() => {
//     const loadCompanies = async () => {
//       try {
//         const data = await fetchCompanies();
//         setCompanies(data);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     };

//     const loadRoles = async () => {
//       try {
//         const data = await fetchRoles();
//         setRoles(data);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };

//     loadCompanies();
//     loadRoles();
//   }, []);

// return (
//   <ThemeProvider theme={defaultTheme}>
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
      
//       {/* Drawer Component */}
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={true}
//       >
//         <Typography variant="h6" sx={{ padding: 2 }}>
//           Actions
//         </Typography>
//         <Divider />
//         <List>
//           <ListItem button onClick={() => { /* Show Edit User Details */ }}>
//             <ListItemIcon>
//               <EditIcon />
//             </ListItemIcon>
//             <ListItemText primary="Edit User Details" />
//           </ListItem>
//           <ListItem button onClick={() => { /* Show Upload User Input */ }}>
//             <ListItemIcon>
//               <UploadIcon />
//             </ListItemIcon>
//             <ListItemText primary="Upload User Input" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
//         <Container component="main" maxWidth="xs">
//           <Card variant="outlined" sx={{ padding: 4, boxShadow: 3 }}>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               noValidate
//               sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//               <Avatar sx={{ m: 2, bgcolor: 'primary.main' }} variant="rounded">
//                 <AccountBoxIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5" color="text.primary" textAlign="center">
//                 SIGN UP
//               </Typography>

//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="Employee Name"
//                     required
//                     fullWidth
//                     id="Employee Name"
//                     label="Employee Name"
//                     value={formData.employeeName}
//                     onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//                     autoFocus
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     name="Role Id"
//                     required
//                     fullWidth
//                     id="RoleId"
//                     label="Role Id"
//                     value={formData.roleId}
//                     onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                     SelectProps={{ native: true }}
//                   >
//                     <option value=""></option>
//                     {roles.map((role) => (
//                       <option key={role.id} value={role.name}>
//                         {role.name}
//                       </option>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="User Name"
//                     required
//                     fullWidth
//                     id="User Name"
//                     label="User Name"
//                     value={formData.userName}
//                     onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="email"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="Password"
//                     required
//                     fullWidth
//                     id="Password"
//                     label="Password"
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="retypePassword"
//                     label="Retype Password"
//                     type="password"
//                     id="retypePassword"
//                     value={formData.retypePassword}
//                     onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Add Category"
//                     fullWidth
//                     value={categoryInput}
//                     onChange={(e) => setCategoryInput(e.target.value)}
//                     sx={{ backgroundColor: 'white', borderRadius: 1 }}
//                   />
//                   <Button variant="contained" onClick={handleAddCategory} sx={{ mt: 1, mb: 1 }}>
//                     Add Category
//                   </Button>
//                   <Box>
//                     {formData.categories.map((category, index) => (
//                       <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//                         <Typography>{category}</Typography>
//                         <Button color="error" onClick={() => handleRemoveCategory(index)}>
//                           Remove
//                         </Button>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Grid>
//               </Grid>

//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
//                 Sign Up
//               </Button>
//             </Box>
//           </Card>
//         </Container>

//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity={passwordError ? 'error' : 'success'} sx={{ width: '100%' }}>
//             {passwordError ? passwordErrorMessage : 'User registered successfully!'}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   </ThemeProvider>
// );
// }













// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Link, useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { signIn, fetchCompanies } from '../../utils/api';
// import { MenuItem, FormControl, FormLabel, Select } from '@mui/material';
// import Card from '@mui/material/Card'; // Importing the Card for the styled UI component

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [open, setOpen] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [isUserLogin, setIsUserLogin] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState('');
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (emailError || passwordError) return;

//     const data = new FormData(event.currentTarget);
//     const email = data.get('email');
//     const password = data.get('password');
//     const company = data.get('company');

//     try {
//       const response = await signIn(email, password, company);
//       console.log(response);
//       // console.log('responseTableName:', response.data.tables);

//       // const tableNames = response.data.tables;
//       // localStorage.setItem('tableNames', JSON.stringify(tableNames));


//       if (response.data && response.data.tables) {
//         const tableNames = response.data.tables;
//         localStorage.setItem('tableNames', JSON.stringify(tableNames));
//       }

//       let user_id, user_name, user_role, user_email;

//       if (response.message === 'Login successful to admin page') {
//         user_id = '1';
//         user_name = 'Admin';
//         user_role = 'Admin';
//         user_email = 'superadmin@gmail.com';
//       } else {
//         user_id = response.data.user[0];
//         user_name = response.data.user[1];
//         user_role = response.data.user[2];
//         user_email = response.data.user[3];
//       }

//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('user_name', user_name);
//       localStorage.setItem('user_role', user_role);
//       localStorage.setItem('user_email', user_email);
//       localStorage.setItem('company_name', selectedCompany);
//       localStorage.setItem('data', JSON.stringify(response));

//       if (response.message.includes('Login successful')) {
//         sessionStorage.setItem('session_id', response.session_id);

//         if (response.message === 'Login successful to admin page') {
//           navigate('/signClient');
//         } else if (response.message === 'Login successful to user page') {
//           sessionStorage.setItem('show_second_navbar', true);
//           navigate('/user_input');
//         } else if (response.message === 'Login successful to user employee page') {
//           localStorage.setItem('show_second_navbar', true);
//           navigate('/employeehome');
//         }
//       } else {
//         setErrorMessage('Incorrect password or email');
//         setOpen(true);
//       }
//     } catch (error) {
//       console.error('Sign-in error:', error);
//       setErrorMessage('Something went wrong. Please try again later.');
//       setOpen(true);
//     }
//   };

//   const validateInputs = () => {
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Password must be at least 6 characters long.');
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     return isValid;
//   };

//   useEffect(() => {
//     const loadCompanies = async () => {
//       try {
//         const data = await fetchCompanies();
//         setCompanies(data);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     };
//     loadCompanies();
//   }, []);

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

// return (
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',  // This makes sure the container takes full height of the viewport
//     }}
//   >
//     <Container component="main" maxWidth="xs">
//       <Card variant="outlined" sx={{ padding: 4, boxShadow: 3 }}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           noValidate
//           sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//         >
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={isUserLogin}
//                 onChange={(e) => setIsUserLogin(e.target.checked)}
//                 color="primary"
//               />
//             }
//             label="Signing through company user?"
//           />
//           {isUserLogin && (
//             <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
//               <FormLabel htmlFor="company">Company</FormLabel>
//               <Select
//                 id="company"
//                 name="company"
//                 value={selectedCompany}
//                 onChange={(e) => setSelectedCompany(e.target.value)}
//                 fullWidth
//                 variant="outlined"
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {companies.map((company) => (
//                   <MenuItem key={company.id} value={company.name}>
//                     {company.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}
//           <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, width: '100%' }}>
//             <FormLabel htmlFor="email">Username</FormLabel>
//             <TextField
//               error={emailError}
//               helperText={emailErrorMessage}
//               id="email"
//               type="email"
//               name="email"
//               placeholder="your@email.com"
//               required
//               fullWidth
//               variant="outlined"
//               sx={{
//                 backgroundColor: 'transparent',
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'transparent',
//                   '&.Mui-focused': {
//                     backgroundColor: 'transparent',
//                   },
//                 },
//               }}
//             />
//           </FormControl>
//           <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1, width: '100%' }}>
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 error={passwordError}
//                 helperText={passwordErrorMessage}
//                 name="password"
//                 placeholder="••••••"
//                 type="password"
//                 id="password"
//                 required
//                 fullWidth
//                 variant="outlined"
//               />
//             </Box>
//           </FormControl>
//           <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
//             Sign in
//           </Button>
//         </Box>
//       </Card>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//    </Box>
// );
// }





















