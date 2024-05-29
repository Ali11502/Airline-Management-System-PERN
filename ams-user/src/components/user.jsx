import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../store/slices/authSlice';
import Navbar from './navbar';


const UpdateUser = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!userInfo) {
          navigate('/signin');
        }
      }, [navigate, userInfo]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
      if (userInfo) {
          setName(userInfo.name || '');
          setEmail(userInfo.email || '');
      }
  }, [userInfo]);
  
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
        } else {
          try {
            const res = await updateProfile({
              id: userInfo.id,
              name,
              email,
              password,
            }).unwrap();
            console.log(res);
            dispatch(setCredentials(res));
            toast.success('Profile updated successfully');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">Update User Information</h2>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
          >
            Update Information
          </button>
        </form>
      </div>

      
    </div>
    </div>
  );
};

export default UpdateUser;
