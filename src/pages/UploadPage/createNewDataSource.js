// // import * as React from 'react';
// // import { styled } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// // import MuiCard from '@mui/material/Card';
// // import TextField from '@mui/material/TextField';
// // import Typography from '@mui/material/Typography';
// // import Snackbar from '@mui/material/Snackbar';
// // import Alert from '@mui/material/Alert';
// // import MenuItem from '@mui/material/MenuItem';
// // import FormControl from '@mui/material/FormControl';
// // import FormLabel from '@mui/material/FormLabel';
// // import Select from '@mui/material/Select';

// // const Card = styled(MuiCard)(({ theme }) => ({
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignSelf: 'center',
// //   width: '100%',
// //   padding: theme.spacing(4),
// //   gap: theme.spacing(2),
// //   boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
// //   [theme.breakpoints.up('sm')]: {
// //     width: '550px',
// //   },
// // }));

// // export default function SignUp() {
// //   const [passwordError, setPasswordError] = React.useState(false);
// //   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
// //   const [open, setOpen] = React.useState(false);
// //   const [dbType, setDbType] = React.useState('');
// //   const [provider, setProvider] = React.useState('');
// //   const [dbUsername, setDbUsername] = React.useState('');
// //   const [dbPassword, setDbPassword] = React.useState('');
// //   const [port, setPort] = React.useState('');
// //   const [testMessage, setTestMessage] = React.useState('');

// //   const handleTestConnection = () => {
// //     if (!dbType || !provider || !dbUsername || !dbPassword || !port) {
// //       setTestMessage('Please fill in all fields to test the connection.');
// //       return;
// //     }

// //     // Simulate testing database connection
// //     setTestMessage('Testing connection...');
// //     setTimeout(() => {
// //       setTestMessage('Connection successful!');
// //     }, 2000);
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     // Form submission logic here
// //     console.log('Submitting with:', {
// //       dbType,
// //       provider,
// //       dbUsername,
// //       dbPassword,
// //       port,
// //     });
// //   };

// //   const handleClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }
// //     setOpen(false);
// //   };

// //   return (
// //     <Card variant="outlined" sx={{ marginTop: '80px' }}>
// //       <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
// //         Create DataSource
// //       </Typography>

// //       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //         <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //           <FormLabel>Database Type</FormLabel>
// //           <Select
// //             value={dbType}
// //             onChange={(e) => setDbType(e.target.value)}
// //             displayEmpty
// //             fullWidth
// //           >
// //             <MenuItem value="" disabled>Select Database Type</MenuItem>
// //             <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
// //             <MenuItem value="MySQL">MySQL</MenuItem>
// //             <MenuItem value="MongoDB">MongoDB</MenuItem>
// //             <MenuItem value="PostgreSQL">SQLite</MenuItem>
// //             <MenuItem value="MySQL">Oracle</MenuItem>
// //             <MenuItem value="MySQL">SQL Server</MenuItem>
// //           </Select>
// //         </FormControl>

// //         <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //           <FormLabel>Provider</FormLabel>
// //           <TextField
// //             placeholder="Enter provider (e.g., AWS RDS, Azure, etc.)"
// //             value={provider}
// //             onChange={(e) => setProvider(e.target.value)}
// //             fullWidth
// //           />
// //         </FormControl>

// //         <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //           <FormLabel>Database Username</FormLabel>
// //           <TextField
// //             placeholder="Enter database username"
// //             value={dbUsername}
// //             onChange={(e) => setDbUsername(e.target.value)}
// //             fullWidth
// //           />
// //         </FormControl>

// //         <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //           <FormLabel>Database Password</FormLabel>
// //           <TextField
// //             type="password"
// //             placeholder="Enter database password"
// //             value={dbPassword}
// //             onChange={(e) => setDbPassword(e.target.value)}
// //             fullWidth
// //           />
// //         </FormControl>

// //         <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //           <FormLabel>Port</FormLabel>
// //           <TextField
// //             placeholder="Enter port (e.g., 5432 for PostgreSQL)"
// //             value={port}
// //             onChange={(e) => setPort(e.target.value)}
// //             fullWidth
// //           />
// //         </FormControl>

// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
// //           <Button
// //             variant="outlined"
// //             onClick={handleTestConnection}
// //             sx={{ width: '150px' }}
// //           >
// //             Test Connection
// //           </Button>
// //           <Typography variant="body2">{testMessage}</Typography>
// //         </Box>
// //       </Box>

