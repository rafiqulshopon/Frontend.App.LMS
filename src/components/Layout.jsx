import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebarOnRoutes = [
    '/404',
    '/',
    '/login',
    '/signup',
    '/forget-password',
    '/reset-password',
    '/verify-otp',
  ];

  return (
    <div className='flex h-screen bg-gray-100'>
      {!hideSidebarOnRoutes.includes(location.pathname) && <Sidebar />}
      <div className='flex-1 flex flex-col overflow-hidden'>{children}</div>
    </div>
  );
};

export default Layout;
