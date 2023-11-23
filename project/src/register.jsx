import React, { useState } from 'react';
import axios from 'axios'
import { TextField, Button, Link, Container, CssBaseline, Typography, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const theme = createTheme();

const Register = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  };

  const formStyle = {
    width: '100%', // Ensure the form takes the full width
    marginTop: theme.spacing(3),
  };

  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate('/login')
  };
  

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4500/my-notes/signup', {
        firstName,
        lastName,
        email,
        password,
      });
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          text: 'You can now log in with your credentials.',
        });
        navigate('/login')
       
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'An unexpected error occurred. Please try again later.',
        });
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'All fields are required.',
            });
            break;
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'Email already exists. Please use a different email.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      } else {
        console.error('Error during registration:', error);
      }
    }
  };

 
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={containerStyle}>
            <Typography component="h1" variant="h4">
              Register
            </Typography>
            <form style={formStyle} noValidate>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                Register
              </Button>
              <Link onClick={handleNavigate} style={{ marginTop: '10px', cursor:'pointer' }}>
                Already have an account? Login here.
              </Link>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
