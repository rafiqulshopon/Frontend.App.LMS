import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Dropdown, Modal, Space, Tag, message } from 'antd';
import axiosInstance from '../../axios';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import useDebounce from '../../helpers/hooks/useDebounce';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const searchUsers = async (search_keyword = '') => {
    let queryData = {};
    if (search_keyword) queryData.search_keyword = search_keyword;

    try {
      const response = await axiosInstance.post('/search-users', queryData);
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserStatus = async (userId, isActive) => {
    const endpoint = isActive ? `/deactivate/${userId}` : `/activate/${userId}`;
    try {
      const response = await axiosInstance.put(endpoint);
      fetchUsers();
      message.success(response.data.message);
    } catch (error) {
      message.error('Failed to update user status');
      console.error('Error updating user status:', error);
    }
  };

  const actionMenu = (record) => [
    {
      label: 'View details',
      key: 'view',
      onClick: () => navigate(`/user/${record._id}`),
    },
    {
      label: record.isActive ? 'Deactivate' : 'Activate',
      key: 'toggleActive',
      onClick: () => toggleUserStatus(record._id, record.isActive),
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (_, user) => `${user?.name?.first} ${user?.name?.last}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      align: 'center',
      render: (dateOfBirth) => new Date(dateOfBirth).toLocaleDateString(),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
    },
    {
      title: 'Verification Status',
      dataIndex: 'isVerified',
      key: 'isVerified',
      align: 'center',
      render: (isVerified) =>
        isVerified ? (
          <Tag color='blue'>Verified</Tag>
        ) : (
          <Tag color='volcano'>Not Verified</Tag>
        ),
    },
    {
      title: 'Account Status',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (isActive) =>
        isActive ? (
          <Tag color='success'>Active</Tag>
        ) : (
          <Tag color='error'>Inactive</Tag>
        ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      align: 'center',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, user) => (
        <Dropdown
          menu={{
            items: actionMenu(user),
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <EllipsisOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const updateQueryData = useDebounce((value) => {
    setLoading(true);
    searchUsers(value);
  }, 500);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    updateQueryData(event.target.value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='mt-4 mx-4 bg-white p-6 rounded-lg shadow'>
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search users'
          className='w-1/4'
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>
      <Modal
        title='Add New User'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key='back'
            onClick={handleCancel}
            className='bg-transparent hover:bg-gray-100 text-gray-700 mr-2 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm hover:shadow'
          >
            Cancel
          </button>,
          <button
            key='submit'
            onClick={handleOk}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add User
          </button>,
        ]}
      >
        <p>Some contents...</p>
      </Modal>
      <div className='max-h-[calc(108vh-200px)] overflow-y-auto w-full'>
        <Table
          dataSource={users}
          columns={columns}
          rowKey='_id'
          loading={loading}
          pagination={false}
          className='rounded-lg'
        />
      </div>
    </div>
  );
};

export default Users;
