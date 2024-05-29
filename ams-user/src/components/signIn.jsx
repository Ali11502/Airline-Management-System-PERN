// SignIn.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import image from "../assets/hero1.jpg";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);



  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen py-40 font-mono">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="text-grey text-6xl font-extrabold font-mono mb-3 text-white">Sign In</h1>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12 bg-gray-50">
            <h2 className="text-3xl mb-4">Login</h2>
            <p className="mb-4">
              Sign in to your account. It’ll only take seconds.
            </p>
            <form onSubmit={submitHandler}>
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 py-1 mt-5 px-2 w-full" />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 py-1 mt-5 px-2 w-full" />
        {isLoading && <p>Loading...</p>}
        <button type="submit" className="w-full bg-blue-500 py-3 mt-5 text-center text-white" disabled={isLoading}>
          Sign In
        </button>
        <div className="mt-5 flex items-center">
                <span>
                  Dont have an account? <Link to={`/signup`}><a className='text-blue-600'>Sign Up</a></Link>
                </span>
              </div>
      </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
