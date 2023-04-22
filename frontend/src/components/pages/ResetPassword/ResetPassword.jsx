import React, { useState } from 'react';
import '../../../styles/global.css';
import ResetPasswordStyles from './ResetPassword.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTheme from '../../../helpers/useTheme';

const ResetPassword = ({ location }) => {
  const { mode, handleModeChange } = useTheme();

  const [formData, setFormData] = useState({
    newPassword: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword(location); // <-- pass location as an argument
  };

  const resetPassword = async (location) => { // <-- receive location as a parameter
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
    <div className={`${ResetPasswordStyles.resetPasswordContainer} ${mode}`}>
      <div className={ResetPasswordStyles.resetPasswordFormContainer} data-theme={mode}>
        <h1 className={ResetPasswordStyles.resetPasswordTitle}>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className={ResetPasswordStyles.formGroup}>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className={ResetPasswordStyles.input}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className={ResetPasswordStyles.button}>Reset Password</button>
        </form>
      </div>
    </div>
  );

};

export default ResetPassword;
