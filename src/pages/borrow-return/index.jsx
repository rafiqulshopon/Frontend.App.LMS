import React, { useEffect, useState } from 'react';
import { Table, message, Space, Select, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import axiosInstance from '../../axios';
import AppFilterRadio from '../../helpers/ui/radio/AppFilterRadio';
import AssignBookModal from './AssignBookModal';

const BorrowReturn = () => {
  const [borrowingHistories, setBorrowingHistories] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryData, setQueryData] = useState({ status: 'borrowed' });
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

  const fetchBorrowingHistories = async () => {
    try {
      const response = await axiosInstance.post('/borrow-list', queryData);
      setBorrowingHistories(response.data.borrowingHistories || []);
    } catch (error) {
      message.error('Error fetching borrowing histories');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      message.error('Error fetching users');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/books');
      console.log({ response });
      setBooks(response.data);
    } catch (error) {
      message.error('Error fetching books');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBorrowingHistories();
  }, [queryData]);

  const columns = [
    {
      title: 'Book Title',
      dataIndex: ['book', 'title'],
      key: 'bookTitle',
    },
    {
      title: 'Borrower',
      key: 'borrower',
      render: (_, record) =>
        `${record.user.name.first} ${record.user.name.last}`,
    },
    {
      title: 'Borrow Date',
      dataIndex: 'borrowDate',
      key: 'borrowDate',
      render: (borrowDate) => new Date(borrowDate).toLocaleDateString(),
    },
    {
      title: 'Expected Return Date',
      dataIndex: 'expectedReturnDate',
      key: 'expectedReturnDate',
      render: (expectedReturnDate) =>
        new Date(expectedReturnDate).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <a onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const showAssignModal = () => {
    setIsAssignModalVisible(true);
  };

  const handleAssignOk = () => {
    setIsAssignModalVisible(false);
    fetchBorrowingHistories();
  };

  const handleAssignCancel = () => {
    setIsAssignModalVisible(false);
  };

  const statusOptions = [
    { label: 'Borrowed', value: 'borrowed' },
    { label: 'Returned', value: 'returned' },
    { label: 'Overdue', value: 'overdue' },
  ];

  const handleSelectionChange = (status) => {
    setLoading(true);
    setQueryData((prevState) => ({
      ...prevState,
      status: status || 'borrowed',
    }));
  };

  const handleUserChange = (userId) => {
    setLoading(true);
    setQueryData((prevState) => ({
      ...prevState,
      userId,
    }));
  };

  const handleBookChange = (bookId) => {
    setLoading(true);
    setQueryData((prevState) => ({
      ...prevState,
      bookId,
    }));
  };

  return (
    <div className='mt-4 mx-4 bg-white p-6 rounded-lg shadow'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4 flex-grow'>
          <Select
            placeholder='Select User'
            onChange={handleUserChange}
            style={{ width: 200 }}
            allowClear
            onClear={() => fetchBorrowingHistories()}
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name.first} {user.name.last}
              </Option>
            ))}
          </Select>

          <Select
            placeholder='Select Book'
            onChange={handleBookChange}
            style={{ width: 200 }}
            allowClear
            onClear={() => fetchBorrowingHistories()}
          >
            {books.map((book) => (
              <Option key={book._id} value={book._id}>
                {book.title}
              </Option>
            ))}
          </Select>

          <AppFilterRadio
            options={statusOptions}
            onChange={handleSelectionChange}
            btn_text='Status'
          />
        </div>

        <Button
          type='primary'
          className='bg-blue-500 hover:bg-blue-700 text-white'
          onClick={showAssignModal}
        >
          Assign Book
        </Button>
      </div>

      <AssignBookModal
        isModalVisible={isAssignModalVisible}
        handleOk={handleAssignOk}
        handleCancel={handleAssignCancel}
        refreshBorrowingHistories={fetchBorrowingHistories}
      />

      <Table
        dataSource={borrowingHistories}
        columns={columns}
        rowKey='_id'
        pagination={false}
        loading={loading}
        className='rounded-lg overflow-hidden'
      />
    </div>
  );
};

export default BorrowReturn;
