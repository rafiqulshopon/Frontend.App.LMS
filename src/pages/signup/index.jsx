import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';

const Signup = () => {
  const [signupData, setSignupData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log({ signupData });

  const handleSignup = async (e) => {
    console.log('clicked');
    e.preventDefault();
    setError(null);

    if (signupData?.password !== signupData?.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (signupData?.confirmPassword) delete signupData?.confirmPassword;

    try {
      const response = await axios.post('/auth/signup', { ...signupData });
      localStorage.setItem('email', signupData?.email);
      navigate('/verify-otp');
      console.log({ response });
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred during signup.'
      );
    }
  };

  return (
    <section className='bg-cyan-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Create an account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSignup}>
              {error && <div className='text-red-500'>{error}</div>}

              <div className='flex space-x-4'>
                <div className='w-1/2'>
                  <label
                    htmlFor='firstName'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        name: { ...signupData.name, first: e.target.value },
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your first name'
                    required
                  />
                </div>
                <div className='w-1/2'>
                  <label
                    htmlFor='lastName'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        name: { ...signupData.name, last: e.target.value },
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your last name'
                    required
                  />
                </div>
              </div>

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
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div className='flex space-x-4'>
                <div className='w-1/2'>
                  <label
                    htmlFor='studentId'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Student Id
                  </label>
                  <input
                    type='text'
                    name='studentId'
                    id='studentId'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        studentId: e.target.value,
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your student id'
                    required
                  />
                </div>

                <div className='w-1/2'>
                  <label
                    htmlFor='dateOfBirth'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Date of birth
                  </label>
                  <input
                    type='text'
                    name='dateOfBirth'
                    id='dateOfBirth'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your date of birth'
                    required
                  />
                </div>
              </div>

              <div className='flex space-x-4'>
                <div className='w-1/2'>
                  <label
                    htmlFor='role'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Role
                  </label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        role: e.target.value,
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your role'
                    required
                  />
                </div>

                <div className='w-1/2'>
                  <label
                    htmlFor='phoneNumber'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Phone number
                  </label>
                  <input
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Enter your phone number'
                    required
                  />
                </div>
              </div>

              <div className='flex space-x-4'>
                <div className='w-1/2'>
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
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                  />
                </div>
                <div className='w-1/2'>
                  <label
                    htmlFor='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    placeholder='••••••••'
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                  />
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='terms'
                    aria-describedby='terms'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
                    required
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='terms' className='font-light text-gray-500'>
                    I accept the{' '}
                    <a
                      className='font-medium text-primary-600 hover:underline'
                      href='#'
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Create an account
              </button>
              <p className='text-sm font-light text-gray-500'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
