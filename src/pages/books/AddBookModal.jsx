import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  message,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import axiosInstance from '../../axios';

const { Option } = Select;
const { TextArea } = Input;

const AddBookModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  fetchBooks,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      publishedDate: values.publishedDate.format('YYYY-MM-DD'),
      totalQuantity: Number(values.totalQuantity),
      currentQuantity: Number(values.totalQuantity),
    };

    try {
      await axiosInstance.post('/books', formattedValues);
      message.success('Book added successfully!');
      handleOk();
      fetchBooks();
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to add book.');
      console.error('Error adding book:', error);
    }
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <Modal
      title='Add New Book'
      open={isModalVisible}
      onCancel={handleCancel}
      width={650}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          department: 'CSE',
        }}
      >
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
              rules={[{ required: true, message: 'Please input the author!' }]}
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
                { required: true, message: 'Please select a department!' },
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
          <Col span={12}>
            <Form.Item
              name='publishedDate'
              label='Published Date'
              rules={[
                { required: true, message: 'Please select a published date!' },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                disabledDate={disabledDate}
                superNextIcon={false}
                superPrevIcon={false}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='category'
              label='Category'
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Input placeholder='Enter book category' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='totalQuantity'
              label='Total Quantity'
              rules={[
                { required: true, message: 'Please input the total quantity!' },
              ]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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
              Add Book
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
