import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Button } from '@material-ui/core';
import { useTheme } from '../../../helpers/ThemeProvider';
import './ForgatPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgatPassword = () => {
  const { backgroundColor } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
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
    forgatPasswordUser();
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

  const forgatPasswordUser = async () => {
    try {
      const response = await axios.post('/api/auth/forgot-password', {
        email: formData.email
      });
      toast.success(response.data.message);
      // TODO: handle successful forgatPassword
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      // TODO: handle error
    }
  };


  return (
    <div class="forgatPassword-container">
    <div class="register-container" data-theme={mode}>
      <h1 class="register-title">Forgat Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  </div>
  );
};

export default ForgatPassword;
