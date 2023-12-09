import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const isAdminUser = () => {
  const token = Cookies.get('accessToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
};

export const getUserId = () => {
  const token = Cookies.get('accessToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    return null;
  }
};
