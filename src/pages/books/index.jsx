import { useEffect, useState } from 'react';
import { Spin, Table, Input, Button, Dropdown, Menu, Space } from 'antd';
import axiosInstance from '../../axios';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import AddBookModal from './AddBookModal';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const actionMenu = (record) => [
    {
      label: 'View details',
      key: 'view',
      onClick: () => console.log(record),
    },
    {
      label: 'Edit',
      key: 'edit',

      onClick: () => console.log(record),
    },
    {
      label: 'Delete',
      key: 'delete',
      onClick: () => console.log(record),
    },
  ];

  // Handlers for modal
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

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='mt-4 mr-4 ml-4'>
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search books'
          className='w-1/4'
          prefix={<SearchOutlined />}
        />

        <Button
          type='primary'
          className='bg-blue-500 hover:bg-blue-700'
          onClick={showModal}
        >
          Add Book
        </Button>
      </div>
      <AddBookModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        fetchBooks={fetchBooks}
      />
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
        <Table dataSource={books} columns={columns} rowKey='_id' />
      )}
    </div>
  );
};

export default Books;
