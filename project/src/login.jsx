import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Link, Container, CssBaseline, Typography, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import axios from 'axios';
const theme = createTheme();

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  };

  const formStyle = {
    width: '100%',
    marginTop: theme.spacing(3),
  };
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/register')
  }
  const handleLogin = async () => {
    try {
      // Make a POST request to your login API
      const response = await axios.post('http://localhost:4500/my-notes/login', {
        email,
        password,
      });

      // Check if the login was successful
      if (response.status === 200 && response.data && response.data.token) {
        // Store the token in localStorage for persistence
        localStorage.setItem('jwtToken', response.data.token);

        // Set the token in the Authorization header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'Welcome back!',
        });

        // Handle success, e.g., set user authentication state, redirect, etc.
        console.log('Login successful!', response.data);
        navigate('/profile', { replace: true });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid email or password. Please try again.',
        });

        // Handle failure, e.g., show an error message
        console.error('Login failed.');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: 'Invalid email or password. Please try again.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      } else {
        console.error('Error during login:', error);
        // Handle other errors, e.g., show an error message
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
              Login
            </Typography>
            <form style={formStyle} noValidate>
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
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
              </Button>
              <Link top="/register" onClick={handleNavigate} style={{ marginTop: '15px', cursor: 'pointer' }}>
                Create New Account
              </Link>
            </form>
          </div>

        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
