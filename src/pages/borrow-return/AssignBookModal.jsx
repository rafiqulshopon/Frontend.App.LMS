import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, DatePicker, Button, message } from 'antd';
import axiosInstance from '../../axios';

const { Option } = Select;

const AssignBookModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  refreshBorrowingHistories,
}) => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/books');
      setBooks(response.data);
    } catch (error) {
      message.error('Error fetching books');
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

  const onFinish = async (values) => {
    try {
      await axiosInstance.post('/assign', {
        bookId: values.bookId,
        userId: values.userId,
        expectedReturnDate: values.expectedReturnDate.format('YYYY-MM-DD'),
      });
      message.success('Book assigned successfully!');
      handleOk();
      refreshBorrowingHistories();
      form.resetFields();
      setBooks([]);
      setUsers([]);
    } catch (error) {
      message.error('Failed to assign book');
    }
  };

  return (
    <Modal
      title='Assign Book'
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='bookId'
          label='Book'
          rules={[{ required: true, message: 'Please select a book' }]}
        >
          <Select placeholder='Select a book'>
            {books.map((book) => (
              <Option key={book._id} value={book._id}>
                {book.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='userId'
          label='User'
          rules={[{ required: true, message: 'Please select a user' }]}
        >
          <Select placeholder='Select a user'>
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name.first} {user.name.last}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='expectedReturnDate'
          label='Expected Return Date'
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button
              key='back'
              onClick={handleCancel}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              key='submit'
              type='primary'
              className='bg-blue-500 hover:bg-blue-700'
              htmlType='submit'
            >
              Assign Book
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignBookModal;
