import React, { useState, useEffect } from 'react';
import image from "../assets/hero1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen py-40 font-mono" >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="text-grey text-6xl font-extrabold font-mono mb-3 text-white">Sign Up</h1>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12 bg-gray-50">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute
            </p>
            <form onSubmit={submitHandler}>
              <input type="text" name="name" placeholder="Name" className="border border-gray-400 py-1 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="mt-5">
                <input type="email" name="email" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mt-5">
                <input type="password" name="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mt-5">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              {isLoading && <p>Loading...</p>}
              <div className="mt-5">
                <button type="submit" className="w-full bg-blue-500 py-3 text-center text-white" >
                  Register Now
                </button>
              </div>
              <div className="mt-5 flex items-center">
                <span>
                  Already have an account? <Link to={`/signin`}><a className='text-blue-600'>Login</a></Link>
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

export default SignUp;
