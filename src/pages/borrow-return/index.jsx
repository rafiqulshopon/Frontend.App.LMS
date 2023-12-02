import React, { useEffect, useState } from 'react';
import { Table, message, Space, Input, Button } from 'antd';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import axiosInstance from '../../axios';
import AssignBookModal from './AssignBookModal';

const BorrowReturn = () => {
  const [borrowingHistories, setBorrowingHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

  const fetchBorrowingHistories = async () => {
    try {
      const response = await axiosInstance.post('/borrow-list');
      setBorrowingHistories(response.data.borrowingHistories || []);
    } catch (error) {
      message.error('Error fetching borrowing histories');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowingHistories();
  }, []);

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

  return (
    <div className='mt-4 mx-4 bg-white p-6 rounded-lg shadow'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4 flex-grow'>
          <Input
            placeholder='Search books'
            className='w-1/4'
            prefix={<SearchOutlined />}
            // value={searchKeyword}
            // onChange={handleSearchChange}
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
