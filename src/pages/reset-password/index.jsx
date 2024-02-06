import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axiosInstance from '../../axios';
import Cookies from 'js-cookie';

const ResetPassword = () => {
  const email = Cookies.get('forget-password-email');
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        email,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        message.success('Password reset successfully.');
        Cookies.remove('forget-password-email');
        navigate('/login');
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          'Failed to reset password, please try again.'
      );
    }
  };

  return (
    <section className='bg-cyan-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl '>
              Reset your password
            </h1>
            <Form
              layout='vertical'
              onFinish={handleResetPassword}
              initialValues={{ email }}
            >
              <Form.Item label='Email' name='email'>
                <Input type='email' value={email} disabled />
              </Form.Item>
              <Form.Item
                label='OTP'
                name='otp'
                rules={[
                  {
                    required: true,
                    message: 'Please input the OTP sent to your email.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='New Password'
                name='newPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password.',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <button
                  type='submit'
                  className='w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Reset Password
                </button>
              </Form.Item>
              <p className='text-sm font-light text-gray-500'>
                Don't want to reset password?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline'
                >
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
