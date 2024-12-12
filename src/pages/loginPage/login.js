import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { signIn, fetchCompanies } from '../../utils/api';
import { MenuItem, FormControl, FormLabel, Select } from '@mui/material';
import Card from '@mui/material/Card'; // Importing the Card for the styled UI component

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError) return;

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const company = data.get('company');

    try {
      const response = await signIn(email, password, company);
      console.log(response);
      if (response.data && response.data.tables) {
        const tableNames = response.data.tables;
        localStorage.setItem('tableNames', JSON.stringify(tableNames));
      }

      let user_id, user_name, user_role, user_email;

      if (response.message === 'Login successful to admin page') {
        user_id = '1';
        user_name = 'Admin';
        user_role = 'Admin';
        user_email = 'superadmin@gmail.com';
      } else {
        user_id = response.data.user[0];
        user_name = response.data.user[1];
        user_role = response.data.user[2];
        user_email = response.data.user[3];
      }

      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('user_role', user_role);
      localStorage.setItem('user_email', user_email);
      localStorage.setItem('company_name', selectedCompany);
      localStorage.setItem('data', JSON.stringify(response));

      if (response.message.includes('Login successful')) {
        sessionStorage.setItem('session_id', response.session_id);

        if (response.message === 'Login successful to admin page') {
          navigate('/signClient');
        } else if (response.message === 'Login successful to user page') {
          sessionStorage.setItem('show_second_navbar', true);
          navigate('/user_input');
        } else if (response.message === 'Login successful to user employee page') {
          localStorage.setItem('show_second_navbar', true);
          navigate('/employeehome');
        }
      } else {
        setErrorMessage('Incorrect password or email');
        setOpen(true);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage('Something went wrong. Please try again later.');
      setOpen(true);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
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
    loadCompanies();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

return (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',  // This makes sure the container takes full height of the viewport
    }}
  >
    <Container component="main" maxWidth="xs">
      <Card variant="outlined" sx={{ padding: 4, boxShadow: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isUserLogin}
                onChange={(e) => setIsUserLogin(e.target.checked)}
                color="primary"
              />
            }
            label="Signing through company user?"
          />
          {isUserLogin && (
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
              <FormLabel htmlFor="company">Company</FormLabel>
              <Select
                id="company"
                name="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.name}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, width: '100%' }}>
            <FormLabel htmlFor="email">Username</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: 'transparent',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  '&.Mui-focused': {
                    backgroundColor: 'transparent',
                  },
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1, width: '100%' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                required
                fullWidth
                variant="outlined"
              />
            </Box>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Sign in
          </Button>
        </Box>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
   </Box>
);
}

