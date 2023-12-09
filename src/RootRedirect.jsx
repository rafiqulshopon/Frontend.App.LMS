import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const RootRedirect = () => {
  const token = Cookies.get('accessToken');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        Cookies.remove('accessToken');
        return <Navigate to='/login' replace />;
      }

      return <Navigate to='/dashboard' replace />;
    } catch (error) {
      Cookies.remove('accessToken');
      return <Navigate to='/login' replace />;
    }
  }

  return <Navigate to='/login' replace />;
};

export default RootRedirect;
