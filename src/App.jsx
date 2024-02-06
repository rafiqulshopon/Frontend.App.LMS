import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import ForgetPassword from '@/pages/forget-password';
import VerifyOTP from './pages/signup/VerifyOTP';
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Books from './pages/books';
import BorrowReturn from './pages/borrow-return';
import Settings from './pages/settings';
import Cookies from 'js-cookie';
import { AuthContext } from './context/AuthContext';
import SingleUser from './pages/users/SingleUser';
import BookDetails from './pages/books/BookDetails';
import Profile from './pages/profile';
import AuthWrapper from './AuthWrapper';
import ResetPassword from './pages/reset-password';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('accessToken'));

  const routes = [
    { path: '/login', component: <Login />, show: true, protected: false },
    { path: '/signup', component: <Signup />, show: true, protected: false },
    {
      path: '/forget-password',
      component: <ForgetPassword />,
      show: true,
      protected: false,
    },
    {
      path: '/reset-password',
      component: <ResetPassword />,
      show: true,
      protected: false,
    },
    {
      path: '/verify-otp',
      component: <VerifyOTP />,
      show: true,
      protected: false,
    },
    {
      path: '/dashboard',
      component: <Dashboard />,
      show: true,
      protected: true,
    },
    {
      path: '/users',
      component: <Users />,
      show: true,
      protected: true,
    },
    {
      path: '/books',
      component: <Books />,
      show: true,
      protected: true,
    },
    {
      path: '/borrow-return',
      component: <BorrowReturn />,
      show: true,
      protected: true,
    },
    {
      path: '/settings',
      component: <Settings />,
      show: true,
      protected: true,
    },
    {
      path: '/user/:id',
      component: <SingleUser />,
      show: true,
      protected: true,
    },
    {
      path: '/book/:id',
      component: <BookDetails />,
      show: true,
      protected: true,
    },
    {
      path: '/profile',
      component: <Profile />,
      show: isLoggedIn,
      protected: true,
    },
  ];

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map((route) =>
              route.show ? (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    route.protected ? (
                      <AuthWrapper>{route.component}</AuthWrapper>
                    ) : (
                      route.component
                    )
                  }
                />
              ) : null
            )}
            <Route path='/' element={<AuthWrapper />} />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
