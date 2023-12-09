import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { Descriptions, Spin, List, Card, Rate } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className='container mx-auto p-4'>
      <PageHeader
        onBack={() => navigate(-1)}
        title='Book Details'
        subTitle={book.title}
      />

      <Descriptions
        bordered
        title='Book Information'
        size='small'
        layout='vertical'
        className='bg-white p-6 rounded-lg shadow mt-4'
      >
        <Descriptions.Item label='Title'>{book.title}</Descriptions.Item>
        <Descriptions.Item label='Author'>{book.author}</Descriptions.Item>
        <Descriptions.Item label='Category'>{book.category}</Descriptions.Item>
        <Descriptions.Item label='Department'>
          {book.department}
        </Descriptions.Item>
        <Descriptions.Item label='Published Date'>
          {book.publishedDate}
        </Descriptions.Item>
        <Descriptions.Item label='ISBN'>{book.isbn}</Descriptions.Item>
        <Descriptions.Item label='Total Quantity'>
          {book.totalQuantity}
        </Descriptions.Item>
        <Descriptions.Item label='Current Quantity'>
          {book.currentQuantity}
        </Descriptions.Item>
        <Descriptions.Item label='Description'>
          {book.description}
        </Descriptions.Item>
      </Descriptions>

      <div className='bg-white p-6 rounded-lg shadow mt-4'>
        <h2 className='text-lg font-semibold mb-4'>Reviews</h2>
        <List
          dataSource={book.reviews}
          itemLayout='vertical'
          renderItem={(review) =>
            review.comment ? (
              <Card bordered={false}>
                <p>
                  <strong>{review.fullName}</strong>
                </p>
                <Rate disabled value={review.rating} />
                <p>{review.comment}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </Card>
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default BookDetails;
