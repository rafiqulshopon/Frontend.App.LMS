import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Spin, Descriptions, Tag } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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
      <Descriptions
        bordered
        title='My Profile'
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
          {new Date(user.dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label='Role'>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Descriptions.Item>
        <Descriptions.Item label='Address'>{user.address}</Descriptions.Item>
        <Descriptions.Item label='Batch'>{user.batch}</Descriptions.Item>
        <Descriptions.Item label='Department'>
          {user.department}
        </Descriptions.Item>
        <Descriptions.Item label='Account Status'>
          {user.isActive ? (
            <Tag
              icon={<CheckCircleTwoTone twoToneColor='#52c41a' />}
              color='success'
            >
              Active
            </Tag>
          ) : (
            <Tag
              icon={<CloseCircleTwoTone twoToneColor='#eb2f96' />}
              color='error'
            >
              Inactive
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Verification Status'>
          {user.isVerified ? (
            <Tag color='blue'>Verified</Tag>
          ) : (
            <Tag color='volcano'>Not Verified</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Profile;
