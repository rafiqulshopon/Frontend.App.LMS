import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import ForgetPassword from '@/pages/forget-password';
import VerifyOTP from './pages/signup/VerifyOTP';
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Books from './pages/books';
import Reservations from './pages/reservations';
import BorrowReturn from './pages/borrow-return';
import Settings from './pages/settings';

const App = () => {
  const routes = [
    { path: '/', component: <HomePage />, show: true },
    { path: '/login', component: <Login />, show: true },
    { path: '/signup', component: <Signup />, show: true },
    { path: '/forget-password', component: <ForgetPassword />, show: true },
    { path: '/verify-otp', component: <VerifyOTP />, show: true },
    { path: '/dashboard', component: <Dashboard />, show: true },
    { path: '/users', component: <Users />, show: true },
    { path: '/books', component: <Books />, show: true },
    { path: '/reservations', component: <Reservations />, show: true },
    { path: '/borrow-return', component: <BorrowReturn />, show: true },
    { path: '/settings', component: <Settings />, show: true },
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map(
            (route, index) =>
              route.show && (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              )
          )}
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
