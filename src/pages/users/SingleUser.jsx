import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  return user ? (
    <div className='bg-gray-600 p-6 rounded-md w-96 mx-auto mt-10'>
      <h1 className='text-2xl text-white font-bold mb-4'>
        {user.name.first} {user.name.last}
      </h1>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Email:</p>
        <p>{user.email}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Phone:</p>
        <p>{user.phoneNumber}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Date of Birth:</p>
        <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Role:</p>
        <p>{user.role}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Address:</p>
        <p>{user.address}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Batch:</p>
        <p>{user.batch}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Department:</p>
        <p>{user.department}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Account Status:</p>
        <p>{user.isActive ? 'Active' : 'Inactive'}</p>
      </div>

      <div className='text-gray-300 mb-2'>
        <p className='font-bold'>Verification Status:</p>
        <p>{user.isVerified ? 'Verified' : 'Not Verified'}</p>
      </div>
    </div>
  ) : (
    <p className='text-center mt-10 text-xl font-semibold'>Loading...</p>
  );
};

export default SingleUser;
