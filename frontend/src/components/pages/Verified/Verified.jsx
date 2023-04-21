import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Switch } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useTheme } from '../../../helpers/ThemeProvider';
import { FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import './Verified.css';

const Verified = (props) => {
  const { backgroundColor } = useTheme();
  const { search } = useLocation();
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'dark');
  const [isVerified, setIsVerified] = useState(false);

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#1B2845' : '#552619';
  };

  //Handle Login Navigate
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const token = search?.replace('?token=', '');
    if (!token) {
      console.log('Token is missing or invalid');
      return;
    }
    axios.get(`/api/auth/verify-email?token=${token}`)
      .then(response => {
        setIsVerified(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [search]);

  return (
    <div className="verified-container">
      <div className="verified-content" data-theme={mode}>
        {isVerified && <FiCheckCircle className="verified-icon" />}
        {isVerified ?
          <h1 className="verified-title">Your profile is verified</h1> :
          <h1 className="verified-title">Verification failed</h1>}
        {isVerified ?
          <p className="verified-description">
            You can now use our services. Thank you for verifying your email address.
          </p> :
          <p className="verified-description">
            Your email verification token is invalid or has expired. Please try again later.
          </p>}
        <Button
          className="button-login space"
          variant="outlined"
          href="#outlined-buttons"
          onClick={handleLoginClick}
        >
          Back to Login
        </Button>
        <div className="mode-toggle">
          <span>{mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          <Switch
            checked={mode === 'dark'}
            onChange={toggleMode}
            name="modeToggle"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Verified;


