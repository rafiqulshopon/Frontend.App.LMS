import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axiosInstance from '../../axios';

const { TextArea } = Input;

const ReturnBookModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  borrowingHistoryId,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axiosInstance.post('/return', {
        borrowingHistoryId,
        comment: values.comment,
      });
      message.success('Book returned successfully!');
      handleOk();
      form.resetFields();
    } catch (error) {
      message.error('Failed to return book');
    }
  };

  return (
    <Modal
      title='Return Book'
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item name='comment' label='Comment (optional)'>
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
            Return Book
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReturnBookModal;
