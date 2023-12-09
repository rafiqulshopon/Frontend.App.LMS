import React, { useState, useEffect } from 'react';
import { Modal, Card, Row, Col, Typography, Tag, Empty } from 'antd';
import axiosInstance from '../../axios';

const BorrowDetailsModal = ({
  borrowingHistoryId,
  setIsHistoryModalVisible,
  isModalVisible,
}) => {
  const [borrowingHistory, setBorrowingHistory] = useState([]);

  const handleCancel = () => {
    setIsHistoryModalVisible(false);
    setBorrowingHistory([]);
  };

  useEffect(() => {
    if (isModalVisible && borrowingHistoryId) {
      const fetchBorrowingHistoryDetails = async () => {
        try {
          const response = await axiosInstance.post('/borrow-list', {
            borrowId: borrowingHistoryId,
          });
          setBorrowingHistory(response.data.borrowingHistories[0]);
        } catch (error) {
          message.error('Error fetching borrowing history details');
        }
      };
      fetchBorrowingHistoryDetails();
    }
  }, [isModalVisible, borrowingHistoryId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'borrowed':
        return '#FF9800';
      case 'returned':
        return '#28A745';
      case 'overdue':
        return '#DC3545';
      default:
        return '#000000';
    }
  };

  if (!borrowingHistory) {
    return (
      <Modal
        title='Borrow details'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Empty description='No borrowing history found for this ID.' />
      </Modal>
    );
  }

  return (
    <Modal
      title={<Typography.Title level={4}>Borrow details</Typography.Title>}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      {borrowingHistory && (
        <Card>
          <Row>
            <Col span={12}>
              <p>
                <Typography.Text strong>Book Title:</Typography.Text>
                &nbsp;
                {borrowingHistory?.book?.title}
              </p>
              <p>
                <Typography.Text strong>Author:</Typography.Text>
                &nbsp;
                {borrowingHistory?.book?.author}
              </p>
              <p>
                <Typography.Text strong>Borrower:</Typography.Text>
                &nbsp;
                {borrowingHistory?.user?.name?.first}{' '}
                {borrowingHistory?.user?.name?.last}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <Typography.Text strong>Status:</Typography.Text>
                &nbsp;
                <Tag color={getStatusColor(borrowingHistory?.status)}>
                  {borrowingHistory?.status?.toUpperCase()}
                </Tag>
              </p>
              <p>
                <Typography.Text strong>Borrow Date:</Typography.Text>
                &nbsp;
                {formatDate(borrowingHistory?.borrowDate)}
              </p>
              <p>
                <Typography.Text strong>Expected Return Date:</Typography.Text>
                &nbsp;
                {formatDate(borrowingHistory?.expectedReturnDate)}
              </p>
            </Col>
          </Row>
          {borrowingHistory?.actualReturnDate && (
            <Row>
              <Col span={24}>
                <p>
                  <Typography.Text strong>Actual Return Date:</Typography.Text>
                  &nbsp;
                  {formatDate(borrowingHistory?.actualReturnDate)}
                </p>
              </Col>
            </Row>
          )}
          {borrowingHistory?.status === 'returned' && (
            <Row>
              <Col span={24}>
                <p>
                  <Typography.Text strong>Fines:</Typography.Text>
                  &nbsp;
                  {borrowingHistory?.fines}
                </p>
              </Col>
            </Row>
          )}
        </Card>
      )}
    </Modal>
  );
};

export default BorrowDetailsModal;
