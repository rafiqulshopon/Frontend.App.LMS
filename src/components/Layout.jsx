import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebarOnRoutes = [
    '/',
    '/login',
    '/signup',
    '/forget-password',
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
