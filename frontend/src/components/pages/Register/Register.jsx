import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Switch, Button } from '@material-ui/core';
import { useTheme } from '../../../helpers/ThemeProvider';
import {  FcGoogle } from 'react-icons/fc';
import {  FaFacebook } from 'react-icons/fa';
import './Register.css'

const Register = () => {
  const { backgroundColor } = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const handleSubmit = async (event) => {
    event.preventDefault();
    await signUpUser(formData);
    };

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#1B2845' : '#552619';
  };

    //Handle Signup Navigate
    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/login');
    };

     // Function to sign up the user
  const signUpUser = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });
console.log("ok---",body)
    const res = await axios.post('http://localhost:8383/api/auth/signup', body, config);
    return res;
  };

  return (
   <div class="signup-container">
  <div class="image-container">
    <img src="https://plus.unsplash.com/premium_photo-1675826774817-fe983ceb0475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Signup Image"></img>
  </div>
  <div
      className="register-container"
      data-theme={mode}
    >
      <h1 class="register-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onClick={signUpUser}>Register</button>
      </form>
      <hr />
      <div className="form-group button-container">
  <Button
    className="button-google space"
    variant="outlined"
    href="#outlined-buttons"
    startIcon={<FcGoogle />}
  >
    Google
  </Button>

  <Button
    className="button-facebook space"
    variant="outlined"
    href="#outlined-buttons"
    startIcon={<FaFacebook />}
  >
    Facebook
  </Button>
</div>
<div class="have-account">
  <span>Already have an account?</span>
  <span class="login-link" onClick={handleLoginClick}>Login</span>
</div>

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

export default Register;

