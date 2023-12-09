import React from 'react';
import { Modal, Form, Input, Button, message, Rate } from 'antd';

import axiosInstance from '../../axios';

const { TextArea } = Input;

const AddReviewModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  selectedbookId,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axiosInstance.post('/submit-review', {
        bookId: selectedbookId,
        rating: values.rating,
        comment: values.comment,
      });
      message.success('Review submitted successfully!');
      handleOk();
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit review');
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      title='Add Review'
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='rating'
          label='Rating'
          rules={[{ required: true, message: 'Please input your rating!' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name='comment'
          label='Comment'
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button key='back' onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            key='submit'
            type='primary'
            htmlType='submit'
            className='bg-blue-500 hover:bg-blue-700'
          >
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReviewModal;
