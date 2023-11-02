import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axiosInstance from '../../axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: 'First Name',
      dataIndex: ['name', 'first'],
    },
    {
      title: 'Last Name',
      dataIndex: ['name', 'last'],
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth) =>
        new Date(dateOfBirth).toISOString().split('T')[0],
    },

    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Is Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified) => (isVerified ? 'Yes' : 'No'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='mt-4 mr-4'>
      <Table dataSource={users} columns={columns} rowKey='_id' />
    </div>
  );
};

export default Users;