// //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
// //         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
// //           {passwordErrorMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Card>
// //   );
// // }

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import { Box, Grid, Button, Card as MuiCard, TextField, Typography, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
// import { Storage, Cloud, CheckCircleOutline } from '@mui/icons-material';

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   padding: theme.spacing(4),
//   boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
//   borderRadius: theme.spacing(2),
//   backgroundColor: '#f4f4f4',
// }));

// const Sidebar = styled(Box)(({ theme }) => ({
//   width: '250px',
//   height: '100vh',
//   backgroundColor: theme.palette.primary.main,
//   color: '#fff',
//   display: 'flex',
//   flexDirection: 'column',
//   padding: theme.spacing(2),
//   gap: theme.spacing(2),
// }));

// export default function SignUp() {
//   const [dbType, setDbType] = React.useState('');
//   const [provider, setProvider] = React.useState('');
//   const [dbUsername, setDbUsername] = React.useState('');
//   const [dbPassword, setDbPassword] = React.useState('');
//   const [port, setPort] = React.useState('');
//   const [testMessage, setTestMessage] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   const handleTestConnection = () => {
//     if (!dbType || !provider || !dbUsername || !dbPassword || !port) {
//       setTestMessage('Please fill in all fields to test the connection.');
//       setOpen(true);
//       return;
//     }

//     setTestMessage('Testing connection...');
//     setTimeout(() => {
//       setTestMessage('Connection successful!');
//       setOpen(true);
//     }, 2000);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitting with:', {
//       dbType,
//       provider,
//       dbUsername,
//       dbPassword,
//       port,
//     });
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <Box display="flex">
//       <Sidebar>
//         <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//           DataSource Setup
//         </Typography>
//         <Divider />
//         <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Storage /> Database Settings
//         </Typography>

//         <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Cloud /> Cloud Providers
//         </Typography>
//       </Sidebar>

//       <Box sx={{ flexGrow: 1, p: 4 }}>
//         <Card>
//           <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
//             Configure Your DataSource
//           </Typography>

//           <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Database Type</InputLabel>
//                 <Select
//                   value={dbType}
//                   onChange={(e) => setDbType(e.target.value)}
//                   fullWidth
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
                    
//                   </MenuItem>
//                   <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
//                   <MenuItem value="MySQL">MySQL</MenuItem>
//                   <MenuItem value="MongoDB">MongoDB</MenuItem>
//                   <MenuItem value="SQLite">SQLite</MenuItem>
//                   <MenuItem value="Oracle">Oracle</MenuItem>
//                   <MenuItem value="SQL Server">SQL Server</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Cloud Provider"
//                 placeholder="Enter provider (e.g., AWS RDS, Azure)"
//                 value={provider}
//                 onChange={(e) => setProvider(e.target.value)}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Database Username"
//                 placeholder="Enter database username"
//                 value={dbUsername}
//                 onChange={(e) => setDbUsername(e.target.value)}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Database Password"
//                 type="password"
//                 placeholder="Enter database password"
//                 value={dbPassword}
//                 onChange={(e) => setDbPassword(e.target.value)}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Port"
//                 placeholder="Enter port (e.g., 5432 for PostgreSQL)"
//                 value={port}
//                 onChange={(e) => setPort(e.target.value)}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleTestConnection}
//                 sx={{ width: '150px' }}
//               >
//                 Test Connection
//               </Button>
//               <Typography variant="body2">{testMessage}</Typography>
//             </Grid>

//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<CheckCircleOutline />}>
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </Card>

//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
//             {testMessage}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// }

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import { Box, Grid, Button, Card as MuiCard, TextField, Typography, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
// import { Storage, Cloud, CheckCircleOutline } from '@mui/icons-material';

// const Card = styled(MuiCard)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 800,
//   margin: 'auto',
//   padding: theme.spacing(4),
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   borderRadius: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(6),
//   },
// }));

// export default function EnhancedSignUp() {
//   const [dbType, setDbType] = React.useState('');
//   const [provider, setProvider] = React.useState('');
//   const [dbUsername, setDbUsername] = React.useState('');
//   const [dbPassword, setDbPassword] = React.useState('');
//   const [port, setPort] = React.useState('');
//   const [testMessage, setTestMessage] = React.useState('');
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);

//   const handleTestConnection = () => {
//     if (!dbType || !provider || !dbUsername || !dbPassword || !port) {
//       setTestMessage('Please fill in all fields to test the connection.');
//       setOpenSnackbar(true);
//       return;
//     }

//     setTestMessage('Testing connection...');
//     setTimeout(() => {
//       setTestMessage('Connection successful!');
//     }, 2000);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitting form:', { dbType, provider, dbUsername, dbPassword, port });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   return (
//     <Card>
//       <Typography variant="h4" align="center" gutterBottom>
//         <Storage sx={{ marginRight: 1 }} /> Configure Database
//       </Typography>
//       <Divider sx={{ marginBottom: 3 }} />

//       <Box component="form" onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           {/* Database Type */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Database Type</InputLabel>
//               <Select
//                 value={dbType}
//                 onChange={(e) => setDbType(e.target.value)}
//                 displayEmpty
//                 required
//               >
//                 <MenuItem value="" disabled></MenuItem>
//                 <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
//                 <MenuItem value="MySQL">MySQL</MenuItem>
//                 <MenuItem value="MongoDB">MongoDB</MenuItem>
//                 <MenuItem value="SQLite">SQLite</MenuItem>
//                 <MenuItem value="Oracle">Oracle</MenuItem>
//                 <MenuItem value="SQLServer">SQL Server</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Provider */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Provider (e.g., AWS RDS)"
//               value={provider}
//               onChange={(e) => setProvider(e.target.value)}
//               fullWidth
//               required
//             />
//           </Grid>

//           {/* Username */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Database Username"
//               value={dbUsername}
//               onChange={(e) => setDbUsername(e.target.value)}
//               fullWidth
//               required
//             />
//           </Grid>

//           {/* Password */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Database Password"
//               type="password"
//               value={dbPassword}
//               onChange={(e) => setDbPassword(e.target.value)}
//               fullWidth
//               required
//             />
//           </Grid>

//           {/* Port */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Port (e.g., 5432)"
//               value={port}
//               onChange={(e) => setPort(e.target.value)}
//               fullWidth
//               required
//             />
//           </Grid>

//           {/* Action Buttons */}
//           <Grid item xs={12}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Button variant="outlined" onClick={handleTestConnection} sx={{ width: 180 }}>
//                 Test Connection
//               </Button>
//               <Typography variant="body1">{testMessage}</Typography>
//               <Button variant="contained" type="submit" sx={{ width: 180 }}>
//                 Submit
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
//           {testMessage}
//         </Alert>
//       </Snackbar>
//     </Card>
//   );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Button, Card as MuiCard, TextField, Typography, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
import { Storage } from '@mui/icons-material';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(4),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
}));

