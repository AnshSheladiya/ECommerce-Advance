// Logout.js

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/logout');
      localStorage.removeItem('user');
      setLogoutStatus('success');
    } catch (error) {
      console.error(error);
      setLogoutStatus('failed');
    }
  };

  if (logoutStatus === 'success') {
    return <h1>Logout success!</h1>;
  } else if (logoutStatus === 'failed') {
    return <h1>Logout failed.</h1>;
  }

  handleLogout();

  return <Navigate to="/login" replace />;
};

export default Logout;
