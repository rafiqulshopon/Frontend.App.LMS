import React, { useEffect, useState } from 'react';
import { Table, message, Space, Select, Button, Tag, Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import axiosInstance from '../../axios';
import AppFilterRadio from '../../helpers/ui/radio/AppFilterRadio';
import AssignBookModal from './AssignBookModal';
import ReturnBookModal from './ReturnBookModal';
import BorrowDetailsModal from './BorrowDetailsModal';
import { isAdminUser, getUserId } from '../../utils/apphelpers';

const BorrowReturn = () => {
  const isAdmin = isAdminUser();
  const userId = getUserId();
  const [borrowingHistories, setBorrowingHistories] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialQueryData = isAdmin ? {} : { userId };
  const [queryData, setQueryData] = useState(initialQueryData);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

  const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [selectedBorrowingHistoryId, setSelectedBorrowingHistoryId] =
    useState(null);

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

  const statusColors = {
    borrowed: 'orange',
    returned: 'green',
    overdue: 'red',
  };

  const showReturnModal = (borrowingHistoryId) => {
    setSelectedBorrowingHistoryId(borrowingHistoryId);
    setIsReturnModalVisible(true);
  };

  const showHistoryModal = (borrowingHistoryId) => {
    setSelectedBorrowingHistoryId(borrowingHistoryId);
    setIsHistoryModalVisible(true);
  };

  const handleReturnOk = () => {
    setIsReturnModalVisible(false);
    fetchBorrowingHistories();
  };

  const handleReturnCancel = () => {
    setIsReturnModalVisible(false);
  };

  const actionMenu = (record) => {
    let menuItems = [
      {
        label: 'See details',
        key: 'details',
        onClick: () => showHistoryModal(record._id),
      },
    ];

    if (record.status !== 'returned' && isAdmin) {
      menuItems.unshift({
        label: 'Return Book',
        key: 'return',
        onClick: () => showReturnModal(record._id),
      });
    }

    return menuItems;
  };

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
      render: (borrowDate) =>
        borrowDate ? new Date(borrowDate).toLocaleDateString() : '-',
    },
    {
      title: 'Expected Return Date',
      dataIndex: 'expectedReturnDate',
      key: 'expectedReturnDate',
      render: (expectedReturnDate) =>
        expectedReturnDate
          ? new Date(expectedReturnDate).toLocaleDateString()
          : '-',
    },

    {
      title: 'Actual Return Date',
      dataIndex: 'actualReturnDate',
      key: 'actualReturnDate',
      render: (actualReturnDate) =>
        actualReturnDate
          ? new Date(actualReturnDate).toLocaleDateString()
          : '-',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = statusColors[status] || 'default';
        return (
          <Tag color={color}>{status[0].toUpperCase() + status.slice(1)}</Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: actionMenu(record),
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
    setQueryData((prevState) => {
      const updatedState = { ...prevState };

      if (status) {
        updatedState.status = status;
      } else {
        delete updatedState.status;
      }

      return updatedState;
    });
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
          {isAdmin ? (
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
          ) : (
            ''
          )}

          {isAdmin ? (
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
          ) : (
            ''
          )}

          <AppFilterRadio
            options={statusOptions}
            onChange={handleSelectionChange}
            btn_text='Status'
          />
        </div>
        {isAdmin ? (
          <Button
            type='primary'
            className='bg-blue-500 hover:bg-blue-700 text-white'
            onClick={showAssignModal}
          >
            Assign Book
          </Button>
        ) : (
          ''
        )}
      </div>

      <AssignBookModal
        isModalVisible={isAssignModalVisible}
        handleOk={handleAssignOk}
        handleCancel={handleAssignCancel}
        refreshBorrowingHistories={fetchBorrowingHistories}
      />

      <ReturnBookModal
        isModalVisible={isReturnModalVisible}
        handleOk={handleReturnOk}
        handleCancel={handleReturnCancel}
        borrowingHistoryId={selectedBorrowingHistoryId}
      />

      <BorrowDetailsModal
        isModalVisible={isHistoryModalVisible}
        setIsHistoryModalVisible={setIsHistoryModalVisible}
        borrowingHistoryId={selectedBorrowingHistoryId}
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