export default function EnhancedSignUp() {
  const [dbType, setDbType] = React.useState('');
  const [provider, setProvider] = React.useState('');
  const [dbUsername, setDbUsername] = React.useState('');
  const [dbPassword, setDbPassword] = React.useState('');
  const [port, setPort] = React.useState('');
  const [dbName, setDbName] = React.useState('');
  const [testMessage, setTestMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const apiUrl = 'http://localhost:5000/connect'; // Flask backend URL

  const handleTestConnection = async () => {
    if (!dbType || !dbUsername || !dbPassword || !port || !dbName) {
      setTestMessage('Please fill in all fields to test the connection.');
      setOpenSnackbar(true);
      return;
    }

    setTestMessage('Testing connection...');
    try {
      const response = await axios.post(apiUrl, {
        username: dbUsername,
        password: dbPassword,
        host: provider || 'localhost',
        port,
        dbName,
      });

      if (response.data.success) {
        setTestMessage('Connection successful! Tables: ' + response.data.tables.join(', '));
      } else {
        setTestMessage('Connection failed. ' + response.data.error);
      }
    } catch (error) {
      setTestMessage('Error: ' + (error.response?.data?.details || error.message));
    }
    setOpenSnackbar(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting form:', { dbType, provider, dbUsername, dbPassword, port, dbName });
    // Handle form submission logic here
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Card>
      <Typography variant="h4" align="center" gutterBottom>
        <Storage sx={{ marginRight: 1 }} /> Configure Database
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Database Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Database Type</InputLabel>
              <Select
                value={dbType}
                onChange={(e) => setDbType(e.target.value)}
                displayEmpty
                required
              >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                <MenuItem value="MySQL">MySQL</MenuItem>
                <MenuItem value="MongoDB">MongoDB</MenuItem>
                <MenuItem value="SQLite">SQLite</MenuItem>
                <MenuItem value="Oracle">Oracle</MenuItem>
                <MenuItem value="SQLServer">SQL Server</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Provider */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Provider (e.g., AWS RDS)"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              fullWidth
            />
          </Grid>

          {/* Username */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Database Username"
              value={dbUsername}
              onChange={(e) => setDbUsername(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Database Password"
              type="password"
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          {/* Port */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Port (e.g., 5432)"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          {/* Database Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Database Name"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" onClick={handleTestConnection} sx={{ width: 180 }}>
                Test Connection
              </Button>
              <Typography variant="body1">{testMessage}</Typography>
              <Button variant="contained" type="submit" sx={{ width: 180 }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={testMessage.includes('successful') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {testMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
