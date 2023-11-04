import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

const VerifyOTP = () => {
  const [otpData, setOtpData] = useState({
    email: '',
    otp: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem('email');
    if (emailFromLocalStorage) {
      setOtpData((prevData) => ({ ...prevData, email: emailFromLocalStorage }));
    }
  }, []);

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/verify-otp', otpData);
      console.log(response);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'An error occurred during OTP verification.'
      );
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Verify OTP
          </h1>
          <form
            className='space-y-4 md:space-y-6'
            onSubmit={handleOTPVerification}
          >
            {error && <div className='text-red-500'>{error}</div>}

            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={otpData.email}
                disabled
                className='bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              />
            </div>

            <div>
              <label
                htmlFor='otp'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                OTP
              </label>
              <input
                type='text'
                name='otp'
                id='otp'
                onChange={(e) =>
                  setOtpData({ ...otpData, otp: e.target.value })
                }
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
