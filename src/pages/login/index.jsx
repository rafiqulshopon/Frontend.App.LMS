import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });

      if (data.token) {
        Cookies.set('accessToken', data.token, { expires: 7 });
        setIsLoggedIn(true);
        if (Cookies.get('accessToken')) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred during login.'
      );
    }
  };

  return (
    <section className='bg-cyan-50	'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Sign in to your account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              action='#'
              onSubmit={handleLogin}
            >
              {error && <div className='text-red-500'>{error}</div>}

              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500'>
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to='/forget-password'
                  className='text-sm font-medium text-primary-600 hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500'>
                Don’t have an account yet?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
