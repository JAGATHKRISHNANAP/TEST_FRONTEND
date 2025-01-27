import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setPassword, setRetypePassword, setOrganizationName, setEmail } from '../../features/signUp/signUpSlice';
import { signUp, fetchUserdata } from '../../utils/api'; // import the api file
import { Link } from 'react-router-dom';

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

export default function SignUp() {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [usernames, setUsernames] = React.useState([]);
  const [showCompanyDropdown, setShowCompanyDropdown] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const dispatch = useDispatch();
  const { userName, password, retypePassword, organizationName, email } = useSelector((state) => state.signup);

  React.useEffect(() => {
    const getUsernames = async () => {
      try {
        const fetchedUserdata = await fetchUserdata();
        const extractedUsernames = fetchedUserdata.map(user => user[3]);
        setUsernames(extractedUsernames.flat());
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    getUsernames();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userName = data.get('userName');
    const password = data.get('password');
    const retypePassword = data.get('retypePassword');
    const organizationName = data.get('organizationName');
    const email = data.get('email');

    const passwordValidation = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

    if (!passwordValidation.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long and include symbols, letters, and numbers.');
      setOpen(true);
      return;
    }

    if (password !== retypePassword) {
      setPasswordError(true);
      setPasswordErrorMessage('Passwords do not match.');
      setOpen(true);
      return;
    }

    if (usernames.includes(userName)) {
      setPasswordError(true);
      setPasswordErrorMessage('Username is already taken.');
      setOpen(true);
      return;
    }

    setPasswordError(false);
    setPasswordErrorMessage('');
    setOpen(false);
    dispatch(setUserName(userName));
    dispatch(setPassword(password));
    dispatch(setRetypePassword(retypePassword));
    dispatch(setOrganizationName(organizationName));
    dispatch(setEmail(email));

    const userDetails = { userName, password, retypePassword, organizationName, email };

    try {
      const response = await signUp(userDetails);
      if (response.message === 'User created successfully') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCompanyCheckboxChange = (event) => {
    setShowCompanyDropdown(event.target.checked);
  };

  return (
    
    <Card variant="outlined"  sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',marginTop:'80px'}}>
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Organization Sign Up
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        


      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
  <FormLabel htmlFor="organizationName" sx={{ whiteSpace: 'nowrap' }}>Organization Name</FormLabel>
  <TextField id="organizationName" name="organizationName" placeholder="Enter organization name" required fullWidth />
</FormControl>

        {/* User name */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8.8, width: '100%' }}>
  <FormLabel htmlFor="userName" sx={{ whiteSpace: 'nowrap' }}>User Name</FormLabel>
  <TextField id="userName" name="userName" placeholder="Enter user name" required fullWidth />
</FormControl>


        {/* Email */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 13.7, width: '100%' }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField id="email" name="email" placeholder="your@email.com" type="email" required fullWidth />
        </FormControl>

        {/* Password */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9.8, width: '100%' }}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField id="password" name="password" placeholder="••••••" type="password" required fullWidth />
        </FormControl>

        {/* Retype Password */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3.1, width: '100%' }}>
          <FormLabel htmlFor="retypePassword"  sx={{ whiteSpace: 'nowrap' }}>Retype Password</FormLabel>
          <TextField id="retypePassword" name="retypePassword" placeholder="••••••" type="password" required fullWidth />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  <Button type="submit" sx={{ width: '200px' }} variant="contained">
    Sign Up
  </Button>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
  <Typography sx={{ textAlign: 'center' }}>
    Want to manage roles? <Link to="/roles">Go to Role Page</Link>
  </Typography>
</Box>

      

        
        {/* <Typography sx={{ textAlign: 'center' }}>
          Already have an account? <Link href="/login" variant="body2">Sign in</Link>
        </Typography> */}
      </Box>

      {/* Snackbar for error handling */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {passwordErrorMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
