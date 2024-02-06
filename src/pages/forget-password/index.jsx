import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/forget-password', {
        email,
      });
      if (
        response.data.message ===
        'OTP sent to your email. Please verify to reset password.'
      ) {
        Cookies.set('forget-password-email', email, { expires: 1 / 24 });
        navigate('/reset-password');
      }
    } catch (error) {
      setError(
        error.response.data.message || 'An error occurred, please try again.'
      );
    }
  };

  return (
    <section className='bg-cyan-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Forgot password?
            </h1>
            <p className='text-sm text-gray-600'>
              Enter your email address below, and we'll send you an OTP to reset
              your password.
            </p>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
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
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Enter your email to get otp'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-light text-gray-500'>
                  Remember password?{' '}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline'
                  >
                    Login
                  </Link>
                </p>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Send OTP
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

export default ForgetPassword;
