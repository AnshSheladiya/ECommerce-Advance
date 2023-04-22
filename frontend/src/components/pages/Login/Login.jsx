import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button,Select,MenuItem } from '@material-ui/core';
import {  FcGoogle } from 'react-icons/fc';
import {  FaFacebook } from 'react-icons/fa';
import loginStyles from './Login.module.css';
import '../../../styles/global.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import loginScreenLogo from "../../../images/LoginScreenLogo.png";
import useTheme from '../../../helpers/useTheme';
import { Brightness1 } from '@material-ui/icons';

const Login = () => {
  const { mode, handleModeChange, themes } = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  //Handle Signup Navigate
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate('/register');
  };
  const handleForgatPasswordClick = () => {
    navigate('/forgat-password');
  };

  const loginUser = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message);
      // TODO: handle successful login
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      // TODO: handle error
    }
  };

  return (
    <div className={`${loginStyles['login-container']} ${mode}`} >
        <div className={loginStyles['image-container']}>
            <img src={loginScreenLogo} alt="Signup Image"></img>
        </div>
        <div className={loginStyles['register-container']} data-theme={mode}>
            <h1 className={loginStyles['register-title']}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={loginStyles['form-group']}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={loginStyles['form-control']}
                    />
                </div>
                <div className={loginStyles['form-group']}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={loginStyles['form-control']}
                    />
                </div>
                <button type="submit" onClick={handleSubmit} className={loginStyles['btn']}>Login</button>
                <div className={loginStyles['forgot-password']}>
                    <span onClick={handleForgatPasswordClick}>Forgot password?</span>
                </div>
            </form>
            <hr />
            <div className={loginStyles['form-group'] + ' ' + loginStyles['button-container']}>
                <Button
                    className={loginStyles['btn'] + ' ' + loginStyles['button-google'] + ' ' + loginStyles['space']}
                    variant="outlined"
                    startIcon={<FcGoogle />}
                >
                    Google
                </Button>

                <Button
                    className={loginStyles['btn'] + ' ' + loginStyles['button-facebook'] + ' ' + loginStyles['space']}
                    variant="outlined"
                    startIcon={<FaFacebook />}
                >
                    Facebook
                </Button>
            </div>
            <div className={loginStyles['dont-have-account']}>
                <span>Don't have an account?</span>
                <span onClick={handleSignUpClick}>Sign up</span>
            </div>
            <div className={loginStyles['mode-select']}>
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

export default Login;


