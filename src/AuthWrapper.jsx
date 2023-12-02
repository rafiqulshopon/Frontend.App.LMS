import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthWrapper = ({ children }) => {
  const token = Cookies.get('accessToken');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove('accessToken');
      return <Navigate to='/login' replace />;
    }
  } catch (error) {
    Cookies.remove('accessToken');
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default AuthWrapper;
