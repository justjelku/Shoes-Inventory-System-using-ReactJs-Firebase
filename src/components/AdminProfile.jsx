import React, { useContext } from 'react';
import { AdminUserAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router';

const AdminProfile = () => {
  const {admin, logout } = AdminUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logout();
      navigate('/admin');
      console.log('You are logged out')
    } catch(e){
      console.log(e.message);
    }
  };

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2x1 font-bold py-4'>Profile</h1>
      <p>User Email: {admin && admin.email}</p>
      <button onClick={handleLogout} className='border px-6 py-2 my-4'>Logout</button>
    </div>
  );
};

export default AdminProfile;
