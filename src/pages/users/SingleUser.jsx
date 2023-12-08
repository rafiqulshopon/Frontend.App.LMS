import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { Card, Descriptions, Spin, Typography, Tag } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Title } = Typography;

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='flex justify-center mt-10'>
      <Card className='w-full max-w-2xl p-5 shadow rounded-lg' bordered={false}>
        <Title level={2} className='text-center mb-5'>
          User Details
        </Title>

        <Descriptions bordered column={1} layout='horizontal' size='middle'>
          <Descriptions.Item label='Full Name'>
            {`${user.name.first} ${user.name.last}`}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label='Date of Birth'>
            {new Date(user.dateOfBirth).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label='Role'>{user.role}</Descriptions.Item>
          <Descriptions.Item label='Department'>
            {user.department}
          </Descriptions.Item>
          <Descriptions.Item label='Batch'>{user.batch}</Descriptions.Item>
          <Descriptions.Item label='Address'>{user.address}</Descriptions.Item>
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
      </Card>
    </div>
  );
};

export default SingleUser;
