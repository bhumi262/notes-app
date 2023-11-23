import React,{ useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    checkAuthentication();
  }, ); 
  


  const checkAuthentication = () => {
    // Check if the user is authenticated (token present in local storage)
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Set the token in the headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decode the token to get user information (assuming it's a JWT)
      const decodedToken = decodeJwtToken(token);

      if (decodedToken) {
        console.log(decodedToken.firstName)
        // Extract and set user information (assuming payload includes firstName and lastName)
        setUser({
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
        });
      } else {
        // Handle invalid or expired token
        handleLogout();
      }
    } else {
      // Redirect to the login page if the user is not authenticated
      navigate('/login');
    }
  };
  const handleLogout = () => {

     // Remove the token from local storage
  localStorage.removeItem('jwtToken');

  // Remove the token from the headers
  delete axios.defaults.headers.common['Authorization'];
    
    console.log('Logging out...');
      navigate('/login')
    
   
  };
  const decodeJwtToken = (token) => {
    try {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      // Handle decoding error
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side - User's Name */}
        {user ? (
  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    {`Welcome, ${user.firstName} ${user.lastName}`}
  </Typography>
) : (
  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    Welcome!
  </Typography>
)}

        {/* Right side - Logout Button */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Home;
