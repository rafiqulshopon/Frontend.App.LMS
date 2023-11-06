import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Book, Star, Repeat, Settings } from 'react-feather';

const Sidebar = () => {
  const location = useLocation();

  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { path: '/users', label: 'Users', icon: <Users size={18} /> },
    { path: '/books', label: 'Books', icon: <Book size={18} /> },
    { path: '/reservations', label: 'Reservations', icon: <Star size={18} /> },
    {
      path: '/borrow-return',
      label: 'Borrow & Return',
      icon: <Repeat size={18} />,
    },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className='h-full w-64 p-6 bg-gray-800 mr-6 text-white'>
      <div className='text-xl mb-6'>LMS</div>
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center space-x-3 mb-2 py-2 px-4 rounded transition-colors ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              <span className='mr-2'>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
