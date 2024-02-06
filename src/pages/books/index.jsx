import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Button, Dropdown, message, Space } from 'antd';
import axiosInstance from '../../axios';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import useDebounce from '../../helpers/hooks/useDebounce';
import AppFilterRadio from '../../helpers/ui/radio/AppFilterRadio';
import { isAdminUser } from '../../utils/apphelpers';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState({
    edit: false,
    add: false,
  });
  const [filters, setFilters] = useState({
    searchKeyword: '',
    department: '',
  });
  const [editBookId, setEditBookId] = useState(null);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  // Handlers for modal
  const showModal = (context, bookId = null) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [context]: true,
    }));
    if (bookId) setEditBookId(bookId);
  };

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

  const searchBooks = async (currentFilters) => {
    const { searchKeyword, department } = currentFilters;
    let queryData = {};
    if (searchKeyword) queryData.title = searchKeyword;
    if (department) queryData.department = department;

    setLoading(true);
    try {
      const response = await axiosInstance.post('/search-books', queryData);
      setBooks(response.data);
    } catch (error) {
      message.error('Error fetching books');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchBooks = useDebounce((currentFilters) => {
    searchBooks(currentFilters);
  }, 500);

  const handleSearchChange = (event) => {
    const newSearchKeyword = event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      searchKeyword: newSearchKeyword,
    }));
    debouncedSearchBooks({ ...filters, searchKeyword: newSearchKeyword });
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

  const actionMenu = (record) => {
    const menuItems = [
      {
        label: 'View details',
        key: 'view',
        onClick: () => navigate(`/book/${record._id}`),
      },
    ];

    if (isAdmin) {
      menuItems.push(
        {
          label: 'Edit',
          key: 'edit',
          onClick: () => showModal('edit', record._id),
        },
        {
          label: 'Delete',
          key: 'delete',
          onClick: () => handleDeleteBook(record?._id),
        }
      );
    }

    return menuItems;
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

  useEffect(() => {
    fetchBooks();
  }, []);

  const departmentOptions = [
    { label: 'CSE', value: 'CSE' },
    { label: 'LHR', value: 'LHR' },
    { label: 'PHR', value: 'PHR' },
    { label: 'ENG', value: 'ENG' },
  ];

  const handleDepartmentChange = (value) => {
    const newFilters = { ...filters, department: value };
    setFilters(newFilters);
    debouncedSearchBooks(newFilters);
  };

  return (
    <div className='mt-4 mx-4 bg-white p-6 rounded-lg shadow'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4 flex-grow'>
          <Input
            placeholder='Search books'
            className='w-1/4'
            prefix={<SearchOutlined />}
            value={filters?.searchKeyword}
            onChange={handleSearchChange}
          />

          <AppFilterRadio
            options={departmentOptions}
            onChange={handleDepartmentChange}
            btn_text='Department'
          />
        </div>

        {isAdmin ? (
          <Button
            type='primary'
            className='bg-blue-500 hover:bg-blue-700 text-white'
            onClick={() => showModal('add')}
          >
            Add Book
          </Button>
        ) : (
          ''
        )}
      </div>

      {isModalVisible?.add && (
        <AddBookModal
          isModalVisible={isModalVisible?.add}
          handleOk={handleOk}
          handleCancel={handleCancel}
          fetchBooks={fetchBooks}
        />
      )}

      {isModalVisible?.edit && (
        <EditBookModal
          isModalVisible={isModalVisible?.edit}
          handleOk={handleOk}
          handleCancel={handleCancel}
          fetchBooks={fetchBooks}
          bookId={editBookId}
        />
      )}
      <div className='max-h-[calc(108vh-200px)] overflow-y-auto w-full'>
        <Table
          dataSource={books}
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

export default Books;
