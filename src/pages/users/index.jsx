import { useEffect, useState } from 'react';
import { Spin, Table, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import { SearchOutlined } from '@ant-design/icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Link
          to={{
            pathname: `/user/${record._id}`,
            state: { user: record._id },
          }}
        >
          Show User Info
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='mt-4 mr-4'>
      <div className='flex justify-between mb-4'>
        <div className='w-1/4'>
          <Input placeholder='Search users' prefix={<SearchOutlined />} />
        </div>
        <button
          onClick={showModal}
          className='bg-blue-600 text-white active:bg-blue-700 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
        >
          Create User
        </button>
      </div>
      <Modal
        title='Create New User'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <button
            key='back'
            onClick={handleCancel}
            className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-700'
          >
            Cancel
          </button>,
          <button
            key='submit'
            onClick={handleOk}
            className='bg-blue-600 text-white active:bg-blue-700 hover:bg-blue-700 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          >
            Create User
          </button>,
        ]}
      >
        <p>Some contents...</p>
      </Modal>

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Spin size='large' />
        </div>
      ) : (
        <Table dataSource={users} columns={columns} rowKey='_id' />
      )}
    </div>
  );
};

export default Users;
