import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  StarOutlined,
  SyncOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { path: '/users', label: 'Users', icon: <UserOutlined /> },
    { path: '/books', label: 'Books', icon: <BookOutlined /> },
    { path: '/reservations', label: 'Reservations', icon: <StarOutlined /> },
    {
      path: '/borrow-return',
      label: 'Borrow & Return',
      icon: <SyncOutlined />,
    },
    { path: '/settings', label: 'Settings', icon: <SettingOutlined /> },
  ];

  return (
    <Sider
      width={200}
      style={{
        color: 'white',
        backgroundColor: 'white',
        height: '100vh',
        paddingRight: '1rem',
        overflow: 'auto',
      }}
    >
      <div
        className='logo'
        style={{
          padding: '1rem',
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <img
          src='https://www.activeliving.ie/content/uploads/2020/04/placeholder-logo-2.png'
          alt='LMS Logo'
          style={{ maxHeight: '50px' }}
        />
      </div>
      <Menu
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={items.map((item) => ({
          key: item.path,
          icon: item.icon,
          label: <Link to={item.path}>{item.label}</Link>,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
