import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import '../../../styles/global.css';
import VerifiedStyles from './Verified.module.css';
import useTheme from '../../../helpers/useTheme';

const Verified = ({ location }) => {
  const { mode, handleModeChange } = useTheme();
  const { search } = useLocation();
  const [isVerified, setIsVerified] = useState(false);

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
    <div className={`${VerifiedStyles['verify-container']} ${mode}`}>
      <div className={VerifiedStyles['verified-content']} data-theme={mode}>
        {isVerified && <FiCheckCircle className={VerifiedStyles['verified-icon']} />}
        {isVerified ?
          <h1 className={VerifiedStyles['verified-title']}>Your profile is verified</h1> :
          <h1 className={VerifiedStyles['verified-title']}>Verification failed</h1>}
        {isVerified ?
          <p className={VerifiedStyles['verified-description']}>
            You can now use our services. Thank you for verifying your email address.
          </p> :
          <p className={VerifiedStyles['verified-description']}>
            Your email verification token is invalid or has expired. Please try again later.
          </p>}
        <Button
          className={`${VerifiedStyles['button-login']} ${VerifiedStyles['space']}`}
          variant="outlined"
          href="#outlined-buttons"
          onClick={handleLoginClick}
        >
          Back to Login
        </Button>

      </div>
    </div>
  );

};

export default Verified;


