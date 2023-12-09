import React from 'react';
import { isAdminUser } from '../../utils/apphelpers';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const isAdmin = isAdminUser();

  return <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>;
};

export default Dashboard;
