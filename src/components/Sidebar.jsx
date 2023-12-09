import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  SyncOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import { isAdminUser } from '../utils/apphelpers';
import { jwtDecode } from 'jwt-decode';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  let userData;
  const token = Cookies.get('accessToken');
  if (token) {
    try {
      userData = jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handleLogout = () => {
    Cookies.remove('accessToken');
    navigate('/login');
  };

  const showConfirmLogout = () => {
    Modal.confirm({
      title: 'Do you want to logout?',
      okButtonProps: {
        style: {
          backgroundColor: '#1890ff',
          borderColor: '#1890ff',
          color: 'white',
        },
      },
      onOk() {
        handleLogout();
      },
      onCancel() {
        console.log('Cancel logout');
      },
    });
  };

  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    ...(isAdmin
      ? [{ path: '/users', label: 'Users', icon: <TeamOutlined /> }]
      : []),
    { path: '/books', label: 'Books', icon: <BookOutlined /> },
    {
      path: '/borrow-return',
      label: 'Borrow & Return',
      icon: <SyncOutlined />,
    },
    { path: '/profile', label: 'My profile', icon: <UserOutlined /> },
    { label: 'Logout', icon: <LogoutOutlined />, onClick: showConfirmLogout },
  ];

  return (
    <Sider width={200} className='bg-white'>
      <div>
        <div className='m-6 p-4 flex items-center justify-center bg-gray-400 rounded-md'>
          <span className='text-white text-2xl font-bold uppercase'>LMS</span>
        </div>

        <Menu
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
          items={items.map((item) => ({
            key: item.path || item.label,
            icon: item.icon,
            label: item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              item.label
            ),
            onClick: item.onClick,
          }))}
        />
      </div>

      {userData && (
        <div className='text-center p-4 mt-[460px] text-gray-600 border-t'>
          <div className='font-semibold'>{`${userData?.name?.first} ${userData?.name?.last}`}</div>
          <div className='text-sm capitalize'>{userData?.role}</div>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
