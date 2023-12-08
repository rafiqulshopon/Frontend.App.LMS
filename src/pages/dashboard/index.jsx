import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Card, Statistic, Row, Col, Typography, List } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  RiseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='mt-4 mr-4 ml-4 h-screen overflow-auto'>
      <Title level={2} className='px-6 text-gray-800'>
        Dashboard
      </Title>

      <Row gutter={[16, 16]} className='px-4'>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-blue-200 m-2'>
            <Statistic
              title='Total Users'
              value={dashboardData.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-green-200 m-2'>
            <Statistic
              title='New Users Last 7 Days'
              value={dashboardData.newUsersLast7Days}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-yellow-200 m-2'>
            <Statistic
              title='Total Books'
              value={dashboardData.totalBooks}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='px-4 py-2'>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-red-200 m-2'>
            <Statistic
              title='New Books Last 7 Days'
              value={dashboardData.newBooksLast7Days}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-purple-200 m-2'>
            <Statistic
              title='Total Overdue Books'
              value={dashboardData.totalOverdueBooks}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className='bg-pink-200 m-2'>
            <Statistic
              title='Books Returned Last 7 Days'
              value={dashboardData.booksReturnedLast7Days}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='px-6 py-2'>
        <Col xs={24} md={12} className='mb-4'>
          <Card
            title='Users By Role'
            className='shadow-lg rounded-lg overflow-hidden mb-4'
          >
            <List
              dataSource={dashboardData.usersByRole}
              renderItem={(item) => (
                <List.Item
                  key={item._id}
                  className='border-b last:border-b-0 capitalize'
                >
                  <span className='font-semibold'>{item._id}</span>:{' '}
                  {item.count}
                </List.Item>
              )}
            />
          </Card>

          <Card
            title='Most Borrowed Books'
            className='shadow-lg rounded-lg overflow-hidden'
          >
            <List
              dataSource={dashboardData.mostBorrowedBooks}
              renderItem={(item) => (
                <List.Item key={item._id} className='border-b last:border-b-0'>
                  <span className='font-semibold'>{item.bookTitle}</span> by{' '}
                  {item.bookAuthor} - Borrowed {item.count} times
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} className='mb-4'>
          <Card
            title='Books By Category'
            className='shadow-lg rounded-lg overflow-hidden mb-4'
          >
            <List
              dataSource={dashboardData.booksByCategory}
              renderItem={(item) => (
                <List.Item key={item._id} className='border-b last:border-b-0'>
                  <span className='font-semibold'>{item._id}</span>:{' '}
                  {item.count}
                </List.Item>
              )}
            />
          </Card>

          <Card
            title='Most Active Users'
            className='shadow-lg rounded-lg overflow-hidden'
          >
            <List
              dataSource={dashboardData.mostActiveUsers}
              renderItem={(user) => (
                <List.Item key={user._id} className='border-b last:border-b-0'>
                  <span className='font-semibold'>{user.userName}</span> -
                  Borrowed {user.activityCount}{' '}
                  {user.activityCount > 1 ? 'books' : 'book'}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
