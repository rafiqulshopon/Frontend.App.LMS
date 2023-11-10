import { useEffect, useState } from 'react';
import { Spin, Table, Modal, Input } from 'antd';
import axiosInstance from '../../axios';
import { SearchOutlined } from '@ant-design/icons';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

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
        <button
          onClick={showModal}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Book
        </button>
      </div>
      <Modal
        title='Add New Book'
        visible={isModalVisible}
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
            Add Book
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
        <Table dataSource={books} columns={columns} rowKey='_id' />
      )}
    </div>
  );
};

export default Books;
