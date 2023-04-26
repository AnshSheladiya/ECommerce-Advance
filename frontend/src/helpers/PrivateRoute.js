// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('user');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
