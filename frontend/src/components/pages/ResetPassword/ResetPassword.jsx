import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Switch, Button } from '@material-ui/core';
import { useTheme } from '../../../helpers/ThemeProvider';
import './ResetPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backgroundColor } = useTheme();
  const location = useLocation();

  const [formData, setFormData] = useState({
    newPassword: '',
  });

  const [mode, setMode] = useState(
    localStorage.getItem('mode') || 'dark'
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword();
  };

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#1B2845' : '#552619';
  };

  //Handle Signup Navigate
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate('/register');
  };

  const resetPassword = async () => {
    try {
      const token = location.search.replace('?token=', '');
      if (!token) {
        console.log('Token is missing or invalid');
        return;
      }
      const response = await axios.put(`/api/auth/reset-password?token=${token}`, {
        newPassword: formData.newPassword
      });
      toast.success(response.data.message);
      // TODO: handle successful resetPassword
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      // TODO: handle error
    }
  };


  return (
    <div className="resetPassword-container">
      <div className="resetPassword-form-container" data-theme={mode}>
        <h1 className="resetPassword-title">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
