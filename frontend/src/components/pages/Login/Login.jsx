import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Button } from '@material-ui/core';
import { useTheme } from '../../../helpers/ThemeProvider';
import {  FcGoogle } from 'react-icons/fc';
import {  FaFacebook } from 'react-icons/fa';
import './Login.css';

const Login = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add form submission logic here
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

  return (
    <div class="login-container">
    <div class="image-container">
      <img src="https://plus.unsplash.com/premium_photo-1675826774817-fe983ceb0475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Signup Image"></img>
    </div>
    <div class="register-container" data-theme={mode}>
      <h1 class="register-title">Login</h1>
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
        <button type="submit">Login</button>
        <div className="forgot-password">
  <span >Forgot password?</span>
</div>
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
      <div className="dont-have-account">
  <span>Don't have an account?</span>
  <span onClick={handleSignUpClick}>Sign up</span>
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

export default Login;

