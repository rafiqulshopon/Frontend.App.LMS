import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import ForgetPassword from '@/pages/forget-password';
import VerifyOTP from './pages/signup/VerifyOTP';

const App = () => {
  const routes = [
    { path: '/', component: <HomePage />, show: true },
    { path: '/login', component: <Login />, show: true },
    { path: '/signup', component: <Signup />, show: true },
    { path: '/forget-password', component: <ForgetPassword />, show: true },
    { path: '/verify-otp', component: <VerifyOTP />, show: true },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(
          (route, index) =>
            route.show && (
              <Route key={index} path={route.path} element={route.component} />
            )
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
