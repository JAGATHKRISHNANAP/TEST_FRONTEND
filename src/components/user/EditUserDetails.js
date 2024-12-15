import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody,MenuItem, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Snackbar, Alert, TextField, Button, Avatar, CssBaseline, Container, Card } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { fetchUserDetails, fetchRoles, fetchCategories, updateUserDetails ,fetchReportingIds} from '../../utils/api'; // Assuming you're importing from utils/api

const defaultTheme = createTheme();

export default function EditUserDetails() {
  const [companyName, setCompanyName] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [reportingIds, setReportingIds] = useState([]);
  const limit = 10;
  const location = useLocation(); // Use useLocation to get the company name

  // Fetch company name from location state or sessionStorage
  useEffect(() => {
    const storedCompanyName = location.state?.companyName || sessionStorage.getItem('companyName');
    
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    } else {
      console.error('Company name is not available in session storage or location state.');
    }
  }, [location.state]);
  useEffect(() => {
    // Retrieve the company name from sessionStorage
    const storedCompanyName = localStorage.getItem('user_name');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, []);

  // Load roles and categories
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
  // Load roles and categ
    // Load roles and categories
    loadRoles();
    loadCategories();
  }, []);
  

  // Fetch user details based on company name
  const handleFetchDetails = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchUserDetails(companyName, page, limit);
      if (response) {
        setUsers(response.users);
        setTotalUsers(response.total);
        setError('');
        setSuccessMessage('User details fetched successfully!');
        setSnackbarType('success');
      } else {
        throw new Error('No users found for this company');
      }
    } catch (error) {
      setError(error.message || 'Error fetching user details');
      setSuccessMessage('');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    handleFetchDetails(newPage);
  };

  const handleSelectUser = (username) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((user) => user !== username)
        : [...prevSelected, username]
    );
  };

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedUsers([]);
    } else {
      const pageUsernames = users.map((user) => user.username);
      setSelectedUsers(pageUsernames);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleSaveSelectedUsers = async () => {
    setLoading(true);
    try {
      const selectedUserDetails = users.filter((user) => selectedUsers.includes(user.username));
      await Promise.all(
        selectedUserDetails.map((user) =>
          updateUserDetails(user.username, companyName, user.role_id, user.category_name,user.reporting_id )
        )
      );
      setSuccessMessage('Selected users updated successfully!');
      setSnackbarType('success');
      setSelectedUsers([]);
    } catch (error) {
      setError(error.message || 'Error updating users');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
      setSelectAllChecked(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (users.length > 0 && selectedUsers.length === users.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedUsers, users]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Container component="main" maxWidth="md"> */}
        {/* <CssBaseline /> */}
        {/* <Box
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
        > */}
          {/* <Avatar sx={{ m: 2, bgcolor: 'primary.main' }} variant="rounded">
            <AccountBoxIcon />
          </Avatar> */}
              <Container component="main" maxWidth="100px">
              <Card variant="outlined" sx={{ padding: 4, boxShadow: 6, textAlign: 'center' }}>
          <Typography sx={{ mt: 2, color: '#1972D2',fontSize:'24px',fontWeight:'bold' }}>
            EMPLOYEE DATA
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, color: '#1972D2',fontSize:'12px' ,fontWeight:'bold'}}>
          {companyName}
          </Typography>

          <Button variant="contained" onClick={() => handleFetchDetails(page)} sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch User Details'}
          </Button>

          {users.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                  <TableRow style={{ backgroundColor: '#1976d3', fontSize: '15px', textAlign: 'center', textTransform: 'uppercase',fontWeight:'bold' }}>
                      <TableCell>
                        <Checkbox
                          checked={selectAllChecked}
                          onChange={handleSelectAll}
                          indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                        />
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell sx={{ width: 150 }}>Reporting ID</TableCell> 
 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.username}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.username)}
                            onChange={() => handleSelectUser(user.username)}
                          />
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.employee_name}</TableCell>
                        <TableCell>
                          <TextField
                            select
                            value={user.role_id}
                            onChange={(e) => {
                              const updatedUsers = users.map((u) =>
                                u.username === user.username ? { ...u, role_id: e.target.value } : u
                              );
                              setUsers(updatedUsers);
                            }}
                          >
                            {roles.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                {role.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={user.category_name}
                            onChange={(e) => {
                              const updatedUsers = users.map((u) =>
                                u.username === user.username ? { ...u, category_name: e.target.value } : u
                              );
                              setUsers(updatedUsers);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                        <TextField
                          select
                          value={user.reporting_id || ""}
                          onChange={(e) => {
                            const updatedUsers = users.map((u) =>
                              u.username === user.username
                                ? { ...u, reporting_id: e.target.value }
                                : u
                            );
                            setUsers(updatedUsers);
                          }}
                        >
                          <MenuItem value="">Select Reporting Employee</MenuItem>
                          {reportingIds.map((reportingId) => (
                            <MenuItem key={reportingId.id} value={reportingId.id}>
                              {reportingId.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSaveSelectedUsers}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Selected Users'}
              </Button>
            </>
          )}
          </Card>

          <Pagination
            count={Math.ceil(totalUsers / limit)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2 }}
          />

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%' }}>
              {error || successMessage}
            </Alert>
          </Snackbar>
        {/* </Box> */}
      {/* </Container> */}
      </Container>
    </ThemeProvider>
  );
}