import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  message,
  Row,
  Col,
  Spin,
} from 'antd';
import axiosInstance from '../../axios';

const { Option } = Select;
const { TextArea } = Input;

const EditBookModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  fetchBooks,
  bookId,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/book/${bookId}`);
      const bookDetails = response.data;
      form.setFieldsValue({
        ...bookDetails,
      });
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch book details');
      console.error('Error fetching book details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  const validateCurrentQuantity = (_, value) => {
    const totalQuantity = form.getFieldValue('totalQuantity');
    if (value > totalQuantity) {
      return Promise.reject(
        new Error('Current quantity cannot be greater than total quantity')
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      totalQuantity: Number(values.totalQuantity),
      currentQuantity: Number(values.currentQuantity),
    };

    try {
      await axiosInstance.put(`/books/${bookId}`, formattedValues);
      message.success('Book updated successfully!');
      handleOk();
      fetchBooks();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update book.');
      console.error('Error updating book:', error);
    }
  };

  return (
    <Modal
      title='Edit Book'
      open={isModalVisible}
      onCancel={handleCancel}
      width={650}
      footer={null}
    >
      {!loading ? (
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='title'
                label='Title'
                rules={[{ required: true, message: 'Please input the title!' }]}
              >
                <Input placeholder='Enter book title' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='author'
                label='Author'
                rules={[
                  { required: true, message: 'Please input the author!' },
                ]}
              >
                <Input placeholder='Enter author name' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='department'
                label='Department'
                rules={[
                  { required: true, message: 'Please select the department!' },
                ]}
              >
                <Select placeholder='Select department'>
                  <Option value='CSE'>CSE</Option>
                  <Option value='LHR'>LHR</Option>
                  <Option value='PHR'>PHR</Option>
                  <Option value='ENG'>ENG</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='category'
                label='Category'
                rules={[
                  { required: true, message: 'Please input the category!' },
                ]}
              >
                <Input placeholder='Enter book category' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='isbn'
                label='ISBN'
                rules={[{ required: true, message: 'Please input the ISBN!' }]}
              >
                <Input placeholder='Enter book ISBN' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name='description' label='Description'>
            <TextArea placeholder='Enter book description' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='totalQuantity'
                label='Total Quantity'
                rules={[
                  {
                    required: true,
                    message: 'Please input the total quantity!',
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='currentQuantity'
                label='Current Quantity'
                rules={[
                  {
                    required: true,
                    message: 'Please input the current quantity!',
                  },
                  {
                    validator: validateCurrentQuantity,
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button key='back' onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                key='submit'
                type='primary'
                htmlType='submit'
                className='bg-blue-500 hover:bg-blue-700 ml-2'
              >
                Update Book
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <div className='flex justify-center items-center mt-20 mb-20'>
          <Spin />
        </div>
      )}
    </Modal>
  );
};

export default EditBookModal;
