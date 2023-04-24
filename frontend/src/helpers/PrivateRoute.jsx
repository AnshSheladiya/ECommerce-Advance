
// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function PrivateRoute({ element: Component, ...rest }) {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={authenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
}

export default PrivateRoute;
