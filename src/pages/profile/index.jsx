import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import {
  Spin,
  Descriptions,
  Form,
  Input,
  Button,
  message,
  Select,
  Row,
  Col,
} from 'antd';
import moment from 'moment';

const { Option } = Select;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/profile');
      setUser(response.data);
      form.setFieldsValue({
        'name.first': response.data.name.first,
        'name.last': response.data.name.last,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address,
        batch: response.data.batch,
        department: response.data.department,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        name: { first: values['name.first'], last: values['name.last'] },
      };

      if ('name.first' in formattedValues) {
        delete formattedValues['name.first'];
      }
      if ('name.last' in formattedValues) {
        delete formattedValues['name.last'];
      }

      const response = await axiosInstance.put(
        '/edit-profile',
        formattedValues
      );
      setUser(response.data);
      message.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      message.error('Failed to update profile.');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>User Profile</h2>

      {isEditing ? (
        <div className='w-1/3'>
          <Form form={form} layout='vertical' onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='name.first' label='First Name'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='name.last' label='Last Name'>
                  <Input />
                </Form.Item>{' '}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='email' label='Email'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='phoneNumber' label='Phone Number'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='department' label='Department'>
                  <Select placeholder='Select department'>
                    <Option value='CSE'>CSE</Option>
                    <Option value='LHR'>LHR</Option>
                    <Option value='PHR'>PHR</Option>
                    <Option value='ENG'>ENG</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='batch' label='Batch'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name='address' label='Address'>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='bg-blue-500 hover:bg-blue-700'
              >
                Update
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <>
          <Descriptions
            bordered
            title='User Information'
            layout='vertical'
            className='bg-white p-6 rounded-lg shadow mt-4'
          >
            <Descriptions.Item label='First Name'>
              {user.name.first}
            </Descriptions.Item>
            <Descriptions.Item label='Last Name'>
              {user.name.last}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
            <Descriptions.Item label='Phone Number'>
              {user.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label='Date of Birth'>
              {moment(user.dateOfBirth).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label='Address'>
              {user.address}
            </Descriptions.Item>
            <Descriptions.Item label='Batch'>{user.batch}</Descriptions.Item>
            <Descriptions.Item label='Department'>
              {user.department}
            </Descriptions.Item>
          </Descriptions>
          <Button
            type='primary'
            className='bg-blue-500 hover:bg-blue-700 mt-4'
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </>
      )}
    </div>
  );
};

export default Profile;
