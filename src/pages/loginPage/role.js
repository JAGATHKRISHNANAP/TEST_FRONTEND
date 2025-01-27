
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, List, ListItem,  FormLabel, ListItemText, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { createRole, fetchRoles } from '../../utils/api';
import { Link } from 'react-router-dom';

// Styled Card for consistent layout
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '550px',
//   },
// }));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
      width: '550px',
    },
  }));
export default function Roles() {
  const [roleName, setRoleName] = useState('');
  const [rolePermission, setRolePermission] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showRoles, setShowRoles] = useState(false);  // State for toggling roles view

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    loadRoles();
  }, []);

  const handlePermissionChange = (e) => {
    setRolePermission(e.target.value.split(',').map((perm) => perm.trim()));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate if role name or ID already exists
    const roleExists = roles.some((role) => role.name.toLowerCase() === roleName.toLowerCase());
    
    if (roleExists) {
      setMessage('Role name already exists.');
      setOpen(true);
      return;
    }
  
    try {
      const newRole = { 
        role_name: roleName, 
        permissions: rolePermission  
      };
  
      const response = await createRole(newRole);
      setMessage(response.message);
      setOpen(true);
  
      if (!response.message.includes('exists')) {
        setRoles((prevRoles) => [...prevRoles, { id: response.id, name: roleName }]); // Update with response id
      }
  
      setRoleName('');
      setRolePermission([]);
    } catch (error) {
      console.error('Error creating role:', error);
      setMessage('Error adding role.');
      setOpen(true);
    }
  };
  
  const handleClose = () => setOpen(false);

  const handleViewRoles = () => {
    setShowRoles((prev) => !prev);  // Toggle roles visibility
  };

  return (
    <Card variant="outlined"  sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',marginTop:'80px'}}>
      <Typography component="h1" variant="h4">
        Add New Role
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8.8, width: '100%' }}>
  <FormLabel htmlFor="roleName" sx={{ whiteSpace: 'nowrap' }}>Role Name</FormLabel>
  <TextField
    id="roleName"
    name="roleName"
    placeholder="Enter role name"
    value={roleName}
    onChange={(e) => setRoleName(e.target.value)}
    required
    fullWidth
  />
</FormControl>

<FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3.2, width: '100%' }}>
  <FormLabel htmlFor="rolePermissions" sx={{ whiteSpace: 'nowrap' }}>Role Permissions</FormLabel>
  <TextField
    id="rolePermissions"
    name="rolePermissions"
    placeholder="Enter permissions (comma-separated)"
    value={rolePermission.join(', ')}
    onChange={handlePermissionChange}
    required
    fullWidth
  />
</FormControl>


        <Button type="submit" variant="contained" sx={{ width: '200px', alignSelf: 'center' }}>
          Add Role
        </Button>
      </Box>

      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleViewRoles}>
          {showRoles ? 'Hide Roles' : 'View Roles'}
        </Button>
      </Box>

      {showRoles && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Existing Roles
          </Typography>
          <List>
            {roles.map((role, index) => (
              <ListItem key={index}>
                <ListItemText primary={role.name} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Typography>
          Go back to <Link to="/signClient">Sign Up</Link> page.
        </Typography>
      </Box>
    </Card>
  );
}