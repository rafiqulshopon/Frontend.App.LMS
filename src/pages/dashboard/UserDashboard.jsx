import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Card, List, Spin, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/user-dashboard');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }
  return (
    <div className='mt-4 mx-4 h-screen overflow-auto'>
      <Title level={2} className='mb-8'>
        Dashboard
      </Title>

      <Card title='Current Borrowings' className='mb-4'>
        <List
          itemLayout='horizontal'
          dataSource={userData?.currentBorrowings}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<BookOutlined />}
                title={item.book?.title}
                description={`Due on ${moment(item.expectedReturnDate).format(
                  'LL'
                )}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <Card title='Borrowing History'>
        <List
          itemLayout='horizontal'
          dataSource={userData?.borrowingHistory}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<BookOutlined />}
                title={item.book?.title}
                description={`Returned on ${moment(
                  item.actualReturnDate
                ).format('LL')}`}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* {userData?.overdueBooks.length > 0 && ( */}
      <Card title='Overdue Books' className='mt-4'>
        <List
          itemLayout='horizontal'
          dataSource={userData.overdueBooks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<BookOutlined />}
                title={item.book?.title}
                description={
                  <>
                    <div>Author: {item.book?.author}</div>
                    <div>
                      Expected Return Date:{' '}
                      {moment(item.expectedReturnDate).format('LL')}
                    </div>
                    <div className='text-red-500'>Overdue!</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      {/* )} */}
    </div>
  );
};

export default UserDashboard;
