import { useState } from 'react';
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
import Cookies from 'js-cookie';
import { AuthContext } from './context/AuthContext';
import SingleUser from './pages/users/SingleUser';
import BookDetails from './pages/books/BookDetails';
import AuthWrapper from './AuthWrapper';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('accessToken'));

  const routes = [
    { path: '/', component: <HomePage />, show: true },
    { path: '/login', component: <Login />, show: true },
    { path: '/signup', component: <Signup />, show: true },
    { path: '/forget-password', component: <ForgetPassword />, show: true },
    { path: '/verify-otp', component: <VerifyOTP />, show: true },
    {
      path: '/dashboard',
      component: (
        <AuthWrapper>
          <Dashboard />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/users',
      component: (
        <AuthWrapper>
          <Users />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/books',
      component: (
        <AuthWrapper>
          <Books />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/reservations',
      component: (
        <AuthWrapper>
          <Reservations />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/borrow-return',
      component: (
        <AuthWrapper>
          <BorrowReturn />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/settings',
      component: (
        <AuthWrapper>
          <Settings />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/user/:id',
      component: (
        <AuthWrapper>
          <SingleUser />
        </AuthWrapper>
      ),
      show: true,
    },
    {
      path: '/book/:id',
      component: (
        <AuthWrapper>
          <BookDetails />
        </AuthWrapper>
      ),
      show: true,
    },
  ];

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
    </AuthContext.Provider>
  );
};

export default App;
