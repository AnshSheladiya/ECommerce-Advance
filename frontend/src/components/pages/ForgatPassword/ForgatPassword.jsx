import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Button } from '@material-ui/core';
import '../../../styles/global.css';
import ForgatPasswordStyles from './ForgatPassword.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTheme from '../../../helpers/useTheme';

const ForgatPassword = () => {
  const { mode, handleModeChange } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
  });

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
    <div className={`${ForgatPasswordStyles.forgatPasswordContainer} ${mode}`}>
      <div className={`${ForgatPasswordStyles.registerContainer}`} data-theme={mode}>
        <h1 className={ForgatPasswordStyles.registerTitle}>Forgat Password</h1>
        <form onSubmit={handleSubmit}>
          <div className={ForgatPasswordStyles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={ForgatPasswordStyles.input}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className={ForgatPasswordStyles.button}>Send</button>
        </form>
      </div>
    </div>
  );

};

export default ForgatPassword;
