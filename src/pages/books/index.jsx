import { useEffect, useState } from 'react';
import { Table, Input, Button, Dropdown, message, Space } from 'antd';
import axiosInstance from '../../axios';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState({
    edit: false,
    add: false,
  });
  const [editBookId, setEditBookId] = useState(null);

  // Handlers for modal
  const showModal = (context, bookId) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [context]: true,
    }));
    setEditBookId(bookId);
  };

  console.log({ isModalVisible });

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/books');
      setBooks(response.data);
    } catch (error) {
      message.error('Error fetching books');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axiosInstance.delete(`/book/${bookId}`);
      message.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      message.error('Failed to delete book');
      console.error('Error deleting the book:', error);
    }
  };

  const actionMenu = (record) => [
    {
      label: 'View details',
      key: 'view',
      onClick: () => console.log(record),
    },
    {
      label: 'Edit',
      key: 'edit',
      onClick: () => showModal('edit', record._id),
    },
    {
      label: 'Delete',
      key: 'delete',
      onClick: () => handleDeleteBook(record?._id),
    },
  ];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Published Date',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Current Quantity',
      dataIndex: 'currentQuantity',
      key: 'currentQuantity',
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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='mt-4 mx-4 bg-white p-6 rounded-lg shadow'>
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search books'
          className='w-full md:w-1/4'
          prefix={<SearchOutlined />}
        />
        <Button
          type='primary'
          className='ml-4 bg-blue-500 hover:bg-blue-700 text-white'
          onClick={() => showModal('add')}
        >
          Add Book
        </Button>
      </div>
      <AddBookModal
        isModalVisible={isModalVisible?.add}
        handleOk={handleOk}
        handleCancel={handleCancel}
        fetchBooks={fetchBooks}
      />

      <EditBookModal
        isModalVisible={isModalVisible?.edit}
        handleOk={handleOk}
        handleCancel={handleCancel}
        fetchBooks={fetchBooks}
        bookId={editBookId}
      />

      <Table
        dataSource={books}
        columns={columns}
        rowKey='_id'
        loading={loading}
        className='rounded-lg overflow-hidden'
      />
    </div>
  );
};

export default Books;
