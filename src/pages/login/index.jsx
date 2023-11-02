import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setError(null);

    try {
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const token = response.data.token;

      localStorage.setItem('accessToken', token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred during login.'
      );
    }
  };

  return (
    <div className='bg-blue-100 h-screen flex items-center justify-center'>
      <div className='bg-white p-10 rounded-lg shadow-md w-96'>
        <p className='text-center text-xl font-medium mb-6'>
          Sign in to your account
        </p>

        <Form layout='vertical' onFinish={handleLogin}>
          {error && <div className='text-red-500 mb-4'>{error}</div>}

          <Form.Item
            label={<span className='font-semibold'>Your email</span>}
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label={<span className='font-semibold'>Password</span>}
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='••••••••' />
          </Form.Item>

          <Form.Item className='mb-6'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='/forget-password' className='float-right'>
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              className='bg-blue-600 hover:bg-blue-700'
            >
              Sign in
            </Button>
          </Form.Item>

          <p className='text-center'>
            Don’t have an account yet?{' '}
            <Link to='/signup' className='text-blue-600'>
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
