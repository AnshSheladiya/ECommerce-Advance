import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Button,Select,MenuItem } from '@material-ui/core';
import {  FcGoogle } from 'react-icons/fc';
import {  FaFacebook } from 'react-icons/fa';
import registerStyles from './Register.module.css';
import { toast } from 'react-toastify';
import screenLogo from "../../../images/ScreenLogo.png";
import useTheme from '../../../helpers/useTheme';
import { Brightness1 } from '@material-ui/icons';

const Register = () => {
  const { mode, handleModeChange, themes } = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      // add this code to update the keys as required by the backend
      first_name: event.target.name === 'firstName' ? event.target.value : formData.first_name,
      last_name: event.target.name === 'lastName' ? event.target.value : formData.last_name,
      confirmPassword: event.target.name === 'confirmPassword' ? event.target.value : formData.confirmPassword
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { firstName, lastName, email, password, confirmPassword } = formData;
      const response = await axios.post('/api/auth/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirmPassword
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };

    //Handle Signup Navigate
    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/');
    };

    return (
<div className={`${registerStyles["signup-container"]} ${mode}`}>
        <div className={registerStyles["image-container"]}>
          <img src={screenLogo} alt="Signup Image" />
        </div>

        <div
          className={`${registerStyles["register-container"]}`}  data-theme={mode}
        >
          <h1 className={registerStyles["register-title"]}>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className={registerStyles["form-group"]}>
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
            <div className={registerStyles["form-group"]}>
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
            <div className={registerStyles["form-group"]}>
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
            <div className={registerStyles["form-group"]}>
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
            <div className={registerStyles["form-group"]}>
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
            <button type="submit" onClick={handleSubmit}>Register</button>
          </form>
          <hr />
          <div className={`${registerStyles["form-group"]} ${registerStyles["button-container"]}`}>
            <Button
              className={`${registerStyles["button-google"]} ${registerStyles["space"]}`}
              variant="outlined"
              href="#outlined-buttons"
              startIcon={<FcGoogle />}
            >
              Google
            </Button>

            <Button
              className={`${registerStyles["button-facebook"]} ${registerStyles["space"]}`}
              variant="outlined"
              href="#outlined-buttons"
              startIcon={<FaFacebook />}
            >
              Facebook
            </Button>
          </div>
          <div className={registerStyles["have-account"]}>
            <span>Already have an account?</span>
            <span className={registerStyles["login-link"]} onClick={handleLoginClick}>Login</span>
          </div>
          <div className={registerStyles['mode-select']}>
            <Select value={mode} onChange={handleModeChange}>
        {themes.map((theme) => (
          <MenuItem value={theme.mode}>
            <Brightness1 style={{ color: theme.color }} />
          </MenuItem>
        ))}
      </Select>
      </div>

        </div>
      </div>
    );

};

export default Register;

