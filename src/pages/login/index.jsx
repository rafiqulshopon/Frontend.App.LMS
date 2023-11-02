import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  Typography,
} from 'antd';

const { Title } = Typography;

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
    <Row
      align='middle'
      justify='center'
      style={{ backgroundColor: '#E5F7FF', height: '100vh' }}
    >
      <Col>
        <Card style={{ width: 350 }}>
          <Title level={3}>Sign in to your account</Title>
          <Form layout='vertical' onFinish={handleLogin}>
            {error && (
              <div
                className='ant-alert ant-alert-error'
                style={{ marginBottom: '16px' }}
              >
                {error}
              </div>
            )}

            <Form.Item
              label='Your email'
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder='Enter your email' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder='••••••••' />
            </Form.Item>

            <Form.Item style={{ marginBottom: '24px' }}>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to='/forget-password' className='ant-btn ant-btn-link'>
                Forgot password?
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%', backgroundColor: '#1890FF' }}
              >
                Sign in
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              Don’t have an account yet?{' '}
              <Link to='/signup' className='ant-btn ant-btn-link'>
                Sign up
              </Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
